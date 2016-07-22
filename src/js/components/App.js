import React from 'react';
import { OWResize } from './OWResize';
import { OWMove } from './OWMove';
import { HideApp } from './HideApp';
const Toolbar = require('./Toolbar');
const SecondaryToolbar = require('./SecondaryToolbar');
const PageMinimized = require('./PageMinimized');
const PageTalents = require('./PageTalents');
import PageFeedback from './PageFeedback';
const PageAbout = require('./PageAbout');
const PageTeamcomp = require('./PageTeamcomp');
import { PAGES } from '../constants';
const Footer = require('./Footer');

const { navigateTo } = require('../actions/navigation');
const { talentsNavigateTo } = require('../actions/talents');

import { connect } from 'react-redux';

import { getUser } from '../actions/user';

class Main extends React.Component {

  constructor (props) {
    super(props);

    this.updateWindowSize = this._updateWindowSize.bind(this);
  }

  componentDidMount () {
    if (this.props.username === null) {
      this.props.getUser();
    }

    window.requestAnimationFrame(this.updateWindowSize);
  }

  _updateWindowSize () {
    overwolf.windows.getCurrentWindow(function(result) {
      if (result.status === 'success') {
        overwolf.windows.changeSize(result.window.id, result.window.width, document.body.clientHeight);
      }
    });
    window.requestAnimationFrame(this.updateWindowSize);
  }

  render() {
    let children = null;
    if (this.props.page === PAGES.MINIMIZED) {
      return (
        <PageMinimized />
      );
    }
    else if (this.props.page === PAGES.TALENTS) {
      return (
        <div id='app-border'>
          <Toolbar />
          <SecondaryToolbar page={this.props.talentsPage} navigateTo={this.props.talentsNavigateTo} />
          <PageTalents />
          <Footer />
        </div>
      );
    }
    else if (this.props.page === PAGES.FEEDBACK) {
      return (
        <div id='app-border'>
          <Toolbar />
          <PageFeedback />
          <Footer />
        </div>
      );
    }
    else if (this.props.page === PAGES.ABOUT) {
      return (
        <div id='app-border'>
          <Toolbar />
          <PageAbout navigateTo={this.props.navigateTo} />
          <Footer />
        </div>
      );
    }
    else if (this.props.page === PAGES.TEAMCOMP) {
      return (
        <div id='app-border'>
          <Toolbar />
          <PageTeamcomp />
          <Footer />
        </div>
      );
    }
    else {
      return null;
    }

  }
}

module.exports = connect(
  state => ({ page: state.navigation.page, talentsPage: state.talents.page, username: state.user.username }),
  { navigateTo, talentsNavigateTo, getUser }
)(HideApp(OWMove(OWResize(Main))));
