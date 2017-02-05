import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import getSimpleTalentName from '../utilities/getSimpleTalentName';

const TalentOption = React.createClass({
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
      title={ this.props.option.value }
    >
      <div className={ `talent-pic option ${getSimpleTalentName(this.props.option.value)}` } />
      {this.props.children}
    </div>
  	);
  },
});

const TalentValue = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
  },

  render() {
  	return (
    <div className='Select-value' title={ this.props.value.value }>
      <span className='Select-value-label'>
        <div className={ `talent-pic option ${getSimpleTalentName(this.props.value.value)}` } />
        {this.props.children}
      </span>
    </div>
  	);
  },
});

class TalentDropdown extends React.Component {
  changedTalent(value) {
    if (value === null) {
      this.props.onChange(null);
    } else {
      this.props.onChange(value.value);
    }
  }

  render() {
    const talentOptions = this.props.data[`lvl${this.props.lvl}`].map((talent) => {
      return { value: talent.title, label: talent.title };
    });

    return (
      <Select
        onChange={ this.changedTalent.bind(this) }
        optionComponent={ TalentOption }
        options={ talentOptions }
        placeholder={ <span>Select a Talent</span> }
        value={ this.props.value }
        valueComponent={ TalentValue }
        className='talent-dropdown'
        onOpen={ this.props.onOpen }
        onClose={ this.props.onClose }
      />
    );
  }
}

export default TalentDropdown;
