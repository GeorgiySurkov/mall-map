import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function SearchIcon(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={8.5} cy={8.5} r={7} stroke="#a6a6a6" strokeWidth={3} />
      <Path d="M13.5 13.5l9 9" stroke="#a6a6a6" strokeWidth={3} />
    </Svg>
  );
}

export default SearchIcon;
