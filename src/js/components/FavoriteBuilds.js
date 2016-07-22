import React from 'react';
import { connect } from 'react-redux';

class FavoriteBuilds extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props.builds);
    return (
      <div>
      favorites
      </div>
    );
  }
}

export default connect(
  state => ({ builds: state.builds.builds })
)(FavoriteBuilds);
