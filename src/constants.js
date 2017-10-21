export const APP_UPDATE_WINDOWID = 'APP_UPDATE_WINDOWID';
export const APP_UPDATE_WIDGET_WINDOWID = 'APP_UPDATE_WIDGET_WINDOWID';
export const APP_OPEN_PAGE = 'APP_OPEN_PAGE';
export const APP_SELECT_HERO = 'APP_SELECT_HERO';
export const APP_TALENT_DATA_ARRIVED = 'APP_TALENT_DATA_ARRIVED';
export const APP_CHANGE_HERO_TALENT_FILTER = 'APP_CHANGE_HERO_TALENT_FILTER';
export const APP_TOGGLE_MAIN_WINDOW = 'APP_TOGGLE_MAIN_WINDOW';
export const APP_WIDGET_OPEN_MAIN = 'APP_WIDGET_OPEN_MAIN';
export const APP_MINIMIZE_MAIN = 'APP_MINIMIZE_MAIN';
export const APP_WIDGET_UPDATE_OPT = 'APP_WIDGET_UPDATE_OPT';
export const APP_UPDATE_SETTINGS = 'APP_UPDATE_SETTINGS';
export const APP_ADS_SDK_LOADED = 'APP_ADS_SDK_LOADED';

export const HEROES_TOGGLE_ROLE = 'HEROES_TOGGLE_ROLE';
export const HEROES_TOGGLE_FRANCHISE = 'HEROES_TOGGLE_FRANCHISE';
export const HEROES_CHANGE_QUERY = 'HEROES_CHANGE_QUERY';

export const BUILDS_CREATE_NEW = 'BUILDS_CREATE_NEW';
export const BUILDS_CLOSE_NEW = 'BUILDS_CLOSE_NEW';
export const BUILDS_ERROR = 'BUILDS_ERROR';
export const BUILDS_LOADED = 'BUILDS_LOADED';
export const BUILDS_LOADING = 'BUILDS_LOADING';

export const NEW_BUILD_CHANGE_NAME = 'NEW_BUILD_CHANGE_NAME';
export const NEW_BUILD_CHANGE_TALENT = 'NEW_BUILD_CHANGE_TALENT';
export const NEW_BUILD_ERROR = 'NEW_BUILD_ERROR';
export const NEW_BUILD_SAVED = 'NEW_BUILD_SAVED';

export const ROLES = [
  'warrior',
  'assassin',
  'support',
  'specialist',
  'multiclass',
];

export const FRANCHISES = [
  'warcraft',
  'starcraft',
  'diablo',
  'overwatch',
  'classic',
];

