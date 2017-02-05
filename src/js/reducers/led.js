import * as constants from '../constants';

let initLedPower = false;
if (window.localStorage.getItem('led-power') === 'on') { initLedPower = true; }

let initLayout = constants.defaultLayout.slice(0);
if (window.localStorage.getItem('keyboard-layout') !== null) {
  initLayout = JSON.parse(window.localStorage.getItem('keyboard-layout'));
}

const initialState = {
  initialized: false,
  power: initLedPower,
  layout: initLayout,
};

export default function update(state = initialState, action) {
  if (action.type === constants.INIT_LED) {
    // If the stored LED state is ON, turn the lights on
    if (state.power) {
      state.layout.forEach((key) => {
        overwolf.logitech.led.setLightingForKeyWithKeyName(
          key.keyname,
          key.color.r,
          key.color.g,
          key.color.b
        );
      });
    }

    return Object.assign({}, state, {
      initialized: true,
    });
  } else if (action.type === constants.TOGGLE_LED_POWER) {
    if (!state.power) {
      state.layout.forEach((key) => {
        overwolf.logitech.led.setLightingForKeyWithKeyName(
          key.keyname,
          key.color.r,
          key.color.g,
          key.color.b
        );
      });
      window.localStorage.setItem('led-power', 'on');
    } else {
      overwolf.logitech.led.setLighting(0, 0, 0);
      window.localStorage.setItem('led-power', 'off');
    }

    return Object.assign({}, state, {
      power: !state.power,
    });
  } else if (action.type === constants.LED_DEVICE_ERROR) {
    return Object.assign({}, state, {
      initialized: true,
      power: false,
    });
  } else if (action.type === constants.LED_CHANGE_KEY) {
    const newLayout = state.layout.slice(0);
    const index = newLayout.findIndex((el) => { return el.command === action.command; });

    if (state.power) {
      overwolf.logitech.led.setLightingForKeyWithKeyName(newLayout[index].keyname, 0, 0, 0);
      overwolf.logitech.led.setLightingForKeyWithKeyName(
        action.key, newLayout[index].color.r, newLayout[index].color.g, newLayout[index].color.b);
    }

    newLayout[index].keyname = action.key;
    window.localStorage.setItem('keyboard-layout', JSON.stringify(newLayout));

    return Object.assign({}, state, {
      layout: newLayout,
    });
  } else if (action.type === constants.LED_CHANGE_COLOR) {
    const newLayout = state.layout.slice(0);
    const index = newLayout.findIndex((el) => { return el.command === action.command; });

    // RGB is stored in a normalized form for the API to work (0 - 100)
    const r = Math.round((action.color.r / 255) * 100);
    const g = Math.round((action.color.g / 255) * 100);
    const b = Math.round((action.color.b / 255) * 100);

    if (state.power) {
      overwolf.logitech.led.setLightingForKeyWithKeyName(newLayout[index].keyname, 0, 0, 0);
      overwolf.logitech.led.setLightingForKeyWithKeyName(newLayout[index].keyname, r, g, b);
    }

    newLayout[index].color = { r, g, b };
    window.localStorage.setItem('keyboard-layout', JSON.stringify(newLayout));

    return Object.assign({}, state, {
      layout: newLayout,
    });
  } else if (action.type === constants.RESET_LAYOUT) {
    window.localStorage.setItem('keyboard-layout', JSON.stringify(constants.defaultLayout.slice(0)));

    if (state.power) {
      constants.defaultLayout.forEach((key) => {
        overwolf.logitech.led.setLightingForKeyWithKeyName(
          key.keyname, key.color.r, key.color.g, key.color.b);
      });
    }

    return Object.assign({}, state, {
      layout: constants.defaultLayout.slice(0),
    });
  }
  return state;
}
