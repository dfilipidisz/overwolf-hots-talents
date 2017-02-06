import React from 'react';

export default (WrappedComponent) => {
  return class extends React.Component {
    constructor() {
      super();

      this.state = {
        windowId: null,
      };
    }

    componentDidMount() {
      overwolf.windows.getCurrentWindow((result) => {
        if (result.status === 'success') {
          this.setState({ windowId: result.window.id });
        }
      });
    }

    render() {
      return (
        <WrappedComponent { ...this.props } windowId={ this.state.windowId } />
      );
    }
  };
};
