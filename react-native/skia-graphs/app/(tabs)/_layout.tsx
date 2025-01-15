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
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      /> */}
    </Tabs>
  );
};

export default TabLayout;
