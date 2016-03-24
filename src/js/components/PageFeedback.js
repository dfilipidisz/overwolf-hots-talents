const React = require('react');
import { connect } from 'react-redux';
const { sendFeedback } = require('../actions/analytics');

/*module.exports = */class PageFeedback extends React.Component {
  
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
    this.setState({message: ''});
    this.props.sendFeedback(m); 
    
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
  { sendFeedback }
)(PageFeedback);