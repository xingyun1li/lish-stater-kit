import { SET_XUQIU_ALL, SET_XUQIU_CURRENT } from '../constants';

export default function xuqiu(state = {}, action) {
  switch (action.type) {
    case SET_XUQIU_ALL:
      return {
        ...state,
        xuqiuAll: action.xuqiuAll,
      };
    case SET_XUQIU_CURRENT:
      return {
        ...state,
        xuqiuCurrent: action.xuqiuCurrent,
      };
    default:
      return state;
  }
}
