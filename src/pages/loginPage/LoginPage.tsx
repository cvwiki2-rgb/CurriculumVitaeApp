import { useEffect } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLazyQuery } from '@apollo/client/react';
import { showSnackbar } from '../../app/state/snackbar';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { AuthActionsContainer } from '../../components/molecules/authActionsContainer';
import { PasswordInput } from '../../components/molecules/passwordInput';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';
import { LOGIN_QUERY } from '../../graphql/auth/queries';
import { extractGraphQLMessage } from '../../graphql/errors';
import { setAuth } from '../../graphql/state/auth';
import type { AuthInput, AuthResult } from 'cv-graphql';

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [execLogin, { data, loading, error }] = useLazyQuery<
    { login: AuthResult },
    { auth: AuthInput }
  >(LOGIN_QUERY, {
    fetchPolicy: 'no-cache',
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (formValues) => {
    execLogin({
      variables: {
        auth: { email: formValues.email, password: formValues.password },
      },
    });
  };

  const handleForgotPasswordBtnClick = () => {
    navigate('/forgot-password');
  };

  useEffect(() => {
    if (!data) return;

    if (data.login) {
      setAuth(data.login);
      navigate('/users');
    } else {
      showSnackbar(t('auth.errors.unexpectedResponse'), 'error');
    }
  }, [data]);

  useEffect(() => {
    if (!error) return;

    const msg = extractGraphQLMessage(error) || t('auth.errors.loginFailed');
    showSnackbar(msg, 'error');
  }, [error]);

  return (
    <AuthPageLayout
      title={t('auth.login.title')}
      subtitle={t('auth.login.subtitle')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        rules={{ required: t('auth.form.requiredField') }}
        render={({ field }) => (
          <StyledInput
            {...field}
            label={t('auth.form.email')}
            placeholder="example@mail.com"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: t('auth.form.requiredField') }}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label={t('auth.form.password')}
            placeholder={t('auth.form.enterPassword')}
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />
      <AuthActionsContainer>
        <StyledButton
          type="submit"
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {t('auth.login.btnPrimary')}
        </StyledButton>
        <StyledButton
          color="secondary"
          variant="text"
          disabled={loading}
          onClick={handleForgotPasswordBtnClick}
        >
          {t('auth.login.btnSecondary')}
        </StyledButton>
      </AuthActionsContainer>
    </AuthPageLayout>
  );
};
