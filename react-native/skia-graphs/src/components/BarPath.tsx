import {Path, Skia} from '@shopify/react-native-skia';
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  x: number;
  y: number;
  barWidth: number;
  graphHeight: number;
  progress: SharedValue<number>;
  label: string;
  selectedBar: SharedValue<string | null>;
};

export const BarPath = ({
  x,
  y,
  barWidth,
  graphHeight,
  progress,
  label,
  selectedBar,
}: Props) => {
  const color = useDerivedValue(() => {
    if (selectedBar.value === label) {
      return withTiming('#ff6346');
    } else if (selectedBar.value === null) {
      return withTiming('#ff6346');
    } else {
      return withTiming('#d1d0c5');
    }
  });

  const path = useDerivedValue(() => {
    const barPath = Skia.Path.Make();

    // ? addRRect redondea la barra
    //! rx and ry  => border radius
    barPath.addRRect({
      rect: {
        x: x - barWidth / 2,
        y: graphHeight,
        width: barWidth,
        height: y * -1 * progress.value,
      },
      rx: 8,
      ry: 8,
    });
    return barPath;
  });
  return <Path path={path} color={color} />;
};
