import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";
import {
  SoftCard,
  GradientButton,
  ScoreRing,
  CategoryBar,
  ScoreChip,
} from "../components/shared";
import { Icon } from "../components/Icons";
import { COLORS } from "../theme/theme";
import { CANDIDATES, STATUS_COLORS, CandidateStatus } from "../data/orgData";
import Cookies from "js-cookie";
const OrgCandidateDetail: React.FC = () => {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [anim, setAnim] = useState(false);
  const [status, setStatus] = useState<CandidateStatus>("Pending");
  const [note, setNote] = useState("");
  const orgId = Cookies.get("org_id");
  const candidate = CANDIDATES.find((c) => c.id === id) ?? CANDIDATES[0];

  useEffect(() => {
    setAnim(false);
    setStatus(candidate.status);
    setNote(candidate.notes);
    const t = setTimeout(() => setAnim(true), 300);
    return () => clearTimeout(t);
  }, [id]);

  const statusOptions: CandidateStatus[] = [
    "Recommended",
    "Review",
    "Pending",
    "Declined",
  ];

  return (
    <SidebarLayout
      userLabel="Acme Corp"
      userInitial="A"
      navItems={[
        { icon: "home", label: "Overview", active: true, to: `/org` },
        {
          icon: "briefcase",
          label: "Job Roles",
          to: `/org/interview`,
        },
        { icon: "users", label: "Candidates", to: `/org/applicants` },
        { icon: "chart", label: "Analytics", to: `/org/analytics` },
      ]}
    >
      {/* Header */}
      <Box className="fade-up" sx={{ mb: "28px" }}>
        <Box
          component="button"
          onClick={() => nav("/org/candidates")}
          sx={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: COLORS.textMuted,
            fontFamily: "'DM Sans',sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            mb: "14px",
            p: 0,
            "&:hover": { color: COLORS.text },
          }}
        >
          ← Back to Candidates
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
                color: "white",
              }}
            >
              {candidate.name[0]}
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontSize: 24, mb: "4px" }}>
                {candidate.name}
              </Typography>
              <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>
                {candidate.role} · {candidate.location} · {candidate.experience}{" "}
                experience
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <GradientButton
              size="sm"
              variant="ghost"
              onClick={() => window.open(`mailto:${candidate.email}`)}
            >
              Email Candidate
            </GradientButton>
            <GradientButton size="sm" onClick={() => nav("/interview")}>
              Re-interview
            </GradientButton>
          </Box>
        </Box>
      </Box>

      {/* Contact + Status bar */}
      <SoftCard
        className="fade-up-1"
        sx={{
          p: "20px 26px",
          mb: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <Box sx={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { icon: "mail", val: candidate.email },
            { icon: "phone", val: candidate.phone },
            { icon: "calendar", val: `Interviewed ${candidate.date}` },
          ].map((item) => (
            <Box
              key={item.val}
              sx={{ display: "flex", alignItems: "center", gap: "7px" }}
            >
              <Icon name={item.icon} size={14} color={COLORS.textMuted} />
              <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>
                {item.val}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Status changer */}
        <Box sx={{ display: "flex", gap: "6px" }}>
          {statusOptions.map((s) => (
            <Box
              key={s}
              onClick={() => setStatus(s)}
              sx={{
                px: "12px",
                py: "5px",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                transition: "all 0.15s",
                background:
                  status === s ? alpha(STATUS_COLORS[s], 0.15) : "transparent",
                color: status === s ? STATUS_COLORS[s] : COLORS.textMuted,
                border: `1px solid ${status === s ? alpha(STATUS_COLORS[s], 0.3) : "rgba(0,0,0,0.08)"}`,
              }}
            >
              {s}
            </Box>
          ))}
        </Box>
      </SoftCard>

      {/* Score + Breakdown */}
      <Box
        className="fade-up-2"
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "18px",
          mb: "18px",
        }}
      >
        <SoftCard
          sx={{
            p: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 200,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              color: COLORS.textMuted,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              mb: "16px",
            }}
          >
            Overall Score
          </Typography>
          <ScoreRing score={candidate.score} animated={anim} />
          <Box
            sx={{
              mt: "12px",
              borderRadius: "20px",
              px: "14px",
              py: "5px",
              fontSize: 13,
              fontWeight: 700,
              background: alpha(STATUS_COLORS[candidate.status], 0.1),
              color: STATUS_COLORS[candidate.status],
            }}
          >
            {candidate.status}
          </Box>
        </SoftCard>
        <SoftCard sx={{ p: "28px 32px" }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: "20px" }}>
            Skill Breakdown
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {candidate.breakdown.map((b, i) => (
              <CategoryBar
                key={i}
                label={b.label}
                score={b.score}
                color={b.color}
                animated={anim}
                delay={i * 0.1}
              />
            ))}
          </Box>
        </SoftCard>
      </Box>

      {/* Per question + Notes */}
      <Box
        className="fade-up-3"
        sx={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "18px" }}
      >
        <SoftCard sx={{ p: "26px 30px" }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: "18px" }}>
            Interview Responses
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {candidate.questions.map((q, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  p: "14px",
                  borderRadius: "13px",
                  background: alpha(COLORS.indigo, 0.03),
                  border: `1px solid ${alpha(COLORS.indigo, 0.06)}`,
                }}
              >
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: "8px",
                    background: alpha(COLORS.indigo, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: COLORS.indigo,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, mb: "3px" }}>
                    {q.q}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: COLORS.textMuted,
                      lineHeight: 1.5,
                    }}
                  >
                    {q.feedback}
                  </Typography>
                </Box>
                <ScoreChip score={q.score} />
              </Box>
            ))}
          </Box>
        </SoftCard>

        {/* Notes + actions */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <SoftCard sx={{ p: "24px 26px" }}>
            <Typography variant="h6" sx={{ fontSize: 14, mb: "12px" }}>
              Recruiter Notes
            </Typography>
            <Box
              component="textarea"
              value={note}
              onChange={(e: any) => setNote(e.target.value)}
              rows={5}
              sx={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "12px",
                padding: "10px 14px",
                fontSize: 13,
                fontFamily: "'DM Sans',sans-serif",
                background: COLORS.bg,
                color: COLORS.text,
                outline: "none",
                resize: "none",
                lineHeight: 1.6,
                "&:focus": {
                  borderColor: COLORS.indigo,
                  background: COLORS.white,
                },
              }}
            />
            <Box sx={{ mt: "10px" }}>
              <GradientButton size="sm" fullWidth onClick={() => {}}>
                Save Note
              </GradientButton>
            </Box>
          </SoftCard>

          <SoftCard sx={{ p: "22px 24px" }}>
            <Typography variant="h6" sx={{ fontSize: 14, mb: "14px" }}>
              Actions
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <GradientButton
                fullWidth
                size="sm"
                onClick={() => setStatus("Recommended")}
                variant="success"
              >
                ✓ Mark as Recommended
              </GradientButton>
              <GradientButton
                fullWidth
                size="sm"
                variant="ghost"
                onClick={() =>
                  nav(
                    `/org/roles/${CANDIDATES.find((c) => c.id === id)?.roleId}`,
                  )
                }
              >
                View Job Role
              </GradientButton>
              <GradientButton
                fullWidth
                size="sm"
                variant="ghost"
                onClick={() => nav("/interview")}
              >
                Schedule Re-interview
              </GradientButton>
              <GradientButton
                fullWidth
                size="sm"
                variant="danger"
                onClick={() => setStatus("Declined")}
              >
                Decline Candidate
              </GradientButton>
            </Box>
          </SoftCard>
        </Box>
      </Box>
    </SidebarLayout>
  );
};

export default OrgCandidateDetail;
