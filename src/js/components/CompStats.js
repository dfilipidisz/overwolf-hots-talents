const React = require('react');
import { connect } from 'react-redux';

class CompStats extends React.Component {
  
  render() {
    let { comp } = this.props;
    
    if (comp.length === 0) {
      return (
        <div className='comp-stats'>
          <span>Add heroes to see win percentages</span>
        </div>
      );
    }
    else {
      if (this.props.list.length > 0) {
        return (
          <div className='comp-stats'>
            <span>Composition Win rate: <b>{this.props.list[0].winp}%</b></span>
          </div>
        );  
      }
      else {
        return (
          <div className='comp-stats'>
            <span>Composition Win rate: <b>N/A</b></span>
          </div>
        );
      }
      
    }
  }
}

module.exports = connect(
  state => ({ comp: state.teamcomp.comp }),
  null
)(CompStats);