import { useEffect } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';
import { showSnackbar } from '../../app/state/snackbar';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { AuthActionsContainer } from '../../components/molecules/authActionsContainer';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';
import { RESET_PASSWORD } from '../../graphql/auth/mutations';
import { extractGraphQLMessage } from '../../graphql/errors';
import type { ResetPasswordInput } from 'cv-graphql';

type ResetPasswordFormValues = {
  newPassword: string;
};

export const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      newPassword: '',
    },
  });

  const [execResetPassword, { data, loading, error }] = useMutation<
    { resetPassword: void },
    { auth: ResetPasswordInput }
  >(RESET_PASSWORD, { fetchPolicy: 'no-cache' });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = (formValues) => {
    execResetPassword({
      variables: { auth: { newPassword: formValues.newPassword } },
    });
  };

  const handleGoToLoginBtnClick = () => {
    navigate('/auth/login');
  };

  useEffect(() => {
    if (!data) return;

    navigate('/auth/login');
    showSnackbar(t('auth.info.passwordReset'), 'info');
  }, [data]);

  useEffect(() => {
    if (!error) return;

    const msg =
      extractGraphQLMessage(error) || t('auth.errors.forgotPasswordFailed');
    showSnackbar(msg, 'error');
  }, [error]);

  return (
    <AuthPageLayout
      title={t('auth.resetPassword.title')}
      subtitle={t('auth.resetPassword.subtitle')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="newPassword"
        control={control}
        rules={{ required: t('auth.form.requiredField') }}
        render={({ field }) => (
          <StyledInput
            {...field}
            label={t('auth.form.newPassword')}
            placeholder={t('auth.form.enterPassword')}
            autoComplete="new-password"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
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
          {t('auth.resetPassword.btnPrimary')}
        </StyledButton>
        <StyledButton
          color="secondary"
          variant="text"
          disabled={loading}
          onClick={handleGoToLoginBtnClick}
        >
          {t('auth.resetPassword.btnSecondary')}
        </StyledButton>
      </AuthActionsContainer>
    </AuthPageLayout>
  );
};
