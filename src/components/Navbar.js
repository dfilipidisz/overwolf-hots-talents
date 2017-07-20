import React from 'react';
import { connect } from 'react-redux';
import { openPage, minimizeMainWindow } from '../actions/app';
import { Popup } from 'semantic-ui-react';
import { HEROES } from '../constants';
import AppPopup from './AppPopup';

class Navbar extends React.Component {
  constructor() {
    super();

    this.dragWindow = this.dragWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.switchPage = this.switchPage.bind(this);
  }

  dragWindow(e) {
    // Prevent dragging when other navbar items are clicked
    if (e.target.className === 'app-navbar') {
      overwolf.windows.dragMove(this.props.windowid);
    }
  }

  closeWindow(e) {
    overwolf.windows.close(this.props.windowid);
  }

  switchPage(e) {
    this.props.openPage(e.target.dataset.page);
  }

  render () {
    const { page, selectedHero, loading } = this.props;

    return (
      <div className='app-navbar' onMouseDown={this.dragWindow}>
        <div className='logo' data-page="heroes" onClick={this.switchPage} />
        {selectedHero !== null
          ?
            <Popup
              trigger={
                <div className='selected-hero' data-page="heroselect" onClick={this.switchPage}>
                  <div className={`hero-pic header ${selectedHero}`} data-page="heroselect" onClick={this.switchPage} />
                </div>
              }
              basic
              position='bottom left'
              size='mini'
            >
              <Popup.Header>Selected Hero</Popup.Header>
              <Popup.Content>
                {HEROES.find(h => h.value === selectedHero).label}<br />
                (Click to change hero)
              </Popup.Content>
            </Popup>
          : null
        }

        <div className='center-nav clearfix'>
          <div className={`nav-item ${page === 'heroes' ? 'active' : ''}`} data-page="heroes" onClick={this.switchPage}>
            HEROES
          </div>
          <div className={`nav-item ${page === 'builds' ? 'active' : ''}`} data-page="builds" onClick={this.switchPage}>
            BUILDS
          </div>
        </div>

        <div className='right-nav clearfix'>
          <AppPopup
            position='bottom right'
            title='Close app'
          >
            <div className='nav-icon' onClick={this.closeWindow}>
              <i className='fa fa-close' />
            </div>
          </AppPopup>
          <AppPopup
            position='bottom right'
            title='Hide main window'
          >
            <div className='nav-icon' onClick={this.props.minimizeMainWindow}>
              <i className='fa fa-window-minimize' />
            </div>
          </AppPopup>
          <AppPopup
            position='bottom right'
            title='Settings'
          >
            <div className='nav-icon' data-page="settings" onClick={this.switchPage} >
              <i className='fa fa-cog' data-page="settings" onClick={this.switchPage} />
            </div>
          </AppPopup>
          {loading
            ?
              <div className='nav-icon'>
                <i className='fa fa-refresh fa-spin' />
              </div>
            : null
          }
        </div>

      </div>
    );
  }
}

export default connect(
  state => ({
    windowid: state.app.windowid,
    page: state.app.page,
    selectedHero: state.app.selectedHero,
    loading: state.app.loading,
  }),
  { openPage, minimizeMainWindow }
)(Navbar);
