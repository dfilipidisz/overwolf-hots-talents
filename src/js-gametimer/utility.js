export const toClock = (secondsPassed) => {
  let clock = '';
  const M = Math.floor(secondsPassed / 60);
  const S = secondsPassed - (M * 60);

  clock += M < 10 ? `0${M}` : M;
  clock += ':';
  clock += S < 10 ? `0${S}` : S;

  return clock;
};

export const toSmallClock = (secondsPassed) => {
  let clock = '';
  const M = Math.floor(secondsPassed / 60);
  const S = secondsPassed - (M * 60);

  clock += `${M}:`;
  clock += S < 10 ? `0${S}` : S;

  return clock;
};
