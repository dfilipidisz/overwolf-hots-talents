const React = require('react');
import { PAGES } from '../constants';
 
export let HideApp = ComposedComponent => class extends React.Component {
  
  constructor() {
    super();
  }
  
  hoverOut() {
    this.props.navigateTo(PAGES.MINIMIZED);
  }
  
  render() {
    if (this.props.page !== PAGES.MINIMIZED) {
      return (
        <div onMouseLeave={ this.hoverOut.bind(this)} >
          <ComposedComponent {...this.props} />
        </div>
      );
    }
    else {
      return <ComposedComponent {...this.props} />;  
    }
    
  }
};