import {MenuItem} from '@/type';
import React from 'react';
import {Image, Platform, Text, TouchableOpacity} from 'react-native';

const MenuCart = ({item: {image_url, name, price}}: {item: MenuItem}) => {
  // const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;
  // console.log(imageUrl);

  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === 'android' ? {elevation: 4, shadowColor: '#878787'} : {}
      }
    >
      <Image
        source={{uri: image_url}}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">
        from ${price.toFixed(2)}
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCart;

// ?? https://nyc.cloud.appwrite.io/v1/storage/buckets/6944b20b002ebce41007/files/69474af80024444fb30b/view?project=6913ad590032e7a40c12&mode=admin
