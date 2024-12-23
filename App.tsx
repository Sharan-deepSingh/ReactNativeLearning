import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

function App() {
  const [show, setShow] = useState(true)

  return (
    <View>
      <Text style={styles.text}>Unmount Lifecycle Demo</Text>
      <TouchableOpacity style={styles.button} onPress={() => setShow(false)}>
        <Text style={styles.buttonText}>Press me to hide the student</Text>
      </TouchableOpacity>
      {
        show ? <Student /> : null
      }
    </View>
  )
}

const Student = () => {
  let timer = setInterval(() => {console.warn("I will be called after 4 seconds")}, 4000)

  useEffect(() => {
    return () => clearInterval(timer)
  })

  return (
    <View>
      <Text style={styles.text}>yes, I'm a student</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    marginTop: 60,
    fontSize: 20,
    backgroundColor: 'lightgreen',
    color: 'white',
    textAlign: 'center',
    padding: 10
  },
  button: {
    marginTop: 80,
    margin: 20,
    backgroundColor: 'lightpink',
    padding: 10,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.4,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  }
})

export default App;
