import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants';

const SvgCornerLeftUp = ({ fill, size }) => (
  <Svg height={size} viewBox="0 0 24 24" width={size}>
    <Path
      d="M20 19h-7c-.829 0-1.577-.335-2.121-.879S10 16.829 10 16V6.414l3.293 3.293a.999.999 0 101.414-1.414l-5-5a.998.998 0 00-1.414 0l-5 5a.999.999 0 101.414 1.414L8 6.414V16c0 1.38.561 2.632 1.464 3.536S11.62 21 13 21h7a1 1 0 000-2z"
      fill={fill}
    />
  </Svg>
);

SvgCornerLeftUp.defaultProps = {
  fill: colors.white,
  size: 24
};

SvgCornerLeftUp.propTypes = {
  // optional
  fill: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.number
};

export default React.memo(SvgCornerLeftUp);
