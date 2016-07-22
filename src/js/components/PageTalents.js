const React = require('react');
import { connect } from 'react-redux';
import { TALENTS_PAGES } from '../constants';
const SelectHero = require('./SelectHero');
const TalentTables = require('./TalentTables');
const PopularBuilds = require('./PopularBuilds');
const Notifications = require('./Notifications');
import Builds from './Builds';

class BuildsPage extends React.Component {
  render () {

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
        <Builds />
      </section>
    );
  }
}

class PopularBuildsPage extends React.Component {
  render () {

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
        <PopularBuilds />
      </section>
    );
  }
}

class WinrateTalents extends React.Component {
  render () {

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
  render () {

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

    let { page, isFetching } = this.props;

    if (page === TALENTS_PAGES.POPULARITY) {
      return (
        <PopularTalents isFetching={isFetching} />
      );
    }
    else if (page === TALENTS_PAGES.WINRATE) {
      return (
        <WinrateTalents isFetching={isFetching} />
      );
    }
    else if (page === TALENTS_PAGES.POPULAR_BUILDS) {
      return (
        <PopularBuildsPage isFetching={isFetching} />
      );
    }
    else if (page === TALENTS_PAGES.BUILDS) {
      return (
        <BuildsPage isFetching={isFetching} />
      );
    }
    else {
      return (
        <section />
      );
    }

  }
};

module.exports = connect(
  state => ({ page: state.talents.page, isFetching: state.talents.isFetching }),
  null
)(PageTalents);
