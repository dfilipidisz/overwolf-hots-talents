import localforage from 'localforage';
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
  APP_WIDGET_UPDATE_OPT,
  APP_UPDATE_SETTINGS,
  APP_ADS_SDK_LOADED,
} from '../constants';
import { initFetch, checkResponse } from '../utility';
import Logger from '../logger';

export const updateWindowid = id => dispatch => dispatch({ type: APP_UPDATE_WINDOWID, id });

export const updateWidgetWindowid = id => dispatch =>
  dispatch({ type: APP_UPDATE_WIDGET_WINDOWID, id });

export const openPage = id => (dispatch) => {
  Logger.log('openPage', { page: id });
  return dispatch({ type: APP_OPEN_PAGE, id });
};

export const selectHero = event => (dispatch) => {
  Logger.log('selectHero', { hero: event.target.dataset.hero });
  return dispatch({ type: APP_SELECT_HERO, hero: event.target.dataset.hero });
};

export const getTalentData = () => (dispatch) => {
  const opts = initFetch(undefined, 'GET');

  fetch('http://hots-tool.ddns.net/public/data_v2.json', opts)
    .then(checkResponse)
    .then(res => res.json())
    .then(res => dispatch({ type: APP_TALENT_DATA_ARRIVED, data: res }))
    .catch((error) => {
      console.error(error);
    });
};

export const changeHeroTalentFilter = value => dispatch =>
  dispatch({ type: APP_CHANGE_HERO_TALENT_FILTER, value });

export const toggleMainWindow = payload => (dispatch) => {
  if (payload.status === 'success') {
    return dispatch({ type: APP_TOGGLE_MAIN_WINDOW });
  }
  return undefined;
};

export const widgetOpenMain = () => dispatch => dispatch({ type: APP_WIDGET_OPEN_MAIN });

export const minimizeMainWindow = () => dispatch => dispatch({ type: APP_MINIMIZE_MAIN });

export const changeWidgetOpt = (key, value) => (dispatch, getState) => {
  dispatch({ type: APP_WIDGET_UPDATE_OPT, key, value });

  const { app } = getState();

  const settings = Object.assign({}, app.widgetSettings, { [key]: value });

  overwolf.windows.sendMessage(app.widgetWindowid, 'update-settings', settings, () => {});

  localforage.setItem('widgetSettings', settings);
};

export const getSavedSettings = (wid) => (dispatch, getState) => {
  const { app } = getState();

  localforage.getItem('widgetSettings').then((value) => {
    const storedSettings = value;
    if (storedSettings) {
      // Ensure base values for new properties
      if (typeof storedSettings.placement === 'undefined') {
        storedSettings.placement = 'left';
      }
      if (typeof storedSettings.position === 'undefined') {
        storedSettings.position = 0.06;
      }

      overwolf.windows.sendMessage(wid, 'update-settings', storedSettings, (r) => {
        return dispatch({ type: APP_UPDATE_SETTINGS, storedSettings });
      });

    } else {
      return localforage.setItem('widgetSettings', app.widgetSettings);
    }

  });
};

export const adsSdkArrived = () => dispatch => dispatch({ type: APP_ADS_SDK_LOADED });
