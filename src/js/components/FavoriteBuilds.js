import React from 'react';
import { connect } from 'react-redux';
import BuildBox from './BuildBox';
import { loadAllBuilds } from '../actions/builds';

class FavoriteBuilds extends React.Component {

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
            <h3 style={{marginTop: '5px', marginBottom: '5px'}}>Favorite Builds <small>{heroTitle}</small></h3>
          </div>
        </div>
        <div style={{maxHeight: '351px', overflowY: 'scroll', overflowX: 'hidden', paddingRight: '10px'}}>
        <div className='row'>
          { this.props.favorites.map((favid) => {
              // Match the builds with their stored IDs
              return this.props.builds.find((build) => {
                return build._id === favid;
              });
            }).filter((build) => {
              // Filter according to selected hero
              return ((this.props.selectedHero !== null && this.props.selectedHero === build.hero)
                      || this.props.selectedHero === null) ;
            }).map((build) => {
              // Return actual nodes
              return (
                <div key={build._id} className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
                  <BuildBox build={build} favorites={this.props.favorites} />
                </div>
              );
            })
          }
          {this.props.favorites.length === 0
            ? <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'><p>You haven't favorited any builds yet.</p></div>
            : null}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ favorites: state.builds.favorites, builds: state.builds.builds, selectedHero: state.talents.selectedHero }),
  { loadAllBuilds }
)(FavoriteBuilds);
