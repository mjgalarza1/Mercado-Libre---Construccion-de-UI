import { Link, router } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { body, cartStyles, general, padding } from '../../styles/styles';
import CartProduct from '../../components/cartProduct/CartProduct';
import { useCartContext } from '../../context/CartContext';
import { Image } from 'expo-image';
import { useEffect } from 'react';
import { shippingTotal, totalPrice } from '../../util/reducers';
import { TouchableOpacity } from 'react-native';

export default function Cart() {
  const { cart, loading, error } = useCartContext();

  return (
    <View>
      {
        cart?.items?.length > 0 ?
          <FlatList
            style={padding.xs}
            data={cart.items}
            renderItem={({ item }) => <CartProduct cartItem={item} />}
            keyExtractor={(item) => item.product.id}
            ListHeaderComponent={
              <Text style={[body.white, cartStyles.title]}>Productos</Text>
            }
            ListFooterComponent={
              <View style={[body.white, cartStyles.footer]}>
                <View style={cartStyles.priceDetail}>
                  <Text style={cartStyles.shippingPrices}>Envíos ({cart.items.length})</Text>
                  <Text style={cartStyles.shippingPrices}>{shippingTotal(cart)}</Text>
                </View>
                <View style={cartStyles.priceDetail}>
                  <Text style={cartStyles.totalPrices}>Total</Text>
                  <Text style={cartStyles.totalPrices}>{totalPrice(cart)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.navigate("../purchase")}
                  style={general.button}
                >
                  <Text style={general.buttonText}>Comprar</Text>
                </TouchableOpacity>
              </View>
            }
          />
          :
          <View style={[body.white, cartStyles.emptyCart]}>
            <Text style={cartStyles.emptyCartText}>No hay productos en el carrito</Text>
            <Image source={require('../../assets/empty-cart.svg')} style={{ width: 200, height: 200 }} contentFit='contain' />
            <Link replace href="/"><Text style={cartStyles.emptyCartLink}>Descubrir productos</Text></Link>
          </View>
      }
    </View>
  );
}
