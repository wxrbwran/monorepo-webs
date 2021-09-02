import React from 'react';
import FallBack from '../FallBack';

function log() {}

function ErrorHandler(Component,
  FallbackComponent = FallBack,
  errorCallback = log) {
  class WithErrorHandler extends React.Component {
    constructor(props) {
      super(props);
      // Construct the initial state
      this.state = {
        hasError: false,
        error: null,
        info: null,
      };
    }

    componentDidCatch(error, info) {
      // Update state if error happens
      this.setState({ hasError: true, error, info });
      // Report errors
      if (errorCallback) {
        errorCallback(error, info, this.props);
      }
    }

    render() {
      // if state contains error we render fallback component
      if (this.state.hasError) {
        const { error, info } = this.state;
        return (
          <FallbackComponent
            {...this.props}
            error={error}
            info={info}
          />
        );
      }
      return <Component {...this.props} />;
    }
  }
  return WithErrorHandler;
}

export default ErrorHandler;
