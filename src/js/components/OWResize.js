const React = require('react');
import { PAGES } from '../constants';
 
export let OWResize = ComposedComponent => class extends React.Component {
  
  constructor() {
    super();
  }
  
  dragResize(side, e) {
    overwolf.windows.getCurrentWindow(function(result) {
      if (result.status === 'success') {
        overwolf.windows.dragResize(result.window.id, side);
      }
    });
  }
  
  render() {
    
    if (this.props.page === PAGES.MINIMIZED) {
      return <ComposedComponent {...this.props} />;
    }
    else {
      return (
        <div className='ow-resize-container'>
          <div className='ow-resize-left' onMouseDown={this.dragResize.bind(this, 'Left')} />
          <div className='ow-resize-right' onMouseDown={this.dragResize.bind(this, 'Right')} />
          <div className='ow-resize-top' onMouseDown={this.dragResize.bind(this, 'Top')} />
          <div className='ow-resize-bottom' onMouseDown={this.dragResize.bind(this, 'Bottom')} />
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }
};