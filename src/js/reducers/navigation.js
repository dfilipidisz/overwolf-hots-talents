import { NAVIGATE_TO, PAGES } from '../constants';

const initialState = {
  page: PAGES.MINIMIZED
}

export default function update(state = initialState, action) {
  if(action.type === NAVIGATE_TO) {
    return {
      page: action.page
    }
  }
  return state;
}
