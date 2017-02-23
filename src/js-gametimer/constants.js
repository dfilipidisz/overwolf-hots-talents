export const SELECT_MAP = 'SELECT_MAP';

export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const UPDATE_CLOCK = 'UPDATE_CLOCK';

export const MAPS = {
  'boe': 'Battlefield of Eternity',
  'bay': 'Blackheart\'s Bay',
  'braxis': 'Braxis Holdout',
  'cursed': 'Cursed Hollow',
  'dragon': 'Dragon Shire',
  'garden': 'Garden of Terror',
  'mines': 'Haunted Mines',
  'shrines': 'Infernal Shrines',
  'temple': 'Sky Temple',
  'tomb': 'Tomb of the Spider Queen',
  'towers': 'Towers of Doom',
  'warhead': 'Warhead Junction',
};

export const OBJECTIVES = {
  boe: [
    {
      type: 'map',
      firstSpawn: 105,
      repeatSpawn: 105,
      title: 'Immortal',
      markText: 'Mark when immortal eliminated from lane',
      spawningText: 'Immortal spawning in',
    },
    {
      type: 'bruiser',
      firstSpawn: 150,
      repeatSpawn: 240,
      title: 'Left Shaman',
      markText: 'Mark when shaman camp captured',
      spawningText: 'Left Shaman spawning in',
    },
    {
      type: 'bruiser',
      firstSpawn: 150,
      repeatSpawn: 240,
      title: 'Right Shaman',
      markText: 'Mark when shaman camp captured',
      spawningText: 'Right Shaman spawning in',
    },
    {
      type: 'siege',
      firstSpawn: 120,
      repeatSpawn: 180,
      title: 'Top Impaler',
      markText: 'Mark when impaler camp captured',
      spawningText: 'Top Impaler spawning in',
    },
    {
      type: 'siege',
      firstSpawn: 120,
      repeatSpawn: 180,
      title: 'Bottom Impaler',
      markText: 'Mark when impaler camp captured',
      spawningText: 'Bottom Impaler spawning in',
    },
  ],
  bay: [
    {
      type: 'map',
      firstSpawn: 50,
      repeatSpawn: 150,
      title: 'Chests',
      markText: 'Mark when both chests broken',
      spawningText: 'Chests spawning in',
    },
    {
      type: 'boss',
      firstSpawn: 180,
      repeatSpawn: 300,
      title: 'Boss',
      markText: 'Mark when boss captured',
      spawningText: 'Boss spawning in',
    },
    {
      type: 'bruiser',
      firstSpawn: 150,
      repeatSpawn: 240,
      title: 'Left Bruiser',
      markText: 'Mark when bruiser camp captured',
      spawningText: 'Left Bruiser spawning in',
    },
    {
      type: 'bruiser',
      firstSpawn: 150,
      repeatSpawn: 240,
      title: 'Right Bruiser',
      markText: 'Mark when bruiser camp captured',
      spawningText: 'Right Bruiser spawning in',
    },
    {
      type: 'bruiser',
      firstSpawn: 150,
      repeatSpawn: 240,
      title: 'Bottom Bruiser',
      markText: 'Mark when bruiser camp captured',
      spawningText: 'Bottom Bruiser spawning in',
    },
    {
      type: 'siege',
      firstSpawn: 120,
      repeatSpawn: 180,
      title: 'Left Siege',
      markText: 'Mark when siege camp captured',
      spawningText: 'Left Siege spawning in',
    },
    {
      type: 'siege',
      firstSpawn: 120,
      repeatSpawn: 180,
      title: 'Right Siege',
      markText: 'Mark when siege camp captured',
      spawningText: 'Right Siege spawning in',
    },
  ],
  braxis: [
    {
      type: 'map',
      firstSpawn: 120,
      repeatSpawn: 115,
      title: 'Beacons',
      markText: 'Mark when both zerg swarms eliminated',
      spawningText: 'Beacons activating in',
    },
  ],
  cursed: [
  ],
  dragon: [
    {
      type: 'map',
      firstSpawn: 75,
      repeatSpawn: 120,
      title: 'Shrines',
      markText: 'Mark when the dragon knight eliminated',
      spawningText: 'Shrines activating in',
    },
  ],
  garden: [
    {
      type: 'map',
      firstSpawn: 90,
      repeatSpawn: 200,
      title: 'Night Phase',
      markText: 'Mark when all plant monsters eliminated',
      spawningText: 'Night Phase comes in',
    },
  ],
  mines: [
    {
      type: 'map',
      firstSpawn: 120,
      repeatSpawn: 120,
      title: 'Mines Open',
      markText: 'Mark when both golems eliminated',
      spawningText: 'Mines open in',
    },
  ],
  shrines: [
    {
      type: 'map',
      firstSpawn: 115,
      repeatSpawn: 115,
      title: 'Infernal Shrine',
      markText: 'Mark when the punisher eliminated',
      spawningText: 'Shrine activating in',
    },
  ],
  temple: [
    {
      type: 'map',
      firstSpawn: 90,
      repeatSpawn: 120,
      title: 'Temples',
      markText: 'Mark when all temples clear',
      spawningText: 'Temples activating in',
    },
  ],
  tomb: [
    {
      type: 'map',
      firstSpawn: 30,
      repeatSpawn: 15,
      title: 'Altars',
      markText: 'Mark when all spider queens eliminated',
      spawningText: 'Altars activating in',
    },
  ],
  towers: [
    {
      type: 'map',
      firstSpawn: 110,
      repeatSpawn: 110,
      title: 'Altars',
      markText: 'Mark when all altars captured',
      spawningText: 'Altars activating in',
    },
  ],
  warhead: [
    {
      type: 'map',
      firstSpawn: 120,
      repeatSpawn: 175,
      title: 'Warheads',
      markText: 'Mark when all warheads collected',
      spawningText: 'Warheads spawning in',
    },
  ],
};
