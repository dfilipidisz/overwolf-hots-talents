import * as constants from '../constants';

const _toggleAutoClose = function () {
  return {
    type: constants.SETTING_TOGGLE_AUTO_CLOSE
  };
};

export const toggleAutoClose = function () {
  return function (dispatch) {
    dispatch(_toggleAutoClose());
  };
};
