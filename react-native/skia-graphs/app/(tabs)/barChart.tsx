import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  GestureResponderEvent,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Canvas, Group} from '@shopify/react-native-skia';
import {Data, data} from '../../src/data/data';
import * as d3 from 'd3';
import {BarPath} from '../../src/components/BarPath';
import {XAxisText} from '../../src/components/XAxisText';

import {useSharedValue, withTiming} from 'react-native-reanimated';
import {AnimatedText} from '../../src/components/AnimatedText';
const BarChart = () => {
  // ancho de la pantalla
  const {width} = useWindowDimensions();

  //* almacenar el valor de la variable seleccionada o total de pasos
  const selectedValue = useSharedValue<number>(0);
  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

  const [selectedDay, setSelectedDay] = useState<string>('Total');
  const selectedBar = useSharedValue<string | null>(null);

  const canvasWidth = width;
  const canvasHeight = 350;

  // determinar el tamaño del grafico
  const graphWidth = width;
  const graphMargin = 20;
  const graphHeight = canvasHeight - graphMargin;

  const barWidth = 28;
  //* crear una scala para el x-axis
  const xRange = [0, graphWidth];

  //? define todos los valores que se pueden mapear en el eje x
  const xDomain = data.map((dataPoint: Data) => dataPoint.label);

  //? la escala creada usando d3.scalePint() define el dominio y rango
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

  //* crear una scala para el y-axis
  const yRange = [0, graphHeight];

  const yDomain = [
    0,
    d3.max(data, (ydataPoint: Data) => ydataPoint.value) || 0,
  ];
  //? la escala creada uando 3.scaleLinear() define el dominio y rango
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  //* animacion de las barras
  const progress = useSharedValue<number>(0);

  useEffect(() => {
    progress.value = withTiming(1, {duration: 1000});

    //?cambiar el valor del valor seleccionado al valor total / pasos totales
    selectedValue.value = withTiming(totalValue, {duration: 1000});
  }, [progress, selectedValue, totalValue]);

  const touchHandler = (e: GestureResponderEvent) => {
    const touchX = e.nativeEvent.locationX;
    const touchY = e.nativeEvent.locationY;

    // buscaremos el indice de la barra y lo divididiremos por touschX por x.step()
    //para capturar la barra correcta necesitamos dividir barwith /2
    const index = Math.floor((touchX - barWidth / 2) / x.step());
    if (index >= 0 && index < data.length) {
      const {label, value, day} = data[index];

      if (
        touchX > x(label)! - barWidth / 2 &&
        touchX < x(label)! + barWidth / 2 &&
        touchY > graphHeight - y(value) &&
        touchY < graphHeight
      ) {
        setSelectedDay(day);
        selectedBar.value = label;
        selectedValue.value = withTiming(value);
      } else {
        setSelectedDay('Total');
        selectedBar.value = null;
        selectedValue.value = withTiming(totalValue);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Image
          source={require('../../src/assets/images/run.png')}
          style={styles.icon}
        />
        <Text style={styles.textTilte}>Walk & Run Activity</Text>
        <AnimatedText selectedValue={selectedValue} />
        <Text style={styles.textTilte}>{selectedDay} Steps</Text>
      </View>
      <Canvas
        // creando un limite para cada barra
        onTouchStart={touchHandler}
        style={{
          width: canvasWidth,
          height: canvasHeight,
        }}
      >
        {data.map((dataPoint: Data, index: number) => (
          <Group key={index}>
            <BarPath
              x={x(dataPoint.label)!}
              y={y(dataPoint.value)}
              barWidth={barWidth}
              graphHeight={graphHeight}
              progress={progress}
              label={dataPoint.label}
              selectedBar={selectedBar}
            />
            <XAxisText
              x={x(dataPoint.label)!}
              y={canvasHeight}
              text={dataPoint.label}
              selectedBar={selectedBar}
            />
          </Group>
        ))}
      </Canvas>
    </SafeAreaView>
  );
};

export default BarChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebecde',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  textTilte: {
    fontFamily: 'Roboto-Regular',
    fontSize: 36,
    color: '#111',
  },
  textSteps: {
    fontFamily: 'Roboto-Regular',
    fontSize: 38,
    color: '#111',
  },
});
