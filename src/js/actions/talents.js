import { TALENTS_NAVIGATE_TO, TALENTS_START_FETCH, TALENTS_SUCCESSFUL_FETCH, TALENTS_CHOOSE_HERO, TALENTS_OPEN_TALENT_LEVEL, TALENTS_CLOSE_TALENT_LEVEL } from '../constants';

export function talentsNavigateTo(page) {
  return {
    type: TALENTS_NAVIGATE_TO,
    page: page
  }
}

export function talentsChooseHero(hero) {
  return {
    type: TALENTS_CHOOSE_HERO,
    hero: hero
  }
}

export function openTalentLevel(lvlIndex) {
  return {
    type: TALENTS_OPEN_TALENT_LEVEL,
    lvlIndex: lvlIndex
  }
}
export function closeTalentLevel(lvlIndex) {
  return {
    type: TALENTS_CLOSE_TALENT_LEVEL,
    lvlIndex: lvlIndex
  }
}
  
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } 
  
  let error = new Error(response.statusText);
  error.response = response;
  throw error;
}
  
function talentFetch() {
  return {
    type: TALENTS_START_FETCH
  };
}

function talentDataArrived(payload) {
  for (let hero in payload) {
    if (!payload.hasOwnProperty(hero)) {
      continue;
    }

    for (let lvl in payload[hero]) {
      if (!payload[hero].hasOwnProperty(lvl) || lvl === 'popularBuilds') {
        continue;
      }

      for (let i = 0, tot = payload[hero][lvl].length; i < tot; ++i) {
        payload[hero][lvl][i].key = i + 1;
      }
    }
  }

  return {
    type: TALENTS_SUCCESSFUL_FETCH,
    data: payload
  };
}
  
export function fetchTalentData() {
  console.log('Start fetching talent data');
  
  return function (dispatch) {
    
    console.log('Dispacth request');
    dispatch(talentFetch());
    
    let fetchInit = {
      method: 'GET', 
      headers: {
        //Accept: 'application/json',
        //'Content-Type': 'application/json'
      }
    };
    
    return fetch('https://raw.githubusercontent.com/dfilipidisz/hotslogs-scraper/master/data.json', fetchInit)
      .then(checkStatus)
      .then(response => response.json())  //parse json
      .then((res) => { 
        console.log('Got data');
        console.log(res);
        dispatch(talentDataArrived(res));    
      })
      .catch((error) => {
        console.log('Network error: ' + error);
      });
  };
}
