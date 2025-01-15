import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Canvas, Path, SkFont, Skia, Text} from '@shopify/react-native-skia';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import DonutPath from './DonutPath';

type Props = {
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  font: SkFont;
  smallFont: SkFont;
  totalValue: SharedValue<number>;
  n: number;
  gap: number;
  decimals: SharedValue<number[]>;
  colors: string[];
};

const DonutChart = ({
  radius,
  strokeWidth,
  outerStrokeWidth,
  font,
  smallFont,
  totalValue,
  n,
  gap,
  decimals,
  colors,
}: Props) => {
  const array = Array.from({length: n});

  // es el radio del círculo interior o del círculo sin el recorrido exterior
  const innerRadius = radius - outerStrokeWidth / 2;
  const path = Skia.Path.Make();

  path.addCircle(radius, radius, innerRadius);

  //* convertir totalValue en estring usando useDerivedValue
  //? useDerivedValue => actualizar valores compartidos
  const targeText = useDerivedValue(
    () => `$${Math.round(totalValue.value)}`,
    []
  );

  const fontSize = font.measureText('$00');
  const smallFontSize = smallFont.measureText('Total spent');

  //? captura los cambios y usa la formula => radius -_fonsize.width/2
  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targeText.value);
    return radius - _fontSize.width / 2;
  });

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color="#f4f7fc"
          style="stroke"
          strokeWidth={outerStrokeWidth}
          strokeJoin="round"
          strokeCap="round"
          start={0}
          end={1}
        />
        {array.map((_, index) => (
          <DonutPath
            key={index}
            radius={radius}
            strokeWidth={strokeWidth}
            outerStrokeWidth={outerStrokeWidth}
            color={colors[index]}
            decimals={decimals}
            index={index}
            gap={gap}
          />
        ))}
        <Text
          x={radius - smallFontSize.width / 2}
          y={radius + smallFontSize.height / 2 - fontSize.height / 1.2}
          text={'total Spent'}
          font={smallFont}
          color="black"
        />
        <Text
          x={textX}
          y={radius + fontSize.height / 2}
          text={targeText}
          font={font}
          color="black"
        />
      </Canvas>
    </View>
  );
};

export default DonutChart;

const styles = StyleSheet.create({
  container: {flex: 1},
});
