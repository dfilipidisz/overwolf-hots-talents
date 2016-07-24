const React = require('react');
import { PAGES } from '../constants';
import { dragWindow } from '../utility';

export let OWMove = ComposedComponent => class extends React.Component {

  constructor() {
    super();
  }

  render() {
    if (this.props.page !== PAGES.MINIMIZED) {
      return <ComposedComponent {...this.props} />;
    }
    else {
      return (
        <div className='ow-move-container' onMouseDown={dragWindow}>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }
};
