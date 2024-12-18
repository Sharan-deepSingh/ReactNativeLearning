import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

function View2(props) {
  const [v2, setv2] = useState(0)
  useEffect(()=> {
    setv2((oldV2)=>oldV2+1)
  },
  [props.value])

  return (
    <View>
      <Text>This is view 2 we will change value from here {v2}</Text>
      <Button title='a good button' onPress={() => props.setValue(()=>10)}/>
    </View>
  )
}

function App() {
  const [value, setValue] = useState(0)
  const [value2, setValue2] = useState(0)
  useEffect(() => {
    setValue2(value + 1)
    console.warn(`I am use effect ${value}`)
  }, [value])

  return(
    <View>
      <Text style={styles.textStyle}>Hello World {}</Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={()=>setValue((oldValue)=>oldValue+1)}>
        <Text>Press Me</Text>
      </TouchableOpacity>
      <Text style={styles.textStyle}>Hello World Value 2 = {}</Text>
      <View2 value={value} />
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle : {
    marginTop: 70, 
    fontSize: 25,
    marginLeft: 20,
  }, 
  buttonStyle: {
    width: 170,
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App;
