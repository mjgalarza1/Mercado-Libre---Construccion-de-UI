import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <CartProvider>

          <Stack screenOptions={{headerStyle: {backgroundColor: '#FFE600'}}}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ title: "Oops! This screen doesn't exist." }}  />
          </Stack>
      </CartProvider>

    </UserProvider>
  );
}
