import React from 'react';
import Svg, {Path} from 'react-native-svg';

function CrossIcon(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M1.5 1.5l21 21M22.5 1.5l-21 21"
        stroke="#a6a6a6"
        strokeWidth={3}
      />
    </Svg>
  );
}

export default CrossIcon;
