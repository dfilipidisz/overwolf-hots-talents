import * as constants from '../constants';
import { checkStatus, makeFetchInit } from '../utility';

const _loadMyBuilds = function (builds) {
  return {
    type: constants.LOAD_MY_BUILDS,
    builds
  };
};

export const loadMyBuilds = function () {
  return function (dispatch, getState) {
    const user = getState().user;
    const fetchInit = makeFetchInit(undefined, undefined, {username: user.username});

    fetch(`${constants.SERVER_URL}/api/get-my-builds`, fetchInit)
      .then(checkStatus)
      .then(response => response.json())
      .then((res) => {
        if (res.success) {
          dispatch(_loadMyBuilds(res.builds));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const _addNewBuild = function (build) {
  return {
    type: constants.ADD_NEW_BUILD,
    build
  };
};

export const addNewBuild = function (build) {
  return function (dispatch, getState) {
    const mybuilds = getState().builds.mybuilds;

    if (mybuilds === null) {
      loadMyBuilds();
    }
    else {
      dispatch(_addNewBuild(build));
    }
  }
};
