import { Link } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { body } from "../../styles/styles";
import { Image } from "expo-image";
import { categoryIcons } from "../../util/requires";
import { formatStr } from "../../util/formaters";

export default function CategoryCard({ category }) {

    return (
        <View style={[body.white, catCardStyles.wrapper]}>
            <Link href={`/category/${category.id}`} asChild>
                <Pressable>
                    <Image
                        source={categoryIcons[category.id]}
                        style={catCardStyles.image}
                        contentFit="contain"
                        tintColor={"#3483FA"}
                    />
                    <Text style={catCardStyles.text}>{formatStr(category.name)}</Text>
                </Pressable>
            </Link>
        </View>

    );
}


const catCardStyles = StyleSheet.create({
    wrapper: {
        width: 100,
        margin: 5,
        width: Dimensions.get('window').width / 2 - 20,
        justifyContent: 'center',
        height: 100,
    },
    image: {
        width: "100%",
        height: 48,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    }
});