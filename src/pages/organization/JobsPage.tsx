import React, { useState } from 'react';
import {
  Box, Typography, TextField, alpha,
  Chip, Button, LinearProgress, InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/layout/SidebarNav';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SoftCard from '../../components/common/SoftCard';
import StatusBadge from '../../components/common/StatusBadge';
import GradientButton from '../../components/common/GradientButton';
import { useJobs } from '../../context/JobsContext';
import {
  Dashboard, Work, People, Analytics, Settings, HelpOutline,
  Add, Search, FilterList, Link, ContentCopy,
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

const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const [search, setSearch] = useState('');

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  const sidebar = <SidebarNav items={navItems} bottomItems={bottomItems} />;

  return (
    <DashboardLayout sidebar={sidebar}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#8B8FA8', display: 'block', mb: 0.5 }}>MANAGE</Typography>
          <Typography variant="h3" sx={{ fontSize: '2rem' }}>Job Postings</Typography>
        </Box>
        <GradientButton startIcon={<Add />} onClick={() => navigate('/org/jobs/new')}>
          Create Job
        </GradientButton>
      </Box>

      {/* Search bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, maxWidth: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#B0B3C6', fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" startIcon={<FilterList />} sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5A5E72' }}>
          Filter
        </Button>
      </Box>

      {/* Empty state */}
      {filtered.length === 0 && (
        <SoftCard sx={{ p: 6, textAlign: 'center' }}>
          <Work sx={{ fontSize: 40, color: '#B0B3C6', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#5A5E72', mb: 1 }}>No jobs found</Typography>
          <Typography variant="body2" sx={{ color: '#8B8FA8', mb: 3 }}>
            {search ? 'Try a different search term.' : 'Create your first job posting to get started.'}
          </Typography>
          {!search && (
            <GradientButton startIcon={<Add />} onClick={() => navigate('/org/jobs/new')}>
              Create Job
            </GradientButton>
          )}
        </SoftCard>
      )}

      {/* Job cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {filtered.map((job) => (
          <SoftCard key={job.id} hover sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="h5" sx={{ fontSize: '1.125rem' }}>{job.title}</Typography>
                  <StatusBadge status={job.status} />
                </Box>
                <Typography variant="body2" sx={{ color: '#8B8FA8', mb: 2 }}>
                  {job.location} · {job.salary} · Created {job.createdAt}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {job.qualifications.slice(0, 3).map((q) => (
                    <Chip key={q} label={q} size="small" sx={{ bgcolor: alpha('#5B5DF6', 0.07), color: '#5B5DF6', fontSize: '0.7rem', fontWeight: 600, height: 22 }} />
                  ))}
                  {job.qualifications.length > 3 && (
                    <Chip label={`+${job.qualifications.length - 3}`} size="small" sx={{ bgcolor: alpha('#8B8FA8', 0.1), color: '#8B8FA8', fontSize: '0.7rem', height: 22 }} />
                  )}
                  {job.qualifications.length === 0 && (
                    <Typography variant="caption" sx={{ color: '#B0B3C6' }}>No qualifications added</Typography>
                  )}
                </Box>
                {/* Application link */}
                <Box sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 1,
                  px: 2, py: 0.75, borderRadius: 99,
                  bgcolor: alpha('#5B5DF6', 0.06), border: `1px solid ${alpha('#5B5DF6', 0.12)}`,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: alpha('#5B5DF6', 0.1) },
                }}
                  onClick={() => navigator.clipboard.writeText(`https://intervuew.io${job.applicationLink}`).catch(() => {})}
                >
                  <Link sx={{ fontSize: 14, color: '#5B5DF6' }} />
                  <Typography sx={{ fontSize: '0.75rem', color: '#5B5DF6', fontWeight: 500, fontFamily: 'monospace' }}>
                    intervuew.io{job.applicationLink}
                  </Typography>
                  <ContentCopy sx={{ fontSize: 12, color: '#9B8FFF' }} />
                </Box>
              </Box>

              {/* Stats column */}
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Sora", sans-serif', color: '#5B5DF6', lineHeight: 1 }}>
                    {job.applicants}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Applicants</Typography>
                  <LinearProgress variant="determinate" value={Math.min((job.applicants / 60) * 100, 100)} sx={{ mt: 1, width: 64, height: 3 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    variant="outlined" size="small"
                    onClick={() => navigate(`/org/jobs/${job.id}`)}
                    sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6', fontSize: '0.8125rem' }}
                  >
                    View Job
                  </Button>
                  <Button size="small" onClick={() => navigate('/org/candidates')} sx={{ color: '#8B8FA8', fontSize: '0.8125rem' }}>
                    Candidates
                  </Button>
                </Box>
              </Box>
            </Box>
          </SoftCard>
        ))}
      </Box>
    </DashboardLayout>
  );
};

export default JobsPage;