import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";

function Counter({ amount, onPress }) {

    return (
        <View>
            <Pressable style={styles.counter} onPress={() => onPress(true)}>
                <Text>{amount} u.</Text>
                <Image source={require('../../assets/down-arrow.svg')} style={{ width: 20, height: 20 }} />
            </Pressable>
        </View>
    );
}

export default Counter;

const styles = {
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        borderColor: '#00000030',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
    }
}