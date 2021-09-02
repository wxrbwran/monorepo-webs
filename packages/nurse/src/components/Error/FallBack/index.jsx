/**
 * Created by wuxiaoran on 2019/3/6.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Fallback = props => (
  <div>
    <h1>页面出错，请检查！</h1>
    <details>
      ====================>Error Message:
      <p>{props.error.message}</p>
      ====================>componentStack:
      <p>{props.info.componentStack}</p>
      ====================>Info:
      <p>{ JSON.stringify(props) }</p>
    </details>
  </div>
);


Fallback.propTypes = {
  error: PropTypes.any,
  info: PropTypes.any,
};
export default Fallback;
