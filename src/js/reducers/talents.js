import { TALENTS_NAVIGATE_TO, TALENTS_START_FETCH, TALENTS_SUCCESSFUL_FETCH, TALENTS_PAGES, TALENTS_CHOOSE_HERO, TALENTS_OPEN_TALENT_LEVEL, TALENTS_CLOSE_TALENT_LEVEL } from '../constants';

const initialState = {
  page: TALENTS_PAGES.POPULARITY,
  isFetching: false,
  data: null,
  heroes: [],
  selectedHero: null,
  talentsClosed: [true, true, true, true, true, true, true],
};

function getHeroesFromData(data) {
  const arr = [];

  Object.keys(data).forEach((key) => {
    arr.push(key);
  });

  return arr;
}

export default function update(state = initialState, action) {
  if (action.type === TALENTS_NAVIGATE_TO) {
    return {
      page: action.page,
      isFetching: state.isFetching,
      data: state.data,
      heroes: state.heroes,
      selectedHero: state.selectedHero,
      talentsClosed: state.talentsClosed,
    };
  } else if (action.type === TALENTS_START_FETCH) {
    return {
      page: state.page,
      isFetching: true,
      data: state.data,
      heroes: state.heroes,
      selectedHero: state.selectedHero,
      talentsClosed: state.talentsClosed,
    };
  } else if (action.type === TALENTS_SUCCESSFUL_FETCH) {
    return {
      page: state.page,
      isFetching: false,
      data: action.data,
      heroes: getHeroesFromData(action.data),
      selectedHero: state.selectedHero,
      talentsClosed: state.talentsClosed,
    };
  } else if (action.type === TALENTS_CHOOSE_HERO) {
    return {
      page: state.page,
      isFetching: false,
      data: state.data,
      heroes: state.heroes,
      selectedHero: action.hero,
      talentsClosed: state.talentsClosed,
    };
  } else if (action.type === TALENTS_OPEN_TALENT_LEVEL) {
    const newTalentsClosed = [
      state.talentsClosed[0],
      state.talentsClosed[1],
      state.talentsClosed[2],
      state.talentsClosed[3],
      state.talentsClosed[4],
      state.talentsClosed[5],
      state.talentsClosed[6],
    ];
    newTalentsClosed[action.lvlIndex] = false;
    return {
      page: state.page,
      isFetching: false,
      data: state.data,
      heroes: state.heroes,
      selectedHero: state.selectedHero,
      talentsClosed: newTalentsClosed,
    };
  } else if (action.type === TALENTS_CLOSE_TALENT_LEVEL) {
    const newTalentsClosed = [
      state.talentsClosed[0],
      state.talentsClosed[1],
      state.talentsClosed[2],
      state.talentsClosed[3],
      state.talentsClosed[4],
      state.talentsClosed[5],
      state.talentsClosed[6],
    ];
    newTalentsClosed[action.lvlIndex] = true;
    return {
      page: state.page,
      isFetching: false,
      data: state.data,
      heroes: state.heroes,
      selectedHero: state.selectedHero,
      talentsClosed: newTalentsClosed,
    };
  }
  return state;
}
