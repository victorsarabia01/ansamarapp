import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

 /* const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  
  }*/
  //AQUI
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');
  const handleLogin = async () => {
    //const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    //if (emailError || passwordError) {
      if (passwordError) {
      //setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    try {
      const response = await axios.post('http://localhost:8080/api/loginPaciente.php', {
        user: email.value,
        password: password.value,
      });

      console.log(response.data);

      if(response.data.usuario == false){
        alert('usuario incorrecto');
      }

      else if(response.data.contrasena == false){
        alert('Contrasena incorrecta');
      }
      else{
      // Verifica si la respuesta indica un inicio de sesión exitoso
      //if (response.data && response.data.entrada == true && response.data.contrasena == true) {
        if (response.data.entrada = true) {
        //Alert.alert('Bienvenido!!', 'Inicio de sesión exitoso');
        alert('Bienvenido!! Inicio de sesión exitoso');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
        //onLoginSuccess(response.data.resultado); // Llama a la función proporcionada desde App.js con el resultado
      } else {
        alert('Error en inisio de session');
        console.warn(response.data); // Muestra un mensaje de error si el inicio de sesión falla
      }
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
      Alert.alert('Error', 'Inicio de sesión fallido. Verifica tus credenciales.');
    }
  };
//AQUI


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Ingrese su cuenta!</Header>
      <TextInput
        label="Email/Usuario"
        returnKeyType="next"
        value={email.value}
        maxLength={30}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        maxLength={8}
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
      </View>
      <Button  mode="contained" onPress={handleLogin}>
        Inica sesion
      </Button>
      <View style={styles.row}>
        <Text>¿Aún no tienes una cuenta?</Text> 
      </View>
      <View style={styles.row}>
      <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Crear!</Text>
        </TouchableOpacity>
      </View>
    </Background>

    
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})