import { TEAMCOMP_DATA_FETCH, CHANGE_FILTER, COMP_ADD_HERO, COMP_REMOVE_HERO } from '../constants';

const initialState = {
  data: null,
  fetch: 'loading',
  error: null,
  filter: '',
  comp: []
}

export default function update(state = initialState, action) {
  if(action.type === TEAMCOMP_DATA_FETCH) {
    if (action.status === 'loading') {
      return Object.assign({}, state, {
        fetch: 'loading'
      });
    }
    else if (action.status === 'done') {
      return Object.assign({}, state, {
        data: action.data,
        fetch: 'done'
      });
    }
    else if (action.status === 'error') {
      return Object.assign({}, state, {
        fetch: 'error',
        error: action.error
      });
    }
    else {
      return state;
    }
  }
  else if (action.type === CHANGE_FILTER) { 
    return Object.assign({}, state, {
      filter: action.value
    });
  }
  else if (action.type === COMP_ADD_HERO) { 
    
    let newComp;
    if (state.comp.length <= 4) {
      newComp = [...state.comp, action.hero];
    }
    else {
      newComp = [...state.comp];
    }
    
    return Object.assign({}, state, {
      comp: newComp
    });
  }
  else if (action.type === COMP_REMOVE_HERO) { 
    
    let newComp = state.comp.slice();
    newComp.splice(newComp.indexOf(action.hero), 1);
    
    return Object.assign({}, state, {
      comp: newComp
    });
  }
  
  //Unhandled action
  return state;
}
