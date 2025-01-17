import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useCategories } from '../../hooks/useCategories';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import { general } from '../../styles/styles';

export default function Categories() {
  const { categories, loading, error } = useCategories();

  return (
    <View>
      {
        loading && <ActivityIndicator size="large" color="#3483fa" style={[general.center]} />
      }
      {
        error ? <Text>{error}</Text> :
        categories &&
        <FlatList 
          data={categories}
          renderItem={({ item }) => <CategoryCard category={item}/>}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={{padding: 10}}
        />
      }

    </View>
  );
}