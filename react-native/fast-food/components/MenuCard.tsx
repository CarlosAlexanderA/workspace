import {useCartStore} from '@/store/cart.store';
import {MenuItem} from '@/type';
import React from 'react';
import {Image, Platform, Text, TouchableOpacity} from 'react-native';

const MenuCard = ({item: {$id, image_url, name, price}}: {item: MenuItem}) => {
  // const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;
  // console.log(imageUrl);

  const {addItem} = useCartStore();

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
      <TouchableOpacity
        onPress={() =>
          addItem({
            id: $id,
            name,
            price,
            image_url: image_url,
            customizations: [],
          })
        }
      >
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;

// ?? https://nyc.cloud.appwrite.io/v1/storage/buckets/6944b20b002ebce41007/files/69474af80024444fb30b/view?project=6913ad590032e7a40c12&mode=admin
