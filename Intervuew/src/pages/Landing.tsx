import React, { useState } from "react";
import {
  Box, Typography, Button, AppBar, Toolbar, alpha, Chip, IconButton,
} from "@mui/material";
import {
  AutoAwesome, Psychology, RecordVoiceOver, Assessment,
  CheckCircleOutline, PlayArrow, ArrowForward,
  TrendingUp, Groups, WorkspacePremium, Speed,
  ContentCopy, OpenInNew,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icons";
import { SoftCard, GradientButton } from "../components/shared";
import { COLORS } from "../theme/theme";

/* ─── Hero Mockup (kept from original) ─────────────────────────── */
const HeroMockup = () => (
  <Box sx={{ position: "relative", width: "100%", maxWidth: 480, mx: "auto" }}>
    <SoftCard sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: "50%",
          background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Psychology sx={{ color: "#fff", fontSize: 18 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#0F1115" }}>
            AI Interview in Progress
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#22C55E" }} />
            <Typography sx={{ fontSize: "0.7rem", color: "#22C55E", fontWeight: 600 }}>LIVE</Typography>
          </Box>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#8B8FA8" }}>14:32</Typography>
        </Box>
      </Box>
      {/* Waveform */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2.5, height: 32 }}>
        {[3, 6, 9, 14, 8, 12, 5, 10, 16, 7, 11, 4, 9, 13, 6, 8, 11, 5].map((h, i) => (
          <Box key={i} sx={{
            width: 3, height: h * 2, borderRadius: 2,
            background: `linear-gradient(180deg,${COLORS.indigo},${COLORS.lavender})`,
            opacity: 0.6 + (i % 3) * 0.15,
          }} />
        ))}
      </Box>
      <Typography sx={{ fontSize: "0.8rem", color: "#5A5E72", mb: 1.5, lineHeight: 1.6 }}>
        "Tell me about a time you led a cross-functional team through a challenging project..."
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {["Communication", "Technical", "Clarity"].map((tag) => (
          <Chip key={tag} label={tag} size="small" sx={{
            bgcolor: alpha(COLORS.indigo, 0.08), color: COLORS.indigo,
            fontSize: "0.65rem", fontWeight: 600, height: 20,
          }} />
        ))}
      </Box>
    </SoftCard>

    {/* Floating score card */}
    <Box sx={{
      position: "absolute", top: -20, right: -28,
      background: "#fff",
      border: `1px solid ${alpha(COLORS.indigo, 0.12)}`,
      borderRadius: 1, p: 1.5,
      boxShadow: "0 8px 24px rgba(91,93,246,0.15)",
      minWidth: 120,
    }}>
      <Typography sx={{ fontSize: "0.65rem", color: "#8B8FA8", fontWeight: 600, mb: 0.5, letterSpacing: "0.08em" }}>
        AI SCORE
      </Typography>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, color: COLORS.indigo, lineHeight: 1 }}>
        87
        <Typography component="span" sx={{ fontSize: "0.8rem", color: "#8B8FA8", fontWeight: 400 }}>/100</Typography>
      </Typography>
      <Box sx={{ mt: 1, width: "100%", height: 4, borderRadius: 99, bgcolor: alpha(COLORS.indigo, 0.1), overflow: "hidden" }}>
        <Box sx={{ width: "87%", height: "100%", borderRadius: 99, background: `linear-gradient(90deg,${COLORS.indigo},${COLORS.lavender})` }} />
      </Box>
    </Box>

    {/* Floating transcript chip */}
    <Box sx={{
      position: "absolute", bottom: -16, left: -20,
      background: "#fff",
      border: `1px solid ${alpha("#22C55E", 0.2)}`,
      borderRadius: 2, px: 1.5, py: 1,
      boxShadow: "0 6px 20px rgba(34,197,94,0.12)",
      display: "flex", alignItems: "center", gap: 1,
    }}>
      <RecordVoiceOver sx={{ fontSize: 14, color: "#22C55E" }} />
      <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, color: "#22C55E" }}>Transcribing live...</Typography>
    </Box>
  </Box>
);

