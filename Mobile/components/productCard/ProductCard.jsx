import { Link } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import LikeButton from "../likeButton/LikeButton.jsx";
import { productStyles } from "../../styles/styles.js";

export default function ProductCard({ product }) {

    return (
        <View>
            <LikeButton productId={product.id} />
            <Link href={`/product/${product.id}`}>
                <View style={styles.productCardWrapper}>
                    <View style={styles.productCardImgWrapper}>
                        <Image source={{ uri: product.images[0] }} style={styles.productCardImg} />
                    </View>
                    <View style={styles.productCardText}>
                        <Text numberOfLines={2} style={productStyles.title}>{product.title}</Text>
                        <Text style={productStyles.owner}>{product.owner.name}</Text>
                    </View>
                    <View style={styles.productCardPrices}>
                        <Text style={productStyles.price}>$ {product.price.toFixed(2)}</Text>
                        <Text style={productStyles.dues}>En 12 cuotas de ${(product.price / 12).toFixed(2)}</Text>
                    </View>
                </View>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    productCardWrapper: {
        flexDirection: "column",
        width: Dimensions.get('window').width / 2 - 10,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 1,
        borderWidth: 0.5,
        borderColor: '#00000040',

    },
    productCardImg: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        resizeMethod: "resize",
    },
    productCardImgWrapper: {
        width: "100%",
        height: "50%",
        borderBottomWidth: 0.2,
        borderBottomColor: '#00000030',
    },
    productCardText: {
        padding: 10,
    },
    productCardPrices: {
        padding: 10,
    }
});