import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Group, Path, Skia} from '@shopify/react-native-skia';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';

type Props = {
  cx: SharedValue<number>;
  cy: SharedValue<number>;
  chartHeight: number;
};

export const Cursor = ({cx, cy, chartHeight}: Props) => {
  //* dashed desd el cursor hasta abajo

  const path = useDerivedValue(() => {
    const dottedLine = Skia.Path.Make().lineTo(0, chartHeight - 20 - cy.value);
    dottedLine.dash(10, 10, 0);

    //* animacion de traslation de dhasedline
    const matrix = Skia.Matrix();
    matrix.translate(cx.value, cy.value);
    dottedLine.transform(matrix);

    return dottedLine;
  });
  return (
    <Group>
      <Path
        path={path}
        color={'#eaf984'}
        style={'stroke'}
        strokeWidth={2}
        strokeCap={'round'}
      />
      <Circle
        cx={cx}
        cy={cy}
        r={10}
        style={'stroke'}
        strokeWidth={10}
        color={'#eaf984'}
      />
      <Circle cx={cx} cy={cy} r={10} style={'fill'} color={'#0d0d0d'} />
    </Group>
  );
};
