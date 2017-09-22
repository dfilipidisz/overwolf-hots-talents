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

const initialState = {
  loading: true,
  heroData: null,
  windowid: null,
  widgetWindowid: null,
  //page: 'home',
  page: 'heroes',
  selectedHero: null,
  forceSelection: false,
  heroTalentFilter: 'popularity',
  mainWindowVisible: true,
  widgetSettings: {
    opacity: 1,
    openOn: 'hover', // click, hover
    closeOn: 'hover', // click, hover
    placement: 'left', // left, right
    position: 0.06,
  },
  adsSdkLoaded: false,
};

export default function (state = initialState, action) {
  if (action.type === APP_UPDATE_WINDOWID) {
    return Object.assign({}, state, {
      windowid: action.id,
    });
  } else if (action.type === APP_UPDATE_WIDGET_WINDOWID) {
    return Object.assign({}, state, {
      widgetWindowid: action.id,
    });
  } else if (action.type === APP_OPEN_PAGE) {
    if (action.id === 'heroselect') {
      return Object.assign({}, state, {
        forceSelection: true,
        page: state.page === 'home' ? 'heroes' : state.page,
      });
    }
    return Object.assign({}, state, {
      page: action.id,
      forceSelection: false,
    });
  } else if (action.type === APP_SELECT_HERO) {
    return Object.assign({}, state, {
      selectedHero: action.hero,
      forceSelection: false,
    });
  } else if (action.type === APP_TALENT_DATA_ARRIVED) {
    return Object.assign({}, state, {
      heroData: action.data,
      loading: false,
    });
  } else if (action.type === APP_CHANGE_HERO_TALENT_FILTER) {
    return Object.assign({}, state, {
      heroTalentFilter: action.value,
    });
  } else if (action.type === APP_TOGGLE_MAIN_WINDOW) {
    return Object.assign({}, state, {
      mainWindowVisible: !state.mainWindowVisible,
    });
  } else if (action.type === APP_WIDGET_OPEN_MAIN) {
    return Object.assign({}, state, {
      mainWindowVisible: true,
    });
  } else if (action.type === APP_MINIMIZE_MAIN) {
    return Object.assign({}, state, {
      mainWindowVisible: false,
    });
  } else if (action.type === APP_WIDGET_UPDATE_OPT) {
    return Object.assign({}, state, {
      widgetSettings: Object.assign({}, state.widgetSettings, {
        [action.key]: action.value
      })
    });
  } else if (action.type === APP_UPDATE_SETTINGS) {
    return Object.assign({}, state, {
      widgetSettings: action.storedSettings,
    });
  } else if (action.type === APP_ADS_SDK_LOADED) {
    return Object.assign({}, state, {
      adsSdkLoaded: true,
    });
  }
  return state;
}
