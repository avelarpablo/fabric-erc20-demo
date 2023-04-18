import { useEffect, useState } from "react";
import {
  VITE_GATEWAY_CLIENT_API,
  getClientAccountBalance,
  getTokenName,
  getTokenSymbol,
  getUsername,
} from "../../tools";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const username = getUsername();
  const [coinName, setCoinName] = useState("USD");
  const [coinSymbol, setCoinSymbol] = useState("$");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getBalance = async () => {
      const clientBalance = await getClientAccountBalance();
      setBalance(clientBalance);
    };
    getBalance();

    const getCoinName = async () => {
      const coinName = await getTokenName();
      setCoinName(coinName);
    };
    getCoinName();

    const getCoinSymbol = async () => {
      const coinSymbol = await getTokenSymbol();
      setCoinSymbol(coinSymbol);
    };
    getCoinSymbol();
  }, []);

  const onLogout = async () => {
    const response = await axios.post(
      `${VITE_GATEWAY_CLIENT_API}/users/logout`,
      {},
      { withCredentials: true }
    );
    if (response.status !== 200) {
      alert("Something went wrong");
    } else {
      localStorage.removeItem("jwt");
      navigate("/login");
    }
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
            Token ERC20 - Demo
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
