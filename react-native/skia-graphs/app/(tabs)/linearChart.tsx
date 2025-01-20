import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {dataLine} from '../../src/data/dataLine';
import {LineChart} from '../../src/components/LineChart';
import {useState} from 'react';
import {AnimatedTextLinear} from '../../src/components/AnimatedTextLinear';
import {useFont} from '@shopify/react-native-skia';
import {useSharedValue} from 'react-native-reanimated';
const LinearChart = () => {
  const CHART_HEIGHT = 400;
  const CHART_MARGIN = 20;
  const {width: CHART_WIDTH} = useWindowDimensions();

  // estado para alamecenar la selccion de la fecha
  const [selectedDate, setSelectedDate] = useState('Total');

  //crear un valor compartido para almecenar el valor del punto de datos seleccioando
  const selectedValue = useSharedValue(0);

  // cargar la fuente usando el hook useFont
  const font = useFont(
    require('../../src/assets/fonts/Roboto-Regular.ttf'),
    88
  );
  if (!font) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{selectedDate} Expenses</Text>
        <AnimatedTextLinear font={font} selectedValue={selectedValue} />
        <LineChart
          data={dataLine}
          chartHeight={CHART_HEIGHT}
          chartMargin={CHART_MARGIN}
          chartWidth={CHART_WIDTH}
          setSelectedDate={setSelectedDate}
          selectedValue={selectedValue}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default LinearChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  text: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});
