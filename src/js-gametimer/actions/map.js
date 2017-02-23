import { SELECT_MAP } from '../constants';

const _selectMap = function (value) {
  return {
    type: SELECT_MAP,
    value,
  };
};

export const changeMap = function (value) {
  return function (dispatch) {
    return dispatch(_selectMap(value));
  };
};
