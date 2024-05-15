// FunctionalOperation.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const FunctionalOperation = ({ onClose, onSendEmail, onSendNotifications, onDownloadData }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Functional Operations
      </Typography>
      <Button variant="contained" color="primary" onClick={onSendEmail} sx={{ mr: 2, mb: 2 }}>
        Send Email
      </Button>
      <Button variant="contained" color="primary" onClick={onSendNotifications} sx={{ mr: 2, mb: 2 }}>
        Send Notifications
      </Button>
      <Button variant="contained" color="primary" onClick={onDownloadData} sx={{ mr: 2, mb: 2 }}>
        Download Entire Data
      </Button>
      <Button variant="contained" onClick={onClose} sx={{ mb: 2 }}>
        Close
      </Button>
    </Box>
  );
};

export default FunctionalOperation;
