import localforage from 'localforage';
import {
  BUILDS_CREATE_NEW,
  BUILDS_CLOSE_NEW,
  BUILDS_ERROR,
  BUILDS_LOADED,
  BUILDS_LOADING,
} from '../constants';
import Logger from '../logger';

export const openNewBuild = (hero) => {
  return function (dispatch) {
    Logger.log('openPage', { page: 'newBuild' });
    return dispatch({ type: BUILDS_CREATE_NEW, hero });
  };
};

export const closeNewBuild = () => {
  return function (dispatch) {
    Logger.log('openPage', { page: 'builds' });
    return dispatch({ type: BUILDS_CLOSE_NEW });
  };
};

export const getBuilds = () => {
  return function (dispatch) {
    dispatch({ type: BUILDS_LOADING });

    localforage.getItem('builds')
    .then((builds) => {
      return dispatch({ type: BUILDS_LOADED, builds });
    })
    .catch((err) => {
      return dispatch({ type: BUILDS_ERROR, msg: "Couldn't load builds." });
    });
  };
};

export const deleteBuild = (id) => {
  return function (dispatch) {
    dispatch({ type: BUILDS_LOADING });

    localforage.getItem('builds')
    .then((builds) => {
      const index = builds.findIndex(b => b.id === id);
      builds.splice(index, 1);
      return localforage.setItem('builds', builds);
    })
    .then((builds) => {
      return dispatch({ type: BUILDS_LOADED, builds });
    })
    .catch((err) => {
      return dispatch({ type: BUILDS_ERROR, msg: "Couldn't load builds." });
    });
  };
};
