import localforage from 'localforage';
import {
  BUILDS_CREATE_NEW,
  BUILDS_CLOSE_NEW,
  BUILDS_ERROR,
  BUILDS_LOADED,
  BUILDS_LOADING,
} from '../constants';
import Logger from '../logger';

export const openNewBuild = hero => (dispatch) => {
  Logger.log('openPage', { page: 'newBuild' });
  return dispatch({ type: BUILDS_CREATE_NEW, hero });
};

export const closeNewBuild = () => (dispatch) => {
  Logger.log('openPage', { page: 'builds' });
  return dispatch({ type: BUILDS_CLOSE_NEW });
};

export const getBuilds = () => (dispatch) => {
  dispatch({ type: BUILDS_LOADING });

  localforage.getItem('builds')
    // If no builds were saved ever, supply empty array
    .then(builds => dispatch({ type: BUILDS_LOADED, builds: builds || [] }))
    .catch((err) => {
      console.log(err);
      return dispatch({ type: BUILDS_ERROR, msg: "Couldn't load builds." });
    });
};

export const deleteBuild = id => (dispatch) => {
  dispatch({ type: BUILDS_LOADING });

  localforage.getItem('builds')
    .then((builds) => {
      const index = builds.findIndex(b => b.id === id);
      builds.splice(index, 1);
      return localforage.setItem('builds', builds);
    })
    .then(builds => dispatch({ type: BUILDS_LOADED, builds }))
    .catch((err) => {
      console.log(err);
      return dispatch({ type: BUILDS_ERROR, msg: "Couldn't load builds." });
    });
};
