import React from 'react';
import { connect } from 'react-redux';
import { loadMyBuilds } from '../actions/builds';
import BuildBox from './BuildBox';

class MyBuilds extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    if (this.props.mybuilds === null) {
      this.props.loadMyBuilds();
    }
  }

  render () {
    if (this.props.mybuilds === null) {
      return (
        <section className='loading'>
          <i className='fa fa-circle-o-notch fa-spin' />
        </section>
      );
    }

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <h3 style={{marginTop: '5px', marginBottom: '5px'}}>My Builds</h3>
          </div>
        </div>
        <div style={{maxHeight: '351px', overflowY: 'scroll', overflowX: 'hidden', paddingRight: '10px'}}>
        <div className='row'>
          {this.props.mybuilds.map((build) => {
            return (
              <div key={build._id} className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
                <BuildBox build={build} />
              </div>
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ mybuilds: state.builds.mybuilds }),
  { loadMyBuilds }
)(MyBuilds);
