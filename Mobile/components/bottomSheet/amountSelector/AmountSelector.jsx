import { useEffect, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function AmountSelector({ amount, handleAmount }) {
    const [numberInputVisible, setNumberInputVisible] = useState(false);
    const [customAmount, setCustomAmount] = useState(0);

    return (
        !numberInputVisible ?
            <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
                {
                    Array.from({ length: 6 }, (_, i) => (
                        <Pressable key={i + 1} onPress={() => handleAmount(i + 1)} >
                            <Text
                                style={[styles.option, amount === i + 1 && styles.selected]}
                            >
                                {i + 1} unidad{i + 1 > 1 ? "es" : ""}
                            </Text>
                        </Pressable>
                    ))
                }
                < Pressable onPress={() => setNumberInputVisible(true)}>
                    <Text style={[styles.option, styles.last, amount > 6 && styles.selected]}>Más de 6 unidades</Text>
                </Pressable>
            </ScrollView>
            :
            <View style={styles.customAmount}>
                <TextInput
                    keyboardType="numeric"
                    placeholder="Ingresar cantidad"
                    placeholderTextColor={"#00000040"}
                    style={styles.customAmountInput}
                    onChangeText={setCustomAmount}
                    autoFocus={true}
                />
                <Button
                    title="Confirmar"
                    onPress={() => handleAmount(customAmount)}
                    disabled={Number(customAmount) < 1 || Number.isNaN(Number(customAmount))}
                />
            </View>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
    },
    option: {
        textAlign: "center",
        padding: 13,
        width: "100%",
        borderColor: "#00000020",
        borderTopWidth: 1,
    },
    last: {
        borderBottomWidth: 1,
    },
    selected: {
        backgroundColor: "#00000015",
        fontWeight: "bold",
    },
    customAmount: {
        padding: 10,
        width: "100%",
        paddingBottom: 30,
    },
    customAmountInput: {
        borderBottomColor: "#3483FA",
        borderBottomWidth: 1,
        marginBottom: 10,
    }
});