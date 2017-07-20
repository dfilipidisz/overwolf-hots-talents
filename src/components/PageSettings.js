import React from 'react';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';
import Separator from './Separator';
import { initFetch, checkResponse } from '../utility';

class PageSettings extends React.Component {

  constructor () {
    super();

    this.editFeedback = this.editFeedback.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.checkHotKey = this.checkHotKey.bind(this);

    this.state = {
      hotkey: '',
      loading: true,
      feedback: '',
      intervalId: null,
    };
  }

  componentDidMount() {
    const intervalId = setInterval(this.checkHotKey, 200);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  checkHotKey() {
    overwolf.settings.getHotKey('toggle_main_window', (result) => {
      if (result.status === 'success') {
        this.setState({ loading: false, hotkey: result.hotkey });
      }
    });
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
    const { hotkey, loading } = this.state;

    return (
      <div className='page-settings'>
        <Separator title='Settings' />
        <Form loading={loading}>
          <Form.Input label='Toggle Main Window' value={hotkey} readOnly />
          <a href='overwolf://settings/hotkeys#toggle_main_window' className='ui blue button'>Change Hotkey</a>
        </Form>
        <Separator title='Feedback' />
        <Form loading={loading}>
          <TextArea placeholder='Share your feedback here...' rows={4} style={{marginTop: '10px'}} onChange={this.editFeedback} value={this.state.feedback} />
          <button className='ui blue button' style={{marginTop: '10px'}} onClick={this.sendFeedback}>Send Feedback</button>
        </Form>
      </div>
    );
  }
}

export default PageSettings;
