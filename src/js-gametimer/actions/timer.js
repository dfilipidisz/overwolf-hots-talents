import {
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  UPDATE_CLOCK,
} from '../constants';
import { toClock } from '../utility';

const _startTimer = function (time) {
  return {
    type: START_TIMER,
    time,
  };
};

export const startTimer = function (time) {
  return function (dispatch) {
    return dispatch(_startTimer(time));
  };
};

const _stopTimer = function (time) {
  return {
    type: STOP_TIMER,
    time,
  };
};

export const stopTimer = function (time) {
  return function (dispatch) {
    return dispatch(_stopTimer(time));
  };
};

const _resetTimer = function () {
  return {
    type: RESET_TIMER,
  };
};

export const resetTimer = function () {
  return function (dispatch) {
    return dispatch(_resetTimer());
  };
};

const _updateClock = function (secondsPassed, clock) {
  return {
    type: UPDATE_CLOCK,
    secondsPassed,
    clock,
  };
};

export const updateClock = function (rawtime) {
  return function (dispatch) {
    const secondsPassed = Math.round(rawtime / 1000);

    return dispatch(_updateClock(secondsPassed, toClock(secondsPassed)));
  };
};
