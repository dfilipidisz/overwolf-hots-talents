import * as constants from '../constants';

const initialState = {
  mybuilds: null,
  favorites: null,
  allbuilds: null
};

export default function update (state = initialState, action) {
  if (action.type === constants.LOAD_MY_BUILDS) {
    return Object.assign({}, state, {
      mybuilds: action.builds || []
    });
  }
  else if (action.type === constants.LOAD_MY_FAVORITES) {
    return Object.assign({}, state, {
      favorites: action.builds || []
    });
  }
  else if (action.type === constants.LOAD_ALL_BUILDS) {
    return Object.assign({}, state, {
      allbuilds: action.builds || []
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
  else if (action.type === constants.UPDATE_BUILD) {
    const newMyBuilds = state.mybuilds.slice(0);
    const bIndex = newMyBuilds.findIndex((el) => {return el._id === action.id;});
    newMyBuilds[bIndex] = Object.assign({}, newMyBuilds[bIndex], action.part);

    return Object.assign({}, state, {
      mybuilds: newMyBuilds
    });
  }
  else if (action.type === constants.DELETE_BUILD) {
    const newMyBuilds = state.mybuilds.slice(0);
    const bIndex = newMyBuilds.findIndex((el) => {return el._id === action.id;});
    newMyBuilds.splice(bIndex, 1);

    return Object.assign({}, state, {
      mybuilds: newMyBuilds
    });
  }
  else if (action.type === constants.FAVORITE_BUILD) {
    return Object.assign({}, state, {
      favorites: action.builds.slice(0)
    });
  }
  else if (action.type === constants.UNFAVORITE_BUILD) {
    return Object.assign({}, state, {
      favorites: action.builds.slice(0)
    });
  }
  return state;
}
