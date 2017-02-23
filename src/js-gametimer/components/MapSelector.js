import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { MAPS } from '../constants';
import { changeMap } from '../actions/map';

class MapSelector extends React.Component {
  constructor() {
    super();

    this.changeMap = this.changeMap.bind(this);
  }

  changeMap(obj) {
    this.props.changeMap(obj);
    this.props.updateSize();
  }

  render() {
    return (
      <div className='map-selector'>
        {this.props.status === 'default'
          ?
            <Select
              options={ Object.keys(MAPS).map(m => ({ value: m, label: MAPS[m] })) }
              value={ this.props.selectedMap }
              placeholder='Select Map'
              onChange={ this.changeMap }
            />
          : <p>{MAPS[this.props.selectedMap.value]}</p>}
      </div>
    );
  }
}

export default connect(
  state => ({
    selectedMap: state.map.selectedMap,
    status: state.timer.status,
  }),
  { changeMap }
)(MapSelector);
