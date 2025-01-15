import {View, Text} from 'react-native';
import React from 'react';
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {Path, Skia} from '@shopify/react-native-skia';

type Props = {
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  color: string;
  decimals: SharedValue<number[]>;
  index: number;
  gap: number;
};

const DonutPath = ({
  radius,
  strokeWidth,
  outerStrokeWidth,
  color,
  decimals,
  index,
  gap,
}: Props) => {
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  // Estableceremos el valor inicial si es la primera ruta y el valor inicial es gap
  const start = useDerivedValue(() => {
    if (index === 0) {
      return gap;
    }
    const decimal = decimals.value.slice(0, index);
    const sum = decimal.reduce((acc, currentValue) => acc + currentValue, 0);

    return withTiming(sum + gap, {duration: 1000});
  }, []);

  const end = useDerivedValue(() => {
    // Estableceremos el valor final si es la última ruta, entonces el valor final es 1

    if (index === decimals.value.length - 1) {
      return withTiming(1, {duration: 1000});
    }
    const decimal = decimals.value.slice(0, index + 1);
    const sum = decimal.reduce((acc, currentValue) => acc + currentValue, 0);

    return withTiming(sum, {duration: 1000});
  }, []);

  return (
    <Path
      path={path}
      color={color}
      style="stroke"
      strokeWidth={strokeWidth}
      strokeJoin="round"
      strokeCap="round"
      start={start}
      end={end}
    />
  );
};

export default DonutPath;
