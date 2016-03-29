const React = require('react');
import { connect } from 'react-redux';
import { ANALYTICS_URL } from '../constants';

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
    let m = this.state.message;
    
    let fetchInit = {
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({event: 'feedback', message: m})
    };
      
    fetch(ANALYTICS_URL, fetchInit);
    
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

module.exports = connect(
  state => ({  }),
  null
)(PageFeedback);