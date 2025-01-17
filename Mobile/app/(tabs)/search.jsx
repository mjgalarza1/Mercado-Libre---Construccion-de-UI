
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';
import useSearch from '../../hooks/useSearch';
import ProductCard from '../../components/productCard/ProductCard';
import { general, padding } from '../../styles/styles';
import SearchBar from '../../components/searchBar/SearchBar.jsx';
import { Image } from 'expo-image';

export default function Search() {
  const { setSearchText, productsPage, loading, error, loadMore } = useSearch();

  return (
    <View >
      <SearchBar setSearchText={setSearchText} />
      {error ? <Text>{error}</Text> :
        productsPage &&
        <FlatList
          style={{height: "90%"}}
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
      }
      {!loading && productsPage?.products.length < 1 &&
        <Image source={require('../../assets/notFound.svg')} style={[{ width: 200, height: 200, marginTop: "20%", alignSelf: "center" }]} contentFit="contain" />}
    </View>
  );
}