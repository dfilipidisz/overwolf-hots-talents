import React from 'react';
import * as constants from '../constants';
import { checkStatus, makeFetchInit } from '../utility';
import { connect } from 'react-redux';

class PageFeedback extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: ''};
  }

  edit(e) {
    this.setState({message: e.target.value});
  }

  sendFeedback(e) {
    e.preventDefault();
    const fetchInit = makeFetchInit(undefined, undefined, {message: this.state.message});

    fetch(`${constants.SERVER_URL}/api/save-feedback`, fetchInit);

    this.setState({message: ''});
  }

  render() {
    return (
      <section>
        <p>Have an idea? Found a bug? Hate an OP hero? You can send me a message in the text area below:</p>
        <form className='pure-form'>
          <textarea className='feedback-wide-text' rows='5' value={this.state.message} onChange={this.edit.bind(this)} />
        </form>
        <button className='pure-button pure-button-primary feedback-wide-send-btn'
          onClick={this.sendFeedback.bind(this)}>
          Send Feedback</button>
      </section>
    );
  }
};

export default PageFeedback;
