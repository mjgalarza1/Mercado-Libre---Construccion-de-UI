import { StyleSheet, Text, View } from 'react-native';
import { useCartContext } from '../context/CartContext';
import { shippingTotal, totalPrice } from '../util/reducers';
import PurchaseForm from '../components/forms/PurchaseForm';
import { body, cartStyles, padding } from '../styles/styles';

export default function Purchase() {
    const { cart } = useCartContext();

    return (
        <View style={padding.xs}>
            <View style={[body.white, purchaseStyles.details]}>
                <View style={cartStyles.priceDetail}>
                    <Text style={cartStyles.totalPrices}>Total</Text>
                    <Text style={cartStyles.totalPrices}>$ {totalPrice(cart)}</Text>
                </View>
                <View style={cartStyles.priceDetail}>
                    <Text style={cartStyles.shippingPrices}>Envío</Text>
                    <Text style={cartStyles.shippingPrices}>$ {shippingTotal(cart)}</Text>
                </View>
            </View>
            <PurchaseForm />
        </View>
    );
}

const purchaseStyles = StyleSheet.create({
    details: {
        marginVertical: 10,
        paddingVertical: 30,
        gap: 20,
    }
});