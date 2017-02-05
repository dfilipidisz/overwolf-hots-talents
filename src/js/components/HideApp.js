import React from 'react';
import { connect } from 'react-redux';
import { PAGES } from '../constants';
import { minimizeApp } from '../actions/navigation';

export const HideApp = WrappedComponent => {
  class AppHider extends React.Component {

    constructor() {
      super();

      this.hoverOut = this.hoverOut.bind(this);
    }

    hoverOut() {
      if (this.props.autoClose) {
        this.props.minimizeApp();
      }
    }

    render() {
      if (this.props.page !== PAGES.MINIMIZED) {
        return (
          <div onMouseLeave={ this.hoverOut } style={ { position: 'relative' } } >
            <WrappedComponent { ...this.props } />
          </div>
        );
      }

      return <WrappedComponent { ...this.props } />;
    }
  }

  AppHider.propTypes = {
    page: React.PropTypes.string.isRequired,
    autoClose: React.PropTypes.bool.isRequired,
    minimizeApp: React.PropTypes.func,
  };

  return connect(
    state => ({ page: state.navigation.page, autoClose: state.settings.autoClose }),
    { minimizeApp }
  )(AppHider);
};
