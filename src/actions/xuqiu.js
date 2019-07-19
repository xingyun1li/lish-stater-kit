import { SET_XUQIU_ALL, SET_XUQIU_CURRENT, SET_YALI } from '../constants';

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

export function setYaLi({ yali }) {
  return {
    type: SET_YALI,
    yali,
  };
}
