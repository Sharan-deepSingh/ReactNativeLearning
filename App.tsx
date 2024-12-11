import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

function App() {
  const [magic, setMagic] = useState("")
  const touched = () => setMagic(oldValue => oldValue == "Magic" ? "" : "Magic")

  return (
    <View>
      <Text style = {styles.topTextStyle}>This is a demo of TouchableOpacity</Text>

      <TouchableOpacity style = {styles.touchableOpacityStyle} onPress={touched}>
        <Text style = {styles.textStyle}>Press Me to see the Magic</Text>
      </TouchableOpacity>

      <Text style = {styles.topTextStyle}>{magic}</Text>

    </View>
   );
}

const styles = StyleSheet.create({
  topTextStyle: {
    marginTop: 80,
    marginLeft: 30,
    fontSize: 18
  }, 
  touchableOpacityStyle: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 30, 
    padding: 10,
    width: 300,
    borderRadius: 8,
    backgroundColor: 'green',
    alignItems: 'center'
  }, 
  textStyle: {
    color: 'white'
  } 
})

export default App;