/* ─── Data (from new) ───────────────────────────────────────────── */
const problems = [
  {
    icon: "shield", label: "Interviewer Bias",
    desc: "Interviewers unconsciously favor candidates similar to themselves.",
    color: COLORS.red,
  },
  {
    icon: "chart", label: "Inconsistent Scoring",
    desc: "No two interviews are evaluated the same way.",
    color: COLORS.amber,
  },
  {
    icon: "zap", label: "Fragmented Tools",
    desc: "Teams juggle Zoom, spreadsheets, and email — data gets lost.",
    color: COLORS.purple,
  },
  {
    icon: "clock", label: "High Screening Cost",
    desc: "Senior engineers spend hours on calls AI could handle instantly.",
    color: COLORS.blue,
  },
];

const features = [
  {
    icon: "mic", title: "Real-Time Voice AI",
    desc: "Sub-2s AI responses with natural conversational flow.",
    color: COLORS.indigo, wide: true,
  },
  {
    icon: "chart", title: "Deep Analytics",
    desc: "Per-question scoring, clarity, and benchmarks.",
    color: COLORS.purple,
  },
  {
    icon: "shield", title: "Bias-Free Evaluation",
    desc: "Standardized rubrics applied identically, every time.",
    color: COLORS.pink,
  },
  {
    icon: "zap", title: "Instant Transcription",
    desc: "Accurate speech-to-text with real-time processing.",
    color: COLORS.amber,
  },
  {
    icon: "users", title: "Team Collaboration",
    desc: "Share reports and make hiring decisions together.",
    color: COLORS.green,
  },
];

