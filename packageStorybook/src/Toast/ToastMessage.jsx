import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/material';
import './ToastMessage.scss'; 

const ToastMessage = ({ open, type, message, onClose = () => {} }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} className={`alert-${type}`}>
        {message}
      </Alert>
    </Snackbar>
  );
};

ToastMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['error', 'success', 'warning', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default ToastMessage;
