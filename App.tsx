import { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function App() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [display, setDisplay] = useState(false)

  const setEmptyState = () => {
    setName("")
    setPassword("")
    setEmail("")
    setDisplay(false)
  }

  const flatListData = [
  {
    name: "Mr. Singh",
    age: 16
  },
  {
    name: "Mr. ffsf",
    age: 16
  },
  {
    name: "fsdsdffds",
    age: 16
  }
  ]

  return (
    <View>
      <TextInput 
      style={style.textInput}
      placeholder='Enter Your Name'
      value={name}
      onChangeText={(text)=>setName(text)}
      />
      <TextInput 
      style={style.textInput}
      placeholder='Enter Your Password'
      value={password}
      secureTextEntry={true}
      onChangeText={(text)=>setPassword(text)}
      />
      <TextInput 
      style={style.textInput}
      placeholder='Enter Your Email'
      value={email}
      onChangeText={(text)=>setEmail(text)}
      />
      <View style={style.buttonStyle}>
        <Button color='white' title='Press Me to Display' onPress={()=>setDisplay(true)} />
      </View>
      <View style={style.buttonStyle}>
        <Button color='white' title='Press Me to remove' onPress={()=>setEmptyState()} />
      </View>
      <FlatList 
        data={flatListData}
        renderItem={({item})=><Text>{item.name}</Text>}
      />
      {
        display ? 
        <View>
          <Text>Name is: {name}</Text>
          <Text>Password is: {password}</Text>
          <Text>Email is is: {email}</Text>
        </View>
        : null
      }

    </View>
  );
}
const style = StyleSheet.create({
  textInput: {
     color: 'gray',
     borderColor: 'black',
     borderWidth: 2,
     fontSize: 20,
     borderRadius: 8,
     marginTop: 50,
     marginLeft: 10,
     marginRight: 40,
     height: 40
  },
  buttonStyle: {
    backgroundColor: 'pink',
    borderRadius: 8,
    margin: 20
  }
})
export default App;