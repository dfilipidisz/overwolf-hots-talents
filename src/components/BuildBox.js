import React from 'react';
import { connect } from 'react-redux';
import AppPopup from './AppPopup';
import { HEROES } from '../constants';
import { deleteBuild } from '../actions/builds';

const lvls = ['1', '4', '7', '10', '13', '16', '20'];

class BuildBox extends React.Component {
  constructor() {
    super();

    this.parseTalents = this.parseTalents.bind(this);
    this.openBuild = this.openBuild.bind(this);
    this.deleteBuild = this.deleteBuild.bind(this);
  }

  parseTalents(rawTalents) {
    const arr = [];
    const { talentData } = this.props;
    // TODO: alse get title for the talent for the tooltip

    lvls.forEach((lvl) => {
      arr.push({
        id: rawTalents[`lvl${lvl}`],
        title: talentData[`lvl${lvl}`].find(t => t.id === rawTalents[`lvl${lvl}`]).title,
      });
    });

    return arr;
  }

  composeBuild() {
    const { talentData, hero, data } = this.props;
    const build = [];

    lvls.forEach((lvl) => {
      build.push(talentData[`lvl${lvl}`].find(t => t.id === data.talents[`lvl${lvl}`]));
    });

    return {
      talents: build,
      hero: HEROES.find(h => h.value === hero),
      buildName: data.name,
    };
  }

  openBuild() {
    overwolf.windows.sendMessage(this.props.widgetWindowid, 'show-yourself', null, () => {});
    overwolf.windows.sendMessage(this.props.widgetWindowid, 'open-build', this.composeBuild(), () => {});
  }

  deleteBuild() {
    this.props.deleteBuild(this.props.data.id);
  }

  render () {
    const { data, hero } = this.props;

    const parsedTalents = this.parseTalents(data.talents);

    return (
      <div className="build-box">
        <div className="header">
          <span>{data.name}</span>
          <div className="actions">
            <AppPopup
              position='bottom center'
              title='Open In-game'
            >
              <span className="action-icon" onClick={this.openBuild}><i className="fa fa-external-link" /></span>
            </AppPopup>
            <AppPopup
              position='bottom center'
              title='Delete'
            >
              <span className="action-icon red" onClick={this.deleteBuild}><i className="fa fa-trash" /></span>
            </AppPopup>
          </div>
        </div>
        <div className="talents">
          {parsedTalents.map((talent) => {
            return (
              <AppPopup
                position='bottom center'
                title={talent.title}
                key={talent.id}
              >
                <div className="talent-box"><div className={`talent-pic in-builds ${hero} ${talent.id}`} /></div>
            </AppPopup>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    widgetWindowid: state.app.widgetWindowid,
  }),
  {
    deleteBuild
  }
)(BuildBox);
