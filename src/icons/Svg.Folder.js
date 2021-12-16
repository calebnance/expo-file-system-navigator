import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants';

const SvgFolder = ({ fill, secondary, size }) => (
  <Svg viewBox="0 0 48 48" width={size} height={size}>
    <Path
      fill={secondary}
      d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"
    />
    <Path
      fill={fill}
      d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"
    />
  </Svg>
);

SvgFolder.defaultProps = {
  fill: colors.primary,
  secondary: colors.itemInactive,
  size: 24
};

SvgFolder.propTypes = {
  // optional
  fill: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secondary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.number
};

export default React.memo(SvgFolder);
