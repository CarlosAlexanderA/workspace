import {Link, useNavigation} from 'expo-router';
import {useEffect} from 'react';
import {Text, View} from 'react-native';

export default function App() {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({headerShown: false});
  // }, [navigation]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Home Screen</Text>
      <Link href="/(tabs)/pieChart/" asChild>
        <Text style={{color: '#09d', fontSize: 20}}>Ir al Piechar</Text>
      </Link>
    </View>
  );
}
