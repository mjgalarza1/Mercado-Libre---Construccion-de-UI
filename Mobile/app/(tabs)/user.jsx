import { Button, Pressable, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import LoginForm from '../../components/forms/LoginForm';
import { useEffect, useState } from 'react';
import RegisterForm from '../../components/forms/RegisterForm';
import { useUserContext } from '../../context/UserContext';
import { body, padding, general } from '../../styles/styles';

export default function User() {
  const { user, logout, update } = useUserContext();
  const [loggin, setLoggin] = useState(true);
  useEffect(() => {
    update();
  }, [user]);


  return (
    user ?
      <>
        <View style={[padding.xs, userStyles.container]}>
          <View style={userStyles.options}>
          <Link style={userStyles.linkButton} href={"/user/liked"}>Liked</Link>
          <Link style={userStyles.linkButton} href={"/user/sales"}>Sales</Link>
          <Link style={userStyles.linkButton} href={"/user/purchases"}>Purchases</Link>
          <Link style={userStyles.linkButton} href={"/user/my-products"}>My products</Link>
          </View>
          <View style={userStyles.logout}>
            <TouchableOpacity style={general.button} title="Cerrar sesion" onPress={() => logout()} >
              <Text style={general.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
      :
      <View style={[userStyles.formWrapper, body.white]}>
        {loggin ?
          <>
            <LoginForm />
            <Pressable onPress={() => setLoggin(!loggin)}>
              <Text style={userStyles.formSwitch}>Registrarse</Text>
            </Pressable>

          </>
          :
          <>
            <RegisterForm style={userStyles.loginAndRegisterWrapper} />
            <Pressable onPress={() => setLoggin(!loggin)}>
              <Text style={userStyles.formSwitch}>Iniciar sesion</Text>
            </Pressable>
          </>
        }
      </View>
  );
};

const userStyles = StyleSheet.create({
  formWrapper: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    margin: 10,
  },
  formSwitch: {
    color: "#3483fa",
    fontStyle: 'italic',
    padding: 5,
  },
  linkButton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: 30,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    textAlign: 'center'
  },
  logout: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
  },
})