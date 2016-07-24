import * as constants from '../constants';

const initialState = {
  mybuilds: null
};

export default function update (state = initialState, action) {
  if (action.type === constants.LOAD_MY_BUILDS) {
    return Object.assign({}, state, {
      mybuilds: action.builds || []
    });
  }
  else if (action.type === constants.ADD_NEW_BUILD) {
    let newMyBuilds;
    if (state.mybuilds === null) {
      newMyBuilds = [];
    }
    else {
      newMyBuilds = state.mybuilds.slice(0);
    }

    newMyBuilds.push(action.build);

    return Object.assign({}, state, {
      mybuilds: newMyBuilds
    });
  }
  return state;
}
