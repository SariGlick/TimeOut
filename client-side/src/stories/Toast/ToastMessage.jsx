import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/material';
import './ToastMessage.scss';
const ToastMessage = ({ message, type, onClose }) => {
  return (
    <Snackbar open autoHideDuration={1000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} className={`alert-${type}`}>
        {message}
      </Alert>
    </Snackbar>
  );
};
ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'success', 'warning', 'info']).isRequired,
  onClose: PropTypes.func,
};
export default ToastMessage;
