import React from 'react';
import { connect } from 'react-redux';
import { OWResize } from './OWResize';
import { OWMove } from './OWMove';
import { HideApp } from './HideApp';
import Toolbar from './Toolbar';
import SecondaryToolbar from './SecondaryToolbar';
import PageMinimized from './PageMinimized';
import PageTalents from './PageTalents';
import PageFeedback from './PageFeedback';
import PageAbout from './PageAbout';
import { PAGES } from '../constants';
import Footer from './Footer';
import PageSettings from './PageSettings';
import { getUser } from '../actions/user';
import { initLed } from '../actions/led';

const { navigateTo } = require('../actions/navigation');
const { talentsNavigateTo } = require('../actions/talents');

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.updateWindowSize = this._updateWindowSize.bind(this);
  }

  componentDidMount() {
    if (this.props.username === null) {
      this.props.getUser();
    }

    window.requestAnimationFrame(this.updateWindowSize);

    this.props.initLed();
  }

  _updateWindowSize() {
    overwolf.windows.getCurrentWindow((result) => {
      if (result.status === 'success') {
        overwolf.windows.changeSize(
          result.window.id, result.window.width, document.body.clientHeight);
      }
    });
    window.requestAnimationFrame(this.updateWindowSize);
  }

  render() {
    if (this.props.page === PAGES.MINIMIZED) {
      return (
        <PageMinimized />
      );
    } else if (this.props.page === PAGES.TALENTS) {
      return (
        <div id='app-border'>
          <Toolbar />
          <SecondaryToolbar
            page={ this.props.talentsPage }
            navigateTo={ this.props.talentsNavigateTo }
          />
          <PageTalents />
          <Footer />
        </div>
      );
    } else if (this.props.page === PAGES.FEEDBACK) {
      return (
        <div id='app-border'>
          <Toolbar />
          <PageFeedback />
          <Footer />
        </div>
      );
    } else if (this.props.page === PAGES.ABOUT) {
      return (
        <div id='app-border'>
          <Toolbar />
          <PageAbout navigateTo={ this.props.navigateTo } />
          <Footer />
        </div>
      );
    } else if (this.props.page === PAGES.SETTINGS) {
      return (
        <div id='app-border'>
          <Toolbar />
          <PageSettings />
          <Footer />
        </div>
      );
    }
    return null;
  }
}

Main.propTypes = {
  username: React.PropTypes.string,
  page: React.PropTypes.string,
  talentsPage: React.PropTypes.string,
  getUser: React.PropTypes.func,
  initLed: React.PropTypes.func,
  navigateTo: React.PropTypes.func,
  talentsNavigateTo: React.PropTypes.func,
};

module.exports = connect(
  state => ({
    page: state.navigation.page,
    talentsPage: state.talents.page,
    username: state.user.username,
  }),
  { navigateTo, talentsNavigateTo, getUser, initLed }
)(HideApp(OWMove(OWResize(Main))));
