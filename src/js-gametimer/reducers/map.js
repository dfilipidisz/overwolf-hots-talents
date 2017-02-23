import {
  SELECT_MAP,
} from '../constants';

const initialState = {
  selectedMap: null,
};

export default function update(state = initialState, action) {
  if (action.type === SELECT_MAP) {
    return Object.assign({}, state, {
      selectedMap: action.value,
    });
  }
  return state;
}
