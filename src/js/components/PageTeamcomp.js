const React = require('react');
import { PAGES, HEROES } from '../constants';
import { connect } from 'react-redux';
const { fetchTeamcompData } = require('../actions/teamcomp');
const FilterBar = require('./FilterBar');
const HeroList = require('./HeroList');
const HeroComp = require('./HeroComp');
const CompStats = require('./CompStats');

class PageTeamcomp extends React.Component {

  constructor(props) {
    super(props);

    this.getHeroLabel = this.getHeroLabel.bind(this);
    this.state = {showNotification: true};
  }

  componentDidMount() {
    if (this.props.data === null) {
      this.props.fetchTeamcompData();
    }
  }

  getHeroLabel(hero) {
    for (let i = 0; i < HEROES.length; i++) {
      if (HEROES[i].value === hero) {
        return HEROES[i].label;
      }
    }
  }

  render() {
    let { fetch, data, comp } = this.props;

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

      let filteredComps = [];
      data.forEach((c) => {

        let hasTheseCount = 0;
        comp.forEach((h) => {
          if (c.heroes.indexOf(this.getHeroLabel(h)) > -1 ) {
            hasTheseCount += 1;
          }
        });

        if (hasTheseCount === comp.length) {
          filteredComps.push(c);
        }

      });

      return (
        <section>
          {this.state.showNotification
            ? <div className='alert'>
                <p>This function is in <b>beta</b> stage. Only contains the top 1000 comps with 200+ games. More comps and polish in the works!</p>
                <i className='fa fa-close' onClick={() => {this.setState({showNotification: false});}} />
              </div>
            : null}
          <HeroComp />
          <CompStats list={filteredComps} />
          <FilterBar />
          <HeroList list={filteredComps} />
        </section>
      );
    }

  }
}

module.exports = connect(
  state => ({ fetch: state.teamcomp.fetch, error: state.teamcomp.error, data: state.teamcomp.data, comp: state.teamcomp.comp }),
  { fetchTeamcompData }
)(PageTeamcomp);
