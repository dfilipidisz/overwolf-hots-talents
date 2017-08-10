import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Tab, Select } from 'semantic-ui-react';
import { changeWidgetOpt } from '../actions/app';

const openBehaviorOptions = [{
  text: 'Open on Mouse Hover',
  value: 'hover',
}, {
  text: 'Open on Mouse Click',
  value: 'click',
}];

const closeBehaviorOptions = [{
  text: 'Close on Mouse Leave',
  value: 'hover',
}, {
  text: 'Close on Mouse Click',
  value: 'click',
}];

class WidgetTab extends React.Component {
  constructor () {
    super();

    this.changeOpacity = this.changeOpacity.bind(this);
    this.changeOpenBehav = this.changeOpenBehav.bind(this);
    this.changeCloseBehav = this.changeCloseBehav.bind(this);
  }

  changeOpacity(e, data) {
    this.props.changeWidgetOpt(data.name, parseFloat(data.value) / 100);
  }

  changeOpenBehav(e, data) {
    this.props.changeWidgetOpt(data.name, data.value);
  }

  changeCloseBehav(e, data) {
    this.props.changeWidgetOpt(data.name, data.value);
  }

  render() {
    const { widgetSettings } = this.props;
    return (
      <Tab.Pane as='div'>
        <Form>
          <Form.Field>
            <label>Widget Opacity</label>
            <Input label={{ basic: true, content: '%' }}
      labelPosition='right' value={Math.round(widgetSettings.opacity * 100)} name='opacity' onChange={this.changeOpacity} type="number" step="1" min="0" max="100" />
          </Form.Field>
          <Form.Field>
            <label>Widget Open Behavior</label>
            <Select name='openOn' value={widgetSettings.openOn} options={openBehaviorOptions} onChange={this.changeOpenBehav} />
          </Form.Field>
          <Form.Field>
            <label>Widget Close Behavior</label>
            <Select name='closeOn' value={widgetSettings.closeOn} options={closeBehaviorOptions} onChange={this.changeCloseBehav} />
          </Form.Field>
        </Form>
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
