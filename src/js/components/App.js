const React = require('react');
import { OWResize } from './OWResize';
import { OWMove } from './OWMove';
import { HideApp } from './HideApp';
const Toolbar = require('./Toolbar');
const SecondaryToolbar = require('./SecondaryToolbar');
const PageMinimized = require('./PageMinimized');
const PageTalents = require('./PageTalents');
const PageFeedback = require('./PageFeedback');
const PageAbout = require('./PageAbout');
const PageTeamcomp = require('./PageTeamcomp');
import { PAGES } from '../constants';
const Footer = require('./Footer');

const { navigateTo } = require('../actions/navigation');
const { talentsNavigateTo } = require('../actions/talents');

import { connect } from 'react-redux';

class Main extends React.Component {
  
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
  state => ({ page: state.navigation.page, talentsPage: state.talents.page }),
  { navigateTo, talentsNavigateTo }
)(HideApp(OWMove(OWResize(Main))));

