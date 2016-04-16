const React = require('react');
import { connect } from 'react-redux';

class CompStats extends React.Component {
  
  render() {
    let { comp, data } = this.props;
    
    let filteredComps = [];
    data.forEach((c) => {
      
      let hasTheseCount = 0;
      comp.forEach((h) => {
        if (c.heroes.indexOf(h) > -1 ) {
          hasTheseCount++;
        }  
      });
      
      if (hasTheseCount === comp.length) {
        filteredComps.push(c);
      }
      
    });
    
    console.log('Found ' + filteredComps.length + ' comps');
    
    if (comp.length === 0) {
      return (
        <div className='comp-stats'>
          <span>Add heroes to see win percentages</span>
        </div>
      );
    }
    else {
      if (filteredComps.length > 0) {
        return (
          <div className='comp-stats'>
            <span>Composition Win rate: <b>{filteredComps[0].winp}%</b></span>
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
  state => ({ comp: state.teamcomp.comp, data: state.teamcomp.data }),
  null
)(CompStats);