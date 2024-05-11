import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, TouchableOpacity } from 'react-native';
import React from 'react';


const MyComponent = () => {
  const handlePress = () => {
    Alert.alert('¡Presionaste el TouchableOpacity!');
    console.log('holaa');
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Presiona aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyComponent;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
