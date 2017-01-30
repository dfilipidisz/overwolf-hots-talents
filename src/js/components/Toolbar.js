import React from 'react';
import { PAGES } from '../constants';
import { connect } from 'react-redux';
import { navigateTo, minimizeApp } from '../actions/navigation';
import { dragWindow } from '../utility';

class Toolbar extends React.Component {

  closeApp() {
    overwolf.windows.getCurrentWindow(function(result) {
      if (result.status === 'success') {
        overwolf.windows.close(result.window.id);
      }
	  });
  }

  render() {
    const { page, sessionid, navigateTo, autoClose } = this.props;

    return (
      <div id='toolbar' onMouseDown={dragWindow} style={{cursor: 'move'}}>
        <ul>
          <li className={ page === PAGES.TALENTS ? 'active' : null } onClick={ () => {navigateTo(PAGES.TALENTS); } }>TALENTS</li>
          <li className={ page === PAGES.FEEDBACK ? 'active' : null } onClick={ () => { navigateTo(PAGES.FEEDBACK); } }>FEEDBACK</li>
          <li className={ page === PAGES.ABOUT ? 'active' : null } onClick={ () => { navigateTo(PAGES.ABOUT); } }>ABOUT</li>
        </ul>
        <div className='app-ops'>
          <ul>
            <li onClick={this.closeApp}><i className='fa fa-close' /></li>
            <li className={ page === PAGES.SETTINGS ? 'active' : null } onClick={ () => {navigateTo(PAGES.SETTINGS);}}><i className='fa fa-cog' /></li>
            {!autoClose
              ? <li onClick={this.props.minimizeApp}><i className='fa fa-minus' /></li>
              : null}
          </ul>
        </div>
      </div>
    );
  }
};

export default connect(
  state => ({ page: state.navigation.page, autoClose: state.settings.autoClose }),
  { navigateTo, minimizeApp }
)(Toolbar);
