const React = require('react');
import { PAGES } from '../constants';
import { connect } from 'react-redux';
const { fetchTeamcompData } = require('../actions/teamcomp');

class PageTeamcomp extends React.Component {
  
  componentDidMount() {
    if (this.props.teamcomp.data === null) {
      this.props.fetchTeamcompData();
    }
  }
  
  render() {
    let { fetch } = this.props.teamcomp;
    
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
            <p>{this.props.teamcomp.error}</p>
            <i className='fa fa-close' onClick={this.props.closeNotification} />
          </div>
        </section>
      );
    }
    else if (fetch === 'done') {
      return (
        <section>
          d
        </section>
      );
    }
    
  }
}

module.exports = connect(
  state => ({ teamcomp: state.teamcomp }),
  { fetchTeamcompData }
)(PageTeamcomp);