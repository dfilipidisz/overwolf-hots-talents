import React from 'react';
import { connect } from 'react-redux';
import { closeNotification } from '../actions/notifications';

class Notifications extends React.Component {

  render() {
    const { isClosed } = this.props;

    if (isClosed) {
      return null;
    }

    return (
      <div className='oht-alert'>
        <p>With Patch 19 HotS implemented a DirectX 11 renderer. Overwolf has some problems with games running in DirectX 11, but there is a workaround: <a href='http://blizz.ly/29FCm5E' target='_blank' rel='noopener noreferrer'>Blizzard post</a></p>
        <i className='fa fa-close' onClick={ this.props.closeNotification } />
      </div>
    );
  }
}

module.exports = connect(
  state => ({ notes: state.notifications.notes, isClosed: state.notifications.isClosed }),
  { closeNotification }
)(Notifications);
