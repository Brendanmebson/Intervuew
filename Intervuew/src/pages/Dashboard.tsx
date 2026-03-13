import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";
import { SoftCard, GradientButton, ScoreChip } from "../components/shared";
import { Icon } from "../components/Icons";
import { COLORS, RADIUS } from "../theme/theme";
import { AppliedRole } from "@/types";
import { ALL_SESSIONS } from "../data/sessions";
import Cookies from "js-cookie";
import api from "../api/api";

const Dashboard: React.FC = () => {
  const nav = useNavigate();
  const h = new Date().getHours();
  const greeting =
    h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";

  const recentSessions = ALL_SESSIONS.slice(0, 3);
  const totalSessions = ALL_SESSIONS.length;
  const avgScore = Math.round(
    ALL_SESSIONS.reduce((a, s) => a + s.score, 0) / ALL_SESSIONS.length,
  );

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(" ");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get("/User/me");
        const nameRequest = await api.get("/User");

        setUserId(response.data.id);
        setUserName(nameRequest.data.name);
        console.log("user_id cookie:", Cookies.get("user_id"));
      } catch (err) {
        nav("/login");
      }
    };
    fetchMe();
  }, []);

  const [appliedRoles, setAppliedRoles] = useState<AppliedRole[]>([]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    const getApplicantIdAndInterviews = async () => {
      try {
        console.log(userId);
        const reponse = await api.get(
          `http://localhost:8000/User/${userId}/applicant/interviews`,
        );
        console.log("applied roles: ", reponse.data);
        const data = await reponse.data;
        setAppliedRoles(data);
        console.log(data);
      } catch (err) {}
    };

    getApplicantIdAndInterviews();
  }, [userId]);

  return (
    <SidebarLayout
      userLabel={userName}
      userInitial={userName[0]}
      navItems={[
        { icon: "home", label: "Dashboard", active: true },
        { icon: "mic", label: "Start Interview", to: "/interview" },
        { icon: "clock", label: "History", to: "/history" },
        { icon: "chart", label: "Reports", to: "/reports" },
        { icon: "settings", label: "Settings", to: "/settings" },
      ]}
    >
      {/* Header */}
      <Box className="fade-up" sx={{ mb: "32px" }}>
        <Typography variant="h4" sx={{ fontSize: 25, mb: "4px" }}>
          {greeting}, {userName} ✦
        </Typography>
        <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>
          Ready to practice? Your AI interviewer is waiting.
        </Typography>
      </Box>

      {/* Top cards */}
      <Box
        className="fade-up-1"
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "14px",
          mb: "22px",
        }}
      >
        {/* Quick start */}
        <Box
          sx={{
            background: "linear-gradient(135deg,#0F1115,#1a1d2e)",
            borderRadius: RADIUS.card,
            p: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(91,93,246,0.35) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              mb: "9px",
            }}
          >
            Quick Start
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "white", mb: "9px", lineHeight: 1.25, fontSize: 21 }}
          >
            Start Your
            <br />
            Interview
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "rgba(255,255,255,0.42)",
              mb: "20px",
              lineHeight: 1.5,
            }}
          >
            or Practice with AI-powered real-time questions tailored to your
            role.
          </Typography>
        </Box>

        {/* Stats */}
        {[
          {
            label: "Total Sessions",
            val: String(totalSessions),
            sub: "+2 this week",
            color: COLORS.indigo,
          },
          {
            label: "Avg. Score",
            val: String(avgScore),
            sub: "↑ Improving",
            color: COLORS.green,
          },
        ].map((c) => (
          <SoftCard key={c.label} sx={{ p: "26px 22px" }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                color: COLORS.textMuted,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                mb: "11px",
              }}
            >
              {c.label}
            </Typography>
            <Typography
              sx={{
                fontSize: 38,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: c.color,
                mb: "5px",
                lineHeight: 1,
              }}
            >
              {c.val}
            </Typography>
            <Typography
              sx={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500 }}
            >
              {c.sub}
            </Typography>
          </SoftCard>
        ))}
      </Box>

      {appliedRoles.map((role, index) => (
        <SoftCard
          key={index}
          sx={{
            p: "20px 22px",
            cursor: "pointer",
            maxWidth: { xs: "100%", sm: 360, md: 400 },
          }}
          onClick={async () => {
            try {
              await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
              });
              nav(`/interview/${role.applicant_id}/${role.interview.id}`);
            } catch (err) {
              const error = err as DOMException;
              if (error.name === "NotAllowedError") {
                alert(
                  "Microphone access was denied. Please allow it in your browser settings.",
                );
              } else if (error.name === "NotFoundError") {
                alert("No microphone found on this device.");
              } else {
                alert("Could not access microphone.");
              }
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: "12px",
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "11px",
                background: alpha(COLORS.indigo, 0.08),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="briefcase" size={15} color={COLORS.indigo} />
            </Box>
          </Box>

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: "-0.01em",
              mb: "4px",
            }}
          >
            {role.interview.role}
          </Typography>

          <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>
            {formatDate(role.interview.start_date)} to{" "}
            {formatDate(role.interview.end_date)}
          </Typography>
        </SoftCard>
      ))}

      {/* Recent sessions */}
      <Box className="fade-up-2">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "14px",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 16 }}>
            Recent Sessions
          </Typography>
          <Typography
            onClick={() => nav("/history")}
            sx={{
              fontSize: 13,
              color: COLORS.indigo,
              cursor: "pointer",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            View all →
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "13px",
          }}
        >
          {recentSessions.map((s) => (
            <SoftCard
              key={s.id}
              sx={{ p: "20px 22px", cursor: "pointer" }}
              onClick={() => nav(`/report/${s.id}`)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: "12px",
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "11px",
                    background: alpha(COLORS.indigo, 0.08),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="briefcase" size={15} color={COLORS.indigo} />
                </Box>
                <ScoreChip score={s.score} />
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: "-0.01em",
                  mb: "4px",
                }}
              >
                {s.role}
              </Typography>
              <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>
                {s.date} · {s.duration} · {s.mode}
              </Typography>
            </SoftCard>
          ))}
        </Box>
      </Box>
    </SidebarLayout>
  );
};

export default Dashboard;
