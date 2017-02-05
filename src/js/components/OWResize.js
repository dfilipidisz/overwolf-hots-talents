import React from 'react';
import { PAGES } from '../constants';

export const OWResize = ComposedComponent => class extends React.Component {

  dragResize(side) {
    overwolf.windows.getCurrentWindow((result) => {
      if (result.status === 'success') {
        overwolf.windows.dragResize(result.window.id, side);
      }
    });
  }

  render() {
    if (this.props.page === PAGES.MINIMIZED) {
      return <ComposedComponent { ...this.props } />;
    }

    return (
      <div className='ow-resize-container'>
        <div className='ow-resize-left' onMouseDown={ this.dragResize.bind(this, 'Left') } />
        <div className='ow-resize-right' onMouseDown={ this.dragResize.bind(this, 'Right') } />
        <ComposedComponent { ...this.props } />
      </div>
    );
  }
};
