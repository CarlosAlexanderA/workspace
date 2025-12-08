import {Redirect, Slot} from 'expo-router';
import React from 'react';

const TabLayout = () => {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href={'/sign-in'} />;
  return <Slot />;
};

export default TabLayout;
