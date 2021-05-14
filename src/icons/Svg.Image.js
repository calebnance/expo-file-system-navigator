import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants';

const SvgImage = ({ fill, size }) => (
  <Svg height={size} viewBox="0 0 24 24" width={size}>
    <Path
      d="M5 2a2.997 2.997 0 00-3 3v14a2.997 2.997 0 003 3h14a2.997 2.997 0 003-3V5a2.997 2.997 0 00-3-3zm6 6.5a2.498 2.498 0 00-4.268-1.768 2.498 2.498 0 103.536 3.536A2.492 2.492 0 0011 8.5zm-2 0a.5.5 0 11-1 .002.5.5 0 011-.002zM7.414 20L16 11.414l4 4V19c0 .276-.111.525-.293.707S19.276 20 19 20zM20 12.586l-3.293-3.293a.999.999 0 00-1.414 0L4.649 19.937A.994.994 0 014 19V5c0-.276.111-.525.293-.707S4.724 4 5 4h14c.276 0 .525.111.707.293S20 4.724 20 5z"
      fill={fill}
    />
  </Svg>
);

SvgImage.defaultProps = {
  fill: colors.white,
  size: 24
};

SvgImage.propTypes = {
  // optional
  fill: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.number
};

export default React.memo(SvgImage);
