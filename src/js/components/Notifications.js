const React = require('react');
import { connect } from 'react-redux';
const { closeNotification } = require('../actions/notifications');

class Notifications extends React.Component {
  
  render() {
    
    let { notes, isClosed } = this.props;
    
    if (isClosed) {
      return null;
    }
    else {
      return (
        <div className='alert'>
          <p>The new patch introduced a lot of new talent images. They will be available soon!</p>
          <i className='fa fa-close' onClick={this.props.closeNotification} />
        </div>
      );
    }
  }
};

module.exports = connect(
  state => ({ notes: state.notifications.notes, isClosed: state.notifications.isClosed }),
  { closeNotification }
)(Notifications);