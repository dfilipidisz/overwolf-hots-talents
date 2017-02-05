import { NAVIGATE_TO, MINIMIZE_APP, MAXIMIZE_APP, PAGES } from '../constants';

const initialState = {
  page: PAGES.MINIMIZED,
  lastOpenPage: PAGES.TALENTS,
};

export default function update(state = initialState, action) {
  if (action.type === NAVIGATE_TO) {
    return Object.assign({}, state, {
      page: action.page,
      lastOpenPage: action.page,
    });
  } else if (action.type === MINIMIZE_APP) {
    return Object.assign({}, state, {
      page: PAGES.MINIMIZED,
    });
  } else if (action.type === MAXIMIZE_APP) {
    return Object.assign({}, state, {
      page: state.lastOpenPage,
    });
  }
  return state;
}
