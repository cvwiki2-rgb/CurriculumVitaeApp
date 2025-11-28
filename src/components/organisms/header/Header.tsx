import { useTranslation } from 'react-i18next';
import { useLocation, Link as RouterLink, useParams } from 'react-router';
import { NavigateNext, PersonOutlineOutlined } from '@mui/icons-material';
import { Breadcrumbs, Typography, Link } from '@mui/material';

export type LabelMap = Record<string, string>;

export const Header = () => {
  const location = useLocation();
  const { userId, projectId } = useParams();
  const { t } = useTranslation();

  //   const user = useReactiveVar(userVar);
  //   const project = useReactiveVar(projectVar);

  const pathnames = location.pathname.split('/').filter(Boolean);

  const labelMap: LabelMap = {
    users: t('header.users'),
    skills: t('header.skills'),
    languages: t('header.languages'),
    cvs: t('header.cvs'),
    projects: t('header.projects'),
    previews: t('header.previews'),
  };

  //   if (userId) labelMap[userId] = user?.name ?? `#${userId}`;
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
        color: '#ffffffb3',
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
        const isLast = index === pathnames.length - 1;
        const isId = isIdSegment(segment);
        const label = resolveLabel(segment);

        return isLast ? (
          <Typography key={to} sx={{ color: '#ffffffb3' }}>
            {label}
          </Typography>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            to={to}
            underline="hover"
            sx={
              isId
                ? {
                    color: 'palette.primary',
                    textTransform: 'capitalize',
                    display: 'flex',
                    alignItems: 'center',
                  }
                : { color: 'inherit' }
            }
          >
            {isId && <PersonOutlineOutlined sx={{ mr: 0.5 }} />}
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
