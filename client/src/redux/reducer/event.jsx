import { ADD_EVENT, GET_EVENTS } from "../actions/actionNames";

const initialState = {
  transactions: [],
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return action.payload;
    case ADD_EVENT:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    default:
      return state;
  }
}

export default eventReducer;