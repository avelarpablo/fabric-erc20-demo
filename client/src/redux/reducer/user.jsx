import { getUsername } from "../../tools";
import {
  LOGIN_USER,
  LOGIN_ADMIN,
  LOGOUT_USER,
  REGISTER_USER,
  ERROR,
} from "../actions/actionNames";

const initialState = {
  loginSuccess: false,
  register: false,
  admin: false,
  userData: {
    username: "",
    jwt: localStorage.getItem("jwt") || "",
  },
  error: "",
};

const userReducer = (state = initialState, action) => {
  let username = ""
  switch (action.type) {
    case LOGIN_USER:
      username = getUsername();
      return {
        ...state,
        loginSuccess: true,
        userData: {
          username,
          jwt: action.payload.jwt,
        },
        error: "",
      };
    case LOGIN_ADMIN:
      username = getUsername();
      return {
        ...state,
        loginSuccess: true,
        admin: true,
        userData: {
          username,
          jwt: action.payload.jwt,
        },
        error: "",
      };
    case REGISTER_USER:
      return {
        ...state,
        register: action.payload,
      };
    case LOGOUT_USER:
      return {
        loginSuccess: false,
        register: false,
        admin: false,
        userData: {
          username: "",
          jwt: "",
        },
        error: "",
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;