import React from 'react';
import * as constants from '../constants';
import { checkStatus, makeFetchInit } from '../utility';
import { connect } from 'react-redux';

class PageFeedback extends React.Component {

  constructor(props) {
    super(props);

    this.edit = this._edit.bind(this);

    this.state = {message: ''};
  }

  _edit (e) {
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
        <form>
          <textarea className='feedback-wide-text' rows='5' value={this.state.message} onChange={this.edit} />
        </form>
        <button className='btn btn-primary feedback-wide-send-btn'
          onClick={this.sendFeedback.bind(this)}>
          Send Feedback</button>
      </section>
    );
  }
};

export default PageFeedback;
