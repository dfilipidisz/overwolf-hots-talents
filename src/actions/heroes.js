import {
  HEROES_TOGGLE_ROLE,
  HEROES_TOGGLE_FRANCHISE,
  HEROES_CHANGE_QUERY,
} from '../constants';

export const toggleRole = (role) => {
  return function (dispatch) {
    return dispatch({ type: HEROES_TOGGLE_ROLE, role });
  };
};

export const toggleFranchise = (franchise) => {
  return function (dispatch) {
    return dispatch({ type: HEROES_TOGGLE_FRANCHISE, franchise });
  };
};

export const changeQuery = (value) => {
  return function (dispatch) {
    return dispatch({ type: HEROES_CHANGE_QUERY, value });
  };
};
