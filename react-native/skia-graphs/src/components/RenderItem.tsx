import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

interface Data {
  value: number;
  percentage: number;
  color: string;
}

type Props = {
  item: Data;
  index: number;
};

export const RenderItem = ({item, index}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <Animated.View
      style={[styles.container, {width: width * 0.9}]}
      entering={FadeInDown.delay(index * 200)}
      exiting={FadeOutDown}
    >
      <View style={styles.contentContainer}>
        <View style={[styles.color, {backgroundColor: item.color}]} />
        <Text style={styles.text}>{item.percentage}%</Text>
        <Text style={styles.text}>${item.value}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff7fc',
    paddingVertical: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  color: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
});
