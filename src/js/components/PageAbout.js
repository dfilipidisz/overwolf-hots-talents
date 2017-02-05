import React from 'react';
import { PAGES } from '../constants';
import PACKAGE from '../../../package.json';

export default class PageAbout extends React.Component {

  goToFeedback(e) {
    e.preventDefault();
    this.props.navigateTo(PAGES.FEEDBACK);
  }

  render() {
    return (
      <section>
        <h3>HotS Talent Picks</h3>
        <p>Hi! This is a simple app developed to bring you the invaluable data from <a href='http://www.hotslogs.com/' target='_blank' rel='noopener noreferrer'>Hotslogs.com</a> (which by the way an awesome site, please consider supporting them!).</p>
        <p>You can contact me via the <a href='http://forums.overwolf.com/index.php?/user/15488-fullbarrel/' target='_blank' rel='noopener noreferrer'>Overwolf Forums</a>, <a href='mailto:dfilipidisz@gmail.com' target='_blank' rel='noopener noreferrer'>email</a>, or via the <a href='#' onClick={ this.goToFeedback.bind(this) }>Feedback page</a>.</p>
        <p>App version: <b>v{PACKAGE.version}</b> - <a href='https://github.com/dfilipidisz/overwolf-hots-talents/blob/master/CHANGELOG.md' target='_blank' rel='noopener noreferrer'>changelog</a></p>
      </section>
    );
  }
}
