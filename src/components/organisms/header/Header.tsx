import { useTranslation } from 'react-i18next';
import { useLocation, NavLink, useParams } from 'react-router';
import { useReactiveVar } from '@apollo/client/react';
import { NavigateNext, PersonOutlineOutlined } from '@mui/icons-material';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import { usersVar } from '../../../graphql/state/users';

export type LabelMap = Record<string, string>;

export const Header = () => {
  const location = useLocation();
  const { userId, projectId } = useParams();
  const { t } = useTranslation();

  const users = useReactiveVar(usersVar);
  const user = users.find((user) => user.id === userId);
  //   const project = useReactiveVar(projectVar);

  const pathnames = location.pathname.split('/').filter(Boolean);

  const labelMap: LabelMap = {
    users: t('header.users'),
    skills: t('header.skills'),
    languages: t('header.languages'),
    cvs: t('header.cvs'),
    projects: t('header.projects'),
    preview: t('header.preview'),
  };

  if (userId)
    labelMap[userId] = user?.profile.full_name ?? user?.email ?? `#${userId}`;
  //   if (projectId) labelMap[projectId] = project?.title ?? `#${projectId}`;

  const resolveLabel = (segment: string) => labelMap[segment] ?? segment;

  const isIdSegment = (segment: string) =>
    segment === userId || segment === projectId;

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" color="disabled" />}
      aria-label="breadcrumb"
      sx={{
        height: 44,
        paddingLeft: '20px',
        paddingTop: '16px',
        color: (theme) => theme.palette.header.segment,
        position: 'sticky',
        top: 0,
        zIndex: 3,
        backgroundColor: (theme) => theme.palette.background.default,
        '& .MuiBreadcrumbs-li:last-child': {
          pointerEvents: 'none',
          opacity: 0.6,
        },
        '& .MuiBreadcrumbs-li': {
          whiteSpace: 'nowrap',
        },
      }}
    >
      {pathnames.map((segment: string, index: number) => {
        const to = '/' + pathnames.slice(0, index + 1).join('/');
        const isId = isIdSegment(segment);
        const label = resolveLabel(segment);

        return (
          <Link
            key={to}
            component={NavLink}
            to={to}
            underline="hover"
            sx={{
              color: isId ? 'primary.main' : 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isId && <PersonOutlineOutlined sx={{ mr: 0.5 }} />}
            <Typography sx={{ m: 0 }}>{label}</Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
