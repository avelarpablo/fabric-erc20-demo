import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { doLogout, getClientAccountBalance, getTokenName, getTokenSymbol } from "../../redux/actions";

const Navbar = ({admin}) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.userData.username);
  const coinName = useSelector((state) => state.token.name);
  const coinSymbol = useSelector((state) => state.token.symbol);
  const balance = useSelector((state) => state.token.balance);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getClientAccountBalance(admin))
    dispatch(getTokenName(admin));
    dispatch(getTokenSymbol(admin));
  }, []);

  const onLogout = async () => {
    dispatch(doLogout()).then(()=> {
      navigate("/login");
    })
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Demo
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div" noWrap sx={{ flewGrow: 1 }}>
            {coinName}: {coinSymbol} {balance}
          </Typography>
          <Box sx={{ flewGrow: 1 }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="user account"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Typography variant="h6" component="div" noWrap sx={{ flewGrow: 1 }}>
            {username}
          </Typography>
          <Box>
            <IconButton
              aria-label="logout"
              color="inherit"
              edge="end"
              size="large"
              onClick={onLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
