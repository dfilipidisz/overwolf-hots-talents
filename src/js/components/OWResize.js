import React from 'react';
import { PAGES } from '../constants';

export default (WrappedComponent) => {
  class OWResize extends React.Component {
    constructor() {
      super();

      this.resizeRight = this.resizeRight.bind(this);
      this.resizeLeft = this.resizeLeft.bind(this);
    }

    resizeRight() {
      overwolf.windows.dragResize(this.props.windowId, 'Right');
    }

    resizeLeft() {
      overwolf.windows.dragResize(this.props.windowId, 'Left');
    }

    render() {
      if (this.props.page === PAGES.MINIMIZED) {
        return <WrappedComponent { ...this.props } />;
      }

      return (
        <div className='resize-overlay'>
          <div className='resizer right' onMouseDown={ this.resizeRight } />
          <div className='resizer left' onMouseDown={ this.resizeLeft } />
          <WrappedComponent { ...this.props } />
        </div>
      );
    }
  }

  OWResize.propTypes = {
    windowId: React.PropTypes.string,
    page: React.PropTypes.string,
  };

  return OWResize;
};
