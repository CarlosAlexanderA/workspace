import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Detail() {
  const { gameslug } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <View>
        <Text className="text-white font-bold mb-8 text-2xl">
          Detalle del Juego {gameslug}
        </Text>
        <Link href="/" className="text-blue-500">
          Volver al Home
        </Link>
      </View>
    </View>
  );
}
