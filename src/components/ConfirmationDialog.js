// ConfirmationDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You will not be able to recover this session!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined" style={{ borderRadius: '10px' }}>
          No, cancel it
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained" autoFocus style={{ borderRadius: '10px' }}>
          Yes, delete it
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
