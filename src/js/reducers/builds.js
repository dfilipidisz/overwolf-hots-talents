import * as constants from '../constants';

const initialState = {
  loading: true,
  loadError: null,
  builds: []
};

export default function update (state = initialState, action) {
  if (action.type === constants.LOAD_USER_BUILDS) {
    return Object.assign({}, state, {
      loading: false,
      builds: action.builds || []
    });
  }
  return state;
}
