import { TEAMCOMP_DATA_FETCH, CHANGE_FILTER, COMP_ADD_HERO, COMP_REMOVE_HERO } from '../constants';

function fetchStart() {
  return {
    type: TEAMCOMP_DATA_FETCH,
    status: 'loading'
  };
}

function fetchDone(data) {
  return {
    type: TEAMCOMP_DATA_FETCH,
    status: 'done',
    data: data
  };
}

function fetchError(error) {
  return {
    type: TEAMCOMP_DATA_FETCH,
    status: 'error',
    error: error
  };
}

export function fetchTeamcompData() {
  console.log('Start fetching teamcomp data');
  
  return function (dispatch) {
    
    console.log('Dispacth request');
    dispatch(fetchStart());
    
    let fetchInit = {
      method: 'GET'
    };
    
    return fetch('https://raw.githubusercontent.com/dfilipidisz/hotslogs-scraper/master/teamcomp.json', fetchInit)
      .then(response => response.json())
      .then((res) => { 
        console.log('Got data');
        console.log(res);
        dispatch(fetchDone(res));    
      })
      .catch((error) => {
        console.log('Network error: ' + error);
        dispatch(fetchError('Network error: ' + error));  
      });
  };
}

function changeFilterEvent(value) {
  return {
    type: CHANGE_FILTER,
    value: value
  };
}
  
export function changeFilter(value) {
  return function(dispatch) {
    dispatch(changeFilterEvent(value));
  }
}
  
function compAddHeroEvent(hero) {
  return {
    type: COMP_ADD_HERO,
    hero: hero
  };
}
  
export function compAddHero(hero) {
  return function(dispatch) {
    dispatch(compAddHeroEvent(hero));
  }
}
  
function compRemoveHeroEvent(hero) {
  return {
    type: COMP_REMOVE_HERO,
    hero: hero
  };
}
  
export function compRemoveHero(hero) {
  return function(dispatch) {
    dispatch(compRemoveHeroEvent(hero));
  }
}