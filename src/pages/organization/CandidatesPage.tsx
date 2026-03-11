import React, { useState } from 'react';
import {
  Box, Typography, alpha, LinearProgress, Avatar,
  TextField, InputAdornment, MenuItem, Select, FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/layout/SidebarNav';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SoftCard from '../../components/common/SoftCard';
import StatusBadge from '../../components/common/StatusBadge';
import ScoreRing from '../../components/common/ScoreRing';
import { mockCandidates } from '../../utils/mockData';
import {
  Dashboard, Work, People, Analytics, Settings, HelpOutline, Search,
} from '@mui/icons-material';

const navItems = [
  { label: 'Dashboard', icon: <Dashboard sx={{ fontSize: 18 }} />, path: '/org/dashboard' },
  { label: 'Jobs', icon: <Work sx={{ fontSize: 18 }} />, path: '/org/jobs' },
  { label: 'Candidates', icon: <People sx={{ fontSize: 18 }} />, path: '/org/candidates' },
  { label: 'Analytics', icon: <Analytics sx={{ fontSize: 18 }} />, path: '/org/analytics' },
];
const bottomItems = [
  { label: 'Settings', icon: <Settings sx={{ fontSize: 18 }} />, path: '/org/settings' },
  { label: 'Help', icon: <HelpOutline sx={{ fontSize: 18 }} />, path: '/org/help' },
];

const CandidatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockCandidates.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.jobTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sidebar = <SidebarNav items={navItems} bottomItems={bottomItems} />;

  return (
    <DashboardLayout sidebar={sidebar}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="overline" sx={{ color: '#8B8FA8', display: 'block', mb: 0.5 }}>PIPELINE</Typography>
        <Typography variant="h3" sx={{ fontSize: '2rem' }}>Candidates</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search candidates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, maxWidth: 360 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ color: '#B0B3C6', fontSize: 18 }} /></InputAdornment>,
          }}
        />
        <FormControl sx={{ minWidth: 160 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            sx={{ borderRadius: 3, fontSize: '0.875rem', '& .MuiOutlinedInput-notchedOutline': { borderColor: alpha('#5B5DF6', 0.15) } }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="screening">Screening</MenuItem>
            <MenuItem value="interviewing">Interviewing</MenuItem>
            <MenuItem value="reviewed">Reviewed</MenuItem>
            <MenuItem value="hired">Hired</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filtered.map((c) => (
          <SoftCard
            key={c.id}
            hover
            sx={{ p: 3, cursor: 'pointer' }}
            onClick={() => navigate(`/org/candidates/${c.id}`)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Avatar sx={{ width: 48, height: 48, fontSize: '1rem', flexShrink: 0 }}>{c.name[0]}</Avatar>
              <Box sx={{ flex: '1 1 180px' }}>
                <Typography sx={{ fontWeight: 700, mb: 0.25 }}>{c.name}</Typography>
                <Typography variant="caption" sx={{ color: '#8B8FA8' }}>{c.email}</Typography>
                <Box sx={{ mt: 0.75 }}>
                  <StatusBadge status={c.status} />
                </Box>
              </Box>
              <Box sx={{ flex: '1 1 140px' }}>
                <Typography variant="caption" sx={{ color: '#8B8FA8', display: 'block', mb: 0.5 }}>Role</Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>{c.jobTitle}</Typography>
              </Box>
              <Box sx={{ flex: '1 1 160px' }}>
                <Typography variant="caption" sx={{ color: '#8B8FA8', display: 'block', mb: 1 }}>CV Score</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LinearProgress variant="determinate" value={c.cvScore} sx={{ flex: 1, height: 5 }} />
                  <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F1115' }}>{c.cvScore}</Typography>
                </Box>
              </Box>
              <Box sx={{ flex: '1 1 160px' }}>
                <Typography variant="caption" sx={{ color: '#8B8FA8', display: 'block', mb: 1 }}>Interview Score</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LinearProgress variant="determinate" value={c.interviewScore} sx={{ flex: 1, height: 5 }} />
                  <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F1115' }}>{c.interviewScore}</Typography>
                </Box>
              </Box>
              <Box sx={{ flex: '0 0 110px' }}>
                <ScoreRing score={Math.round((c.cvScore + c.interviewScore) / 2)} size={70} />
              </Box>
            </Box>
          </SoftCard>
        ))}
      </Box>
    </DashboardLayout>
  );
};

export default CandidatesPage;
