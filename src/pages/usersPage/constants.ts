import type { UserTableRow } from './types';
import type { User } from 'cv-graphql';

export const mapUserToTableRow = (user: User): UserTableRow => ({
  id: user.id,
  avatar: user.profile.avatar,
  email: user.email,
  fullName: user.profile.full_name ?? '',
  firstName: user.profile.first_name ?? '',
  lastName: user.profile.last_name ?? '',
  department: user.department?.name ?? '',
  position: user.position?.name ?? '',
});
