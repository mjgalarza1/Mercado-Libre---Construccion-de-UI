import { View, FlatList } from 'react-native';
import {padding} from '../../styles/styles';
import ProductCard from '../../components/productCard/ProductCard';
import { useUserContext } from '../../context/UserContext';
import { Stack } from 'expo-router';

export default function Sales() {
  const { user } = useUserContext();

  return (
    <>
    <Stack.Screen options={{title: 'Ventas realizadas'}} />
      <View>
        <FlatList
          style={padding.xs}
          data={user?.salesHistory.map(sale => sale.product)}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>         
    </>
  );
}