import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants';

const SvgFolder = ({ fill, size }) => (
  <Svg height={size} viewBox="0 0 24 24" width={size}>
    <Path
      d="M23 19V8a2.997 2.997 0 00-3-3h-8.465L9.832 2.445A1 1 0 009 2H4a2.997 2.997 0 00-3 3v14a2.997 2.997 0 003 3h16a2.997 2.997 0 003-3zm-2 0c0 .276-.111.525-.293.707S20.276 20 20 20H4c-.276 0-.525-.111-.707-.293S3 19.276 3 19V5c0-.276.111-.525.293-.707S3.724 4 4 4h4.465l1.703 2.555c.192.287.506.443.832.445h9c.276 0 .525.111.707.293S21 7.724 21 8z"
      fill={fill}
    />
  </Svg>
);

SvgFolder.defaultProps = {
  fill: colors.white,
  size: 24
};

SvgFolder.propTypes = {
  // optional
  fill: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.number
};

export default React.memo(SvgFolder);