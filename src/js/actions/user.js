import * as constants from '../constants';

const _gotUser = function (username) {
  return {
    type: constants.GOT_USER,
    username,
  };
};

export const getUser = function () {
  return function (dispatch) {
    overwolf.profile.getCurrentUser((response) => {
      if (response.status === 'success' && (response.username !== undefined && response.username !== null)) {
        dispatch(_gotUser(response.username));
      }
    });
  };
};
