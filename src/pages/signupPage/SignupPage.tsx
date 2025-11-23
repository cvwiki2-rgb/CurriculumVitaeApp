import { useTranslation } from 'react-i18next';
import { FormControl } from '@mui/material';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { AuthActionsContainer } from '../../components/molecules/authActionsContainer';
import { PasswordInput } from '../../components/molecules/passwordInput';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';

export const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <AuthPageLayout
      title={t('auth.signup.title')}
      subtitle={t('auth.signup.subtitle')}
    >
      <FormControl>
        <StyledInput
          variant="outlined"
          label={t('auth.form.email')}
          placeholder="example@mail.com"
          autoComplete="email"
        ></StyledInput>
      </FormControl>
      <FormControl>
        <PasswordInput
          label={t('auth.form.password')}
          placeholder={t('auth.form.enterPassword')}
          autoComplete="new-password"
        />
      </FormControl>
      <AuthActionsContainer>
        <StyledButton color="primary" variant="contained">
          {t('auth.signup.btnPrimary')}
        </StyledButton>
        <StyledButton color="secondary" variant="text">
          {t('auth.signup.btnSecondary')}
        </StyledButton>
      </AuthActionsContainer>
    </AuthPageLayout>
  );
};
