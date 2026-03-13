import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";
import { SoftCard, GradientButton } from "../components/shared";
import { Icon } from "../components/Icons";
import { COLORS } from "../theme/theme";
import { JOB_ROLES, JobRole } from "../data/orgData";
import Cookies from "js-cookie";
type StatusFilter = "All" | "Active" | "Closed";

const statusColor = (s: JobRole["status"]) =>
  s === "Active" ? COLORS.green : COLORS.textLight;

const OrgJobRoles: React.FC = () => {
  const nav = useNavigate();
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [search, setSearch] = useState("");

  const orgId = Cookies.get("org_id");
  const filtered = JOB_ROLES.filter(
    (r) => filter === "All" || r.status === filter,
  ).filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.dept.toLowerCase().includes(search.toLowerCase()),
  );

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
      <Box
        className="fade-up"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: "28px",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontSize: 25, mb: "4px" }}>
            Job Roles
          </Typography>
          <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>
            {JOB_ROLES.length} roles total ·{" "}
            {JOB_ROLES.filter((r) => r.status === "Active").length} active
          </Typography>
        </Box>
        <GradientButton size="md" onClick={() => nav(`/org/interview/new`)}>
          + Create Role
        </GradientButton>
      </Box>

      {/* Stats row */}
      <Box
        className="fade-up-1"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "13px",
          mb: "22px",
        }}
      >
        {[
          {
            label: "Active",
            val: JOB_ROLES.filter((r) => r.status === "Active").length,
            color: COLORS.green,
          },
          {
            label: "Closed",
            val: JOB_ROLES.filter((r) => r.status === "Closed").length,
            color: COLORS.textMuted,
          },
        ].map((s) => (
          <SoftCard
            key={s.label}
            sx={{
              p: "18px 22px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: s.color,
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.textMuted,
                flex: 1,
              }}
            >
              {s.label}
            </Typography>
            <Typography sx={{ fontSize: 26, fontWeight: 700, color: s.color }}>
              {s.val}
            </Typography>
          </SoftCard>
        ))}
      </Box>

      {/* Filters */}
      <Box
        className="fade-up-2"
        sx={{ display: "flex", gap: "12px", mb: "18px", flexWrap: "wrap" }}
      >
        <Box sx={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            <Icon name="search" size={14} color={COLORS.textLight} />
          </Box>
          <Box
            component="input"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder="Search roles..."
            sx={{
              width: "100%",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "12px",
              padding: "10px 14px 10px 36px",
              fontSize: 14,
              fontFamily: "'DM Sans',sans-serif",
              background: COLORS.white,
              color: COLORS.text,
              outline: "none",
              "&:focus": { borderColor: COLORS.indigo },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            background: COLORS.white,
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          {(["All", "Active", "Closed"] as StatusFilter[]).map((f) => (
            <Box
              key={f}
              onClick={() => setFilter(f)}
              sx={{
                px: "16px",
                py: "10px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                background:
                  filter === f ? alpha(COLORS.indigo, 0.1) : "transparent",
                color: filter === f ? COLORS.indigo : COLORS.textMuted,
                transition: "all 0.15s",
              }}
            >
              {f}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Roles grid */}
      <Box
        className="fade-up-3"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "14px",
        }}
      >
        {filtered.map((r) => (
          <SoftCard
            key={r.id}
            sx={{ p: "24px 26px", cursor: "pointer" }}
            onClick={() => nav(`/org/interview_detail/${r.id}`)}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: "14px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "13px",
                    background: alpha(COLORS.indigo, 0.08),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="briefcase" size={18} color={COLORS.indigo} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 15, mb: "2px" }}>
                    {r.title}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>
                    {r.dept} · {r.location}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  background: alpha(statusColor(r.status), 0.1),
                  color: statusColor(r.status),
                  borderRadius: "20px",
                  px: "10px",
                  py: "3px",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {r.status}
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: 13,
                color: COLORS.textMuted,
                lineHeight: 1.6,
                mb: "16px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {r.description}
            </Typography>

            {/* Skills */}
            <Box
              sx={{ display: "flex", gap: "6px", flexWrap: "wrap", mb: "16px" }}
            >
              {r.skills.slice(0, 3).map((s) => (
                <Box
                  key={s}
                  sx={{
                    background: alpha(COLORS.indigo, 0.07),
                    color: COLORS.indigo,
                    borderRadius: "20px",
                    px: "10px",
                    py: "3px",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {s}
                </Box>
              ))}
              {r.skills.length > 3 && (
                <Box
                  sx={{
                    background: "rgba(0,0,0,0.05)",
                    color: COLORS.textMuted,
                    borderRadius: "20px",
                    px: "10px",
                    py: "3px",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  +{r.skills.length - 3}
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: "14px",
                borderTop: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    mb: "2px",
                  }}
                >
                  Candidates
                </Typography>
                <Typography
                  sx={{ fontSize: 20, fontWeight: 700, color: COLORS.indigo }}
                >
                  {r.candidates}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    mb: "2px",
                  }}
                >
                  Avg Score
                </Typography>
                <Typography
                  sx={{ fontSize: 20, fontWeight: 700, color: COLORS.green }}
                >
                  {r.avgScore}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    mb: "2px",
                  }}
                >
                  Opened
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.text,
                    mt: "4px",
                  }}
                >
                  {r.openedDate}
                </Typography>
              </Box>
            </Box>
          </SoftCard>
        ))}

        {/* Create new role card */}
        <SoftCard
          sx={{
            p: "24px 26px",
            cursor: "pointer",
            border: "2px dashed rgba(91,93,246,0.2)",
            background: alpha(COLORS.indigo, 0.02),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            minHeight: 200,
          }}
          onClick={() => nav(`/org/interview/new`)}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "14px",
              background: alpha(COLORS.indigo, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="plus" size={22} color={COLORS.indigo} />
          </Box>
          <Typography
            sx={{ fontSize: 15, fontWeight: 600, color: COLORS.indigo }}
          >
            Create New Role
          </Typography>
          <Typography
            sx={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center" }}
          >
            Set up a role and start receiving AI-screened candidates
          </Typography>
        </SoftCard>
      </Box>
    </SidebarLayout>
  );
};

export default OrgJobRoles;
