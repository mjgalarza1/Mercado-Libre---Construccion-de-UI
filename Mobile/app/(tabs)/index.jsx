import { ActivityIndicator, Text, View } from 'react-native';
import useProducts from '../../hooks/useProducts.js';
import { FlatList } from 'react-native';
import ProductCard from '../../components/productCard/ProductCard.jsx';
import { padding} from '../../styles/styles';

export default function Index() {
  const { productsPage, loading, error, loadMore } = useProducts();

  return (
    error ? <Text>{error}</Text> :
    <View>
        <FlatList 
          contentContainerStyle={padding.xs}
          data={productsPage?.products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="large" color="#3483fa" style={{ paddingVertical: 40 }} />
            ) : null
          }
        />
    </View>
  );
}

