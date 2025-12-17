import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';
import './global.css';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://ba3affd02035393f87e2d743ceb685b7@o4507675956609024.ingest.us.sentry.io/4510542275084288',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
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
});