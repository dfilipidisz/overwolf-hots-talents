const React = require('react');
import { PAGES } from '../constants';
import { connect } from 'react-redux';
const { navigateTo } = require('../actions/navigation');
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

    let { page, sessionid, navigateTo } = this.props;

    return (
      <div id='toolbar' onMouseDown={dragWindow} style={{cursor: 'move'}}>
        <ul>
          <li className={ page === PAGES.TALENTS ? 'active' : null } onClick={ () => {navigateTo(PAGES.TALENTS); } }>TALENTS</li>
          <li className={ page === PAGES.TEAMCOMP ? 'active' : null } onClick={ () => {navigateTo(PAGES.TEAMCOMP); } }>TEAM COMP</li>
          <li className={ page === PAGES.FEEDBACK ? 'active' : null } onClick={ () => { navigateTo(PAGES.FEEDBACK); } }>FEEDBACK</li>
          <li className={ page === PAGES.ABOUT ? 'active' : null } onClick={ () => { navigateTo(PAGES.ABOUT); } }>ABOUT</li>
        </ul>
        <div className='app-ops'>
          <ul>
            <li onClick={this.closeApp}><i className='fa fa-close' /></li>
          </ul>
        </div>
      </div>
    );
  }
};

module.exports = connect(
  state => ({ page: state.navigation.page }),
  { navigateTo }
)(Toolbar);