/* ─── Page ──────────────────────────────────────────────────────── */
const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <Box sx={{ bgcolor: "#F8F9FC", minHeight: "100vh" }}>



      {/* Hero */}
      <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 3, md: 6 }, pt: { xs: 5, md: 15 }, pb: { xs: 8, md: 14 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {/* Left */}
          <Box sx={{ flex: "1 1 460px", maxWidth: 560 }}>

            <Typography variant="h1" sx={{ mb: 2.5, fontSize: { xs: "2.5rem", md: "3.75rem" } }}>
              AI Interviews That{" "}
              <Box component="span" sx={{
                background: `linear-gradient(135deg,${COLORS.indigo} 0%,${COLORS.lavender} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Think. Listen. Score.
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "#5A5E72", mb: 4, fontSize: "1.125rem", maxWidth: 440 }}>
              Real-time multimodal AI conducting structured interviews fully inside your platform — no bias, no guesswork.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <GradientButton size="lg" to="/login">
                Start Free Interview <ArrowForward sx={{ ml: 1, fontSize: 20 }} />
              </GradientButton>
              <Button variant="outlined" size="large" onClick={() => navigate("/demo")} startIcon={
                <Box sx={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <PlayArrow sx={{ fontSize: 12, color: "#fff" }} />
                </Box>
              }>
                Watch Demo
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 4, mt: 5 }}>
              {[
                { n: "10k+", label: "Interviews done" },
                { n: "94%", label: "Accuracy rate" },
                { n: "3x", label: "Faster hiring" },
              ].map((s) => (
                <Box key={s.label}>
                  <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F1115" }}>{s.n}</Typography>
                  <Typography variant="caption" sx={{ color: "#8B8FA8" }}>{s.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right */}
          <Box sx={{ flex: "1 1 380px", display: "flex", justifyContent: "center", position: "relative", mt: { xs: 4, md: 0 } }}>
            <Box sx={{
              position: "absolute", width: 400, height: 400, borderRadius: "50%",
              background: `radial-gradient(circle,${alpha(COLORS.indigo, 0.12)} 0%,transparent 70%)`,
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            }} />
            <HeroMockup />
          </Box>
        </Box>
      </Box>

      {/* Problem Section */}
      <Box sx={{ bgcolor: "#FFFFFF", py: { xs: 8, md: 12 }, borderTop: `1px solid ${alpha(COLORS.indigo, 0.07)}` }}>
        <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 3, md: 6 } }}>
          <Box sx={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
            <Box sx={{ flex: "1 1 360px", maxWidth: 440 }}>
              <Typography variant="overline" sx={{ color: COLORS.indigo, mb: 2, display: "block" }}>The Problem</Typography>
              <Typography variant="h2" sx={{ mb: 2.5, fontSize: { xs: "2rem", md: "2.5rem" } }}>
                Hiring is broken.{" "}
                <Box component="span" sx={{ color: COLORS.textLight, fontWeight: 400 }}>We're fixing it.</Box>
              </Typography>
              <Typography sx={{ color: "#5A5E72", lineHeight: 1.8, fontSize: "1rem" }}>
                Traditional interviews fail both sides — riddled with bias, inconsistency, and wasted time. The average company spends 42 days and $4,700 per hire — most of it on inefficient manual processes that could be automated.
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: 2 }}>
              {problems.map((p, i) => (
                <SoftCard key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 2, p: 2, borderRadius: 2 }}>
                  <Box sx={{
                    width: 40, height: 40, borderRadius: 1.5, flexShrink: 0,
                    bgcolor: alpha(p.color, 0.08),
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name={p.icon} size={16} color={p.color} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.9375rem", mb: 0.5 }}>{p.label}</Typography>
                    <Typography variant="body2" sx={{ color: "#5A5E72" }}>{p.desc}</Typography>
                  </Box>
                </SoftCard>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* How it Works */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 3, md: 6 } }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: COLORS.indigo, mb: 2, display: "block" }}>How It Works</Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.875rem", md: "2.5rem" } }}>
              Three steps to smarter hiring
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {/* Step 01 */}
            <Box sx={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 2 }}>
              <SoftCard sx={{
                p: 4,
                background: "linear-gradient(135deg,#0F1115 0%,#161A22 60%,#1a1d2e 100%)",
                borderColor: "transparent", color: "white",
              }}>
                <Typography sx={{
                  fontSize: 12, fontWeight: 700, color: COLORS.lavender,
                  letterSpacing: "0.1em", mb: "14px",
                }}>
                  STEP 01
                </Typography>
                <Typography variant="h4" sx={{ color: "#fff", mb: 1.5 }}>Set Up Your Interview</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, mb: 3 }}>
                  Choose your role, define required skills, and let AI generate a structured question set. Ready in 2 minutes.
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                  {["Custom Questions", "Auto-Generated", "Skill-Based", "Manual Mode"].map((t) => (
                    <Box key={t} sx={{
                      background: "rgba(91,93,246,0.22)",
                      border: "1px solid rgba(91,93,246,0.32)",
                      borderRadius: "20px", px: "12px", py: "4px",
                      fontSize: 12, fontWeight: 600, color: COLORS.lavender,
                    }}>
                      {t}
                    </Box>
                  ))}
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", mb: 1 }}>
                  Share with applicants:
                </Typography>
                <Box sx={{
                  px: 1.5, py: 1, borderRadius: 1.5,
                  bgcolor: alpha(COLORS.indigo, 0.15),
                  border: `1px solid ${alpha(COLORS.indigo, 0.3)}`,
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1,
                }}>
                  <Typography sx={{
                    color: "white", fontSize: "0.75rem", fontWeight: 600, fontFamily: "monospace",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    intervuew.ai/apply/stripe-sr-eng-001
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                    <IconButton size="small" sx={{ color: COLORS.lavender, p: 0.5 }}>
                      <ContentCopy sx={{ fontSize: 14 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: COLORS.lavender, p: 0.5 }}>
                      <OpenInNew sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </Box>
              </SoftCard>
            </Box>

            {/* Steps 02 & 03 */}
            <Box sx={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: 3 }}>
              {[
                {
                  step: "02", title: "AI Conducts the Interview",
                  desc: "The AI speaks, listens, and evaluates in real-time — structured, consistent, every candidate.",
                  icon: "brain", color: COLORS.indigo,
                },
                {
                  step: "03", title: "Get Structured Reports",
                  desc: "Receive per-question scores, strengths, weaknesses, and side-by-side candidate analytics.",
                  icon: "chart", color: COLORS.green,
                },
              ].map((step) => (
                <SoftCard key={step.step} sx={{ flex: 1, p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: "10px" }}>
                    <Typography sx={{
                      fontSize: 12, fontWeight: 700, color: COLORS.textLight, letterSpacing: "0.1em",
                    }}>
                      STEP {step.step}
                    </Typography>
                    <Box sx={{
                      width: 34, height: 34, borderRadius: "10px",
                      background: alpha(step.color, 0.1),
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon name={step.icon} size={16} color={step.color} />
                    </Box>
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>{step.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#5A5E72", lineHeight: 1.7 }}>{step.desc}</Typography>
                </SoftCard>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Feature Grid */}
      <Box sx={{ bgcolor: "#FFFFFF", py: { xs: 8, md: 12 }, borderTop: `1px solid ${alpha(COLORS.indigo, 0.07)}` }}>
        <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 3, md: 6 } }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: COLORS.indigo, mb: 2, display: "block" }}>Features</Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.875rem", md: "2.5rem" } }}>
              Everything you need, nothing you don't
            </Typography>
          </Box>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2.5,
          }}>
            {features.map((f, i) => (
              <SoftCard
                key={i}
                sx={{
                  gridColumn: f.wide ? "1 / span 2" : "auto",
                  p: 3,
                  display: "flex",
                  flexDirection: f.wide ? "row" : "column",
                  gap: f.wide ? "22px" : "12px",
                  alignItems: f.wide ? "center" : "flex-start",
                  cursor: "default",
                  transform: hoveredFeature === i ? "translateY(-4px)" : "none",
                  "&:hover": {
                    borderColor: alpha(f.color, 0.16),
                    boxShadow: `0 12px 40px ${alpha(f.color, 0.08)}`,
                  },
                }}
                onClick={() => setHoveredFeature(i === hoveredFeature ? null : i)}
              >
                <Box sx={{
                  width: 44, height: 44, borderRadius: 2, flexShrink: 0,
                  bgcolor: alpha(f.color, 0.1),
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name={f.icon} size={20} color={f.color} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, fontSize: f.wide ? 19 : 15 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#5A5E72", lineHeight: 1.7 }}>{f.desc}</Typography>
                </Box>
              </SoftCard>
            ))}
          </Box>
        </Box>
      </Box>

      {/* CTA */}
      <Box sx={{
        mx: { xs: 3, md: 6 }, mb: 8, borderRadius: "28px",
        background: "linear-gradient(135deg,#0F1115 0%,#161A22 60%,#1a1d2e 100%)",
        p: { xs: "48px 24px", md: "60px 48px" },
        position: "relative", overflow: "hidden",
      }}>
        <Box sx={{
          position: "absolute", top: -80, right: -80, width: 400, height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle,${alpha(COLORS.indigo, 0.3)} 0%,transparent 70%)`,
          pointerEvents: "none",
        }} />
        <Box sx={{ position: "relative", textAlign: "center", maxWidth: 600, mx: "auto" }}>
          <Typography variant="h2" sx={{ color: "#fff", mb: 2, fontSize: { xs: "2rem", md: "2.75rem" } }}>
            Ready to interview smarter?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.45)", mb: 5, fontSize: "1.125rem", maxWidth: 380, mx: "auto" }}>
            Join 500+ companies using Intervuew to find better talent, faster and more consistently.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <GradientButton size="lg" to="/login">
              Start free — no card needed
            </GradientButton>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              sx={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Book a Demo
            </Button>
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default Landing;