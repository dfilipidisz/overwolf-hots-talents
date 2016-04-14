const React = require('react');
import { PAGES } from '../constants';
import { connect } from 'react-redux';
const { fetchTeamcompData } = require('../actions/teamcomp');
const FilterBar = require('./FilterBar');
const HeroList = require('./HeroList');
const HeroComp = require('./HeroComp');

class CompStats extends React.Component {
  
  render() {
    return (
      <div className='comp-stats'>
        <span>Composition Win rate: <b>xx.x%</b></span>
      </div>
    );
  }
}

class PageTeamcomp extends React.Component {
  
  componentDidMount() {
    if (this.props.data === null) {
      this.props.fetchTeamcompData();
    }
  }
  
  render() {
    let { fetch } = this.props;
    
    if (fetch === 'loading') {
      return (
        <section className='loading'>
          <i className='fa fa-circle-o-notch fa-spin' />
        </section>
      );
    }
    else if (fetch === 'error') {
      return (
        <section>
          <div className='alert danger'>
            <p>{this.props.error}</p>
            <i className='fa fa-close' />
          </div>
        </section>
      );
    }
    else if (fetch === 'done') {
      return (
        <section>
          <HeroComp />
          <CompStats />
          <FilterBar />
          <HeroList />
        </section>
      );
    }
    
  }
}

module.exports = connect(
  state => ({ fetch: state.teamcomp.fetch, error: state.teamcomp.error, data: state.teamcomp.data }),
  { fetchTeamcompData }
)(PageTeamcomp);