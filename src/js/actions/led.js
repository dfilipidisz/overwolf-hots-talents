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
          setTimeout(() => {
            dispatch(_initLed());
          }, 1000);
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
    dispatch(_toggleLedPower);
  };
};
