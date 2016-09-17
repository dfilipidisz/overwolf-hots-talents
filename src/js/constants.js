export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';

export const NAVIGATE_TO = 'NAVIGATE_TO';
export const MINIMIZE_APP = 'MINIMIZE_APP';
export const MAXIMIZE_APP = 'MAXIMIZE_APP';

export const PAGES = {
  MINIMIZED: 'MINIMIZED',
  TALENTS: 'TALENTS',
  FEEDBACK: 'FEEDBACK',
  ABOUT: 'ABOUT',
  TEAMCOMP: 'TEAMCOMP',
  SETTINGS: 'SETTINGS'
};

export const TALENTS_NAVIGATE_TO = 'TALENTS_NAVIGATE_TO';
export const TALENTS_START_FETCH = 'TALENTS_START_FETCH';
export const TALENTS_SUCCESSFUL_FETCH = 'TALENTS_SUCCESSFUL_FETCH';
export const TALENTS_CHOOSE_HERO = 'TALENTS_CHOOSE_HERO';
export const TALENTS_OPEN_TALENT_LEVEL = 'TALENTS_OPEN_TALENT_LEVEL';
export const TALENTS_CLOSE_TALENT_LEVEL = 'TALENTS_CLOSE_TALENT_LEVEL';

export const TALENTS_PAGES = {
  POPULARITY: 'POPULARITY',
  WINRATE: 'WINRATE',
  POPULAR_BUILDS: 'POPULAR_BUILDS',
  BUILDS: 'BUILDS'
};

export const TEAMCOMP_DATA_FETCH = 'TEAMCOMP_DATA_FETCH';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const COMP_ADD_HERO = 'COMP_ADD_HERO';
export const COMP_REMOVE_HERO = 'COMP_REMOVE_HERO';

export const SEND_ANALYTICS = 'SEND_ANALYTICS';

export const SERVER_URL = 'http://owanalytics.noip.me';

export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

export const GOT_USER = 'GOT_USER';
export const LOAD_ALL_BUILDS = 'LOAD_ALL_BUILDS';
export const ADD_NEW_BUILD = 'ADD_NEW_BUILD';
export const UPDATE_BUILD = 'UPDATE_BUILD';
export const DELETE_BUILD = 'DELETE_BUILD';
export const FAVORITE_BUILD = 'FAVORITE_BUILD';
export const UNFAVORITE_BUILD = 'UNFAVORITE_BUILD';

export const SETTING_TOGGLE_AUTO_CLOSE = 'SETTING_TOGGLE_AUTO_CLOSE';

export const INIT_LED = 'INIT_LED';
export const TOGGLE_LED_POWER = 'TOGGLE_LED_POWER';
export const LED_DEVICE_ERROR = 'LED_DEVICE_ERROR';
export const LED_CHANGE_KEY = 'LED_CHANGE_KEY';
export const LED_CHANGE_COLOR = 'LED_CHANGE_COLOR';
export const RESET_LAYOUT = 'RESET_LAYOUT';

