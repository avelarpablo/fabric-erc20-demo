import axios from "axios";

export const VITE_GATEWAY_CLIENT_API = import.meta.env.VITE_GATEWAY_CLIENT_API;

export const VITE_GATEWAY_MANAGER_API = import.meta.env.VITE_GATEWAY_MANAGER_API;

export const getUsername = () => {
  let jwt = localStorage.getItem("jwt");
  if (jwt) {
    let base64Url = jwt.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let decodedJwt = JSON.parse(window.atob(base64));
    return decodedJwt.username;
  } else {
    return "";
  }
};

export const getClientAccountID = async () => {
  const respose = await axios
    .post(
      `${VITE_GATEWAY_CLIENT_API}/token/evaluate`,
      { fcn: "ClientAccountID" },
      { withCredentials: true }
    )
    .catch((err) => {
      console.log(err);
    });

  if (respose.status === 200) {
    const clientAccountID = respose.data.split(":").slice(1).join(":");
    return clientAccountID;
  }
};

export const getClientAccountBalance = async () => {
  const respose = await axios
    .post(
      `${VITE_GATEWAY_CLIENT_API}/token/evaluate`,
      { fcn: "ClientAccountBalance" },
      { withCredentials: true }
    )
    .catch((err) => {
      console.log(err);
    });

  if (respose.status === 200) {
    return respose.data;
  }
};

export const getTokenName = async () => {
  const response = await axios
    .post(
      `${VITE_GATEWAY_CLIENT_API}/token/evaluate`,
      { fcn: "TokenName" },
      { withCredentials: true }
    )
    .catch((err) => {
      console.log(err);
    });

  if (response.status === 200) {
    return response.data;
  }
};

export const getTokenSymbol = async () => {
  const response = await axios
    .post(
      `${VITE_GATEWAY_CLIENT_API}/token/evaluate`,
      {
        fcn: "Symbol",
      },
      { withCredentials: true }
    )
    .catch((err) => {
      console.log(err);
    });

  if (response.status === 200) {
    return response.data;
  }
};

export const getCoinDecimals = () => {};
