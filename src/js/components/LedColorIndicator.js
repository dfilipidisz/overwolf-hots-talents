import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { ledChangeColor } from '../actions/led';

class LedColorIndicator extends Component {

  constructor (props) {
    super(props);

    this.openPicker = this._openPicker.bind(this);
    this.closePicker = this._closePicker.bind(this);
    this.colorChanged = this._colorChanged.bind(this);

    this.state = {
      pickerOpen: false
    };
  }

  _openPicker () {
    this.setState({pickerOpen: true});
  }

  _closePicker () {
    this.setState({pickerOpen: false});
  }

  _colorChanged (color) {
    this.props.ledChangeColor(this.props.command, color.rgb);
  }

  render () {
    const r = Math.round(255 * (this.props.color.r / 100));
    const g = Math.round(255 * (this.props.color.g / 100));
    const b = Math.round(255 * (this.props.color.b / 100));
    const color = `rgb(${r}, ${g}, ${b})`;

    return (
      <div ref='indicator' className='led-color-indicator' style={{backgroundColor: color}} onClick={this.openPicker}>
        {this.state.pickerOpen
          ? <div className='picker-holder' onMouseLeave={this.closePicker}>
              <SketchPicker
                color={{r, g, b}}
                disableAlpha
                onChangeComplete={this.colorChanged}
                presetColors={this.props.presetColors} />
            </div>
          : null}
      </div>
    );
  }
}

export default connect(
  null,
  { ledChangeColor }
)(LedColorIndicator);
