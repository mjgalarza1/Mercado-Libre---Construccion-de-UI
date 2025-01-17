import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useCategoryId } from '../../hooks/useCategoryId';
import ProductCard from '../../components/productCard/ProductCard';
import { padding } from '../../styles/styles';
import { useCategories } from '../../hooks/useCategories';
import { formatStr } from '../../util/formaters';

export default function Category() {
  const { category } = useLocalSearchParams();
  const { categories } = useCategories();

  const { productsPage, loading, error, loadMore } = useCategoryId(category);

  return (
    <>
      <Stack.Screen options={{ title: formatStr(categories?.find((cat) => cat.id == category).name) }} />
      <View>
        {error ? <Text>{error}</Text> :
          productsPage &&
          <View>
            <FlatList
              contentContainerStyle={{padding: 10}}
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
        }
      </View>
    </>
  );
}