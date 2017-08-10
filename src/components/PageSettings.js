import React from 'react';
import { Button, Form, Input, TextArea, Tab } from 'semantic-ui-react';
import WidgetTab from './WidgetTab';
import { initFetch, checkResponse } from '../utility';

class FeedbackTab extends React.Component {
  constructor () {
    super();

    this.editFeedback = this.editFeedback.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);

    this.state = {
      feedback: '',
    };
  }

  editFeedback(e) {
    this.setState({ feedback: e.target.value });
  }

  sendFeedback() {
    const opts = initFetch({message: this.state.feedback});

    fetch('http://hots-tool.ddns.net/api/save-feedback', opts);

    this.setState({ feedback: '' });
  }

  render () {
    return (
      <Tab.Pane as='div'>
        <Form>
          <TextArea placeholder='Share your feedback here...' rows={4} style={{marginTop: '10px'}} onChange={this.editFeedback} value={this.state.feedback} />
          <button className='ui blue button' style={{marginTop: '10px'}} onClick={this.sendFeedback}>Send Feedback</button>
        </Form>
      </Tab.Pane>
    );
  }
}

class HotkeyTab extends React.Component {
  constructor () {
    super();

    this.checkHotKey = this.checkHotKey.bind(this);

    this.state = {
      hotkey: '',
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.checkHotKey, 200);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  checkHotKey() {
    overwolf.settings.getHotKey('toggle_main_window', (result) => {
      if (result.status === 'success') {
        this.setState({hotkey: result.hotkey });
      }
    });
  }

  render() {
    const { hotkey } = this.state;
    return (
      <Tab.Pane as='div'>
        <Form>
          <Form.Input label='Toggle Main Window' value={hotkey} readOnly />
          <a href='overwolf://settings/hotkeys#toggle_main_window' className='ui blue button'>Change Hotkey</a>
        </Form>
      </Tab.Pane>
    );
  }
};



const tabPanes = [
  { menuItem: 'Hotkey', render: () => <HotkeyTab /> },
  { menuItem: 'Widget', render: () => <WidgetTab /> },
  { menuItem: 'Feedback', render: () => <FeedbackTab /> },
]

const PageSettings = () => {
  return (
    <div className='page-settings'>
      <Tab menu={{ secondary: true, pointing: true }} panes={tabPanes} />
    </div>
  );
}

export default PageSettings;
