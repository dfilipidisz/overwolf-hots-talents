import { TALENTS_NAVIGATE_TO, TALENTS_START_FETCH, TALENTS_SUCCESSFUL_FETCH, TALENTS_CHOOSE_HERO, TALENTS_OPEN_TALENT_LEVEL, TALENTS_CLOSE_TALENT_LEVEL } from '../constants';

export function talentsNavigateTo(page) {
  return {
    type: TALENTS_NAVIGATE_TO,
    page,
  };
}

export function talentsChooseHero(hero) {
  return {
    type: TALENTS_CHOOSE_HERO,
    hero,
  };
}

const _openTalentLevel = (lvlIndex) => {
  return {
    type: TALENTS_OPEN_TALENT_LEVEL,
    lvlIndex,
  };
};

const _closeTalentLevel = (lvlIndex) => {
  return {
    type: TALENTS_CLOSE_TALENT_LEVEL,
    lvlIndex,
  };
};

export const openTalentLevel = (lvl) => {
  return (dispatch) => {
    switch (lvl) {
      case 1: dispatch(_openTalentLevel(0)); break;
      case 4: dispatch(_openTalentLevel(1)); break;
      case 7: dispatch(_openTalentLevel(2)); break;
      case 10: dispatch(_openTalentLevel(3)); break;
      case 13: dispatch(_openTalentLevel(4)); break;
      case 16: dispatch(_openTalentLevel(5)); break;
      case 20: dispatch(_openTalentLevel(6)); break;
    }
  };
};

export const closeTalentLevel = (lvl) => {
  return (dispatch) => {
    switch (lvl) {
      case 1: dispatch(_closeTalentLevel(0)); break;
      case 4: dispatch(_closeTalentLevel(1)); break;
      case 7: dispatch(_closeTalentLevel(2)); break;
      case 10: dispatch(_closeTalentLevel(3)); break;
      case 13: dispatch(_closeTalentLevel(4)); break;
      case 16: dispatch(_closeTalentLevel(5)); break;
      case 20: dispatch(_closeTalentLevel(6)); break;
    }
  };
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function talentFetch() {
  return {
    type: TALENTS_START_FETCH,
  };
}

function talentDataArrived(payload) {
  return {
    type: TALENTS_SUCCESSFUL_FETCH,
    data: payload,
  };
}

export function fetchTalentData() {
  return function (dispatch) {
    dispatch(talentFetch());

    const fetchInit = {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json'
      },
    };

    return fetch('http://hots-tool.ddns.net/public/data_v2.json', fetchInit)
      .then(checkStatus)
      .then(response => response.json())  // parse json
      .then((res) => {
        dispatch(talentDataArrived(res));
      })
      .catch((error) => {
        console.log(`Network error: ${error}`);
      });
  };
}
