import * as constants from '../constants';

const initialState = {
  builds: null,
  favorites: null
};

export default function update (state = initialState, action) {
  if (action.type === constants.LOAD_ALL_BUILDS) {
    return Object.assign({}, state, {
      builds: action.data.builds,
      favorites: action.data.favorites
    });
  }
  else if (action.type === constants.ADD_NEW_BUILD) {
    const newBuilds = state.builds.slice(0);

    newBuilds.push(action.build);

    return Object.assign({}, state, {
      builds: newBuilds
    });
  }
  else if (action.type === constants.UPDATE_BUILD) {
    const newBuilds = state.builds.slice(0);
    const bIndex = newBuilds.findIndex((el) => {return el._id === action.id;});
    newBuilds[bIndex] = Object.assign({}, newBuilds[bIndex], action.part);

    return Object.assign({}, state, {
      builds: newBuilds
    });
  }
  else if (action.type === constants.DELETE_BUILD) {
    const newBuilds = state.builds.slice(0);
    const bIndex = newBuilds.findIndex((el) => {return el._id === action.id;});
    newBuilds.splice(bIndex, 1);

    return Object.assign({}, state, {
      builds: newBuilds
    });
  }
  else if (action.type === constants.FAVORITE_BUILD || action.type === constants.UNFAVORITE_BUILD) {
    return Object.assign({}, state, {
      favorites: action.favorites
    });
  }
  return state;
}
