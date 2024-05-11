import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity,Alert } from 'react-native'
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
import { cedulaValidator } from '../helpers/cedulaValidator'
import { nameValidator } from '../helpers/nameValidator'
import { tlfnoValidator } from '../helpers/tlfnoValidator'
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

export default function RegisterScreen({ navigation }) {
  const [cedula, setCedula] = useState({ value: '', error: '' })
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [tlfno, setTlfno] = useState({ value: '', error: '' })
  
  //
  const [selectedOption, setSelectedOption] = useState('java');
  const [selectedValue, setSelectedValue] = useState();
  //

  const onSignUpPressed = async () => {
    const cedulaError = cedulaValidator(cedula.value)
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const tlfnoError = tlfnoValidator(cedula.value)

    if (cedulaError || emailError || passwordError || nameError || tlfnoError) {
      setCedula({ ...cedula, error: cedulaError })
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setTlfno({ ...tlfno, error: tlfnoError })
      return
    }

    //
    try {
      const response = await axios.post('http://localhost:8080/a/api/registrarUsuario.php', {
        cedula: cedula.value,
        name: name.value,
        email: email.value,
        password: password.value,
        tlfno: tlfno.value
      });

      console.log(response.data);
      
      if(!response.data){
        alert('error en registro');
      }

      if(response.data.cedula == false){
        alert('Error en registro La cedula ya esta en uso');
      }else if(response.data.email == false){
        alert('Error en registro el email ya esta en uso');
      }
      else{
      // Verifica la data result del endpoint
      //if (response.data && response.data.entrada == true) {
      if (response.data.entrada == true) {
        alert('Registro exitoso!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })
        //onLoginSuccess(response.data.resultado); // Llama a la función proporcionada desde App.js con el resultado
      } else {
        //console.warn(response.data); 
        alert('Error en registro');
      }
      }
    } catch (error) {
      //console.error('Error:', error.message);
      alert('Error Registro fallido');
    }
    //
    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Crea tu cuenta!</Header>
      <TextInput
        label="Cedula"
        keyboardType="numeric"
        maxLength={8}
        returnKeyType="next"
        value={cedula.value}
        onChangeText={(text) => setCedula({ value: text, error: '' })}
        error={!!cedula.error}
        errorText={cedula.error}
      />
      <TextInput
        label="Apellido y Nombre"
        returnKeyType="next"
        value={name.value}
        maxLength={45}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        maxLength={45}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

   


      <TextInput
        label="Telefono"
        keyboardType="numeric"
        maxLength={11}
        returnKeyType="next"
        value={tlfno.value}
        onChangeText={(text) => setTlfno({ value: text, error: '' })}
        error={!!tlfno.error}
        errorText={tlfno.error}
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        maxLength={8}
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registrar
      </Button>
      <View style={styles.row}>
        <Text>¡Ya tengo una cuenta!</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Iniciar sesion</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})