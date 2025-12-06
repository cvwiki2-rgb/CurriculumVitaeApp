import type { FormEventHandler, ReactNode } from 'react';
import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';

interface BaseDialogProps {
  open: boolean;
  onClose?: (event: object, reason: 'backdropClick' | 'escapeKeyDown') => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  children: ReactNode;
}
export const BaseDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  children,
}: BaseDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            '--Paper-overlay': 'none !important',
            backgroundColor: (theme) => theme.palette.background.default,
          },
        },
      }}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {title}
          <IconButton onClick={(e) => onClose?.(e, 'escapeKeyDown')}>
            <Close />
          </IconButton>
        </DialogTitle>
        {children}
      </form>
    </Dialog>
  );
};
