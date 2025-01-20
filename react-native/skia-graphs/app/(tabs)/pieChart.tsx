import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {generateRandomNumbers} from '../../src/utils/generateRandomNumbers';
import {calculatePercentage} from '../../src/utils/calculatePercentage';
import {useFont} from '@shopify/react-native-skia';
import {SafeAreaView} from 'react-native-safe-area-context';
import DonutChart from '../../src/components/DonutChart';
import {RenderItem} from '../../src/components/RenderItem';

interface Data {
  value: number;
  percentage: number;
  color: string;
}

const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

export default function PieChart() {
  const n = 5;
  const [data, setData] = useState<Data[]>([]);

  const totalValue = useSharedValue(0);
  const decimals = useSharedValue<number[]>([]);

  const colors = ['#fe769c', '#46a0f8', '#c3f439', '#88dabc', '#e43433'];

  const generateData = () => {
    const generateNumbers = generateRandomNumbers(n);
    const total = generateNumbers.reduce(
      (acc, currentValue) => acc + currentValue
    );
    const generatePercentage = calculatePercentage(generateNumbers, total);
    const generateDecimals = generatePercentage.map(
      (number) => Number(Number(number).toFixed(0)) / 100
    );
    const arrayOfObjects = generateNumbers.map((value, index) => ({
      value,
      percentage: generatePercentage[index],
      color: colors[index],
    }));

    totalValue.value = withTiming(total, {duration: 1000});
    decimals.value = [...generateDecimals];
    setData(arrayOfObjects);
    console.log(data);
  };

  const font = useFont(require('../../src/assets/fonts/Roboto-Bold.ttf'), 60);
  const smallFont = useFont(
    require('../../src/assets/fonts/Roboto-Light.ttf'),
    25
  );

  if (!font || !smallFont) {
    return <View style={{backgroundColor: 'red'}} />;
  }

  return (
    <SafeAreaView style={[styles.container, {height: '100%'}]}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chartContainer}>
          <DonutChart
            radius={RADIUS}
            strokeWidth={STROKE_WIDTH}
            outerStrokeWidth={OUTER_STROKE_WIDTH}
            font={font}
            smallFont={smallFont}
            totalValue={totalValue}
            n={n}
            gap={GAP}
            decimals={decimals}
            colors={colors}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={generateData}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
        {data.map((item, index) => (
          <RenderItem item={item} index={index} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    marginTop: 10,
  },

  button: {
    backgroundColor: '#f4f7fc',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 40,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});
