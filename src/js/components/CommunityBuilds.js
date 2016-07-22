import React from 'react';
import { connect } from 'react-redux';

class CommunityBuilds extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props.builds);
    return (
      <div>
        CommunityBuilds
      </div>
    );
  }
}

export default connect(
  state => ({ builds: state.builds.builds })
)(CommunityBuilds);
