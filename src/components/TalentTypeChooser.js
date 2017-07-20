import React from 'react';
import { connect } from 'react-redux';
import { changeHeroTalentFilter } from '../actions/app';

class TalentTypeChooser extends React.Component {
  constructor() {
    super();

    this.switchFilter = this.switchFilter.bind(this);
  }

  switchFilter(e) {
    this.props.changeHeroTalentFilter(e.currentTarget.dataset.type);
  }

  render () {
    const { heroTalentFilter } = this.props;

    return (
      <div className='talent-type-chooser clearfix'>
        <div className={`switch ${heroTalentFilter === 'popularity' ? 'active' : ''}`} data-type="popularity" onClick={this.switchFilter}>
          popularity
        </div>
        <div className={`switch ${heroTalentFilter === 'winrate' ? 'active' : ''}`} data-type="winrate" onClick={this.switchFilter}>
          winrate
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    heroTalentFilter: state.app.heroTalentFilter,
  }),
  { changeHeroTalentFilter }
)(TalentTypeChooser);
