import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCartContext } from "../../context/CartContext";
import Counter from "../counter/Counter";
import { useState } from "react";
import { Image } from "expo-image";
import AmountSelector from "../bottomSheet/amountSelector/AmountSelector";
import BottomSheet from "../bottomSheet/BottomSheet";
import { Link } from "expo-router";

export default function CartProduct({ cartItem }) {
    const { addProductToCart, removeProductFromCart } = useCartContext();
    const [amountModalVisible, setAmountModalVisible] = useState(false);

    const handleAmount = (number) => {
        try {
            addProductToCart(cartItem.product.id, number);
            setAmountModalVisible(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={cartProductStyles.productWrapper}>
            <View style={cartProductStyles.product}>
                <Link href={`/product/${cartItem.product.id}`}>
                    <Image source={{ uri: cartItem.product.images[0] }} style={{ width: 100, height: 100 }} />
                </Link>
                <View style={cartProductStyles.productDetails}>
                    <Link href={`/product/${cartItem.product.id}`}>
                        <Text style={cartProductStyles.title}>{cartItem.product.title}</Text>
                    </Link>
                    <Text style={cartProductStyles.title}>{cartItem.amount}</Text>
                    <Link href={`/user/${cartItem.product.owner.id}`}>
                        <Text style={cartProductStyles.subtitle}>Por {cartItem.product.owner.name}</Text>
                    </Link>
                    <Pressable onPress={() => removeProductFromCart(cartItem.product.id)}>
                        <Text style={cartProductStyles.delete}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
            <View style={cartProductStyles.productPrice}>
                <Counter amount={cartItem.amount} onPress={setAmountModalVisible}/>
                <BottomSheet title="Eligí una cantidad" visible={amountModalVisible} setVisible={setAmountModalVisible}>
                    <AmountSelector amount={cartItem.amount} handleAmount={handleAmount} />
                </BottomSheet>
                <Text style={cartProductStyles.price}>{(cartItem.amount * cartItem.product.price).toFixed(2)}</Text>
            </View>
            <View style={cartProductStyles.productShipping}>
                <Text style={cartProductStyles.price}>Envío</Text>
                <Text style={cartProductStyles.price}>{(cartItem.product.shipping.price).toFixed(2)}</Text>
            </View>
        </View>
    );
}

const cartProductStyles = StyleSheet.create({
    productWrapper: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
    },
    productPrice: {
        width: "70%",
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    productShipping: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        borderTopColor: '#00000040',
        borderTopWidth: 1,
    },
    productDetails: {
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        gap: 4,
    },
    product: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 18,
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 18,
        color: "#666666",
    },
    delete: {
        color: '#3483FA',
        fontSize: 14,
        lineHeight: 18,
    },
    price: {
        fontSize: 18,
        lineHeight: 18,
        fontWeight: 'bold',
    },
});