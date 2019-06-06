import { SET_SPIDER_RUNNING } from '../constants';

export default function others(state = {}, action) {
  switch (action.type) {
    case SET_SPIDER_RUNNING:
      return {
        ...state,
        isSpiderRunning: action.isSpiderRunning,
      };
    default:
      return state;
  }
}
