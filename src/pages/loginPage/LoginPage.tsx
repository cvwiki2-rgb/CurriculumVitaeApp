import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { AuthActionsContainer } from '../../components/molecules/authActionsContainer';
import { PasswordInput } from '../../components/molecules/passwordInput';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';

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

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log('Form submitted', data);
    // тут будет useLoginQuery
  };

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
        <StyledButton type="submit" color="primary" variant="contained">
          {t('Log in')}
        </StyledButton>
        <StyledButton color="secondary" variant="text">
          {t('Forgot password')}
        </StyledButton>
      </AuthActionsContainer>
    </AuthPageLayout>
  );
};
