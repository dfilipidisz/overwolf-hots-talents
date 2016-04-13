import { TEAMCOMP_DATA_FETCH } from '../constants';

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
      method: 'GET', 
      headers: {
        //Accept: 'application/json',
        //'Content-Type': 'application/json'
      }
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