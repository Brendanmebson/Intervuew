import React, { useState } from "react";
import { Box, Typography, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LogoSVG } from "../components/Icons";
import { SoftCard, GradientButton, OrbBackground } from "../components/shared";
import { COLORS, RADIUS } from "../theme/theme";
import { UserRole } from "../types";
import api from "../api/api";

const Login: React.FC = () => {
  const nav = useNavigate();
  const [role, setRole] = useState<UserRole>("applicant");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      background: "#FAFAFA",
      borderRadius: RADIUS.input,
      fontSize: 14,
    },
    "& .MuiInputLabel-root": {
      fontSize: 14,
      fontFamily: "'DM Sans',sans-serif",
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignup) {
        await createAccount(formData, role);
      } else {
        await handleLogin(formData, role);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: typeof formData, type: typeof role) => {
    const loginData = { email: data.email, password: data.password };
    try {
      if (type === "applicant") {
        await api.post("/User/login/", loginData);
        nav("/dashboard");
      } else {
        await api.post("/Organization/login/", loginData);
        nav("/org");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid email or password");
    }
  };

  const createAccount = async (data: typeof formData, type: typeof role) => {
    try {
      if (type === "applicant") {
        await api.post("/User/create", data);
        nav("/dashboard");
      } else {
        await api.post("/Organization/create", data);
        nav("/org");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Could not create account");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        className="dot-grid"
        sx={{ position: "absolute", inset: 0, opacity: 0.5 }}
      />
      <OrbBackground />
      <SoftCard
        className="fade-up"
        sx={{ width: 416, p: "44px 42px", position: "relative" }}
      >
        <Box sx={{ textAlign: "center", mb: "34px" }}>
          <Box
            onClick={() => nav("/")}
            sx={{ cursor: "pointer", display: "inline-block" }}
          >
            <LogoSVG size={40} />
          </Box>
          <Typography variant="h5" sx={{ mt: "13px", mb: "6px", fontSize: 23 }}>
            {isSignup ? "Create your account" : "Welcome back"}
          </Typography>
          <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>
            {isSignup
              ? "Start your free interview journey"
              : "Sign in to continue"}
          </Typography>
        </Box>

        {/* Role Toggle */}
        <Box
          sx={{
            display: "flex",
            background: "#F3F4F6",
            borderRadius: "14px",
            p: "4px",
            mb: "26px",
          }}
        >
          {(
            [
              ["applicant", "Applicant"],
              ["org", "Organization"],
            ] as [UserRole, string][]
          ).map(([v, l]) => (
            <Box
              key={v}
              component="button"
              onClick={() => setRole(v)}
              sx={{
                flex: 1,
                py: "9px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                borderRadius: "11px",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.2s",
                background: role === v ? "white" : "transparent",
                color: role === v ? COLORS.indigo : COLORS.textMuted,
                boxShadow: role === v ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {l}
            </Box>
          ))}
        </Box>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, borderRadius: RADIUS.input, fontSize: 13 }}
          >
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: "13px" }}
        >
          {isSignup && (
            <TextField
              label={role === "org" ? "Company Name" : "Full Name"}
              fullWidth
              size="small"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={inputSx}
            />
          )}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={inputSx}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={inputSx}
          />
          <button type="submit" style={{ all: "unset", width: "100%" }}>
            <GradientButton fullWidth size="md" sx={{ mt: "4px", py: "13px" }}>
              {loading
                ? "Please wait..."
                : isSignup
                  ? "Create Account →"
                  : "Sign In →"}
            </GradientButton>
          </button>
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: 13,
            color: COLORS.textMuted,
            mt: "20px",
          }}
        >
          {isSignup ? "Already have an account?" : "New to Intervuew?"}{" "}
          <Box
            component="span"
            onClick={() => setIsSignup(!isSignup)}
            sx={{ color: COLORS.indigo, cursor: "pointer", fontWeight: 600 }}
          >
            {isSignup ? "Sign in" : "Create account"}
          </Box>
        </Typography>
      </SoftCard>
    </Box>
  );
};

export default Login;
