import {
  HEROES_TOGGLE_ROLE,
  HEROES_TOGGLE_FRANCHISE,
  HEROES_CHANGE_QUERY,
} from '../constants';

const initialState = {
  query: null,
  filterRoles: {
    warrior: false,
    assassin: false,
    support: false,
    specialist: false,
    multiclass: false,
  },
  filterFranchises: {
    warcraft: false,
    starcraft: false,
    diablo: false,
    overwatch: false,
    classic: false,
  },
};

export default function (state = initialState, action) {
  if (action.type === HEROES_TOGGLE_ROLE) {
    const filterRoles = Object.assign({}, state.filterRoles);
    filterRoles[action.role] = !filterRoles[action.role];

    return Object.assign({}, state, {
      filterRoles,
    });
  } else if (action.type === HEROES_TOGGLE_FRANCHISE) {
    const filterFranchises = Object.assign({}, state.filterFranchises);
    filterFranchises[action.franchise] = !filterFranchises[action.franchise];

    return Object.assign({}, state, {
      filterFranchises,
    });
  } else if (action.type === HEROES_CHANGE_QUERY) {
    return Object.assign({}, state, {
      query: action.value,
    });
  }
  return state;
}
