import {CustomButtonProps} from '@/type';
import cn from 'clsx';
import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';

const CustomButton = ({
  onPress,
  title = 'click Me',
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn('custom-btn', style)}
      style={({pressed}) => [pressed && {opacity: 0.5}]}
    >
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" className="mr-2" />
        ) : (
          <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default CustomButton;
