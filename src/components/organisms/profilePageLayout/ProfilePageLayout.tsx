import { useState } from 'react';
import { Close, FileUploadOutlined } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { StyledButton } from '../../atoms/styledButton';
import { StyledInput } from '../../atoms/styledInput';
import { SelectInput } from '../../molecules/selectInput';
import type { Department, Position, User } from 'cv-graphql';

export interface ProfilePageLayoutProps {
  departments: Department[];
  positions: Position[];
  user: User | undefined;
  readOnly?: boolean;
  onConfirm: (
    firstName: string,
    lastName: string,
    department: string,
    position: string,
  ) => void;
  onAvatarUpload: (avatar: File) => void;
  onAvatarDelete: () => void;
}

export const ProfilePageLayout = ({
  departments,
  positions,
  user,
  readOnly,
  onConfirm,
  onAvatarUpload,
  onAvatarDelete,
}: ProfilePageLayoutProps) => {
  const [firstName, setFirstName] = useState<string>(
    user?.profile.first_name ?? '',
  );
  const [lastName, setLastName] = useState<string>(
    user?.profile.last_name ?? '',
  );
  const [department, setDepartment] = useState<string>(
    user?.department?.id ?? '',
  );
  const [position, setPosition] = useState<string>(user?.position?.id ?? '');

  if (!user) {
    return null;
  }

  const isChanged =
    firstName !== user.profile.first_name ||
    lastName !== user.profile.last_name ||
    department !== user.department?.id ||
    position !== user.position?.id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 0.5 * 1024 * 1024) {
      alert('Файл слишком большой (макс 0.5МБ)');
      return;
    }

    onAvatarUpload(file);
  };

  return (
    <Container
      sx={(theme) => {
        return {
          padding: '16px 16px 32px 0',
          height: 'auto !important',
          margin: 'auto',
          [theme.breakpoints.up('md')]: {
            maxWidth: '900px',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '0 24px',
          },
        };
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '32px 0',
        }}
      >
        <Badge
          color="secondary"
          overlap="rectangular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          badgeContent={
            user.profile.avatar ? (
              <IconButton onClick={onAvatarDelete}>
                <Close />
              </IconButton>
            ) : null
          }
          sx={{
            position: 'relative',
            display: 'inline-flex',
            verticalAlign: 'middle',
            flexShrink: 0,
            '& .MuiBadge-badge': {
              background: 'transparent',
            },
          }}
        >
          <Avatar
            src={user?.profile.avatar ?? undefined}
            sx={{
              width: '120px',
              height: '120px',
              fontSize: '40px',
              textTransform: 'uppercase',
            }}
          >
            {user?.profile.full_name?.[0] ?? ''}
          </Avatar>
        </Badge>
        {!readOnly && (
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              marginLeft: '64px',
            }}
          >
            <Typography
              variant="h6"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <FileUploadOutlined
                fontSize="large"
                sx={{ marginRight: '16px' }}
              />
              Загрузите изображение аватара
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
              png, jpg или gif, не больше 0.5МБ
            </Typography>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.gif"
              size={500}
              hidden
              onChange={handleFileChange}
            />
          </label>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '64px',
        }}
      >
        <Typography variant="h5">{user?.profile.full_name}</Typography>
        <Typography
          variant="body1"
          sx={{
            margin: '8px 0px 0px',
            color: (theme) => theme.palette.header.segment,
          }}
        >
          {user?.email}
        </Typography>
        <Typography variant="body1">{`Account was created ${user?.created_at ? new Date(Number(user.created_at)).toDateString() : 'unknown'}`}</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px 32px',
          pointerEvents: readOnly ? 'none' : 'all',
        }}
      >
        <StyledInput
          value={firstName}
          label="Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <StyledInput
          value={lastName}
          label="Surname"
          onChange={(e) => setLastName(e.target.value)}
        />
        <SelectInput
          label="Department"
          value={department}
          onChange={setDepartment}
        >
          {departments.map((department) => (
            <MenuItem value={department.id}>{department.name}</MenuItem>
          ))}
        </SelectInput>
        <SelectInput label="Position" value={position} onChange={setPosition}>
          {positions.map((position) => (
            <MenuItem value={position.id}>{position.name}</MenuItem>
          ))}
        </SelectInput>
        {!readOnly && (
          <StyledButton
            type="button"
            color="primary"
            disabled={!isChanged}
            onClick={() => onConfirm(firstName, lastName, department, position)}
            sx={(theme) => {
              return {
                [theme.breakpoints.up('md')]: {
                  gridColumn: 2,
                },
              };
            }}
          >
            Update
          </StyledButton>
        )}
      </Box>
    </Container>
  );
};
