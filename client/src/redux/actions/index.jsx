import axios from "axios";
import {
  ADD_EVENT,
  BALANCE_OF,
  BURN_TOKEN,
  ERROR,
  GET_ACCOUNTID,
  GET_BALANCE,
  GET_TOKENDECIMALS,
  GET_TOKENNAME,
  GET_TOKENSYMBOL,
  GET_TOKEN_TOTALSUPPLY,
  LOGIN_ADMIN,
  LOGIN_USER,
  LOGOUT_USER,
  MINT_TOKEN,
  TRANSFER_TOKEN,
} from "./actionNames";
import { VITE_GATEWAY_MANAGER_API, VITE_GATEWAY_CLIENT_API } from "../../tools";

export const clearError = () => {
  return async (dispatch) => {
    dispatch({ type: ERROR, payload: "" });
  };
}

export const doRegister = (username, password) => {
  return async (dispatch) => {
    const response = await axios
      .post(
        `${VITE_GATEWAY_CLIENT_API}/users/register`,
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

        dispatch({ type: ERROR, payload: err });
      });
    if (response.status === 200) {
      dispatch({ type: REGISTER_USER, payload: response.data });
    }
  };
};

export const doLogin = (username, password, admin) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/users/login`,
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

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      localStorage.setItem("jwt", response.data.jwt);
      if (admin === "true") {
        dispatch({ type: LOGIN_ADMIN, payload: response.data });
      } else {
        dispatch({ type: LOGIN_USER, payload: response.data });
      }
    }
  };
};

export const reLogin = () => {
  return (dispatch) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch({ type: LOGIN_USER, payload: { jwt } });
    }
  };
};

export const doLogout = () => {
  return async (dispatch) => {
    const response = await axios
      .post(
        `${VITE_GATEWAY_CLIENT_API}/users/logout`,
        {},
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      localStorage.removeItem("jwt");
      dispatch({ type: LOGOUT_USER, payload: response.data });
    }
  };
};

export const getClientAccountID = (admin) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/evaluate`,
        { fcn: "ClientAccountID" },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: GET_ACCOUNTID, payload: response.data });
    }
  };
};

export const getClientAccountBalance = (admin) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/evaluate`,
        { fcn: "ClientAccountBalance" },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: GET_BALANCE, payload: response.data });
    }
  };
};

export const getTotalSupply = (admin) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/evaluate`,
        { fcn: "TotalSupply" },
        { withCredentials: true }
        )
        .catch((err) => {
          console.log(err);
          
          dispatch({ type: ERROR, payload: err.response.data });
        });
    if (response.status === 200) {
      dispatch({ type: GET_TOKEN_TOTALSUPPLY, payload: response.data });
    }
  };
};

export const getTokenName = (admin) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/evaluate`,
        { fcn: "TokenName" },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: GET_TOKENNAME, payload: response.data });
    }
  };
};

export const getTokenSymbol = (admin) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/evaluate`,
        { fcn: "Symbol" },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: GET_TOKENSYMBOL, payload: response.data });
    }
  };
};

export const getTokenDecimals = (admin) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/evaluate`,
        { fcn: "Decimals" },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: GET_TOKENDECIMALS, payload: response.data });
    }
  };
};

export const setToken = (admin, name, symbol, decimals) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/submit`,
        { fcn: "SetToken", args: [name, symbol, decimals] },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: SET_TOKEN, payload: response.data });
    }
  };
};

export const mintToken = (admin, amount) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/submit`,
        { fcn: "Mint", args: [amount] },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: MINT_TOKEN, payload: amount });
    }
  };
};

export const burnToken = (admin, amount) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/submit`,
        { fcn: "Burn", args: [amount] },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      getTotalSupply(admin);
      dispatch({ type: BURN_TOKEN, payload: amount });
    }
  };
};

export const transferTo = (admin, to, amount) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/submit`,
        { fcn: "Transfer", args: [to, amount] },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: TRANSFER_TOKEN, payload: response.data });
    }
  };
};

export const transferFromTo = (admin, from, to, amount) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/submit`,
        { fcn: "TransferTo", args: [from, to, amount] },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err });
      });
    if (response.status === 200) {
      dispatch({ type: TRANSFER_TO_TOKEN, payload: response.data });
    }
  };
};

export const balanceOf = (admin, account) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/evaluate`,
        { fcn: "BalanceOf", args: [account] },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: BALANCE_OF, payload: response.data });
    }
  };
};

export const allowance = (admin, owner, spender) => {
  let url = setUrl(admin);
  return async (dispatch) => {
    const response = await axios
      .post(
        `${url}/token/evaluate`,
        { fcn: "Allowance", args: [owner, spender] },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);

        dispatch({ type: ERROR, payload: err.response.data });
      });
    if (response.status === 200) {
      dispatch({ type: ALLOWANCE, payload: response.data });
    }
  };
};

export const addEvent = (event) => {
  return async (dispatch) => {
    dispatch({ type: ADD_EVENT, payload: event });
  };
};

const setUrl = (type) => {
  if (type === "true") {
    return VITE_GATEWAY_MANAGER_API;
  } else {
    return VITE_GATEWAY_CLIENT_API;
  }
};
