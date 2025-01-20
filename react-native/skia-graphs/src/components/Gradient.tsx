import {LinearGradient, Path, Skia} from '@shopify/react-native-skia';
import {SharedValue} from 'react-native-reanimated';

type Props = {
  chartHeight: number;
  chartWidth: number;
  chartMargin: number;
  curvedLine: string;
  animationGradient: SharedValue<{x: number; y: number}>;
};

export const Gradient = ({
  chartHeight,
  chartWidth,
  chartMargin,
  curvedLine,
  animationGradient,
}: Props) => {
  // area del gradiente
  const getGradient = (chartLine: string, width: number, height: number) => {
    //valor precio creado de la CurvedLine
    const gradientAreaSplit = Skia.Path.MakeFromSVGString(chartLine);
    if (gradientAreaSplit) {
      gradientAreaSplit
        .lineTo(width - chartMargin, height)
        .lineTo(chartMargin, height)
        .lineTo(chartMargin, gradientAreaSplit.getPoint(0).y);
    }
    return gradientAreaSplit;
  };

  return (
    <Path
      path={getGradient(curvedLine!, chartWidth, chartHeight)!}
      color={'pink'}
    >
      <LinearGradient
        start={{x: 0, y: 0}}
        end={animationGradient}
        colors={['rgba(234,249,132,0.2', 'rgba(234,249,132,0)']}
      />
    </Path>
  );
};
