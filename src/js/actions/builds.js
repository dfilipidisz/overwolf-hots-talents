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

const _loadMyFavorites = function (builds) {
  return {
    type: constants.LOAD_MY_FAVORITES,
    builds
  };
};

export const loadMyFavorites = function () {
  return function (dispatch, getState) {
    const user = getState().user;
    const fetchInit = makeFetchInit(undefined, undefined, {username: user.username});

    fetch(`${constants.SERVER_URL}/api/get-my-favorites`, fetchInit)
      .then(checkStatus)
      .then(response => response.json())
      .then((res) => {
        if (res.success) {
          dispatch(_loadMyFavorites(res.builds));
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

const _deleteBuild = function (id) {
  return {
    type: constants.DELETE_BUILD,
    id
  };
};

export const deleteBuild = function (id) {
  return function (dispatch) {
    dispatch(_deleteBuild(id));
  }
};

const _favoriteBuild = function (builds) {
  return {
    type: constants.FAVORITE_BUILD,
    builds
  };
};

export const favoriteBuild = function (builds) {
  return function (dispatch) {
    dispatch(_favoriteBuild(builds));
  }
};

const _unFavoriteBuild = function (builds) {
  return {
    type: constants.UNFAVORITE_BUILD,
    builds
  };
};

export const unFavoriteBuild = function (builds) {
  return function (dispatch) {
    dispatch(_unFavoriteBuild(builds));
  }
};
