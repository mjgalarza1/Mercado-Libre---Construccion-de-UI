import { View, FlatList } from 'react-native';
import { padding } from '../../styles/styles';
import ProductCard from '../../components/productCard/ProductCard';
import { useUserContext } from '../../context/UserContext';
import { Stack } from 'expo-router';

export default function MyProducts() {
  const { user } = useUserContext();

  return (
    <>
    <Stack.Screen options={{title: 'Mis productos'}} />
      <View>
        <FlatList
          style={padding.xs}
          data={user?.products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>         
    </>
  );
}