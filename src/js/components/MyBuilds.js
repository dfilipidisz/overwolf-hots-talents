import React from 'react';
import { connect } from 'react-redux';
import { loadAllBuilds } from '../actions/builds';
import BuildBox from './BuildBox';
import * as constants from '../constants';

class MyBuilds extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    if (this.props.builds === null) {
      this.props.loadAllBuilds();
    }
  }

  render () {
    if (this.props.builds === null) {
      return (
        <section className='loading'>
          <i className='fa fa-circle-o-notch fa-spin' />
        </section>
      );
    }

    let heroTitle = '- Showing All Builds';
    if (this.props.selectedHero !== null) {
      const heroName = constants.HEROES.find((el) => {return el.value === this.props.selectedHero;});
      heroTitle = `- Showing ${heroName.label} Builds`;
    }

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <h3 style={{marginTop: '5px', marginBottom: '5px'}}>My Builds <small>{heroTitle}</small></h3>
          </div>
        </div>
        <div style={{maxHeight: '351px', overflowY: 'scroll', overflowX: 'hidden', paddingRight: '10px'}}>
        <div className='row'>
          { this.props.builds.filter((build) => {
              // Filter according to hero selection and current user
              return (((this.props.selectedHero !== null && this.props.selectedHero === build.hero)
                      || this.props.selectedHero === null)
                    && build.creator === this.props.username);
            }).map((build) => {
              // Return actual nodes
              return (
                <div key={build._id} className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
                  <BuildBox build={build} favorites={this.props.favorites} />
                </div>
              );
            })
          }
          {this.props.builds.length === 0
            ? <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'><p>You haven't created any builds yet.</p></div>
            : null}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ builds: state.builds.builds, favorites: state.builds.favorites, selectedHero: state.talents.selectedHero, username: state.user.username }),
  { loadAllBuilds }
)(MyBuilds);
