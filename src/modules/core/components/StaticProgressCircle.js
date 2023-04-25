import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
// styles
import { primaryColor, blackColor } from 'src/assets/jss/styles';

function StaticProgressCircle({
  size = 78,
  strokeWidth = 10,
  progress = 1,
  text = '',
}) {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const percent = 1 - progress;
  const alfa = percent * Math.PI * 2;
  const strokeDashOffset = alfa * radius;

  return (
    <View
      style={[
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          height: size,
        },
      ]}
    >
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cy={center}
          cx={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          stroke="#C8C7CC"
        />
        <Circle
          transform={`rotate(-90, ${center}, ${center})`}
          stroke={primaryColor.main}
          fill="transparent"
          cy={center}
          cx={center}
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={strokeWidth}
          strokeDashoffset={strokeDashOffset}
        ></Circle>
      </Svg>
      <Text
        style={{
          color: blackColor,
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >
        {text}
      </Text>
    </View>
  );
}

export default StaticProgressCircle;
