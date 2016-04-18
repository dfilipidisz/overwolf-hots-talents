const React = require('react');
import { PAGES } from '../constants';
const PACKAGE = require('../../../package.json');

module.exports = class PageAbout extends React.Component {
  
  goToFeedback (e) {
    e.preventDefault();
    this.props.navigateTo(PAGES.FEEDBACK);
  }
  
  render() {
    return (
      <section>
        <h3>HotS Talent Picks</h3>
        <p>Hi! This is a simple app developed to bring you the invaluable data from <a href='http://www.hotslogs.com/' target='_blank'>Hotslogs.com</a> (which by the way an awesome site, please consider supporting them!).</p> 
        <p>You can contact me via the <a href='http://forums.overwolf.com/index.php?/user/15488-fullbarrel/' target='_blank'>Overwolf Forums</a>, <a href='mailto:dfilipidisz@gmail.com' target='_blank'>email</a>, or via the <a href='#' onClick={this.goToFeedback.bind(this)}>Feedback page</a>.</p>
        <p>App version: <b>v{PACKAGE.version}</b> - <a href='https://github.com/dfilipidisz/overwolf-hots-talents/blob/master/CHANGELOG.md' target='_BLANK'>changelog</a></p>
      </section>
    );
  }
};