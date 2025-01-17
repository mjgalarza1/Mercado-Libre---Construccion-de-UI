import { AntDesign, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useUserContext } from '../../context/UserContext';

export default function TabLayout() {
  const { user } = useUserContext();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000', 
        tabBarInactiveTintColor: '#00000040',
        headerStyle: {
          backgroundColor: '#FFE600',
        },
        headerTintColor: '#000000E5'
      }}
    >
      <Tabs.Screen name="index" options={{
        title:"Home",
        tabBarShowLabel: false,
        tabBarIconStyle: {marginTop:5},
        tabBarIcon:({ color }) => <SimpleLineIcons name="home" size={19} color={color} />}} />
      <Tabs.Screen name="categories" options={{
        title:"Categorias",
        tabBarShowLabel: false,
        tabBarIconStyle: {marginTop:5},
        tabBarIcon:({ color }) => <MaterialIcons name="category" size={19} color={color} />}} />
      <Tabs.Screen name="search" options={{
        title:"Buscar",
        tabBarShowLabel: false,
        tabBarIconStyle: {marginTop:5},
        tabBarIcon:({ color }) => <AntDesign name="search1" size={19} color={color}/>}} />
      <Tabs.Screen name="cart" options={{
        title:"Carrito",
        tabBarShowLabel: false,
        tabBarIconStyle: {marginTop:5},
        tabBarIcon:({ color }) => <MaterialCommunityIcons name="cart-outline" size={19} color={color} />}}/>
      <Tabs.Screen name="user" options={{
        title:"Usuario",
        headerTitle: user ? user.name : "Usuario",
        tabBarShowLabel: false,
        tabBarIconStyle: {marginTop:5},
        tabBarIcon:({ color }) => <MaterialIcons name="person-outline" size={19} color={color} />}}/>
    </Tabs>
  );
}
