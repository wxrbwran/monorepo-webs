import React from 'react';
import FallBack from '../FallBack';

function log(error: any, info: string, props: any) {

}

interface IState {
  [key: string]: any;
};

function ErrorHandler(Component: any,
  errorCallback = log): any {
  class WithErrorHandler extends React.Component<any, IState> {
    constructor(props: any) {
      super(props);
      this.state = {
        hasError: false,
        error: null,
        info: null,
      };
    }

    componentDidCatch(error: any, info: any): void {
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
          <FallBack
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
