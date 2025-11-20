import { Box, FormControl } from '@mui/material';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { PasswordInput } from '../../components/molecules/passwordInput';
import { AuthPageLayout } from '../../components/organisms/authPageLayout';

export const SignupPage = () => {
  return (
    <AuthPageLayout
      title="Register now"
      subtitle="Welcome! Sign up to continue"
    >
      <FormControl>
        <StyledInput
          variant="outlined"
          label="Email"
          placeholder="example@mail.com"
          autoComplete="email"
        ></StyledInput>
      </FormControl>
      <FormControl>
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
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
          Create account
        </StyledButton>
        <StyledButton color="secondary" variant="text">
          I have an account
        </StyledButton>
      </Box>
    </AuthPageLayout>
  );
};
