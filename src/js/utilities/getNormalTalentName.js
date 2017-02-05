import getSimpleTalentName from './getSimpleTalentName';

export default (talent, data) => {
  const lvls = ['1', '4', '7', '10', '13', '16', '20'];

  for (let i = 0; i < lvls.length; i++) {
    for (let j = 0; j < data[`lvl${lvls[i]}`].length; j++) {
      if (getSimpleTalentName(data[`lvl${lvls[i]}`][j].title) === talent) {
        return data[`lvl${lvls[i]}`][j].title;
      }
    }
  }

  return talent;
};
