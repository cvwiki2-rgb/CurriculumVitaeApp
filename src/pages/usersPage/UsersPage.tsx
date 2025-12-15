import { useEffect } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client/react';
import { Box, CircularProgress } from '@mui/material';
import { mapUserToTableRow } from './constants';
import { showSnackbar } from '../../app/state/snackbar';
import { DataTable } from '../../components/organisms/dataTable';
import { extractGraphQLMessage } from '../../graphql/errors';
import { authVar } from '../../graphql/state/auth';
import { usersVar } from '../../graphql/state/users';
import { USERS } from '../../graphql/users/queries';
import type { UserTableRow } from './types';
import type { Column } from '../../components/organisms/dataTable/types';
import type { User } from 'cv-graphql';

const columns: Column<UserTableRow>[] = [
  { id: 'firstName', label: 'Имя', sortable: true, searchable: false },
  { id: 'lastName', label: 'Фамилия', sortable: true, searchable: false },
  { id: 'email', label: 'Почта', sortable: true, searchable: false },
  { id: 'department', label: 'Отдел', sortable: true, searchable: false },
  { id: 'position', label: 'Должность', sortable: true, searchable: false },
  { id: 'fullName', label: '', sortable: false, searchable: true },
];

export const UsersPage = () => {
  const { data, loading, error } = useQuery<{ users: User[] }>(USERS);
  const userId = useReactiveVar(authVar)?.user.id;

  const rows = data?.users.map(mapUserToTableRow);

  useEffect(() => {
    if (!data) return;

    if (!data.users) {
      showSnackbar('Error', 'error');
    }

    usersVar(data.users);
  }, [data]);

  useEffect(() => {
    if (!error) return;

    const msg = extractGraphQLMessage(error) || 'Error';
    showSnackbar(msg, 'error');
  }, [error]);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <DataTable<UserTableRow>
      rows={rows ?? []}
      columns={columns}
      getRowId={(row) => row.id}
      searchable
      sortable
      orderByColName="department"
      currentUserId={userId ?? undefined}
    />
  );
};
