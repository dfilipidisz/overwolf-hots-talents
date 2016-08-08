import * as constants from '../constants';

const _initLed = function () {
  return {
    type: constants.INIT_LED
  };
};

export const initLed = function () {
  return function (dispatch, getState) {
    const led = getState().led;

    if (!led.initialized) {
      overwolf.logitech.led.init((result) => {
        if (result.status === 'success') {
          // Need some time before we can use the LED API
          setTimeout(() => {
            dispatch(_initLed());
          }, 1000);
        }
        else {
          dispatch(_ledDeviceError());
        }
      });
    }
  };
};

const _toggleLedPower = function () {
  return {
    type: constants.TOGGLE_LED_POWER
  };
};

export const toggleLedPower = function () {
  return function (dispatch) {
    dispatch(_toggleLedPower());
  };
};

const _ledDeviceError = function () {
  return {
    type: constants.LED_DEVICE_ERROR
  };
};

export const ledDeviceError = function () {
  return function (dispatch) {
    dispatch(_ledDeviceError());
  };
};

const _ledChangeKey = function (command, key) {
  return {
    type: constants.LED_CHANGE_KEY,
    command,
    key
  };
};

export const ledChangeKey = function (command, key) {
  return function (dispatch) {
    dispatch(_ledChangeKey(command, key));
  };
};

const _ledChangeColor = function (command, color) {
  return {
    type: constants.LED_CHANGE_COLOR,
    command,
    color
  };
};

export const ledChangeColor = function (command, color) {
  return function (dispatch) {
    dispatch(_ledChangeColor(command, color));
  };
};

const _resetLayout = function () {
  return {
    type: constants.RESET_LAYOUT
  };
};

export const resetLayout = function () {
  return function (dispatch) {
    dispatch(_resetLayout());
  };
};
