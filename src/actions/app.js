import {
  APP_UPDATE_WINDOWID,
  APP_UPDATE_WIDGET_WINDOWID,
  APP_OPEN_PAGE,
  APP_SELECT_HERO,
  APP_TALENT_DATA_ARRIVED,
  APP_CHANGE_HERO_TALENT_FILTER,
  APP_TOGGLE_MAIN_WINDOW,
  APP_WIDGET_OPEN_MAIN,
  APP_MINIMIZE_MAIN,
} from '../constants';
import { initFetch, checkResponse } from '../utility';
import Logger from '../logger';


export const updateWindowid = (id) => {
  return function (dispatch) {
    return dispatch({ type: APP_UPDATE_WINDOWID, id });
  };
};

export const updateWidgetWindowid = (id) => {
  return function (dispatch) {
    return dispatch({ type: APP_UPDATE_WIDGET_WINDOWID, id });
  };
};

export const openPage = (id) => {
  return function (dispatch) {
    Logger.log('openPage', { page: id });
    return dispatch({ type: APP_OPEN_PAGE, id });
  };
};

export const selectHero = (event) => {
  return function (dispatch) {
    Logger.log('selectHero', { hero: event.target.dataset.hero });
    return dispatch({ type: APP_SELECT_HERO, hero: event.target.dataset.hero });
  };
};

export const getTalentData = () => {
  return function (dispatch) {

    const opts = initFetch(undefined, 'GET');

    fetch('http://hots-tool.ddns.net/public/data_v2.json', opts)
    .then(checkResponse)
    .then(res => res.json())
    .then((res) => {
      return dispatch({ type: APP_TALENT_DATA_ARRIVED, data: res });
    })
    .catch((error) => {
      // TODO: handle error case
      console.error(error);
      //reject(`${error.message} (${error.code})`);
    });
  };
};

export const changeHeroTalentFilter = (value) => {
  return function (dispatch) {
    return dispatch({ type: APP_CHANGE_HERO_TALENT_FILTER, value });
  };
};

export const toggleMainWindow = (payload) => {
  return function (dispatch) {
    if (payload.status === 'success') {
      return dispatch({ type: APP_TOGGLE_MAIN_WINDOW });
    }
  };
};

export const widgetOpenMain = () => {
  return function (dispatch) {
    return dispatch({ type: APP_WIDGET_OPEN_MAIN });
  };
};

export const minimizeMainWindow = () => {
  return function (dispatch) {
    return dispatch({ type: APP_MINIMIZE_MAIN });
  };
};
