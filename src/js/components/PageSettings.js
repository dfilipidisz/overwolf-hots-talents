import React from 'react';
import { connect } from 'react-redux';
import { toggleAutoClose } from '../actions/settings';
import { toggleLedPower, resetLayout } from '../actions/led';
import KeynameSelector from './KeynameSelector';
import LedColorIndicator from './LedColorIndicator';

class PageSettings extends React.Component {

  constructor(props) {
    super(props);

    this.resetLayout = this._resetLayout.bind(this);

    this.state = {
      activeTab: 'general',
    };
  }

  changeTabTo(newTab) {
    this.setState({ activeTab: newTab });
  }

  rgbToHex(r, g, b) {
    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  _resetLayout(e) {
    e.preventDefault();
    this.props.resetLayout();
  }

  render() {
    let presetColors = [];

    this.props.layout.forEach((key) => {
      if (presetColors.findIndex((c) => {
        return c.r === key.color.r && c.g === key.color.g && c.b === key.color.b;
      }) === -1) {
        presetColors.push(key.color);
      }
    });

    presetColors = presetColors.map((color) => {
      return this.rgbToHex(Math.round(255 * (color.r / 100)), Math.round(255 * (color.g / 100)), Math.round(255 * (color.b / 100)));
    });

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <ul className='nav nav-tabs'>
              <li className={ this.state.activeTab === 'general' ? 'active' : null } onClick={ this.changeTabTo.bind(this, 'general') }><a href='#'>General</a></li>
              <li className={ this.state.activeTab === 'led' ? 'active' : null } onClick={ this.changeTabTo.bind(this, 'led') }><a href='#'>Logitech LED</a></li>
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <div className='settings-tab-box' >
              {this.state.activeTab === 'general'
                ?
                  <form className='form-horizontal'>
                    <div className='form-group'>
                      <label className='col-xs-4 control-label'>Window Auto Close</label>
                      <div className='col-xs-8'>
                        <div className='checkbox'>
                          <label>
                            <input type='checkbox' checked={ this.props.autoClose } onChange={ () => { this.props.toggleAutoClose(); } } />
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                :
                null
              }
              {this.state.activeTab === 'led'
                ?
                  <form className='form-horizontal'>
                    <div className='form-group'>
                      <label className='col-xs-4 control-label'>Turn LED subsystem on/off</label>
                      <div className='col-xs-8'>
                        <div className='checkbox'>
                          <label>
                            <input type='checkbox' checked={ this.props.power } onChange={ () => { this.props.toggleLedPower(); } } />
                          </label>
                        </div>
                      </div>
                    </div>
                    {this.props.layout.map((key) => {
                      return (
                        <div key={ key.command } className='form-group'>
                          <label className='col-xs-4 control-label'>{key.command}</label>
                          <div className='col-xs-6'>
                            <KeynameSelector command={ key.command } value={ key.keyname } />
                          </div>
                          <div className='col-xs-2'>
                            <LedColorIndicator command={ key.command } color={ key.color } presetColors={ presetColors } />
                          </div>
                        </div>
                      );
                    })}
                    <div className='form-group'>
                      <div className='col-xs-8 col-xs-offset-4'>
                        <button
                          className='btn btn-primary'
                          style={ { borderRadius: '0px' } }
                          onClick={ this.resetLayout }
                        >Reset</button>
                      </div>
                    </div>
                    <div style={ { height: '150px' } } />
                  </form>
                :
                null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ autoClose: state.settings.autoClose, power: state.led.power, layout: state.led.layout }),
  { toggleAutoClose, toggleLedPower, resetLayout }
)(PageSettings);
