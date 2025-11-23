import { useReactiveVar } from '@apollo/client/react';
import { Snackbar, Alert } from '@mui/material';
import { snackbarVar, hideSnackbar } from '../../../app/state/snackbar';

export const AppSnackbar = () => {
  const { open, message, severity } = useReactiveVar(snackbarVar);

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={severity} variant="filled" icon={false}>
        {message}
      </Alert>
    </Snackbar>
  );
};
