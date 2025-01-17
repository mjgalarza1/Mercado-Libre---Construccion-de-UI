import { View, FlatList } from 'react-native';
import {padding} from '../../styles/styles';
import ProductCard from '../../components/productCard/ProductCard';
import { useUserContext } from '../../context/UserContext';
import { Text } from 'react-native';
import { Stack } from 'expo-router';

export default function Liked() {
  const { user } = useUserContext();

  return (
    <>
    <Stack.Screen options={{title: 'Favoritos'}} />
      <View>
        <FlatList
          style={padding.xs}
          data={user?.likedproducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>         
    </>
  );
}