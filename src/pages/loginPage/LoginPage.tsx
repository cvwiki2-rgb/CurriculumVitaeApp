import { useEffect } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { AuthActionsContainer } from '../../components/molecules/authActionsContainer';
import { PasswordInput } from '../../components/molecules/passwordInput';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';
import { LOGIN_QUERY } from '../../graphql/auth/queries';
import { setAuth } from '../../graphql/state/auth';
import type { AuthInput, AuthResult } from 'cv-graphql';

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { t } = useTranslation();
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

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log('Form submitted', data);
    execLogin({
      variables: { auth: { email: data.email, password: data.password } },
    });
  };

  useEffect(() => {
    if (!data) return;

    if (data.login) {
      setAuth(data?.login);
      // redirect /users
    } else {
      // setSnackbar({ open: true, message: t('Unexpected server response') });
    }
  }, [data]);

  useEffect(() => {
    if (!error) return;

    // const msg =
    //   error.graphQLErrors?.[0]?.message ?? error.message ?? t('Login failed');
    // setSnackbar({ open: true, message: msg });
  }, [error]);

  return (
    <AuthPageLayout
      title={t('Welcome back')}
      subtitle={t('Hello again')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        rules={{ required: t('Required field') }}
        render={({ field }) => (
          <StyledInput
            {...field}
            label={t('Email')}
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
        rules={{ required: t('Required field') }}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label={t('Password')}
            placeholder={t('Enter your password')}
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
          {t('Log in')}
        </StyledButton>
        <StyledButton color="secondary" variant="text" disabled={loading}>
          {t('Forgot password')}
        </StyledButton>
      </AuthActionsContainer>
    </AuthPageLayout>
  );
};
