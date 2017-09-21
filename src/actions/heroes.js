import {
  HEROES_TOGGLE_ROLE,
  HEROES_TOGGLE_FRANCHISE,
  HEROES_CHANGE_QUERY,
} from '../constants';

export const toggleRole = role => dispatch => dispatch({ type: HEROES_TOGGLE_ROLE, role });

export const toggleFranchise = franchise => dispatch =>
  dispatch({ type: HEROES_TOGGLE_FRANCHISE, franchise });

export const changeQuery = value => dispatch => dispatch({ type: HEROES_CHANGE_QUERY, value });
