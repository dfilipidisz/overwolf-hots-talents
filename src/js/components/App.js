import React from 'react';
import { connect } from 'react-redux';
import OWResize from './OWResize';
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
import HOCWindowId from './HOCWindowId';
import { debounce } from '../utility';

const { navigateTo } = require('../actions/navigation');
const { talentsNavigateTo } = require('../actions/talents');

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.updateSize = this.updateSize.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);

    this.resizeTimeout = null;
  }

  componentDidMount() {
    if (this.props.username === null) {
      this.props.getUser();
    }

    this.props.initLed();

    window.addEventListener('resize', debounce(this.resizeHandler, 32), false);
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

  render() {
    let pageContent;

    if (this.props.page === PAGES.MINIMIZED) {
      return (
        <PageMinimized />
      );
    } else if (this.props.page === PAGES.TALENTS) {
      pageContent = [
        <SecondaryToolbar
          key='secondary-toolbar'
          page={ this.props.talentsPage }
          navigateTo={ this.props.talentsNavigateTo }
        />,
        <PageTalents key='talents-page' updateSize={ this.updateSize } />,
      ];
    } else if (this.props.page === PAGES.FEEDBACK) {
      pageContent = <PageFeedback />;
    } else if (this.props.page === PAGES.ABOUT) {
      pageContent = <PageAbout navigateTo={ this.props.navigateTo } />;
    } else if (this.props.page === PAGES.SETTINGS) {
      pageContent = <PageSettings />;
    } else {
      return null;
    }

    return (
      <div id='root-inner' ref={ (el) => { this.contentArea = el; } }>
        <Toolbar updateSize={ this.updateSize } windowId={ this.props.windowId } />
        { pageContent }
        <Footer />
      </div>
    );
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
  windowId: React.PropTypes.string,
};

module.exports = connect(
  state => ({
    page: state.navigation.page,
    talentsPage: state.talents.page,
    username: state.user.username,
  }),
  { navigateTo, talentsNavigateTo, getUser, initLed }
)(HOCWindowId(HideApp(OWMove(OWResize(Main)))));
