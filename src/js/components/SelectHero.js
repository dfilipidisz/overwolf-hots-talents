import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { HEROES } from '../constants';
import { talentsChooseHero } from '../actions/talents';
import SelectHeroValue from './SelectHeroValue';
import SelectHeroOption from './SelectHeroOption';

class SelectHero extends React.Component {

  constructor() {
    super();

    this.changedHero = this.changedHero.bind(this);
  }

  changedHero(value) {
    if (value === null) {
      this.props.talentsChooseHero(null);
    } else {
      this.props.talentsChooseHero(value.value);
    }
    this.props.updateSize();
  }

  render() {
    return (
      <Select
        onChange={ this.changedHero }
        optionComponent={ SelectHeroOption }
        options={ HEROES }
        placeholder={ <span>Select a Hero</span> }
        value={ this.props.selectedHero }
        valueComponent={ SelectHeroValue }
      />
    );
  }
}

SelectHero.propTypes = {
  talentsChooseHero: React.PropTypes.func,
  updateSize: React.PropTypes.func,
  selectedHero: React.PropTypes.string,
};

module.exports = connect(
  state => ({ heroes: state.talents.heroes, selectedHero: state.talents.selectedHero }),
  { talentsChooseHero }
)(SelectHero);
