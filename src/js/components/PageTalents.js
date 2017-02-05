import React from 'react';
import { connect } from 'react-redux';
import { TALENTS_PAGES } from '../constants';
import SelectHero from './SelectHero';
import TalentTables from './TalentTables';
import Notifications from './Notifications';

class WinrateTalents extends React.Component {
  render() {
    if (this.props.isFetching) {
      return (
        <section className='loading'>
          <i className='fa fa-circle-o-notch fa-spin' />
        </section>
      );
    }

    return (
      <section>
        <Notifications />
        <SelectHero />
        <TalentTables type='winrate' />
      </section>
    );
  }
}

class PopularTalents extends React.Component {
  render() {
    if (this.props.isFetching) {
      return (
        <section className='loading'>
          <i className='fa fa-circle-o-notch fa-spin' />
        </section>
      );
    }

    return (
      <section>
        <Notifications />
        <SelectHero />
        <TalentTables type='popularity' />
      </section>
    );
  }
}

class PageTalents extends React.Component {

  render() {
    const { page, isFetching } = this.props;

    if (page === TALENTS_PAGES.POPULARITY) {
      return (
        <PopularTalents isFetching={ isFetching } />
      );
    } else if (page === TALENTS_PAGES.WINRATE) {
      return (
        <WinrateTalents isFetching={ isFetching } />
      );
    }
    return (
      <section />
    );
  }
}

module.exports = connect(
  state => ({ page: state.talents.page, isFetching: state.talents.isFetching })
)(PageTalents);
