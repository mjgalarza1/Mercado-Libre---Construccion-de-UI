import { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';

export default function ProductImages({images}) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: mainImage }} style={styles.mainImage} />
      <ScrollView horizontal style={styles.thumbnailContainer}>
        {images.map((image, index) => (
          <Pressable key={index} onPress={() => setMainImage(image)}>
            <Image source={{ uri: image }} style={[styles.thumbnail,  mainImage === image && styles.selectedThumbnail]} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  mainImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    alignSelf: 'center',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderWidth:1,
    borderColor:"#00000040",
  },
  selectedThumbnail: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderWidth:1,
    borderColor:"#3483fa",
  }
});

