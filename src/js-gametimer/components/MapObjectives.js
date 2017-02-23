import React from 'react';
import { connect } from 'react-redux';
import { OBJECTIVES } from '../constants';
import ObjectiveTimer from './ObjectiveTimer';

class MapObjectives extends React.Component {

  render() {
    if (this.props.selectedMap === null) {
      return null;
    }

    return (
      <div className='col-lg-12 col-md-12 col-sm-12'>
        <div className='row'>
          {OBJECTIVES[this.props.selectedMap.value].map((objective) => {
            return (
              <ObjectiveTimer
                key={ objective.title }
                secondsPassed={ this.props.secondsPassed }
                { ...objective }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

MapObjectives.propTypes = {
  selectedMap: React.PropTypes.object,
  secondsPassed: React.PropTypes.number,
};

export default connect(
  state => ({
    selectedMap: state.map.selectedMap,
    secondsPassed: state.timer.secondsPassed,
  })
)(MapObjectives);
