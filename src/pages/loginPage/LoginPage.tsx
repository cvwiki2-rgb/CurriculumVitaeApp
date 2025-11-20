import { Box, FormControl, Typography } from '@mui/material';
import { StyledButton } from '../../components/atoms/styledButton';
import { StyledInput } from '../../components/atoms/styledInput';
import { PasswordInput } from '../../components/molecules/passwordInput';

export const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 560,
        width: ' 90%',
        height: 'calc(100vh - 56px)',
        margin: ' 0px auto',
        '& .MuiTypography-h4': {
          marginBottom: '24px',
        },
        '& .MuiTypography-body1': {
          marginBottom: '40px',
        },

        '& .MuiTextField-root': {
          marginBottom: '20px',
        },
      }}
      component="form"
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{
          textAlign: 'center',
        }}
      >
        Welcome back
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
        }}
      >
        Hello again! Log in to continue
      </Typography>
      <FormControl>
        <StyledInput
          variant="outlined"
          label="Email"
          placeholder="expamle@mail.com"
          sx={{
            '& .MuiInputBase-root': {},
            '& .MuiInputLabel-root': {},
          }}
        ></StyledInput>
      </FormControl>
      <FormControl>
        <PasswordInput label="Password" placeholder="Enter your password" />
      </FormControl>
      <Box
        sx={{
          maxWidth: 220,
          margin: '40px auto 0px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <StyledButton color="primary" variant="contained">
          Log in
        </StyledButton>
        <StyledButton color="secondary" variant="text">
          Forgot password
        </StyledButton>
      </Box>
    </Box>
  );
};
