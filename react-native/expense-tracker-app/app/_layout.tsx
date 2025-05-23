import {Stack} from 'expo-router';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
}

const styles = StyleSheet.create({});
