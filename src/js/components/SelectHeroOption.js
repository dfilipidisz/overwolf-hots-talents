import React from 'react';

class SelectHeroOption extends React.Component {

  constructor() {
    super();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSelect(this.props.option, e);
  }

  handleMouseEnter(e) {
    this.props.onFocus(this.props.option, e);
  }

  handleMouseMove(e) {
    if (this.props.isFocused) { return; }
    this.props.onFocus(this.props.option, e);
  }

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
  }
}

SelectHeroOption.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  isFocused: React.PropTypes.bool,
  onFocus: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  option: React.PropTypes.object.isRequired,
};

export default SelectHeroOption;
