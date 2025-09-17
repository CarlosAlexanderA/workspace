import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';
import './global.css';

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    QuicksandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
    QuicksandMedium: require('../assets/fonts/Quicksand-Medium.ttf'),
    QuicksandRegular: require('../assets/fonts/Quicksand-Regular.ttf'),
    QuicksandSemiBold: require('../assets/fonts/Quicksand-SemiBold.ttf'),
    QuicksandLight: require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return <Stack screenOptions={{headerShown: false}} />;
}
