import {
  BUILDS_CREATE_NEW,
  BUILDS_CLOSE_NEW,
  NEW_BUILD_CHANGE_NAME,
  NEW_BUILD_CHANGE_TALENT,
  NEW_BUILD_ERROR,
  NEW_BUILD_SAVED,
  APP_SELECT_HERO,
} from "../constants";

const initialState = {
  name: '',
  hero: '',
  talents: {},
  error: null,
};

export default function(state = initialState, action) {
  if (action.type === BUILDS_CREATE_NEW) {
    return Object.assign({}, state, {
      hero: action.hero,
    });
  } else if (action.type === BUILDS_CLOSE_NEW || action.type === NEW_BUILD_SAVED) {
    return Object.assign({}, initialState);
  } else if (action.type === NEW_BUILD_CHANGE_NAME) {
    return Object.assign({}, state, {
      name: action.name,
      error: null,
    });
  } else if (action.type === APP_SELECT_HERO) {
    return Object.assign({}, state, {
      hero: action.hero,
      name: '',
      talents: {},
      error: null,
    });
  } else if (action.type === NEW_BUILD_CHANGE_TALENT) {
    const talents = Object.assign({}, state.talents, {
      [`lvl${action.lvl}`]: action.id,
    });
    return Object.assign({}, state, { talents, error: null });
  } else if (action.type === NEW_BUILD_ERROR) {
    return Object.assign({}, state, {
      error: action.msg,
    });
  }

  return state;
}
