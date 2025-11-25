import { useEffect } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client/react';
import { showSnackbar } from '../../app/state/snackbar';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { AuthActionsContainer } from '../../components/molecules/authActionsContainer';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';
import { FORGOT_PASSWORD } from '../../graphql/auth/mutations';
import { extractGraphQLMessage } from '../../graphql/errors';
import { useLangNavigate } from '../../hooks/useLangNavigate';
import type { ForgotPasswordInput } from 'cv-graphql';

type ForgotPasswordFormValues = {
  email: string;
};

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useLangNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
  });

  const [execForgotPassword, { data, loading, error }] = useMutation<
    { forgotPassword: void },
    { auth: ForgotPasswordInput }
  >(FORGOT_PASSWORD, { fetchPolicy: 'no-cache' });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (formValues) => {
    execForgotPassword({ variables: { auth: { email: formValues.email } } });
  };

  const handleCancelBtnClick = () => {
    navigate('auth/login');
  };

  useEffect(() => {
    if (!data) return;

    showSnackbar(t('Check mail'), 'info');
  }, [data]);

  useEffect(() => {
    if (!error) return;

    const msg =
      extractGraphQLMessage(error) || t('auth.errors.forgotPasswordFailed');
    showSnackbar(msg, 'error');
  }, [error]);

  return (
    <AuthPageLayout
      title={t('auth.forgotPassword.title')}
      subtitle={t('auth.forgotPassword.subtitle')}
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
      <AuthActionsContainer>
        <StyledButton
          type="submit"
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {t('auth.forgotPassword.btnPrimary')}
        </StyledButton>
        <StyledButton
          color="secondary"
          variant="text"
          disabled={loading}
          onClick={handleCancelBtnClick}
        >
          {t('auth.forgotPassword.btnSecondary')}
        </StyledButton>
      </AuthActionsContainer>
    </AuthPageLayout>
  );
};
