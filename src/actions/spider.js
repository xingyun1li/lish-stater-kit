import { SET_SPIDER_RUNNING } from '../constants';

export default function setSpiderRunning({ isSpiderRunning }) {
  return {
    type: SET_SPIDER_RUNNING,
    isSpiderRunning,
  };
}
