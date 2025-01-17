import { Image } from 'expo-image';
import { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';

const SearchBar = ({ setSearchText }) => {
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar productos, marcas y más..."
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
      />
      <Pressable onPress={() => setSearchText(inputText)}>
        <Image
          source={require('../../assets/search.svg')}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderRightColor: '#00000099',
    borderRightWidth: 1,
  },
  icon: {
    marginLeft: 10,
    width: 20,
    height: 20,
    zIndex: 1,
  },
});

export default SearchBar;
