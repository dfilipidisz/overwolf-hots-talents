import { TEAMCOMP_DATA_FETCH } from '../constants';

const initialState = {
  data: null,
  fetch: 'loading',
  error: null
}

export default function update(state = initialState, action) {
  if(action.type === TEAMCOMP_DATA_FETCH) {
    if (action.status === 'loading') {
      return Object.assign({}, state, {
        fetch: 'loading'
      });
    }
    else if (action.status === 'done') {
      return Object.assign({}, state, {
        data: action.data,
        fetch: 'done'
      });
    }
    else if (action.status === 'error') {
      return Object.assign({}, state, {
        fetch: 'error',
        error: action.error
      });
    }
    else {
      return state;
    }
  }
  
  //Unhandled action
  return state;
}
