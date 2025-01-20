import {useEffect, useState} from 'react';
import {DataType} from '../data/dataLine';
import {Canvas, Path, Skia} from '@shopify/react-native-skia';
import {curveBasis, line, scaleLinear, scalePoint} from 'd3';
import {
  clamp,
  runOnJS,
  SharedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {Gradient} from './Gradient';
import {XAxisTextGradient} from './XAxisTextGradient';
import {Cursor} from './Cursor';
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {getYForX, parse} from 'react-native-redash';

type Props = {
  data: DataType[];
  chartHeight: number;
  chartMargin: number;
  chartWidth: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: SharedValue<number>;
};

export const LineChart = ({
  data,
  chartHeight,
  chartMargin,
  chartWidth,
  setSelectedDate,
  selectedValue,
}: Props) => {
  const [showCursor, setShowCursor] = useState(false);
  // start animation
  const animationLine = useSharedValue(0);
  const animationGradient = useSharedValue({x: 0, y: 0});

  useEffect(() => {
    animationLine.value = withTiming(1, {duration: 1000});
    animationGradient.value = withDelay(
      1000,
      withTiming({x: 0, y: chartHeight}, {duration: 500})
    );
    selectedValue.value = withTiming(totalValue, {duration: 1000});
  }, []);

  //? valor para almasenar el valor absoluto de x del pan gesture
  const cx = useSharedValue(0);
  const cy = useSharedValue(0);

  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

  const xDomain = data.map((dataPoint) => dataPoint.label);
  const xRange = [chartMargin, chartWidth - chartMargin];

  const x = scalePoint().domain(xDomain).range(xRange).padding(0);

  const max = Math.max(...data.map((val) => val.value));
  const min = Math.min(...data.map((val) => val.value));

  const yDomain = [min, max];

  const yRange = [chartHeight, 0];

  const y = scaleLinear().domain(yDomain).range(yRange);

  // ? haremos que el cursor se adapte a cada punto de datos en el eje x
  //* stepX es la distancia entre los inicios de puntos adyacentes
  const stepX = x.step();

  const curvedLine = line<DataType>()
    .x((d) => x(d.label)!)
    .y((d) => y(d.value))
    .curve(curveBasis)(data);

  const linePath = Skia.Path.MakeFromSVGString(curvedLine!);

  //? analizar la ruta svg en una secuencia de curvas de Bézier usando la función parse
  const path = parse(linePath!.toSVGString());

  const handleGestureEvent = (e: PanGestureHandlerEventPayload) => {
    'worklet';

    //? Encuentrar el índice para cada punto de datos
    const index = Math.floor(e.absoluteX / stepX);

    runOnJS(setSelectedDate)(data[index].date);

    selectedValue.value = withTiming(data[index].value);

    //! hacer que el cursor no vaya a la posicion (0,0)
    //* limitamos el valor usando la funcion clamp
    const clampValue = clamp(
      Math.floor(e.absoluteX / stepX) * stepX + chartMargin,
      chartMargin,
      chartWidth - chartMargin
    );

    cx.value = clampValue;

    //? encontramos el valor de y usando la funcion getYForX de redash
    //! getYForX devuelve nulo para el último punto, por lo que debemos redondearlo usando (floor)
    cy.value = getYForX(path, Math.floor(clampValue))!;
  };

  //! par detectar a los gestos en en grafico
  const pan = Gesture.Pan()
    .onTouchesDown(() => {
      runOnJS(setShowCursor)(true);
    })
    .onTouchesUp(() => {
      runOnJS(setShowCursor)(false);
      runOnJS(setSelectedDate)('Total');
      selectedValue.value = withTiming(totalValue);
    })
    .onBegin(handleGestureEvent)
    .onChange(handleGestureEvent);

  return (
    <GestureDetector gesture={pan}>
      <Canvas style={{width: chartWidth, height: chartHeight}}>
        <Path
          path={linePath!}
          style={'stroke'}
          strokeWidth={4}
          color={'#eaf984'}
          strokeCap={'round'}
          start={0}
          end={animationLine}
        />
        <Gradient
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          chartMargin={chartMargin}
          curvedLine={curvedLine!}
          animationGradient={animationGradient}
        />
        {data.map((dataPoint: DataType, index) => (
          <XAxisTextGradient
            x={x(dataPoint.label)!}
            y={chartHeight}
            text={dataPoint.label}
            key={index}
          />
        ))}
        {showCursor && <Cursor cx={cx} cy={cy} chartHeight={chartHeight} />}
      </Canvas>
    </GestureDetector>
  );
};
