import { makeVar } from '@apollo/client';

export type SnackbarState = {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
};

export const snackbarVar = makeVar<SnackbarState>({
  open: false,
  message: '',
  severity: 'info',
});

export function showSnackbar(
  message: string,
  severity: SnackbarState['severity'] = 'info',
) {
  snackbarVar({
    open: true,
    message,
    severity,
  });
}

export function hideSnackbar() {
  snackbarVar({
    ...snackbarVar(),
    open: false,
  });
}
