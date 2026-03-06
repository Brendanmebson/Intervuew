import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';

import Nav          from './components/Nav';
import Footer       from './components/Footer';
import Landing      from './pages/Landing';
import Login        from './pages/Login';
import PrepperDash  from './pages/PrepperDash';
import Interview    from './pages/Interview';
import Report       from './pages/Report';           // now reads :id from URL
import Reports      from './pages/Reports';          // new aggregate reports page
import History      from './pages/History';          // new history page
import Settings     from './pages/Settings';         // new settings page
import OrgDash      from './pages/OrgDash';
import Features     from './pages/Features';
import ForTeams     from './pages/ForTeams';
import Pricing      from './pages/Pricing';
import Demo         from './pages/Demo';
import Privacy      from './pages/Privacy';
import Terms        from './pages/Terms';
import Contact      from './pages/Contact';
import NotFound     from './pages/NotFound';

// Pages where Nav/Footer are hidden (app shell pages)
const BARE_ROUTES = ['/interview', '/dashboard', '/org', '/report', '/reports', '/history', '/settings'];

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const AppShell: React.FC = () => {
  const { pathname } = useLocation();
  const isBare  = BARE_ROUTES.some(r => pathname.startsWith(r));
  const isLogin = pathname === '/login';

  return (
    <>
      <ScrollToTop />
      {!isBare && !isLogin && <Nav />}
      <Routes>
        {/* Marketing */}
        <Route path="/"          element={<Landing />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/features"  element={<Features />} />
        <Route path="/for-teams" element={<ForTeams />} />
        <Route path="/pricing"   element={<Pricing />} />
        <Route path="/demo"      element={<Demo />} />
        <Route path="/privacy"   element={<Privacy />} />
        <Route path="/terms"     element={<Terms />} />
        <Route path="/contact"   element={<Contact />} />

        {/* App — prepper */}
        <Route path="/dashboard"   element={<PrepperDash />} />
        <Route path="/interview"   element={<Interview />} />
        <Route path="/report/:id"  element={<Report />} />    {/* individual session report */}
        <Route path="/reports"     element={<Reports />} />   {/* aggregate analytics */}
        <Route path="/history"     element={<History />} />
        <Route path="/settings"    element={<Settings />} />

        {/* App — org */}
        <Route path="/org"         element={<OrgDash />} />

        <Route path="*"            element={<NotFound />} />
      </Routes>
      {!isBare && !isLogin && <Footer />}
    </>
  );
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;