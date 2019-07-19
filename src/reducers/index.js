import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import spider from './spider';
import xuqiu from './xuqiu';

export default combineReducers({
  user,
  runtime,
  spider,
  xuqiu,
});
