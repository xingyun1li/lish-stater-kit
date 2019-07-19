import { SET_XUQIU_ALL, SET_XUQIU_CURRENT, SET_YALI } from '../constants';

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
    case SET_YALI:
      return {
        ...state,
        yali: action.yali,
      };
    default:
      return state;
  }
}
