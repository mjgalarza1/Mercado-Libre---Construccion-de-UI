import { ActivityIndicator, Keyboard, Pressable } from "react-native";
import { Text, TextInput, View } from "react-native";
import { body, formStyles, general } from "../../styles/styles";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { router } from "expo-router";

export default function PurchaseForm() {
    const { purchaseCart, loading, error } = useCartContext();

    const [formError, setFormError] = useState(null);
    const [form, setForm] = useState({
        name: "",
        cardNumber: "",
        cvv: "",
        expirationDate: "",
    });

    const handlePurchase = async () => {
        setFormError(null);
        Keyboard.dismiss();
        if (!Object.values(form).every((value) => value !== '')) {
            setFormError("Todos los campos son obligatorios.");
            return;
        }
        await purchaseCart(form)
        if (error || loading) {
            console.log("error en la compra");
            return;
        }
        router.navigate("/")
    };

    const handleExpDate = (input) => {
        let date = input.replace(/[^0-9]/g, "");
        if (date.length > 4) {
            const year = date.slice(0, 4);
            const month = date.slice(4) > 12 ? "12" : date.slice(4);
            date = year + "/" + month;
        }
        setForm({ ...form, expirationDate: date });
    };

    return (
        <View style={[formStyles.wrapper, body.white]}>
            <Text style={formStyles.title}>Elegí como pagar</Text>
            <View>
                <Text style={formStyles.label}>Nombre</Text>
                <TextInput
                    style={formStyles.input}
                    onChangeText={(text) => setForm({ ...form, name: text })}
                    placeholder="Ingrese su nombre"
                    placeholderTextColor="#A0A0A0"
                    autoCapitalize="none"
                    value={form.name}
                />
            </View>
            <View>
                <Text style={formStyles.label}>Numero de Tarjeta</Text>
                <TextInput
                    style={formStyles.input}
                    onChangeText={(text) => setForm({ ...form, cardNumber: text })}
                    placeholder="Ingrese el numero de tarjeta"
                    placeholderTextColor="#A0A0A0"
                    autoCapitalize="none"
                    value={form.cardNumber}
                    keyboardType="numeric"
                    maxLength={16}
                />
            </View>
            <View>
                <Text style={formStyles.label}>CVV</Text>
                <TextInput
                    style={formStyles.input}
                    onChangeText={(text) => setForm({ ...form, cvv: text })}
                    placeholder="Ingrese el CVV"
                    placeholderTextColor="#A0A0A0"
                    autoCapitalize="none"
                    value={form.cvv}
                    keyboardType="numeric"
                    maxLength={3}
                />
            </View>
            <View>
                <Text style={formStyles.label}>Fecha de vencimiento</Text>
                <TextInput
                    style={formStyles.input}
                    onChangeText={(text) => handleExpDate(text)}
                    placeholder="Ingrese la fecha de vencimiento"
                    placeholderTextColor="#A0A0A0"
                    autoCapitalize="none"
                    value={form.expirationDate}
                    keyboardType="numeric"
                    maxLength={7}
                />
            </View>
            <Pressable
                style={[general.button, { marginTop: 10 }]}
                color={"#3483FA"}
                title="Comprar"
                onPress={() => handlePurchase()}
            >
                {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={{ color: "white" }}>Comprar</Text>}
            </Pressable>
            {error && <Text style={formStyles.error}>{error}</Text>}
            {formError && <Text style={formStyles.error}>{formError}</Text>}
        </View>
    )
}