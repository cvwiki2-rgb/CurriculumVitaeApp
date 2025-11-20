import { useTranslation } from 'react-i18next';
import { Box, FormControl } from '@mui/material';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { PasswordInput } from '../../components/molecules/passwordInput';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';

export const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <AuthPageLayout title={t('Register now')} subtitle={t('Welcome')}>
      <FormControl>
        <StyledInput
          variant="outlined"
          label={t('Email')}
          placeholder="example@mail.com"
          autoComplete="email"
        ></StyledInput>
      </FormControl>
      <FormControl>
        <PasswordInput
          label={t('Password')}
          placeholder={t('Enter your password')}
          autoComplete="new-password"
        />
      </FormControl>
      <Box
        sx={(theme) => ({
          maxWidth: 220,
          margin: `${theme.spacing(5)} auto 0`,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(1),
        })}
      >
        <StyledButton color="primary" variant="contained">
          {t('Create account')}
        </StyledButton>
        <StyledButton color="secondary" variant="text">
          {t('I have an account')}
        </StyledButton>
      </Box>
    </AuthPageLayout>
  );
};
