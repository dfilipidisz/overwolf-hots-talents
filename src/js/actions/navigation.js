import { NAVIGATE_TO, MINIMIZE_APP, MAXIMIZE_APP } from '../constants';

export function navigateTo(page) {
  return {
    type: NAVIGATE_TO,
    page: page
  }
}

export function minimizeApp() {
  return {
    type: MINIMIZE_APP
  }
}

const _maximizeApp = function () {
  return {
    type: MAXIMIZE_APP
  };
};

export const maximizeApp = function () {
  return function (dispatch) {
    dispatch(_maximizeApp());
  }
};
