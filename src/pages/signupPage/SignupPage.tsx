import { useEffect } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';
import { showSnackbar } from '../../app/state/snackbar';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { AuthActionsContainer } from '../../components/molecules/authActionsContainer';
import { PasswordInput } from '../../components/molecules/passwordInput';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';
import { SIGNUP } from '../../graphql/auth/mutations';
import { extractGraphQLMessage } from '../../graphql/errors';
import { setAuth } from '../../graphql/state/auth';
import type { AuthInput, AuthResult } from 'cv-graphql';

type SignupFormValues = {
  email: string;
  password: string;
};

export const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [execSignup, { data, loading, error }] = useMutation<
    { signup: AuthResult },
    { auth: AuthInput }
  >(SIGNUP, {
    fetchPolicy: 'no-cache',
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (formValues) => {
    execSignup({
      variables: {
        auth: { email: formValues.email, password: formValues.password },
      },
    });
  };

  const handleHaveAccountBtnClick = () => {
    navigate('/auth/login');
  };

  useEffect(() => {
    if (!data) return;

    if (data.signup) {
      setAuth(data.signup);
      navigate('/users');
    } else {
      showSnackbar(t('auth.errors.unexpectedResponse'), 'error');
    }
  }, [data]);

  useEffect(() => {
    if (!error) return;

    const msg = extractGraphQLMessage(error) || t('auth.errors.authFailed');
    showSnackbar(msg, 'error');
  }, [error]);

  return (
    <AuthPageLayout
      title={t('auth.signup.title')}
      subtitle={t('auth.signup.subtitle')}
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
            autoComplete="new-password"
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
          {t('auth.signup.btnPrimary')}
        </StyledButton>
        <StyledButton
          color="secondary"
          variant="text"
          disabled={loading}
          onClick={handleHaveAccountBtnClick}
        >
          {t('auth.signup.btnSecondary')}
        </StyledButton>
      </AuthActionsContainer>
    </AuthPageLayout>
  );
};
