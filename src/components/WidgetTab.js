import React from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { changeWidgetOpt } from '../actions/app';

class WidgetTab extends React.Component {
  constructor () {
    super();

    this.changeOpacity = this.changeOpacity.bind(this);
    this.changeOpenBehav = this.changeOpenBehav.bind(this);
    this.changeCloseBehav = this.changeCloseBehav.bind(this);
    this.changePlacement = this.changePlacement.bind(this);
    this.changePosition = this.changePosition.bind(this);
  }

  changeOpenBehav(e) {
    this.props.changeWidgetOpt('openOn', e.target.value);
  }

  changeCloseBehav(e) {
    this.props.changeWidgetOpt('closeOn', e.target.value);
  }

  changePlacement(e) {
    this.props.changeWidgetOpt('placement', e.target.value);
  }

  changePosition(e) {
    this.props.changeWidgetOpt('position', parseFloat(e.target.value) / 100);
  }

  changeOpacity(e) {
    this.props.changeWidgetOpt('opacity', parseFloat(e.target.value) / 100);
  }

  render() {
    const { widgetSettings } = this.props;
    console.log(widgetSettings);
    return (
      <Tab.Pane as='div'>
        <div className="columns">
          <div className="column">
            <label>Opacity</label>
            <div className="range-slider">
              <input className="range-slider__range" type="range" value={Math.round(widgetSettings.opacity * 100)} min="0" max="100" step="1" onChange={this.changeOpacity} />
              <span className="range-slider__value">{Math.round(widgetSettings.opacity * 100)}%</span>
            </div>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-half">
            <label style={{ marginBottom: '10px', display: 'inline-block' }}>Open Behavior</label>
            <div className="select is-fullwidth">
              <select value={widgetSettings.openOn} onChange={this.changeOpenBehav}>
                <option value="hover">Open on Mouse Hover</option>
                <option value="click">Open on Mouse Click</option>
              </select>
            </div>
          </div>
          <div className="column is-half">
            <label style={{ marginBottom: '10px', display: 'inline-block' }}>Close Behavior</label>
            <div className="select is-fullwidth">
              <select value={widgetSettings.closeOn} onChange={this.changeCloseBehav}>
                <option value="hover">Close on Mouse Leave</option>
                <option value="click">Close on Mouse Click</option>
              </select>
            </div>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-half">
            <label style={{ marginBottom: '10px', display: 'inline-block' }}>Placement</label>
            <div className="select is-fullwidth">
              <select value={widgetSettings.placement} onChange={this.changePlacement}>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
          <div className="column is-half">
            <label style={{ marginBottom: '10px', display: 'inline-block' }}>Position</label>
            <div className="range-slider">
              <input className="range-slider__range" type="range" value={Math.round(widgetSettings.position * 100)} min="0" max="100" step="1" onChange={this.changePosition} />
              <span className="range-slider__value">{Math.round(widgetSettings.position * 100)}%</span>
            </div>
          </div>
        </div>
      </Tab.Pane>
    );
  }
};

export default connect(
  state => ({
    widgetSettings: state.app.widgetSettings,
  }),
  {
    changeWidgetOpt,
  },
)(WidgetTab);
