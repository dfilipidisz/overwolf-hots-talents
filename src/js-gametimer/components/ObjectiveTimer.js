import React from 'react';
import { toSmallClock } from '../utility';

class ObjectiveTimer extends React.Component {
  constructor() {
    super();

    this.resetObjective = this.resetObjective.bind(this);

    this.state = {
      isObjectiveUp: false,
      resetTime: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.secondsPassed === 0 && this.props.secondsPassed !== 0) {
      this.setState({ isObjectiveUp: false, resetTime: 0 });
    }

    if ((this.state.resetTime === 0 &&
        this.state.resetTime + this.props.firstSpawn === nextProps.secondsPassed) ||
        (this.state.resetTime > 0 &&
        this.state.resetTime + this.props.repeatSpawn === nextProps.secondsPassed)) {
      this.setState({ isObjectiveUp: true });
    }
  }

  resetObjective() {
    this.setState({ resetTime: this.props.secondsPassed, isObjectiveUp: false });
  }

  render() {
    if (this.state.isObjectiveUp) {
      return (
        <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
          <div className={ `objective-timer ${this.props.type}` }>
            <div className='objective-title'>
              {this.props.title}
            </div>
            <div className='objective-marker' onClick={ this.resetObjective }>
              <div className='objective-marker-icon'>
                <i className='fa fa-hand-pointer-o' />
              </div>
              {this.props.markText}
            </div>
          </div>
        </div>
      );
    }

    const timeFull = this.state.resetTime === 0 ? this.props.firstSpawn : this.props.repeatSpawn;
    const timeLeft = this.state.resetTime === 0
      ? (this.state.resetTime + this.props.firstSpawn) - this.props.secondsPassed
      : (this.state.resetTime + this.props.repeatSpawn) - this.props.secondsPassed;
    const timePercent = Math.round((timeLeft / timeFull) * 100);

    return (
      <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
        <div className={ `objective-timer ${this.props.type}` }>
          <div className='objective-upper-container'>
            {this.props.spawningText}
            <div className='objective-countdown'>
              {toSmallClock(timeLeft)}
            </div>
          </div>
          <div className='objective-progress'>
            <div className='objective-progress-bar' style={ { right: `${timePercent}%` } } />
          </div>
        </div>
      </div>
    );
  }
}

ObjectiveTimer.propTypes = {
  firstSpawn: React.PropTypes.number,
  repeatSpawn: React.PropTypes.number,
  secondsPassed: React.PropTypes.number,
  title: React.PropTypes.string,
  markText: React.PropTypes.string,
  spawningText: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default ObjectiveTimer;
