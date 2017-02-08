import React from 'react';
import { TALENTS_PAGES } from '../constants';

class SecondaryToolbar extends React.Component {

  constructor() {
    super();

    this.navigatePopularity = this.navigatePopularity.bind(this);
    this.navigateWinrate = this.navigateWinrate.bind(this);
    this.navigateProbuilds = this.navigateProbuilds.bind(this);
  }

  navigatePopularity() {
    this.props.navigateTo(TALENTS_PAGES.POPULARITY);
  }

  navigateWinrate() {
    this.props.navigateTo(TALENTS_PAGES.WINRATE);
  }

  navigateProbuilds() {
    this.props.navigateTo(TALENTS_PAGES.PROBUILDS);
  }

  render() {
    const { page } = this.props;

    return (
      <div id='secondary-toolbar'>
        <ul>
          <li className={ page === TALENTS_PAGES.POPULARITY ? 'active' : null } onClick={ this.navigatePopularity }>POPULARITY</li>
          <li className={ page === TALENTS_PAGES.WINRATE ? 'active' : null } onClick={ this.navigateWinrate }>WIN RATE</li>
          <li className={ page === TALENTS_PAGES.PROBUILDS ? 'active' : null } onClick={ this.navigateProbuilds }>PRO BUILDS</li>
        </ul>
      </div>
    );
  }
}

SecondaryToolbar.propTypes = {
  navigateTo: React.PropTypes.func,
  page: React.PropTypes.string,
};

export default SecondaryToolbar;
