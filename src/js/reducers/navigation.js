import { NAVIGATE_TO, MINIMIZE_APP, PAGES } from '../constants';

const initialState = {
  page: PAGES.MINIMIZED
}

export default function update(state = initialState, action) {
  if(action.type === NAVIGATE_TO) {
    return Object.assign({}, state, {
      page: action.page
    });
  }
  else if (action.type === MINIMIZE_APP) {
    return Object.assign({}, state, {
      page: PAGES.MINIMIZED
    });
  }
  return state;
}
