import React from 'react';
import { connect } from 'react-redux';
import { loadMyBuilds } from '../actions/builds';

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
      <div>
        MyBuilds
        <ul>
          {this.props.mybuilds.map((b) => {
            return <li key={b.name}>{b.name}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({ mybuilds: state.builds.mybuilds }),
  { loadMyBuilds }
)(MyBuilds);
