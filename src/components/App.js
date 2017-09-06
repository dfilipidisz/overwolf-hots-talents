import React from 'react';
import { connect } from 'react-redux';
import Logger from '../logger';
import { updateWindowid, updateWidgetWindowid, getTalentData, toggleMainWindow, widgetOpenMain, getSavedSettings } from '../actions/app';
import Navbar from './Navbar';
import PageHome from './PageHome';
import PageHeroes from './PageHeroes';
import PageBuilds from './PageBuilds';
import PageSettings from './PageSettings';

class App extends React.Component {
  constructor () {
    super();

    this.receiveMessage = this.receiveMessage.bind(this);
  }

  componentDidMount() {
    // Start logging
    Logger.startSession();

    // Error event listener, log
    window.addEventListener("error", (e) => {
      Logger.log('error', {error: e.error.stack});
      return false;
    })

    // Guess session length
    this.hearthbeatInterval = setInterval(() => {
      Logger.log('hearthbeat');
    }, 300000);

    // Get data
    this.props.getTalentData();

    // Get main window's id
    overwolf.windows.getCurrentWindow((result) => {
      if (result.status === "success") {
        // Ensure the correct window size
        overwolf.windows.changeSize(result.window.id, 729, 540);
        this.props.updateWindowid(result.window.id);

        // Open widget window
        overwolf.windows.obtainDeclaredWindow('WidgetWindow', (wresult) => {
          overwolf.windows.restore(wresult.window.id, (f) => {
            if (f.status === 'success') {
              setTimeout(() => {
                overwolf.windows.sendMessage(wresult.window.id, 'init-data', {
                  mainWindowId: result.window.id,
                  settings: this.props.widgetSettings,
                }, () => {});
                overwolf.windows.sendMessage(wresult.window.id, 'hide-yourself', null, () => {});
              }, 200);
            }
          });
          this.props.updateWidgetWindowid(wresult.window.id);
          // Get saved settings now that we have windows
          this.props.getSavedSettings();
        });

        // Register hotkey callback
        overwolf.settings.registerHotKey(
          "toggle_main_window",
          this.props.toggleMainWindow
        );

        // Register comm channel from widget
        overwolf.windows.onMessageReceived.addListener(this.receiveMessage);
      } else {
        // TODO: handle error case
        console.error(result);
      }
    });
  }

  componentWillUnmount() {
    overwolf.windows.onMessageReceived.removeListener(this.receiveMessage);
    clearInterval(this.hearthbeatInterval);
  }

  receiveMessage(payload) {
    switch(payload.id) {
      case 'request-hide':
        overwolf.windows.sendMessage(this.props.widgetWindowid, 'hide-yourself', null, () => {});
        break;
      case 'open-main':
        this.props.widgetOpenMain();
        break;
    }
  }

  render () {
    const { page, mainWindowVisible } = this.props;

    if (!mainWindowVisible) {
      return null;
    }

    let pageComp = null;

    switch (page) {
      case 'home':
        pageComp = <PageHome />;
        break;
      case 'heroes':
        pageComp = <PageHeroes />;
        break;
      case 'builds':
        pageComp = <PageBuilds />;
        break;
      case 'settings':
        pageComp = <PageSettings />;
        break;
    }

    return (
      <div className='app-container'>
        <div className='main-window'>
          <Navbar />

          {pageComp}
        </div>
        {/*<div className='bottom-widget'>
          hi
        </div>*/}
      </div>
    );
  }
}

export default connect(
  state => ({
    windowid: state.app.windowid,
    page: state.app.page,
    mainWindowVisible: state.app.mainWindowVisible,
    widgetWindowid: state.app.widgetWindowid,
    widgetSettings: state.app.widgetSettings,
  }),
  { updateWindowid, updateWidgetWindowid, getTalentData, toggleMainWindow, widgetOpenMain, getSavedSettings }
)(App);
