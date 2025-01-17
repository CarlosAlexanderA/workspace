import {View} from 'react-native';
import React from 'react';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {Canvas, Text, useFont} from '@shopify/react-native-skia';
type Props = {
  selectedValue: SharedValue<number>;
};

export const AnimatedText = ({selectedValue}: Props) => {
  const font = useFont(require('../../src/assets/fonts/Roboto-Bold.ttf'), 88);

  const animatedText = useDerivedValue(() => {
    return `${Math.round(selectedValue.value)}`;
  });

  if (!font) {
    return <View />;
  }

  const fontSize = font.measureText('0');

  return (
    <Canvas style={{height: fontSize.height + 40}}>
      <Text
        font={font}
        text={animatedText}
        color={'#111'}
        y={fontSize.height + 20}
      />
    </Canvas>
  );
};
