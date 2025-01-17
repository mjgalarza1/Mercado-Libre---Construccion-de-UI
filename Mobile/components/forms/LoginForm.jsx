import { useState } from "react";
import { Keyboard, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useUserContext } from "../../context/UserContext";
import { formStyles, general } from "../../styles/styles";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState(null);

  const { login, error } = useUserContext();  

 
  const handleLogin = async () => { 
    Keyboard.dismiss();
    await login(email, password);
    if(error){
      setLoginError(error);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <View style={formStyles.wrapper}>
      <Text style={formStyles.title}>Login</Text>
      <View>
        <Text style={formStyles.label}>Email</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={(text) => setEmail(text)}
          placeholder="Correo electrónico"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
        />
      </View>
      <View>
        <Text style={formStyles.label}>Password</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={(text) => setPassword(text)}
          placeholder="Contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          autoCapitalize="none"
          value={password}
        />
      </View>
      <View style={{marginVertical:10}}>
        <TouchableOpacity style={general.button} title="Iniciar Sesión" onPress={handleLogin}>
          <Text style={general.buttonText}>Login</Text>
        </TouchableOpacity>
        {loginError && <Text style={formStyles.error}>{error}</Text>}
      </View>
    </View>
  );


}