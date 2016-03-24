import { SEND_ANALYTICS, RECEIVE_SESSIONID } from '../constants';

const initialState = {
  sessionid: null
}

export default function update(state = initialState, action) {
  if(action.type === RECEIVE_SESSIONID) {
    return { 
      sessionid: action.sessionid 
    }
  }
  return state;
}
