import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
const { openTalentLevel, closeTalentLevel } = require('../actions/talents');
const getSimpleTalentName = require('../utilities/getSimpleTalentName');

function talentSortPopularityDesc(a, b) {
  if (parseInt(a.popularity, 10) < parseInt(b.popularity, 10)) { return  1; }
  if (parseInt(a.popularity, 10) > parseInt(b.popularity, 10)) { return -1; }
  return 0;
}

function talentSortWinrateDesc(a, b) {
  if (parseInt(a.winrate, 10) < parseInt(b.winrate, 10)) { return  1; }
  if (parseInt(a.winrate, 10) > parseInt(b.winrate, 10)) { return -1; }
  return 0;
}

class TalentTables extends React.Component {
  
  openTalentRow (lvl) {
    switch (parseInt(lvl, 10)) {
      case  1: this.props.openTalentLevel(0); break;
      case  4: this.props.openTalentLevel(1); break;
      case  7: this.props.openTalentLevel(2); break;
      case 10: this.props.openTalentLevel(3); break;
      case 13: this.props.openTalentLevel(4); break;
      case 16: this.props.openTalentLevel(5); break;
      case 20: this.props.openTalentLevel(6); break;
    }
  }
  
  closeTalentRow (lvl) {
    console.log('CLOSING ' + lvl);
    switch (parseInt(lvl, 10)) {
      case  1: this.props.closeTalentLevel(0); break;
      case  4: this.props.closeTalentLevel(1); break;
      case  7: this.props.closeTalentLevel(2); break;
      case 10: this.props.closeTalentLevel(3); break;
      case 13: this.props.closeTalentLevel(4); break;
      case 16: this.props.closeTalentLevel(5); break;
      case 20: this.props.closeTalentLevel(6); break;
    }
  }
  
  makeTableForLevel (lvl, data, type, isClosed) {
    let sorted, rows = [];
    
    if (type === 'popularity') {
      sorted = data['lvl' + lvl].sort(talentSortPopularityDesc);  
    }
    else if (type === 'winrate') {
      sorted = data['lvl' + lvl].sort(talentSortWinrateDesc);
    }
    else {
      return null;
    }
    
    if (isClosed) {
      rows.push(
        <tr key={lvl} onClick={this.openTalentRow.bind(this, lvl)}>
          <td className='level'>{lvl}</td>
          <td className='pic'><div className={'talent-pic ' + getSimpleTalentName(sorted[0].title)} /></td>
          <td className='name'>{sorted[0].title}</td>
          <td className='percent'>{sorted[0][type]}%</td>
        </tr>
      );
    }
    else {
      sorted.forEach((talent, talentIndex) => {
        rows.push(
          <tr key={talent.title} onClick={this.closeTalentRow.bind(this, lvl)}>
            { talentIndex === 0 ? <td className='level' rowSpan={sorted.length}>{lvl}</td> : null }
            <td className='pic'><div className={'talent-pic ' + getSimpleTalentName(talent.title)} /></td>
            <td className='name'>{talent.title}</td>
            <td className='percent'>{talent[type]}%</td>
          </tr>
        );
      });
    }
    
    return (
      <table key={lvl + '-lvl-' + type} className='talent-table'>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
    
  }
  
  render () {
    
    let { type, data, selectedHero, talentsClosed } = this.props;
    
    if (selectedHero !== null) {
      let hero = data[selectedHero];
      let displayData = [];
    
      displayData.push(this.makeTableForLevel(1, hero, type, talentsClosed[0]));
      displayData.push(this.makeTableForLevel(4, hero, type, talentsClosed[1]));
      displayData.push(this.makeTableForLevel(7, hero, type, talentsClosed[2]));
      displayData.push(this.makeTableForLevel(10, hero, type, talentsClosed[3]));
      displayData.push(this.makeTableForLevel(13, hero, type, talentsClosed[4]));
      displayData.push(this.makeTableForLevel(16, hero, type, talentsClosed[5]));
      displayData.push(this.makeTableForLevel(20, hero, type, talentsClosed[6]));
      
      return (
        <div>
          {displayData}
        </div>
      ); 
    }
    
    return <div className='no-hero-selected-padding' />;
  }
}

module.exports = connect(
  state => ({ data: state.talents.data, selectedHero: state.talents.selectedHero, talentsClosed: state.talents.talentsClosed }),
  { openTalentLevel, closeTalentLevel }
)(TalentTables);