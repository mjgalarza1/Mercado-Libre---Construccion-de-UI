import { useState } from "react";
import { Keyboard, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { useUserContext } from "../../context/UserContext";
import { formStyles, general } from "../../styles/styles";

export default function RegisterForm() {
  const [registerError, setRegisterError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const { register, error } = useUserContext();

  const handleRegister = async () => {
    if (!Object.values(form).every((value) => value !== '')) {
      setRegisterError("Todos los campos son obligatorios.");
      return;
    }
    Keyboard.dismiss();
    await register(form);
    if(error){
      setRegisterError(error);
    }else{
      setForm({
        name: "",
        email: "",
        image: "",
        password: "",
      });
  }
  };

  return (
    <View style={formStyles.wrapper}>
      <View>
        <Text style={formStyles.title}>Register</Text>
      </View>
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
      <View >
        <Text style={formStyles.label}>Correo electrónico</Text>
        <TextInput
          style={formStyles.input}

          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="Ingrese su email"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
        />
      </View>
      <View>
        <Text style={formStyles.label}>Imagen</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={(text) => setForm({ ...form, image: text })}
          placeholder="Ingrese un link de imagen"
          placeholderTextColor="#A0A0A0"
          autoCapitalize="none"
          value={form.image}
        />
      </View>
      <View>
        <Text style={formStyles.label}>Contraseña</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={(text) => setForm({ ...form, password: text })}
          placeholder="Contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          autoCapitalize="none"
          value={form.password}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity
          style={general.button}
          title="Registrarse"
          onPress={handleRegister} >
          <Text style={general.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      {registerError && <Text style={formStyles.error}>{registerError}</Text>}
    </View>
  );
}