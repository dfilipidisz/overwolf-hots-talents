import * as constants from '../constants';
import { checkStatus, makeFetchInit } from '../utility';

const _loadAllBuilds = function (data) {
  return {
    type: constants.LOAD_ALL_BUILDS,
    data
  };
};

export const loadAllBuilds = function () {
  return function (dispatch, getState) {
    const user = getState().user;
    const fetchInit = makeFetchInit(undefined, undefined, {username: user.username});

    fetch(`${constants.SERVER_URL}/api/get-all-builds`, fetchInit)
      .then(checkStatus)
      .then(response => response.json())
      .then((res) => {
        if (res.success) {
          dispatch(_loadAllBuilds(res.data));
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
  return function (dispatch) {
    dispatch(_addNewBuild(build));
  }
};

const _updateBuild = function (id, part) {
  return {
    type: constants.UPDATE_BUILD,
    id,
    part
  };
};

export const updateBuild = function (id, part) {
  return function (dispatch) {
    dispatch(_updateBuild(id, part));
  }
};

const _deleteBuild = function (id, favorites) {
  return {
    type: constants.DELETE_BUILD,
    id,
    favorites
  };
};

export const deleteBuild = function (id, favorites) {
  return function (dispatch) {
    dispatch(_deleteBuild(id, favorites));
  }
};

const _favoriteBuild = function (builds, favorites) {
  return {
    type: constants.FAVORITE_BUILD,
    builds,
    favorites
  };
};

export const favoriteBuild = function (builds, favorites) {
  return function (dispatch) {
    dispatch(_favoriteBuild(builds, favorites));
  }
};

const _unFavoriteBuild = function (builds, favorites) {
  return {
    type: constants.UNFAVORITE_BUILD,
    builds,
    favorites
  };
};

export const unFavoriteBuild = function (builds, favorites) {
  return function (dispatch) {
    dispatch(_unFavoriteBuild(builds, favorites));
  }
};
