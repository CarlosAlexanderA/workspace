import {View, Text} from 'react-native';
import React from 'react';
import {Tabs} from 'expo-router';
import {FontAwesome} from '@expo/vector-icons';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: 'blue'}}>
      <Tabs.Screen
        name="pieChart"
        options={{
          title: 'Pie Chart',
          tabBarIcon: ({color}) => (
            <FontAwesome size={28} name="pie-chart" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="barChart"
        options={{
          title: 'Bar Chart',
          tabBarIcon: ({color}) => (
            <FontAwesome size={28} name="bar-chart" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="linearChart"
        options={{
          title: 'Linear Chart',
          tabBarIcon: ({color}) => (
            <FontAwesome size={28} name="area-chart" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
