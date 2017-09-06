import {
  BUILDS_CREATE_NEW,
  BUILDS_CLOSE_NEW,
  BUILDS_ERROR,
  BUILDS_LOADED,
  BUILDS_LOADING,
  NEW_BUILD_SAVED,
} from "../constants";

const initialState = {
  isLoading: false,
  error: null,
  builds: [],
  isCreatingNew: false
};

export default function(state = initialState, action) {
  if (action.type === BUILDS_CREATE_NEW) {
    return Object.assign({}, state, {
      isCreatingNew: true,
    });
  } else if (action.type === BUILDS_CLOSE_NEW) {
    return Object.assign({}, state, {
      isCreatingNew: false,
    });
  } else if (action.type === NEW_BUILD_SAVED) {
    return Object.assign({}, state, {
      isCreatingNew: false,
      builds: action.builds,
    });
  } else if (action.type === BUILDS_ERROR) {
    return Object.assign({}, state, {
      isLoading: false,
      error: action.msg,
    });
  } else if (action.type === BUILDS_LOADING) {
    return Object.assign({}, state, {
      isLoading: true,
      error: null,
    });
  } else if (action.type === BUILDS_LOADED) {
    return Object.assign({}, state, {
      isLoading: false,
      builds: action.builds,
    });
  }

  return state;
}
