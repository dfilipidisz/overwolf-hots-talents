import * as constants from '../constants';
import { checkStatus, makeFetchInit } from '../utility';

const _loadUserBuilds = function (builds) {
  return {
    type: constants.LOAD_USER_BUILDS,
    builds
  };
};

export const loadUserBuilds = function () {
  return function (dispatch, getState) {
    const user = getState().user;
    const fetchInit = makeFetchInit(undefined, undefined, {username: user.username});

    fetch(`${constants.SERVER_URL}/api/get-user-build`, fetchInit)
      .then(checkStatus)
      .then(response => response.json())
      .then((res) => {
        if (res.success) {
          dispatch(_loadUserBuilds(res.builds));
        }
      })
      .catch((error) => {
        console.log(error);
      });


  };
};
