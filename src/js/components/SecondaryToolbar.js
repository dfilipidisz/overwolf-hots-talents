import React from 'react';
import { TALENTS_PAGES } from '../constants';

export default class SecondaryToolbar extends React.Component {

  render() {
    const { page, navigateTo } = this.props;

    return (
      <div id='secondary-toolbar'>
        <ul>
          <li className={ page === TALENTS_PAGES.POPULARITY ? 'active' : null } onClick={ () => { navigateTo(TALENTS_PAGES.POPULARITY); } }>POPULARITY</li>
          <li className={ page === TALENTS_PAGES.WINRATE ? 'active' : null } onClick={ () => { navigateTo(TALENTS_PAGES.WINRATE); } }>WIN RATE</li>
        </ul>
      </div>
    );
  }
};
