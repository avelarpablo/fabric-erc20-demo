import {combineReducers } from 'redux';
import userReducer from './user';
import tokenReducer from './token';
import eventReducer from './event';

const allReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  events: eventReducer
});

export default allReducers;