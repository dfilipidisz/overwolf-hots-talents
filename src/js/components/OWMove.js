const React = require('react');
//const PAGES = require('../pages');
import { PAGES } from '../constants';
 
export let OWMove = ComposedComponent => class extends React.Component {
  
  constructor() {
    super();
  }
  
  dragMove(e) {
    overwolf.windows.getCurrentWindow(function(result) {
      if (result.status === 'success') {
        overwolf.windows.dragMove(result.window.id);
      }
    });
  }
  
  render() {
    if (this.props.page !== PAGES.MINIMIZED) {
      return <ComposedComponent {...this.props} />;  
    }
    else {
      return (
        <div className='ow-move-container' onMouseDown={this.dragMove}>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
    
  }
};