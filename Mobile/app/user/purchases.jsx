import { View, FlatList, Button } from 'react-native';
import { padding } from '../../styles/styles';
import ProductCard from '../../components/productCard/ProductCard';
import { useUserContext } from '../../context/UserContext';
import { Stack } from 'expo-router';

export default function Purchase() {
  const { user } = useUserContext();
  
  return (
    <>
    <Stack.Screen options={{title: 'Compras realizadas'}} />
    <FlatList 
          contentContainerStyle={padding.xs}
          data={ user.purchaseHistory.flatMap(purchase => purchase.items.map((item)=>(item.product))) }
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
        />
    </>
  );
}

