import * as constants from '../constants';

let initLedPower = false;
if (window.localStorage.getItem('led-power') === 'on') { initLedPower = true; }

const initialState = {
  initialized: false,
  power: initLedPower,
  layout: null
};

export default function update (state = initialState, action) {
  if (action.type === constants.INIT_LED) {

    // Load back keyboard layout data
    const storedLayout = window.localStorage.getItem('keyboard-layout') || constants.defaultLayout.slice(0);

    // If the stored LED state is ON, turn the lights on
    if (state.power) {
      storedLayout.forEach((key) => {
        overwolf.logitech.led.setLightingForKeyWithKeyName(key.keyname, key.color.r, key.color.g, key.color.b, (res) => {});
      });
    }

    return Object.assign({}, state, {
      initialized: true,
      layout: storedLayout
    });
  }
  else if (action.type === constants.TOGGLE_LED_POWER) {
    if (!state.power) {
      state.layout.forEach((key) => {
        overwolf.logitech.led.setLightingForKeyWithKeyName(key.keyname, key.color.r, key.color.g, key.color.b, (res) => {});
      });
      window.localStorage.setItem('led-power', 'on');
    }
    else {
      overwolf.logitech.led.setLighting(0, 0, 0, (res) => {});
      window.localStorage.setItem('led-power', 'off');
    }

    return Object.assign({}, state, {
      power: !state.power
    });
  }
  return state;
}
