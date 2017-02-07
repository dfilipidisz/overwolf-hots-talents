import React from 'react';
import { PAGES } from '../constants';

export const OWMove = ComposedComponent => class extends React.Component {

  constructor() {
    super();

    this.dragWindow = this.dragWindow.bind(this);
  }

  dragWindow() {
    overwolf.windows.dragMove(this.props.windowId);
  }

  render() {
    if (this.props.page !== PAGES.MINIMIZED) {
      return <ComposedComponent { ...this.props } />;
    }

    return (
      <div className='ow-move-container' onMouseDown={ this.dragWindow }>
        <ComposedComponent { ...this.props } />
      </div>
    );
  }
};
