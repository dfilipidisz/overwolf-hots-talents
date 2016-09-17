import React from 'react';
import { connect } from 'react-redux';
const getSimpleTalentName = require('../utilities/getSimpleTalentName');
const getNormalTalentName = require('../utilities/getNormalTalentName');

class PopularBuilds extends React.Component {

  makeTable (data) {
    let builds = data.popularBuilds;
    let rows = [];

    builds.forEach((build, buildIndex) => {
      rows.push(
        <tr key={buildIndex}>
          <td>{build.count}</td>
          <td>{build.winp === null ? null : build.winp + '%' }</td>
          <td><div className={'hint--bottom talent-pic ' + getSimpleTalentName(build.lvl1)} data-hint={getNormalTalentName(build.lvl1, data)} /></td>
          <td><div className={'hint--bottom talent-pic ' + getSimpleTalentName(build.lvl4)} data-hint={getNormalTalentName(build.lvl4, data)} /></td>
          <td><div className={'hint--bottom talent-pic ' + getSimpleTalentName(build.lvl7)} data-hint={getNormalTalentName(build.lvl7, data)} /></td>
          <td><div className={'hint--bottom talent-pic ' + getSimpleTalentName(build.lvl10)} data-hint={getNormalTalentName(build.lvl10, data)} /></td>
          <td><div className={'hint--bottom talent-pic ' + getSimpleTalentName(build.lvl13)} data-hint={getNormalTalentName(build.lvl13, data)} /></td>
          <td><div className={'hint--bottom talent-pic ' + getSimpleTalentName(build.lvl16)} data-hint={getNormalTalentName(build.lvl16, data)} /></td>
          <td><div className={'hint--bottom-left talent-pic ' + getSimpleTalentName(build.lvl20)} data-hint={getNormalTalentName(build.lvl20, data)} /></td>
        </tr>
      );
    });

    return (
      <table className='popular-builds-table'>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  render () {

    let { data, selectedHero } = this.props;

    if (selectedHero !== null) {
      let hero = data[selectedHero];
      
      return (
        <div>
          {this.makeTable(hero)}
        </div>
      );
    }

    return <div className='no-hero-selected-padding' />;
  }
}

module.exports = connect(
  state => ({ data: state.talents.data, selectedHero: state.talents.selectedHero }),
  null
)(PopularBuilds);
