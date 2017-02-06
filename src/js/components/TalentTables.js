import React from 'react';
import { connect } from 'react-redux';
import TalentTableRow from './TalentTableRow';

function talentSortPopularityDesc(a, b) {
  if (parseInt(a.popularity, 10) < parseInt(b.popularity, 10)) { return 1; }
  if (parseInt(a.popularity, 10) > parseInt(b.popularity, 10)) { return -1; }
  return 0;
}

function talentSortWinrateDesc(a, b) {
  if (parseInt(a.winrate, 10) < parseInt(b.winrate, 10)) { return 1; }
  if (parseInt(a.winrate, 10) > parseInt(b.winrate, 10)) { return -1; }
  return 0;
}

class TalentTables extends React.Component {

  makeTableForLevel(lvl, data, type, isClosed) {
    let sorted;
    let rows;

    if (data[`lvl${lvl}`] === null) {
      return null;
    }

    if (type === 'popularity') {
      sorted = data[`lvl${lvl}`].sort(talentSortPopularityDesc);
    } else if (type === 'winrate') {
      sorted = data[`lvl${lvl}`].sort(talentSortWinrateDesc);
    } else {
      return null;
    }

    if (isClosed) {
      rows = (
        <TalentTableRow
          isClosed={ isClosed }
          lvl={ lvl }
          data={ sorted[0] }
          type={ type }
          hero={ this.props.selectedHero }
          talentCount={ sorted.length }
          updateSize={ this.props.updateSize }
          isFirst
        />
      );
    } else {
      rows = sorted.map((talent, talentIndex) => {
        return (
          <TalentTableRow
            key={ talent.title }
            isClosed={ isClosed }
            lvl={ lvl }
            data={ talent }
            type={ type }
            hero={ this.props.selectedHero }
            talentCount={ sorted.length }
            updateSize={ this.props.updateSize }
            isFirst={ talentIndex === 0 }
          />
        );
      });
    }

    return (
      <table key={ `${lvl}-lvl-${type}` } className='talent-table'>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  render() {
    const { type, data, selectedHero, talentsClosed } = this.props;

    if (selectedHero !== null) {
      const hero = data[selectedHero];
      const displayData = [];

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

TalentTables.propTypes = {
  selectedHero: React.PropTypes.string,
  updateSize: React.PropTypes.func,
  type: React.PropTypes.string,
  data: React.PropTypes.object,
  talentsClosed: React.PropTypes.array,
};

module.exports = connect(
  state => ({
    data: state.talents.data,
    selectedHero: state.talents.selectedHero,
    talentsClosed: state.talents.talentsClosed,
  })
)(TalentTables);
