import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import { showSnackbar } from '../../app/state/snackbar';
import { GET_USERS_QUERY } from '../../graphql/users/queries';
import type { User } from 'cv-graphql';

export const UsersPage = () => {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<{ users: User[] }>(
    GET_USERS_QUERY,
    { fetchPolicy: 'no-cache' },
  );

  useEffect(() => {
    if (!error) return;
    showSnackbar(
      t('errors.failedToLoadUsers') || 'Failed to load users',
      'error',
    );
  }, [error, t]);

  const users = data?.users ?? [];

  return (
    <Box p={3}>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">{t('users.title') || 'Employees'}</Typography>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ opacity: 0.6 }}>
                <TableCell>
                  {t('users.table.firstName') || 'First Name'}
                </TableCell>
                <TableCell>
                  {t('users.table.lastName') || 'Last Name'}
                </TableCell>
                <TableCell>{t('users.table.email') || 'Email'}</TableCell>
                <TableCell>
                  {t('users.table.department') || 'Department'}
                </TableCell>
                <TableCell>{t('users.table.position') || 'Position'}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => {
                const full = u.profile?.full_name ?? '';
                const [firstName = '', lastName = ''] = full.split(' ');
                const avatarUrl = u.profile?.avatar ?? '';

                return (
                  <TableRow
                    key={u.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#fafafa',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar src={avatarUrl}>{firstName?.[0] || 'U'}</Avatar>
                        {firstName}
                      </Box>
                    </TableCell>
                    <TableCell>{lastName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      {u.department_name || u.department?.name || '-'}
                    </TableCell>
                    <TableCell>
                      {u.position_name || u.position?.name || '-'}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
