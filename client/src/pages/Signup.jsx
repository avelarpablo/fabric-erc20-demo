import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsername } from "../tools";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
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
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const VITE_GATEWAY_API = import.meta.env.VITE_GATEWAY_API;
const theme = createTheme();

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUsername();
    if (user) {
      navigate("/");
    }
  }, []);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setOpen(true);
      return;
    }

    const response = await axios
      .post(
        `${VITE_GATEWAY_API}users/signup`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log(err);
        setError("error");
        setOpen(true);
        setLoading(false);
      });

    if (response.status === 200) {
      navigate("/login"); // change using navigate
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
            Signup
          </Typography>
          <Box component="form" onSubmit={onSignup}>
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
            <TextField
              margin="normal"
              label="Confirm Password"
              variant="outlined"
              onChange={onConfirmPasswordChange}
              type="password"
              fullWidth
              required
            />
            <LoadingButton
              variant="contained"
              onClick={onSignup}
              loading={loading}
              fullWidth
            >
              Sign up
            </LoadingButton>
            <Grid container>
              <Grid item margin="normal">
                Have an account?{" - "}
                <Link to="/login" variant="body2">
                  Login
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

export default Signup;
