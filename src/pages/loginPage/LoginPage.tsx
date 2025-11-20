import { useTranslation } from 'react-i18next';
import { FormControl } from '@mui/material';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { AuthActionsContainer } from '../../components/molecules/authActionsContainer';
import { PasswordInput } from '../../components/molecules/passwordInput';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <AuthPageLayout title={t('Welcome back')} subtitle={t('Hello again')}>
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
          autoComplete="current-password"
        />
      </FormControl>
      <AuthActionsContainer>
        <StyledButton color="primary" variant="contained">
          {t('Log in')}
        </StyledButton>
        <StyledButton color="secondary" variant="text">
          {t('Forgot password')}
        </StyledButton>
      </AuthActionsContainer>
    </AuthPageLayout>
  );
};