export const HEROES = [
  { value: 'Abathur', label: 'Abathur'},
  { value: 'Alarak', label: 'Alarak'},
  { value: 'Anubarak', label: 'Anub\'arak'},
  { value: 'Artanis', label: 'Artanis'},
  { value: 'Arthas', label: 'Arthas'},
  { value: 'Auriel', label: 'Auriel'},
  { value: 'Azmodan', label: 'Azmodan'},
  { value: 'Brightwing', label: 'Brightwing'},
  { value: 'Chen', label: 'Chen'},
  { value: 'Cho', label: 'Cho'},
  { value: 'Chromie', label: 'Chromie'},
  { value: 'Dehaka', label: 'Dehaka'},
  { value: 'Diablo', label: 'Diablo'},
  { value: 'ETC', label: 'E.T.C.'},
  { value: 'Falstad', label: 'Falstad'},
  { value: 'Gall', label: 'Gall'},
  { value: 'Gazlowe', label: 'Gazlowe'},
  { value: 'Greymane', label: 'Greymane'},
  { value: 'Guldan', label: 'Gul\'Dan'},
  { value: 'Illidan', label: 'Illidan'},
  { value: 'Jaina', label: 'Jaina'},
  { value: 'Johanna', label: 'Johanna'},
  { value: 'Kaelthas', label: 'Kael\'thas'},
  { value: 'Kerrigan', label: 'Kerrigan'},
  { value: 'Kharazim', label: 'Kharazim'},
  { value: 'Leoric', label: 'Leoric'},
  { value: 'LiLi', label: 'Li Li'},
  { value: 'Li-Ming', label: 'Li-Ming'},
  { value: 'LtMorales', label: 'Lt. Morales'},
  { value: 'Lunara', label: 'Lunara'},
  { value: 'Malfurion', label: 'Malfurion'},
  { value: 'Medivh', label: 'Medivh'},
  { value: 'Muradin', label: 'Muradin'},
  { value: 'Murky', label: 'Murky'},
  { value: 'Nazeebo', label: 'Nazeebo'},
  { value: 'Nova', label: 'Nova'},
  { value: 'Raynor', label: 'Raynor'},
  { value: 'Rehgar', label: 'Rehgar'},
  { value: 'Rexxar', label: 'Rexxar'},
  { value: 'SgtHammer', label: 'Sgt. Hammer'},
  { value: 'Sonya', label: 'Sonya'},
  { value: 'Stitches', label: 'Stitches'},
  { value: 'Sylvanas', label: 'Sylvanas'},
  { value: 'Tassadar', label: 'Tassadar'},
  { value: 'TheButcher', label: 'The Butcher'},
  { value: 'TheLostVikings', label: 'The Lost Vikings'},
  { value: 'Thrall', label: 'Thrall'},
  { value: 'Tracer', label: 'Tracer'},
  { value: 'Tychus', label: 'Tychus'},
  { value: 'Tyrael', label: 'Tyrael'},
  { value: 'Tyrande', label: 'Tyrande'},
  { value: 'Uther', label: 'Uther'},
  { value: 'Valla', label: 'Valla'},
  { value: 'Xul', label: 'Xul'},
  { value: 'Zagara', label: 'Zagara'},
  { value: 'Zeratul', label: 'Zeratul'},
];

const K = overwolf.logitech.led.enums.KeyboardNames;

export const KeyboardNames = Object.keys(K);

export const defaultLayout = [
  {
    command: 'Hero Ability 1',
    keyname: K.Q,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Hero Ability 2',
    keyname: K.W,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Hero Ability 3',
    keyname: K.E,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Heroic Ability',
    keyname: K.R,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Hero Trait',
    keyname: K.D,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Mount/Dismount',
    keyname: K.Y,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Hearthstone',
    keyname: K.B,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Use Talent 1',
    keyname: K.ONE,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Use Talent 2',
    keyname: K.TWO,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Use Talent 3',
    keyname: K.THREE,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Use Talent 4',
    keyname: K.FOUR,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Use Talent 5',
    keyname: K.FIVE,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Use Talent 6',
    keyname: K.SIX,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Spotlight',
    keyname: K.SPACE,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Ping Minimap',
    keyname: K.G,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Quick Retreat Ping',
    keyname: K.V,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Leader Panel',
    keyname: K.TAB,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Character Sheet Panel',
    keyname: K.C,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Attack',
    keyname: K.A,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Stop Attack',
    keyname: K.S,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Hold',
    keyname: K.H,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Cancel',
    keyname: K.ESC,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Announce Modifier',
    keyname: K.LEFT_ALT,
    color: { r: 28, g: 27, b: 58 }
  },
  {
    command: 'Queue Command Modifier',
    keyname: K.LEFT_SHIFT,
    color: { r: 28, g: 27, b: 58 }
  }
];
