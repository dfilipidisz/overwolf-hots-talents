import React from 'react';
import { connect } from 'react-redux';
import { PAGES } from '../constants';
import { minimizeApp } from '../actions/navigation';

export const HideApp = WrappedComponent => {
  class AppHider extends React.Component {
    constructor (props) {
      super(props);
    }

    hoverOut() {
      if (this.props.autoClose) {
        this.props.minimizeApp();
      }
    }

    render() {
      if (this.props.page !== PAGES.MINIMIZED) {
        return (
          <div onMouseLeave={ this.hoverOut.bind(this)} style={{position: 'relative'}} >
            <WrappedComponent {...this.props} />
          </div>
        );
      }
      else {
        return <WrappedComponent {...this.props} />;
      }
    }
  }

  AppHider.propTypes = {
    navigateTo: React.PropTypes.func.isRequired,
    page: React.PropTypes.string.isRequired,
    autoClose: React.PropTypes.bool.isRequired
  };

  return connect(
    state => ({ page: state.navigation.page, autoClose: state.settings.autoClose }),
    { minimizeApp }
  )(AppHider);
};
