import { useReactiveVar } from '@apollo/client/react';
import { Snackbar, Alert } from '@mui/material';
import { snackbarVar, hideSnackbar } from '../../../app/state/snackbar';

export const AppSnackbar = () => {
  const { open, message, severity } = useReactiveVar(snackbarVar);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={severity}
        variant="filled"
        icon={false}
        sx={
          severity === 'info'
            ? {
                color: (theme) => theme.palette.background.default,
                backgroundColor: (theme) => theme.palette.text.primary,
              }
            : {}
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
