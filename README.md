# Intervuew — AI Interview & Hiring Platform

A full-stack MVP built with **React 18 + TypeScript + Vite + MUI v5**.

---

## 🚀 Quick Start

```bash
# 1. Navigate into the project
cd intervuew

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── main.tsx                     # Entry point
├── App.tsx                      # Root with ThemeProvider + BrowserRouter
├── theme/
│   └── theme.ts                 # Full MUI theme (Sora + DM Sans, brand indigo)
├── types/
│   └── index.ts                 # TypeScript types (User, Job, Candidate…)
├── hooks/
│   └── useAuth.tsx              # Auth context + useAuth hook
├── utils/
│   └── mockData.ts              # Mock data (jobs, candidates, analytics)
├── routes/
│   └── AppRouter.tsx            # All routes + protected route wrapper
├── components/
│   ├── common/
│   │   ├── SoftCard.tsx         # Reusable card with hover effects
│   │   ├── ScoreRing.tsx        # Animated SVG score circle
│   │   ├── StatusBadge.tsx      # Color-coded status chip
│   │   └── GradientButton.tsx   # Indigo→Lavender CTA button
│   └── layout/
│       ├── SidebarNav.tsx       # Left navigation for dashboards
│       └── DashboardLayout.tsx  # Wrapper (sidebar + main content)
└── pages/
    ├── public/
    │   └── LandingPage.tsx      # Marketing homepage
    ├── auth/
    │   └── AuthPage.tsx         # Sign in / Sign up with role toggle
    ├── organization/
    │   ├── OrgDashboard.tsx     # Employer main dashboard
    │   ├── JobsPage.tsx         # Job listings + management
    │   ├── CreateJobPage.tsx    # 4-step job creation wizard
    │   ├── CandidatesPage.tsx   # Candidate pipeline list
    │   └── CandidateReviewPage.tsx  # Full candidate profile + scores
    ├── prepper/
    │   ├── PrepperDashboard.tsx # Practice home with streak + stats
    │   └── PerformanceReportPage.tsx  # Post-interview report
    ├── interview/
    │   └── LiveInterviewPage.tsx  # Immersive AI interview UI
    └── candidate/
        ├── CandidateApplyPage.tsx   # Public job application flow
        └── CandidateDashboard.tsx   # Candidate status + timeline
```

---

## 🔗 All Routes

| Route | Description | Auth |
|-------|-------------|------|
| `/` | Landing page | Public |
| `/auth` | Sign in / Sign up | Public |
| `/apply` | Job application (candidate) | Public |
| `/org/dashboard` | Employer dashboard | Org only |
| `/org/jobs` | Job listings | Org only |
| `/org/jobs/new` | Create job wizard | Org only |
| `/org/candidates` | Candidate pipeline | Org only |
| `/org/candidates/:id` | Candidate profile | Org only |
| `/prepper/dashboard` | Prepper home | Prepper only |
| `/prepper/interview` | Live AI interview | Auth |
| `/prepper/reports/:id` | Performance report | Prepper only |
| `/candidate/dashboard` | Candidate status | Auth |

---

## 🎨 Design System

### Colors
- **Primary**: `#5B5DF6` (Deep Indigo)
- **Secondary**: `#9B8FFF` (Lavender)
- **Background**: `#F8F9FC`
- **Dark**: `#0F1115`

### Typography
- **Display/Headings**: Sora (loaded via Google Fonts)
- **Body**: DM Sans

### Components
- All cards: `border-radius: 24px`, soft ambient shadow
- Buttons: gradient indigo→lavender, 14px radius, hover lift
- Inputs: floating labels, soft focus glow

---

## 🧪 Demo Credentials

Log in at `/auth` with any email/password.

- **Organization role** → goes to `/org/dashboard`
- **Prepper role** → goes to `/prepper/dashboard`

---

## 🔧 Scripts

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Production build
npm run preview  # Preview production build
```

---

## 📦 Dependencies

```
react 18          react-dom 18          react-router-dom 6
@mui/material 5   @mui/icons-material   @emotion/react @emotion/styled
vite 5            typescript 5          @vitejs/plugin-react
```
# Intervuew
