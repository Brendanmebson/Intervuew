import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ChatIcon from "@mui/icons-material/Chat";
import { Icon, LogoSVG } from "../components/Icons";
import { COLORS } from "../theme/theme";
import {
  ApplicantDict,
  InterviewDict,
  InterviewStatus,
  TranscriptEntry,
} from "../types";
import { esbuildVersion } from "vite";

const Interview: React.FC = () => {
  const nav = useNavigate();
  const [status, setStatus] = useState<InterviewStatus>("speaking");
  const [speaking, setSpeaking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [micActive, setMicActive] = useState(true);
  const [qIdx, setQIdx] = useState(2);
  const [applicant, setApplicant] = useState<ApplicantDict | null>(null);
  const [interview, setInterview] = useState<InterviewDict | null>(null);
  const totalQ = 8;
  const params = useParams();
  const applicantId = params.applicationId;
  const interviewId = params.interviewId;
  const nextPlayTimeRef = useRef(0);

  const [connected, setConnected] = useState(false);
  const wsRef = useRef<{ audio: WebSocket | null; video: WebSocket | null }>({
    audio: null,
    video: null,
  });
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const processedStreamRef = useRef<MediaStream | null>(null);
  const lastFrameRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [startVideoRequested, setStartVideoRequested] = useState(false);
  const lastSentRef = useRef<number>(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const playPCM = (float32: Float32Array) => {
    if (!audioContextRef.current) return;

    const SERVER_SAMPLE_RATE = 24000;

    const audioBuffer = audioContextRef.current.createBuffer(
      1,
      float32.length,
      SERVER_SAMPLE_RATE,
    );

    audioBuffer.copyToChannel(new Float32Array(float32), 0);

    const ctx = audioContextRef.current;
    const currentTime = ctx.currentTime;

    if (nextPlayTimeRef.current < currentTime) {
      nextPlayTimeRef.current = currentTime;
    }

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start(nextPlayTimeRef.current);

    nextPlayTimeRef.current += audioBuffer.duration;
  };
  const convertFloat32ToPCM = (inputData: Float32Array): ArrayBuffer => {
    const pcm16 = new Int16Array(inputData.length);

    for (let i = 0; i < inputData.length; i++) {
      pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff;
    }

    return pcm16.buffer;
  };

  const startAudioInterview = async () => {
    // 1. AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
    }
    await audioContextRef.current.resume();

    // 2. Create WebSocket here only
    const ws = new WebSocket(
      `ws://localhost:8000/interview/start/${interviewId}/${applicantId}`,
    );
    wsRef.current.audio = ws;
    ws.binaryType = "arraybuffer";

    // 3. Wait for connection before doing anything
    await new Promise<void>((resolve, reject) => {
      ws.onopen = () => {
        setConnected(true);
        resolve();
      };
      ws.onerror = () => reject(new Error("WebSocket failed to connect"));
    });

    // 4. Now safe to use
    ws.onmessage = (event) => {
      if (typeof event.data === "string") {
        const msg = JSON.parse(event.data);
        console.log(JSON.parse(event.data));
        if (msg.turn_complete) {
          nextPlayTimeRef.current = 0;
          setSpeaking(false);
          console.log(
            "turn complete, ws state:",
            wsRef.current.audio?.readyState,
          );
        }
      } else {
        const int16 = new Int16Array(event.data);
        console.log("received audio bytes:", event.data.byteLength);
        const float32 = new Float32Array(int16.length);
        for (let i = 0; i < int16.length; i++) {
          float32[i] = int16[i] / 32767;
        }
        if (!speaking) setSpeaking(true);
        playPCM(float32);
      }
    };

    ws.onclose = () => setConnected(false);

    // 5. Start audio worklet
    await audioContextRef.current.audioWorklet.addModule(
      `${window.location.origin}/pcm-recorder-processor.js`,
    );

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 16000,
      },
    });
    const source = audioContextRef.current.createMediaStreamSource(stream);
    const audioRecorderNode = new AudioWorkletNode(
      audioContextRef.current,
      "pcm-recorder-processor",
    );

    source.connect(audioRecorderNode);
    audioRecorderNode.connect(audioContextRef.current.destination);

    ws.send(JSON.stringify({ mime_type: "audio/pcm" }));

    audioRecorderNode.port.onmessage = (event) => {
      console.log("audio data from worklet:", event.data);
      const data = convertFloat32ToPCM(event.data);
      if (ws.readyState === WebSocket.OPEN) {
        console.log("sending to server:", data.byteLength);
        ws.send(data);
      }
    };
  };

  const startVideoInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "user",
          frameRate: { ideal: 30 },
        },
      });

      const ws = new WebSocket(
        `ws://localhost:8000/interview/visual_interview/start/${interviewId}/${applicantId}`,
      );
      wsRef.current.video = ws;
      ws.binaryType = "arraybuffer";

      await new Promise<void>((resolve, reject) => {
        ws.onopen = () => {
          setConnected(true);
          resolve();
        };
        ws.onerror = () => reject(new Error("WebSocket failed to connect"));
      });
      console.log("videoRef.current:", videoRef.current);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      const worker = new Worker("/video-processor.js");
      workerRef.current = worker;
      worker.postMessage({ type: "init" });

      worker.onmessage = (e) => {
        if (e.data.type === "blob") {
          const now = Date.now();
          if (now - lastSentRef.current > 1000) {
            console.log(now, Date.now());
            lastSentRef.current = now;
            const blob = new Blob([e.data.buffer], { type: "image/jpeg" });
            const reader = new FileReader();
            reader.onloadend = () => {
              if (typeof reader.result === "string") {
                const base64data = reader.result.split(",")[1];
                if (wsRef.current.video?.readyState === WebSocket.OPEN) {
                  /**  wsRef.current.video.send(
                    JSON.stringify({
                      realtime_input: {
                        media_chunks: [
                          { mime_type: "image/jpeg", data: base64data },
                        ],
                      },
                    }),
                  );*/
                  console.log("web socket sent");
                }
              }
            };
            reader.readAsDataURL(blob);
          }
        }
      };

      const sendFrame = async () => {
        const now = Date.now();
        if (
          videoRef.current &&
          videoRef.current.readyState >= 2 &&
          now - lastFrameRef.current > 1000
        ) {
          lastFrameRef.current = now;
          const bitmap = await createImageBitmap(videoRef.current);
          worker.postMessage(
            {
              type: "frame",
              bitmap,
              videoWidth: videoRef.current.videoWidth,
              videoHeight: videoRef.current.videoHeight,
            },
            [bitmap],
          );
        }
        animFrameIdRef.current = requestAnimationFrame(sendFrame);
      };

      // Start immediately if already loaded, otherwise wait
      if (videoRef.current && videoRef.current.readyState >= 2) {
        requestAnimationFrame(sendFrame);
      } else {
        videoRef.current?.addEventListener("loadedmetadata", () => {
          requestAnimationFrame(sendFrame);
        });
      }

      processedStreamRef.current = stream;
    } catch (err) {
      console.error("video error:", err);
    }
  };

  const startInterview = async () => {
    setSessionStarted(true);
    setStartVideoRequested(true);
    await startAudioInterview();
  };

  useEffect(() => {
    if (videoReady && startVideoRequested) {
      startVideoInterview();
    }
    return () => {
      workerRef.current?.terminate();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (processedStreamRef.current) {
        processedStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoReady, startVideoRequested]);

  const [transcript, setTranscript] = useState<TranscriptEntry[]>([
    {
      who: "AI",
      text: "Hello! I'll be conducting your structured interview today. Are you ready to begin?",
    },
    { who: "You", text: "Yes, absolutely ready." },
    {
      who: "AI",
      text: "Great. Tell me about a challenging project you led and what the outcome was.",
    },
  ]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      if (connected) {
        setTimer((p) => p + 1);
      }
    }, 1000);
    return () => clearInterval(t);
  }, [connected]);

  useEffect(() => {
    const getIterview = async () => {
      const [interviewResponse, applicantResponse] = await Promise.all([
        fetch(`http://localhost:8000/Interview/${interviewId}`),
        fetch(`http://localhost:8000/Applicant/${applicantId}`),
      ]);

      const interviewData = await interviewResponse.json();
      const applicantData = await applicantResponse.json();
      setInterview(interviewData);
      setApplicant(applicantData);
    };

    getIterview();
  }, [interviewId, applicantId]);
  useEffect(() => {
    if (transcriptRef.current)
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [transcript]);

  const fmt = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };
  const handleMic = () => {
    if (!micActive) {
      setMicActive(true);
      setStatus("listening");
    } else {
      setMicActive(false);
      setStatus("thinking");
      setTimeout(() => {
        setStatus("speaking");
        setTranscript((p) => [
          ...p,
          {
            who: "You",
            text: "I led a complete redesign of our data pipeline that cut processing time by 60%, delivered two weeks early.",
          },
        ]);
        setTimeout(() => {
          setTranscript((p) => [
            ...p,
            {
              who: "AI",
              text: "Excellent result. What were the main technical challenges you encountered during that redesign?",
            },
          ]);
          setQIdx((q) => Math.min(q + 1, totalQ));
        }, 1600);
      }, 1400);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#0F1115",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            px: "28px",
            py: "14px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box onClick={() => nav("/")} sx={{ cursor: "pointer" }}>
              <LogoSVG size={26} />
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "white" }}
              >
                {interview?.role}
              </Typography>
              <Typography
                sx={{ fontSize: 12, color: "rgba(255,255,255,0.38)" }}
              >
                Live Session
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <Typography
              sx={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.05em",
              }}
            >
              {fmt(timer)}/{fmt((interview?.duration ?? 0) * 60)}
            </Typography>

            <Box
              component="button"
              onClick={() => nav("/report")}
              sx={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: COLORS.red,
                borderRadius: "12px",
                px: "16px",
                py: "8px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                "&:hover": { background: "rgba(239,68,68,0.2)" },
              }}
            >
              Leave Session
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 310px" }}
        >
          {!sessionStarted && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                p: "36px",
                width: "100vw",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2.3rem",
                  fontWeight: "600",
                  textDecoration: "uppercase",
                }}
              >
                Hi, {applicant?.name}. Please start your interview{" "}
              </Typography>

              <Typography sx={{ color: "rgba(255,255,255,0.65)" }}>
                Time limit: {interview?.duration} minutes
              </Typography>
              <Box
                component="button"
                onClick={startInterview}
                sx={{
                  background: `linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.lavender})`,
                  border: "none",
                  borderRadius: "3px",
                  px: "40px",
                  py: "16px",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "white",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.02em",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    boxShadow: `0 0 32px rgba(91,93,246,0.7)`,
                  },
                }}
              >
                Start Interview
              </Box>
            </Box>
          )}
          <>
            <Box
              sx={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: "36px",
                width: "100vw",
                display: sessionStarted ? "flex" : "none",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "80%",
                  display: "flex",

                  justifyContent: "center",
                  alignItems: "center",
                  gap: "3rem",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    position: "relative",
                    width: "25%",
                    display: "flex",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <Box
                    sx={{
                      width: 116,
                      height: 116,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "box-shadow 0.5s ease",
                      animation: `${speaking ? "speaking-glow 2s ease-in-out infinite" : "none"}`,
                    }}
                  >
                    <Icon name="brain" size={50} color="white" />
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: "100%",
                    width: "50%",
                    borderRadius: "2px",
                    boxShadow: "0 0 0 0.5px white",
                    position: "relative",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1.5rem",
                    overflow: "hidden",
                  }}
                >
                  <video
                    ref={(node) => {
                      videoRef.current = node;
                      if (node) setVideoReady(true);
                    }}
                    autoPlay
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  mt: "60px",
                  width: "max-width",
                  p: "20px",
                  borderRadius: "16px",
                  height: 70,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1.1rem",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <Box
                  component="button"
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "0.5px solid white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                  }}
                >
                  <VolumeUpIcon sx={{ fontSize: 22, color: "white" }} />
                </Box>

                <Box
                  component="button"
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "1px solid white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                  }}
                >
                  <ChatIcon sx={{ fontSize: 22, color: "white" }} />
                </Box>

                <Box
                  component="button"
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: micActive
                      ? "linear-gradient(135deg,#EF4444,#F87171)"
                      : `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`,

                    transition: "all 0.25s ease",
                    "&:hover": {
                      boxShadow: micActive
                        ? "0 0 30px rgba(239,68,68,0.4)"
                        : "0 0 20px rgba(91,93,246,0.3)",
                    },
                  }}
                >
                  <PhoneIcon
                    sx={{
                      fontSize: 22,
                      color: "white",
                      transform: "rotate(135deg)",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </>
        </Box>
      </Box>
    </>
  );
};

export default Interview;
