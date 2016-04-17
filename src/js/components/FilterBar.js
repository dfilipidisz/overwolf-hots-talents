const React = require('react');
import { connect } from 'react-redux';
const { changeFilter } = require('../actions/teamcomp');

class FilterBar extends React.Component {
  
  render() {
    return (
      <div className='filter-bar'>
        <form className='pure-form'>
          <input type='text' placeholder='Search heroes' value={this.props.filter} onChange={(e) => {this.props.changeFilter(e.target.value);}} />
        </form>
      </div>
    );
  }
}

module.exports = connect(
  state => ({ filter: state.teamcomp.filter }),
  { changeFilter }
)(FilterBar);