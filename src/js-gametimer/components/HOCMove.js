import React from 'react';

export const HOCMove = ComposedComponent => class extends React.Component {

  constructor() {
    super();

    this.dragWindow = this.dragWindow.bind(this);
  }

  dragWindow() {
    overwolf.windows.dragMove(this.props.windowId);
  }

  render() {
    return (
      <div className='ow-move-container' onMouseDown={ this.dragWindow }>
        <ComposedComponent { ...this.props } />
      </div>
    );
  }
};
