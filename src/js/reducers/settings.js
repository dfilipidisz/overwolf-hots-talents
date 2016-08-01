import * as constants from '../constants';

let initAutoClose = true;
if (window.localStorage.getItem('setting-autoClose') === 'true') { initAutoClose = true; }
else if (window.localStorage.getItem('setting-autoClose') === 'false') { initAutoClose = false; }

const initialState = {
  autoClose: initAutoClose
};

export default function update (state = initialState, action) {
  if (action.type === constants.SETTING_TOGGLE_AUTO_CLOSE) {
    window.localStorage.setItem('setting-autoClose', !state.autoClose);

    return Object.assign({}, state, {
      autoClose: !state.autoClose
    });
  }
  return state;
}
