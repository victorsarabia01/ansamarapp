//import React from 'react'
import React, {useRef,useState,Component } from 'react';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Alert, Modal, Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {useEffect} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
export default function Dashboard({ navigation }) {

    /* axios */
    const [selected, setSelected] = useState('');
    const [selectedOption, setSelectedOption] = useState('java');
    const [selectedValue, setSelectedValue] = useState();
    const [selectedValue1, setSelectedValue1] = useState();
    const [lista, setLista] = useState([]);
    const [lista2, setLista2] = useState([]);
    
    const GetList = () => {
      //axios.get("https://us-central1-api-dolar.cloudfunctions.net/apiDolar/bcv").then((value) => {
        axios.get("http://localhost:8080/apiConsultorios.php").then((value) => {
        //console.log(value.data);
        setLista(value.data);
      });
    }; 
    const GetList2 = () => {
      //axios.get("https://us-central1-api-dolar.cloudfunctions.net/apiDolar/bcv").then((value) => {
        axios.get("http://localhost:8080/apiOdontologos.php").then((value) => {
        //console.log(value.data);
        setLista2(value.data);
      });
    };
    useEffect(()=>{
      GetList();
    });
    useEffect(()=>{
      GetList2();
    });
   /* axios */




  return (
    <Background>
      <Logo />
      <Header>Ansamar Centro Medico 💫</Header>
      <Paragraph>
        Ansamar Centro Medico
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Cerrar sesion
      </Button>

      <View style={styles.container}>
      
      <Text style={styles.title1}>Solicitar cita</Text>
      <StatusBar style="auto" />
      {/*<Text style={styles.labelInput}>Cédula:</Text>
      <TextInput 
      id='cedula'
      placeholder='22186490'
      maxLength={8}
      style={styles.TextInput}
      //onChangeText={value => cedula(value.replace(/[^0-9]/g, ''))}
      />*/}

      <Text style={styles.labelInput}>Consultorio:</Text>
      <Picker
      style={styles.select}
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
      {lista.map((item) => {
      return (
      <Picker.Item key={item.id} label={item.descripcion} value={item.id}/>   
      );
      })}
      </Picker>

      <Text style={styles.labelInput}>Turno:</Text>
      <Picker style={styles.select}
      selectedValue={selectedOption}
      
      onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
      >
      <Picker.Item label="Manana" value="1" />
      <Picker.Item label="Tarde" value="2" />
      </Picker>

      <Text style={styles.labelInput}>Odontologo:</Text>
      <Picker
      style={styles.select}
      selectedValue={selectedValue1}
      onValueChange={(itemValue, itemIndex) => setSelectedValue1(itemValue)}
      >
      {lista2.map((item) => {
      return (
      <Picker.Item key={item.id} label={item.nombres} value={item.id}/>   
      );
      })}
      </Picker>

      {/*<Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
      />*/}
      <Calendar
      style={[styles.calendar, {height: 50}]}
      dayComponent={({date, state}) => {
      return (
      <View>
        <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text>
      </View>
      );
      }}
      />

            
    </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  displayFlex: {
    display: 'flex',
    
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  container1: {

    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
  },
  titulo1: {
    fontSize: 20,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title1: {
  
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  TextInput: {
   backgroundColor: '#E8E8E8',
    padding: 10,
    width: '50%',
    height: 30,
    marginTop: 1,
    borderRadius: 30,
    paddingStart: 0,
    textAlign: 'center',
  },
  TextInput1: {
    
    backgroundColor: '#f1f1f1',
     padding: 10,
     width: 150,
     height: 50,
     marginTop: 20,
     borderRadius: 30,
     paddingStart: 0,
     textAlign: 'center',
     
   },
  olvidoPassword: {
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 55,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginLeft: 5,
    marginTop: 20,
    height: 40,
    width: 100,
    backgroundColor: '#Ff0000',
  },
  buttonVerificar: {
    marginLeft: 5,
    marginTop: 20,
    height: 40,
    width: 100,
    backgroundColor: '#00FF00',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle1: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
   
    textAlign: 'center',
  },
  labelInput: {
    alignItems: 'left',
    textAlign:"left",
    justifyContent: 'left',

  },
  select: {
    width: '50%',
    borderRadius: 30,
    padding: 5,
  },
});