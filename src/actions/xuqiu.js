import { SET_XUQIU_ALL, SET_XUQIU_CURRENT } from '../constants';

export function setXuqiuAll({ xuqiuAll }) {
  return {
    type: SET_XUQIU_ALL,
    xuqiuAll,
  };
}

export function setXuqiuCurrent({ xuqiuCurrent }) {
  return {
    type: SET_XUQIU_CURRENT,
    xuqiuCurrent,
  };
}
