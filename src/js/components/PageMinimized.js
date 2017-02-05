import React from 'react';
import { connect } from 'react-redux';
import { fetchTalentData } from '../actions/talents';
import { maximizeApp } from '../actions/navigation';
import AppIcon from '../../img/Icon.png';

class PageMinimized extends React.Component {

  componentWillMount() {
    if (this.props.data === null) {
      this.props.fetchTalentData();
    }
  }

  render() {
    return (
      <div id='page-minimized' onClick={ (e) => { this.props.maximizeApp(); } }>
        <img src={ AppIcon } width='50' height='50' />
      </div>
    );
  }
}

module.exports = connect(
  state => ({ data: state.talents.data }),
  { fetchTalentData, maximizeApp }
)(PageMinimized);
