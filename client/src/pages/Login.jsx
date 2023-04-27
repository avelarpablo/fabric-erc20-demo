import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { clearError, doLogin, reLogin } from "../redux/actions";
import DialogPopUp from "../components/DialogPopUp/DialogPopUp";

const theme = createTheme();

const Login = ({ type }) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.loginSuccess);
  const error = useSelector((state) => state.user.error);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.user.userData.username);
  const admin = useSelector((state) => state.user.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !admin) {
      dispatch(reLogin());
      if (type === "true") {
        navigate("/adminhome");
      } else {
        navigate("/");
      }
    }
  });

  useEffect(() => {
    if (login) {
      if (type === "true") {
        navigate("/adminhome");
      } else {
        navigate("/");
      }
    }
    if (error) {
      setOpen(true);
    }
    setLoading(false);
  }, [login, error]);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // update login after dispatch
    dispatch(doLogin(username, password, type));
  };

  const onDialogClose = () => {
    setOpen(false);
    dispatch(clearError());
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {admin==="true" && "Admin "}Login
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
            {admin !== "true" && (
              <Grid container>
                <Grid item margin="normal">
                  Don't have an account?{" - "}
                  <Link to="/signup" variant="body2">
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
        <DialogPopUp
          open={open}
          title="Alert"
          message={error}
          close={onDialogClose}
        />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
