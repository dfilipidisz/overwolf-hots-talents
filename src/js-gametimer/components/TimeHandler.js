import React from 'react';
import { connect } from 'react-redux';
import { startTimer, stopTimer, resetTimer, updateClock } from '../actions/timer';

class TimeHandler extends React.Component {

  constructor() {
    super();

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.tick = this.tick.bind(this);

    this.intervalId = null;
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startTimer() {
    this.props.startTimer(Date.now());
    this.intervalId = setInterval(this.tick, 1000);
  }

  stopTimer() {
    this.props.stopTimer(Date.now());
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resetTimer() {
    this.props.resetTimer();
  }

  tick() {
    this.props.updateClock(Date.now() - this.props.startTime);
  }

  render() {
    let timerBtn = null;

    if (this.props.status === 'default') {
      timerBtn = (
        <button
          className='btn btn-primary btn-block timer-btn'
          disabled={ this.props.selectedMap === null }
          onClick={ this.startTimer }
          style={ this.props.selectedMap === null ? { marginTop: '210px' } : null }
        >
          Start
        </button>
      );
    } else if (this.props.status === 'rolling') {
      timerBtn = (
        <button
          className='btn btn-danger btn-block timer-btn'
          onClick={ this.stopTimer }
          style={ this.props.selectedMap === null ? { marginTop: '210px' } : null }
        >
          Stop
        </button>
      );
    } else if (this.props.status === 'done') {
      timerBtn = (
        <button
          className='btn btn-success btn-block timer-btn'
          onClick={ this.resetTimer }
          style={ this.props.selectedMap === null ? { marginTop: '210px' } : null }
        >
          Reset
        </button>
      );
    }

    return (
      <div className='time-handler'>
        {timerBtn}
      </div>
    );
  }
}

export default connect(
  state => ({
    selectedMap: state.map.selectedMap,
    status: state.timer.status,
    startTime: state.timer.startTime,
  }),
  { startTimer, stopTimer, resetTimer, updateClock }
)(TimeHandler);
