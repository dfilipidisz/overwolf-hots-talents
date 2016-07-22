import React from 'react';
import { connect } from 'react-redux';

class MyBuilds extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props.builds);
    return (
      <div>
        MyBuilds
      </div>
    );
  }
}

export default connect(
  state => ({ builds: state.builds.builds })
)(MyBuilds);
