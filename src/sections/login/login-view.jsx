import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import api from 'src/components/Common/apiConfig';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  // const history = useHistory();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  // const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const errors = {};

    if (!email) {
      errors.email = "email is required.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // setSuccessMessage("");
      return;
    }

    setFormErrors({
      email: "",
      password: ""
    });
    api.post("/login", {
      email,
      password
    })
      .then(({ data }) => {
        console.log("login -res", data);
        console.log(data.token)
        localStorage.setItem("token", data.access_token)
        // localStorage.setItem("loginemail", data.email)

        if (data.access_token !== "undefined") {
          router.push("/");
          window.location.reload();
          console.log("api token", data.access_token)
        }

      }).catch((error) => {
        console.log(error.response.data, "error")
        setErrorMessage("Please Enter Valid Credentials!")
      })

  }

  const renderForm = (
    <>
      <h6>
        {formErrors.email && (
          <span className="error-message">{formErrors.email}</span>
        )}
        </h6>
        <h6>
        {formErrors.password && (
          <span className="error-message">{formErrors.password}</span>
        )}
      </h6>
      <Stack spacing={3}>
        <TextField name="email" className={`${formErrors.email ? "error-input" : ""}`} value={email} onChange={(e) => setEmail(e.target.value)} label="Email address" />

        <TextField
          name="password"
          className={`${formErrors.password ? "error-input" : ""}`}
          label="Password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (


    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to XIFI</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>
          <h6>{errorMessage && <div style={{ color: "red", fontSize: "15px" }}>{errorMessage}</div>}</h6>
          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>

  );

}
