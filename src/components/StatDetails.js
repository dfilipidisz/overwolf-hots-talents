import React from 'react';
import { connect } from 'react-redux';

const SingleTalent = ({ data, hero, type }) => {
  return (
    <div className='single-talent'>
      <div className='img'>
        <div className={`talent-pic ${hero} ${data.id}`} />
      </div>
      <div className='name'>
        <span>{data.title}</span>
      </div>
      <div className='value'>
        <span>{data[type]}%</span>
      </div>
    </div>
  );
};

const StatDetails = ({ open, close, lvl, data, selectedHero, heroTalentFilter }) => {
  if (!open) {
    return null;
  }

  const levelData = data[selectedHero][`lvl${lvl}`].slice(0);

  levelData.sort((a, b) => {
    if (parseFloat(a[heroTalentFilter]) < parseFloat(b[heroTalentFilter])) { return 1; }
    if (parseFloat(a[heroTalentFilter]) > parseFloat(b[heroTalentFilter])) { return -1; }
    return 0;
  });

  return (
    <div className='stat-details'>
      <div className='stat-details-header'>
        Stat details for level {lvl} talents
        <div className='close-stat-details'>
          <i className='fa fa-remove' onClick={close} />
        </div>
      </div>
      <div style={{marginTop: '10px'}}>
        {levelData.map((talent) => {
          return <SingleTalent key={talent.id} data={talent} hero={selectedHero} type={heroTalentFilter} />;
        })}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    heroTalentFilter: state.app.heroTalentFilter,
  })
)(StatDetails);
