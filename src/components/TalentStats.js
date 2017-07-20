import React from 'react';
import { connect } from 'react-redux';
import AppPopup from './AppPopup';

const lvls = ['1', '4', '7', '10', '13', '16', '20'];

const GraphIcon = ({lvl, openStatDetails}) => {
  const open = () => {
    openStatDetails(lvl);
  };

  return (
    <i className='fa fa-line-chart' onClick={open} />
  );
};

const TalentStats = ({ data, selectedHero, heroTalentFilter, openStatDetails }) => {
  const hero = data[selectedHero];

  const makeRow = (lvl) => {

    let topTalent = null;

    let topp = 0;
    hero[`lvl${lvl}`].forEach((talent) => {
      if (parseFloat(talent[heroTalentFilter]) > topp) {
        topp = parseFloat(talent[heroTalentFilter]);
        topTalent = Object.assign({}, talent);
      }
    });

    return (
      <div className='talent-row' key={`${lvl}-${heroTalentFilter}`}>
        <div className='lvl'><span>{lvl}</span></div>

        <div className='talent-holder clearfix'>
          <div className='img-holder'>
            <AppPopup
              position='right center'
              title={topTalent.title}
            >
              <div className={`talent-pic ${selectedHero} ${topTalent.id}`} />
            </AppPopup>
          </div>
          <div className='text-holder'>
            <p>{heroTalentFilter === 'popularity' ? 'picked' : 'won'}</p>
            <p>% of time</p>
          </div>
          <div className='value-holder'>
            <span>{topTalent[heroTalentFilter]}%</span>
          </div>
          <div className='action-holder'>
            <GraphIcon lvl={lvl} openStatDetails={openStatDetails} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='talent-stats'>
      {lvls.map((lvl) => {
        return makeRow(lvl);
      })}
    </div>
  );
}

export default connect(
  state => ({
    heroTalentFilter: state.app.heroTalentFilter,
  })
)(TalentStats);
