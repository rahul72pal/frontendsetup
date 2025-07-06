import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 3,
        p: 3,
      }}
    >
      <Typography variant="h2" color="error" fontWeight={700}>
        404
      </Typography>
      <Typography variant="h5" fontWeight={500}>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you are looking for doesn't exist or has been moved.
      </Typography>

      <Button variant="contained" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
