import { RECEIVE_SESSIONID, ANALYTICS_URL } from '../constants';

export function receiveSessionid(sessionid) {
  return {
    type: RECEIVE_SESSIONID,
    sessionid: sessionid
  }
}
  
export function sendAnalytics(dataToSend) {
  let fetchInit = {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  };
    
  return fetch(ANALYTICS_URL, fetchInit);
}
  
export function sendFeedback(message) {
  let fetchInit = {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({event: 'feedback', message: message})
  };
    
  fetch(ANALYTICS_URL, fetchInit);
}
