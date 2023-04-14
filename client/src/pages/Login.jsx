import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUsername } from "../tools";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const VITE_GATEWAY_API = import.meta.env.VITE_GATEWAY_API;
const theme = createTheme();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUsername();
    if (user) {
      navigate("/");
    }
  });

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response = await axios
      .post(
        `${VITE_GATEWAY_API}/users/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        setError("Invalid username or password");
        setOpen(true);
        setLoading(false);
      });
    if (response.status === 200) {
      localStorage.setItem("jwt", response.data.jwt);
      navigate("/");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={onLogin}>
            <TextField
              margin="normal"
              label="Username"
              variant="outlined"
              onChange={onUsernameChange}
              autoFocus
              fullWidth
              required
            />
            <TextField
              margin="normal"
              label="Password"
              variant="outlined"
              onChange={onPasswordChange}
              type="password"
              fullWidth
              required
            />
            <LoadingButton
              variant="contained"
              onClick={onLogin}
              loading={loading}
              fullWidth
            >
              Login
            </LoadingButton>
            <Grid container>
              {/* <Grid item xs>
                <Link to="/forgot">Forgot password?</Link>
                Forgot password?
              </Grid> */}
              <Grid item margin="normal">
                Don't have an account?{" - "}
                <Link to="/signup" variant="body2">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Alert</DialogTitle>
          <DialogContent>
            <DialogContentText>{error}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
