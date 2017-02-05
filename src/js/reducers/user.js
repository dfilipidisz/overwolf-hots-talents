import * as constants from '../constants';

const initialState = {
  username: null,
};

export default function update(state = initialState, action) {
  if (action.type === constants.GOT_USER) {
    return Object.assign({}, state, {
      username: action.username,
    });
  }
  return state;
}
