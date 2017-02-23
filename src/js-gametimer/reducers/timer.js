import {
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  UPDATE_CLOCK,
} from '../constants';

const initialState = {
  status: 'default',
  startTime: null,
  endTime: null,
  clock: '00:00',
  secondsPassed: 0,
};

export default function update(state = initialState, action) {
  if (action.type === START_TIMER) {
    return Object.assign({}, state, {
      status: 'rolling',
      startTime: action.time,
    });
  } else if (action.type === STOP_TIMER) {
    return Object.assign({}, state, {
      status: 'done',
      endTime: action.time,
    });
  } else if (action.type === RESET_TIMER) {
    return Object.assign({}, state, {
      status: 'default',
      startTime: null,
      endTime: null,
      clock: '00:00',
      secondsPassed: 0,
    });
  } else if (action.type === UPDATE_CLOCK) {
    return Object.assign({}, state, {
      clock: action.clock,
      secondsPassed: action.secondsPassed,
    });
  }
  return state;
}
