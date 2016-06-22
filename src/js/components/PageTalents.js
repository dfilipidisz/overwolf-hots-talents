const React = require('react');
import { connect } from 'react-redux';
import { TALENTS_PAGES } from '../constants';
const SelectHero = require('./SelectHero');
const TalentTables = require('./TalentTables');
const PopularBuilds = require('./PopularBuilds');
const Notifications = require('./Notifications');

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

class MakeYourBuild extends React.Component {
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
        <TalentTables type='makeyourown' />
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
    else if (page === TALENTS_PAGES.MAKE_YOUR_BUILDS) {
      return (
        <MakeYourBuild isFetching={isFetching} />
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