export const HEROES = [
  { value: 'Abathur', label: 'Abathur', role: 'specialist', franchise: 'starcraft' },
  { value: 'Alarak', label: 'Alarak', role: 'assassin', franchise: 'starcraft' },
  { value: 'Ana', label: 'Ana', role: 'support', franchise: 'overwatch' },
  { value: 'Anubarak', label: 'Anub\'arak', role: 'warrior', franchise: 'warcraft' },
  { value: 'Artanis', label: 'Artanis', role: 'warrior', franchise: 'starcraft' },
  { value: 'Arthas', label: 'Arthas', role: 'warrior', franchise: 'warcraft' },
  { value: 'Auriel', label: 'Auriel', role: 'support', franchise: 'diablo' },
  { value: 'Azmodan', label: 'Azmodan', role: 'specialist', franchise: 'diablo' },
  { value: 'Brightwing', label: 'Brightwing', role: 'support', franchise: 'warcraft' },
  { value: 'Cassia', label: 'Cassia', role: 'assassin', franchise: 'diablo' },
  { value: 'Chen', label: 'Chen', role: 'warrior', franchise: 'warcraft' },
  { value: 'Cho', label: 'Cho', role: 'warrior', franchise: 'warcraft' },
  { value: 'Chromie', label: 'Chromie', role: 'assassin', franchise: 'warcraft' },
  { value: 'DVa', label: 'D.Va', role: 'warrior', franchise: 'overwatch' },
  { value: 'Dehaka', label: 'Dehaka', role: 'warrior', franchise: 'starcraft' },
  { value: 'Diablo', label: 'Diablo', role: 'warrior', franchise: 'diablo' },
  { value: 'ETC', label: 'E.T.C.', role: 'warrior', franchise: 'warcraft' },
  { value: 'Falstad', label: 'Falstad', role: 'assassin', franchise: 'warcraft' },
  { value: 'Gall', label: 'Gall', role: 'assassin', franchise: 'warcraft' },
  { value: 'Garrosh', label: 'Garrosh', role: 'warrior', franchise: 'warcraft' },
  { value: 'Gazlowe', label: 'Gazlowe', role: 'specialist', franchise: 'warcraft' },
  { value: 'Genji', label: 'Genji', role: 'assassin', franchise: 'overwatch' },
  { value: 'Greymane', label: 'Greymane', role: 'assassin', franchise: 'warcraft' },
  { value: 'Guldan', label: 'Gul\'Dan', role: 'assassin', franchise: 'warcraft' },
  { value: 'Illidan', label: 'Illidan', role: 'assassin', franchise: 'warcraft' },
  { value: 'Jaina', label: 'Jaina', role: 'assassin', franchise: 'warcraft' },
  { value: 'Johanna', label: 'Johanna', role: 'warrior', franchise: 'diablo' },
  { value: 'Junkrat', label: 'Junkrat', role: 'assassin', franchise: 'overwatch' },
  { value: 'Kaelthas', label: 'Kael\'thas', role: 'assassin', franchise: 'warcraft' },
  { value: 'KelThuzad', label: 'Kel\'Thuzad', role: 'assassin', franchise: 'warcraft' },
  { value: 'Kerrigan', label: 'Kerrigan', role: 'assassin', franchise: 'starcraft' },
  { value: 'Kharazim', label: 'Kharazim', role: 'support', franchise: 'diablo' },
  { value: 'Leoric', label: 'Leoric', role: 'warrior', franchise: 'diablo' },
  { value: 'LiLi', label: 'Li Li', role: 'support', franchise: 'warcraft' },
  { value: 'Li-Ming', label: 'Li-Ming', role: 'assassin', franchise: 'diablo' },
  { value: 'LtMorales', label: 'Lt. Morales', role: 'support', franchise: 'starcraft' },
  { value: 'Lunara', label: 'Lunara', role: 'assassin', franchise: 'warcraft' },
  { value: 'Lucio', label: 'Lúcio', role: 'support', franchise: 'overwatch' },
  { value: 'Malfurion', label: 'Malfurion', role: 'support', franchise: 'warcraft' },
  { value: 'Malthael', label: 'Malthael', role: 'assassin', franchise: 'diablo' },
  { value: 'Medivh', label: 'Medivh', role: 'specialist', franchise: 'warcraft' },
  { value: 'Muradin', label: 'Muradin', role: 'warrior', franchise: 'warcraft' },
  { value: 'Murky', label: 'Murky', role: 'specialist', franchise: 'warcraft' },
  { value: 'Nazeebo', label: 'Nazeebo', role: 'specialist', franchise: 'diablo' },
  { value: 'Nova', label: 'Nova', role: 'assassin', franchise: 'starcraft' },
  { value: 'Probius', label: 'Probius', role: 'specialist', franchise: 'starcraft' },
  { value: 'Ragnaros', label: 'Ragnaros', role: 'assassin', franchise: 'warcraft' },
  { value: 'Raynor', label: 'Raynor', role: 'assassin', franchise: 'starcraft' },
  { value: 'Rehgar', label: 'Rehgar', role: 'support', franchise: 'warcraft' },
  { value: 'Rexxar', label: 'Rexxar', role: 'warrior', franchise: 'warcraft' },
  { value: 'Samuro', label: 'Samuro', role: 'assassin', franchise: 'warcraft' },
  { value: 'SgtHammer', label: 'Sgt. Hammer', role: 'specialist', franchise: 'starcraft' },
  { value: 'Sonya', label: 'Sonya', role: 'warrior', franchise: 'diablo' },
  { value: 'Stitches', label: 'Stitches', role: 'warrior', franchise: 'warcraft' },
  { value: 'Stukov', label: 'Stukov', role: 'support', franchise: 'starcraft' },
  { value: 'Sylvanas', label: 'Sylvanas', role: 'specialist', franchise: 'warcraft' },
  { value: 'Tassadar', label: 'Tassadar', role: 'support', franchise: 'starcraft' },
  { value: 'TheButcher', label: 'The Butcher', role: 'assassin', franchise: 'diablo' },
  { value: 'TheLostVikings', label: 'The Lost Vikings', role: 'specialist', franchise: 'classic' },
  { value: 'Thrall', label: 'Thrall', role: 'assassin', franchise: 'warcraft' },
  { value: 'Tracer', label: 'Tracer', role: 'assassin', franchise: 'overwatch' },
  { value: 'Tychus', label: 'Tychus', role: 'assassin', franchise: 'starcraft' },
  { value: 'Tyrael', label: 'Tyrael', role: 'warrior', franchise: 'diablo' },
  { value: 'Tyrande', label: 'Tyrande', role: 'support', franchise: 'warcraft' },
  { value: 'Uther', label: 'Uther', role: 'support', franchise: 'warcraft' },
  { value: 'Valeera', label: 'Valeera', role: 'assassin', franchise: 'warcraft' },
  { value: 'Valla', label: 'Valla', role: 'assassin', franchise: 'diablo' },
  { value: 'Varian', label: 'Varian', role: 'multiclass', franchise: 'warcraft' },
  { value: 'Xul', label: 'Xul', role: 'specialist', franchise: 'diablo' },
  { value: 'Zagara', label: 'Zagara', role: 'specialist', franchise: 'starcraft' },
  { value: 'Zarya', label: 'Zarya', role: 'warrior', franchise: 'overwatch' },
  { value: 'Zeratul', label: 'Zeratul', role: 'assassin', franchise: 'starcraft' },
  { value: 'Zuljin', label: 'Zul\'jin', role: 'assassin', franchise: 'warcraft' },
];
