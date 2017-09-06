import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import AppPopup from './AppPopup';
import { changeTalent } from '../actions/newBuild';

const rightAlgnedLvls = ['13', '16', '20'];

class TalentDropdown extends React.Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.openLvl !== nextProps.lvl) {
      this.setState({ isOpen: false });
    }
  }

  toggle() {
    this.setState((prevState, props) => {
      if (!prevState.isOpen) {
        props.onOpen(this.props.lvl);
      }
      return { isOpen: !prevState.isOpen };
    });
  }

  findTalentDisplay(talents, id) {
    return talents.find(t => t.id === id).title;
  }

  render() {
    const { lvl, hero, talents, selectedTalents } = this.props;
    const { isOpen } = this.state;

    const ddClass = cn('dropdown', {
      'is-active': isOpen,
      'is-right': rightAlgnedLvls.includes(lvl),
    });

    return (
      <div className={ddClass} onClick={this.toggle}>
        <div className="dropdown-trigger">
          {selectedTalents[`lvl${lvl}`]
            ?
            <AppPopup
              position='bottom center'
              title={this.findTalentDisplay(talents, selectedTalents[`lvl${lvl}`])}
              key={selectedTalents[`lvl${lvl}`]}
            >
              <div className="talent-block">
                <div>
                  <span>{lvl}</span>
                  <br />
                  <div className={`talent-pic in-builds ${hero} ${selectedTalents[`lvl${lvl}`]}`} />
                </div>
              </div>
            </AppPopup>
            :
            <div className="talent-block">
              <div>
                <span>{lvl}</span>
                <br />
                <div className={`talent-pic in-builds ${hero} ${selectedTalents[`lvl${lvl}`]}`} />
              </div>
            </div>
          }
        </div>
        <div className="dropdown-menu">
          <div className="dropdown-content">
            {talents.map((talent) => {
              return (
                <div
                  key={talent.id}
                  className='dropdown-item clearfix'
                  data-id={talent.id}
                  data-lvl={lvl}
                  onClick={this.props.changeTalent}
                >
                  <div className={`talent-pic in-builds ${hero} ${talent.id}`} />
                  <div className="title">{talent.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    changeTalent,
  }
)(TalentDropdown);
