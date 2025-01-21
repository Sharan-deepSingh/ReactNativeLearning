import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

function App() {
  const [id, setId] = useState(null)
  const [age, setAge] = useState(null)
  const [name, setName] = useState(null)

  const saveData = async (data) => {
    const url = "http://192.168.5.253:3000/users"
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      "body": JSON.stringify(data)
    })
  }

  return (
    <View style={styles.mainView}>
      <CTextField placeholder="Please Enter User Id" setValue={setId}/>
      <CTextField placeholder="Please Enter your age" setValue={setAge}/>
      <CTextField placeholder="Please Enter your name" setValue={setName}/>
      <TouchableOpacity onPress={() => saveData({
        age,
        name
      })} style={styles.button}>
        <Text style={styles.text}>Press to save</Text>
      </TouchableOpacity>
    </View>
  );
}

function CTextField(props) {
  return(
    <View style={styles.textField}>
      <TextInput 
        placeholder={props.placeholder}
        onChangeText={(text) => props.setValue(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textField: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    width: 300,
    margin: 10
  },
  button: {
    padding: 4,
    width: 150,
    backgroundColor: 'green',
    borderRadius: 8,
    alignItems: 'center'
  },
  text: {
    color: 'white'
  }
})

export default App;
