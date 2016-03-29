const React = require('react');
import { PAGES } from '../constants';
import { connect } from 'react-redux';
const { fetchTalentData } = require('../actions/talents');
const { navigateTo } = require('../actions/navigation');

class PageMinimized extends React.Component {
  
  componentWillMount () {
    if (this.props.data === null) {
      this.props.fetchTalentData();  
    }
  }
  
  render() {
    return (
      <div id='page-minimized' onClick={ (e) => { this.props.navigateTo(PAGES.TALENTS); } }>
        <img src='img/Icon.png' width='50' height='50' />
      </div>
    );
  }
};

module.exports = connect(
  state => ({ data: state.talents.data }),
  { fetchTalentData, navigateTo }
)(PageMinimized);