import { Link } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { HomeIcon } from "../components/Icons";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function About() {
  return (
    <ScrollView className="pt-24 bg-black">
      <Text className="text-white font-bold mb-8 text-2xl">
        Sobre el proyecto
      </Text>
      <Link asChild href="/" className="text-blue-400 text-xl">
        <StyledPressable className={`active:opacity-50`}>
          <HomeIcon />
        </StyledPressable>
      </Link>
      <Text className="text-white/90 mb-4">
        Lorem ipsum dolor sit amet consectetur adipiscing elit dignissim massa
        cum, pretium ullamcorper tempus faucibus taciti leo semper mattis nullam
        augue, imperdiet ridiculus purus diam eget fames et duis arcu. Nisi
        sapien arcu ligula sem nunc malesuada, hendrerit ultrices tellus aliquet
        vel, parturient cubilia fringilla ullamcorper aliquam. Magnis odio ad
        sodales montes mollis vitae nostra imperdiet sem, rhoncus litora primis
        hac natoque ridiculus fermentum in lacus sed, congue dapibus turpis urna
        et at ultricies aenean.
      </Text>
      <Text className="text-white/90 mb-4">
        Lorem ipsum dolor sit amet consectetur adipiscing elit dignissim massa
        cum, pretium ullamcorper tempus faucibus taciti leo semper mattis nullam
        augue, imperdiet ridiculus purus diam eget fames et duis arcu. Nisi
        sapien arcu ligula sem nunc malesuada, hendrerit ultrices tellus aliquet
        vel, parturient cubilia fringilla ullamcorper aliquam. Magnis odio ad
        sodales montes mollis vitae nostra imperdiet sem, rhoncus litora primis
        hac natoque ridiculus fermentum in lacus sed, congue dapibus turpis urna
        et at ultricies aenean.
      </Text>
      <Text className="text-white/90 mb-4">
        Lorem ipsum dolor sit amet consectetur adipiscing elit dignissim massa
        cum, pretium ullamcorper tempus faucibus taciti leo semper mattis nullam
        augue, imperdiet ridiculus purus diam eget fames et duis arcu. Nisi
        sapien arcu ligula sem nunc malesuada, hendrerit ultrices tellus aliquet
        vel, parturient cubilia fringilla ullamcorper aliquam. Magnis odio ad
        sodales montes mollis vitae nostra imperdiet sem, rhoncus litora primis
        hac natoque ridiculus fermentum in lacus sed, congue dapibus turpis urna
        et at ultricies aenean.
      </Text>
      <Text className="text-white/90 mb-4">
        Lorem ipsum dolor sit amet consectetur adipiscing elit dignissim massa
        cum, pretium ullamcorper tempus faucibus taciti leo semper mattis nullam
        augue, imperdiet ridiculus purus diam eget fames et duis arcu. Nisi
        sapien arcu ligula sem nunc malesuada, hendrerit ultrices tellus aliquet
        vel, parturient cubilia fringilla ullamcorper aliquam. Magnis odio ad
        sodales montes mollis vitae nostra imperdiet sem, rhoncus litora primis
        hac natoque ridiculus fermentum in lacus sed, congue dapibus turpis urna
        et at ultricies aenean.
      </Text>
      <Text className="text-white/90 mb-4">
        Lorem ipsum dolor sit amet consectetur adipiscing elit dignissim massa
        cum, pretium ullamcorper tempus faucibus taciti leo semper mattis nullam
        augue, imperdiet ridiculus purus diam eget fames et duis arcu. Nisi
        sapien arcu ligula sem nunc malesuada, hendrerit ultrices tellus aliquet
        vel, parturient cubilia fringilla ullamcorper aliquam. Magnis odio ad
        sodales montes mollis vitae nostra imperdiet sem, rhoncus litora primis
        hac natoque ridiculus fermentum in lacus sed, congue dapibus turpis urna
        et at ultricies aenean.
      </Text>
    </ScrollView>
  );
}
