import React from 'react';
import { PAGES } from '../constants';
import { dragWindow } from '../utility';

export const OWMove = ComposedComponent => class extends React.Component {
  render() {
    if (this.props.page !== PAGES.MINIMIZED) {
      return <ComposedComponent { ...this.props } />;
    }

    return (
      <div className='ow-move-container' onMouseDown={ dragWindow }>
        <ComposedComponent { ...this.props } />
      </div>
    );
  }
};
