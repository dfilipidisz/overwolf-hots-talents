import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { HEROES } from '../constants';
import { talentsChooseHero } from '../actions/talents';

const HeroOption = React.createClass({
  propTypes: {
  	children: React.PropTypes.node,
  	className: React.PropTypes.string,
  	isDisabled: React.PropTypes.bool,
  	isFocused: React.PropTypes.bool,
  	isSelected: React.PropTypes.bool,
  	onFocus: React.PropTypes.func,
  	onSelect: React.PropTypes.func,
  	option: React.PropTypes.object.isRequired,
  },
  handleMouseDown(event) {
  	event.preventDefault();
  	event.stopPropagation();
  	this.props.onSelect(this.props.option, event);
  },
  handleMouseEnter(event) {
  	this.props.onFocus(this.props.option, event);
  },
  handleMouseMove(event) {
  	if (this.props.isFocused) return;
  	this.props.onFocus(this.props.option, event);
  },
  render() {
  	return (
    <div
      className={ this.props.className }
      onMouseDown={ this.handleMouseDown }
      onMouseEnter={ this.handleMouseEnter }
      onMouseMove={ this.handleMouseMove }
      onMouseLeave={ this.handleMouseLeave }
      title={ this.props.option.title }
    >
      <div className={ `hero-portrait ${this.props.option.value}` } />
      {this.props.children}
    </div>
  	);
  },
});

const HeroValue = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
  },

  render() {
  	return (
    <div className='Select-value' title={ this.props.value.title }>
      <span className='Select-value-label'>
        <div className={ `hero-portrait ${this.props.value.value}` } />
        {this.props.children}
      </span>
    </div>
  	);
  },
});

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
        optionComponent={ HeroOption }
        options={ HEROES }
        placeholder={ <span>Select a Hero</span> }
        value={ this.props.selectedHero }
        valueComponent={ HeroValue }
      />
    );
  }
}

module.exports = connect(
  state => ({ heroes: state.talents.heroes, selectedHero: state.talents.selectedHero }),
  { talentsChooseHero }
)(SelectHero);
