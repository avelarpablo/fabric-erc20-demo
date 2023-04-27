import {
  GET_BALANCE,
  GET_TOKENNAME,
  GET_TOKENSYMBOL,
  GET_TOKENDECIMALS,
  SET_TOKEN,
  MINT_TOKEN,
  BURN_TOKEN,
  TRANSFER_TOKEN,
  TRANSFER_TO_TOKEN,
  GET_TOKEN_TOTALSUPPLY,
  BALANCE_OF,
} from "../actions/actionNames";

const initialState = {
  name: "",
  symbol: "",
  decimals: 0,
  balance: 0,
  minted: 0,
  burned: 0,
  totalSupply: 0,
  client: {
    username: "",
    balance: 0,
    allowance: 0,
  },
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_TOTALSUPPLY:
      return {
        ...state,
        balance: action.payload,
        totalSupply: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        name: action.payload.name,
        symbol: action.payload.symbol,
        decimals: action.payload.decimals,
      };
    case GET_TOKENNAME:
      return {
        ...state,
        name: action.payload,
      };
    case GET_TOKENSYMBOL:
      return {
        ...state,
        symbol: action.payload,
      };
    case GET_TOKENDECIMALS:
      return {
        ...state,
        decimals: action.payload,
      };
    case GET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };
    case MINT_TOKEN:
      return {
        ...state,
        minted: parseInt(action.payload),
      };
    case BURN_TOKEN:
      return {
        ...state,
        burned: parseInt(action.payload),
      };
    case TRANSFER_TOKEN:
      return {
        ...state,
        balance: action.payload,
      };
    case TRANSFER_TO_TOKEN:
      return {
        ...state,
        balance: action.payload,
      };
    case BALANCE_OF:
      return {
        ...state,
        client: {
          ...state.client,
          balance: action.payload,
        },
      };
    default:
      return state;
  }
};

export default tokenReducer;
