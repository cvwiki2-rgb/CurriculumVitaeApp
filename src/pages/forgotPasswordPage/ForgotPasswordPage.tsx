import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { AuthActionsContainer } from '../../components/molecules/authActionsContainer';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';
import { useLangNavigate } from '../../hooks/useLangNavigate';

type ForgotPasswordFormValues = {
  email: string;
  password: string;
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

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = () => {};

  const handleCancelBtnClick = () => {
    navigate('auth/login');
  };

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
          //   disabled={loading}
        >
          {t('auth.forgotPassword.btnPrimary')}
        </StyledButton>
        <StyledButton
          color="secondary"
          variant="text"
          //   disabled={loading}
          onClick={handleCancelBtnClick}
        >
          {t('auth.forgotPassword.btnSecondary')}
        </StyledButton>
      </AuthActionsContainer>
    </AuthPageLayout>
  );
};
