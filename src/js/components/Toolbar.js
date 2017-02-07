import React from 'react';
import { connect } from 'react-redux';
import { PAGES } from '../constants';
import { navigateTo, minimizeApp } from '../actions/navigation';

class Toolbar extends React.Component {

  constructor() {
    super();

    this.openTalents = this.openTalents.bind(this);
    this.openFeedback = this.openFeedback.bind(this);
    this.openAbout = this.openAbout.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.closeApp = this.closeApp.bind(this);
    this.dragWindow = this.dragWindow.bind(this);
  }

  closeApp() {
    overwolf.windows.close(this.props.windowId);
  }

  dragWindow() {
    overwolf.windows.dragMove(this.props.windowId);
  }

  openTalents() {
    this.props.navigateTo(PAGES.TALENTS);
    this.props.updateSize();
  }

  openFeedback() {
    this.props.navigateTo(PAGES.FEEDBACK);
    this.props.updateSize();
  }

  openAbout() {
    this.props.navigateTo(PAGES.ABOUT);
    this.props.updateSize();
  }

  openSettings() {
    this.props.navigateTo(PAGES.SETTINGS);
    this.props.updateSize();
  }

  render() {
    const { page, autoClose } = this.props;

    return (
      <div id='toolbar' onMouseDown={ this.dragWindow } >
        <ul>
          <li className={ page === PAGES.TALENTS ? 'active' : null } onClick={ this.openTalents }>TALENTS</li>
          <li className={ page === PAGES.FEEDBACK ? 'active' : null } onClick={ this.openFeedback }>FEEDBACK</li>
          <li className={ page === PAGES.ABOUT ? 'active' : null } onClick={ this.openAbout }>ABOUT</li>
        </ul>
        <div className='app-ops'>
          <ul>
            <li onClick={ this.closeApp }><i className='fa fa-close' /></li>
            <li className={ page === PAGES.SETTINGS ? 'active' : null } onClick={ this.openSettings }><i className='fa fa-cog' /></li>
            {!autoClose
              ? <li onClick={ this.props.minimizeApp }><i className='fa fa-minus' /></li>
              : null}
          </ul>
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  navigateTo: React.PropTypes.func,
  updateSize: React.PropTypes.func,
  minimizeApp: React.PropTypes.func,
  windowId: React.PropTypes.string,
  page: React.PropTypes.string,
  autoClose: React.PropTypes.bool,
};

export default connect(
  state => ({ page: state.navigation.page, autoClose: state.settings.autoClose }),
  { navigateTo, minimizeApp }
)(Toolbar);
