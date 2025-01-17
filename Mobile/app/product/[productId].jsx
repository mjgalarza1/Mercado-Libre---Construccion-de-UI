import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import useProductById from '../../hooks/useProductById';
import { useCartContext } from '../../context/CartContext';
import AmountSelector from '../../components/bottomSheet/amountSelector/AmountSelector';
import { Image } from 'expo-image';
import { body, general, productStyles } from '../../styles/styles';
import { TouchableOpacity } from 'react-native';
import ProductImages from '../../components/ProductImages/ProductImages';
import Questions from '../../components/questions/Questions';
import useRelatedProducts from '../../hooks/useRelatedProducts';
import ProductCard from '../../components/productCard/ProductCard';
import { useUserContext } from '../../context/UserContext';

export default function Product() {
  const { productId } = useLocalSearchParams();
  const { product, loading, error } = useProductById(productId);
  const { user } = useUserContext();

  const [amount, setAmount] = useState(1);
  const [amountModalVisible, setAmountModalVisible] = useState(false);
  const handleAmount = (number) => {
    setAmountModalVisible(false);
    setAmount(Number(number));
  }

  const { addProductToCart } = useCartContext();
  const handleAdd = async (productId, amount) => {
    if (!user) {
      router.replace("../user")
    } else {
      try {
        await addProductToCart(productId, amount);
        router.replace("../cart");
      } catch (err) {
        console.log(err);
      }
    }
  }

  const { relatedProducts } = useRelatedProducts(productId);

  return (
    error ? <Text>{error}</Text> :
      loading ? <View style={general.center}><ActivityIndicator size="large" color="#3483fa"/></View> :
        <>
          <Stack.Screen options={{ title: product?.title }} />
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={body.white}>
              <Text style={productStyles.title}>{product?.title}</Text>
              <Text style={productStyles.owner}>Por {product?.owner?.name}</Text>
              <ProductImages images={Array.isArray(product?.images) ? product.images : []} />
              <Text style={productStyles.price}>$ {(product?.price.toFixed(2))}</Text>
              <Text style={productStyles.dues}>En 12 cuotas de $ {(product?.price / 12).toFixed(2)}</Text>
              <View>
                <Text style={productStyles.shipping}>Envío: $ {(product?.shipping?.price.toFixed(2))}</Text>
              </View>
              <Pressable
                style={styles.amountSelector}
                onPress={() => setAmountModalVisible(true)}>
                <Text>Cantidad: <Text style={styles.amount}>{amount}</Text></Text>
                <Image style={styles.arrow} source={require('../../assets/right-arrow.svg')} />
              </Pressable>
              <TouchableOpacity
                style={general.button}
                onPress={() => handleAdd(productId, amount)}>
                <Text style={general.buttonText}>Agregar al carrito</Text>
              </TouchableOpacity>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Caracteristicas</Text>
                <View style={styles.characteristics}>
                  {
                    product?.characteristic.map((feature, index) => (
                      <View style={styles.characteristic} key={index}>
                        <Text>{feature.name}: </Text>
                        <Text>{feature.value}</Text>
                      </View>
                    ))
                  }
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Descripcion</Text>
                <Text>{product?.description}</Text>
              </View>

            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { marginLeft: 10 }]}>Productos Relacionados</Text>
              <FlatList
                data={relatedProducts}
                renderItem={({ item }) => <ProductCard product={item} />}
                horizontal
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginLeft: 15, gap: 25 }}
              />
            </View>

            <View style={[styles.section, body.white]}>
              <Text style={styles.sectionTitle}>Preguntas</Text>
              <Questions productId={productId} />
            </View>

            <BottomSheet title="Elige una cantidad" visible={amountModalVisible} setVisible={setAmountModalVisible}>
              <AmountSelector amount={amount} handleAmount={handleAmount} />
            </BottomSheet>
          </ScrollView>
        </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  section: {
    marginTop: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomColor: "#00000040",
    borderBottomWidth: 1,
  },
  amountSelector: {
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  arrow: {
    width: 10,
    height: 10,
    marginRight: 10,
    tintColor: "#3483fa",
  },
  amount: {
    fontWeight: 'bold',
  },
  characteristics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  characteristic: {
    padding: 10,
    width: '50%',
    flexDirection: 'row',
  },
  background: {
    backgroundColor: "white",
  }
});