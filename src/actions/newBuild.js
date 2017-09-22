import localforage from 'localforage';
import {
  NEW_BUILD_CHANGE_NAME,
  NEW_BUILD_CHANGE_TALENT,
  NEW_BUILD_ERROR,
  NEW_BUILD_SAVED,
} from '../constants';
import Logger from '../logger';

const lvls = ['1', '4', '7', '10', '13', '16', '20'];

const uuidv4 = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

export const changeName = e => dispatch =>
  dispatch({ type: NEW_BUILD_CHANGE_NAME, name: e.target.value });

export const changeTalent = e => dispatch =>
  dispatch({
    type: NEW_BUILD_CHANGE_TALENT,
    id: e.currentTarget.dataset.id,
    lvl: e.currentTarget.dataset.lvl,
  });

export const saveNewBuild = () => (dispatch, getState) => {
  const { newBuild } = getState();

  if (newBuild.name === '') {
    return dispatch({ type: NEW_BUILD_ERROR, msg: 'Please add a name to your build.' });
  }

  if (lvls.some(lvl => typeof newBuild.talents[`lvl${lvl}`] === 'undefined')) {
    return dispatch({ type: NEW_BUILD_ERROR, msg: 'Please select a talent for all levels.' });
  }

  const saveBuild = {
    id: uuidv4(),
    name: newBuild.name,
    hero: newBuild.hero,
    talents: newBuild.talents,
    createdAt: Date.now(),
  };

  return localforage.getItem('builds')
    .then((builds) => {
      if (builds === null) {
        return localforage.setItem('builds', [saveBuild]);
      }
      builds.push(saveBuild);
      return localforage.setItem('builds', builds);
    })
    .then((builds) => {
      Logger.log('openPage', { page: 'builds' });
      return dispatch({ type: NEW_BUILD_SAVED, builds });
    })
    .catch((err) => {
      console.log(err);
      return dispatch({ type: NEW_BUILD_ERROR, msg: "Couldn't save the build." });
    });
};
