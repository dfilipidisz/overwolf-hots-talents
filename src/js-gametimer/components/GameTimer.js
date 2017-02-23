import React from 'react';
import { connect } from 'react-redux';
import HOCWindowId from '../../js/components/HOCWindowId';
import { HOCMove } from './HOCMove';
import OWResize from '../../js/components/OWResize';
import { debounce } from '../../js/utility';
import TimeHandler from './TimeHandler';
import MapSelector from './MapSelector';
import MapObjectives from './MapObjectives';

class GameTimer extends React.Component {

  constructor() {
    super();

    this.updateSize = this.updateSize.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', debounce(this.resizeHandler, 32), false);

    this.updateSize(window.innerWidth);
  }

  resizeHandler() {
    this.updateSize(window.innerWidth);
  }

  updateSize(paramWidth) {
    if (this.contentArea) {
      setTimeout(() => {
        overwolf.windows.changeSize(
          this.props.windowId,
          paramWidth || this.contentArea.clientWidth,
          this.contentArea.clientHeight);
      }, 100);
    }
  }

  closeWindow() {
    overwolf.windows.close(this.props.windowId);
  }

  render() {
    return (
      <div id='root-inner' ref={ (el) => { this.contentArea = el; } }>
        <div className='gametimer-toolbar'>
          <div className='map-time'>
            Map Time: {this.props.clock}
          </div>
          <div className='close-window' onClick={ this.closeWindow }>
            <i className='fa fa-close' />
          </div>
        </div>
        <MapSelector updateSize={ this.updateSize } />
        <div className='container-fluid'>
          <div className='row'>
            <MapObjectives />
          </div>
        </div>
        <TimeHandler />
      </div>
    );
  }
}

export default connect(
  state => ({
    clock: state.timer.clock,
  })
)(HOCWindowId(HOCMove(OWResize(GameTimer))));
