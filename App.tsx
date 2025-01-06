import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


function App() {
  const [selectedId, setSelectedId] = useState(1)
  const data = [
    {
      language: 'Python',
      id: 1
    },
    {
      language: 'Swift',
      id: 2
    },
    {
      language: 'Java',
      id: 3
    },
    {
      language: 'java Script',
      id: 4
    },
    {
      language: 'C++',
      id: 5
    },
  ]

  return (
    <View style={styles.mainView}>
      <View>
      {
        data.map((item) => (
          <TouchableOpacity style={styles.button} onPress={() => setSelectedId(item.id)}>
            <View style={styles.radio}>
              { item.id == selectedId ? <View style={styles.buttonSelector} ></View> : null}
            </View>
            <Text style={styles.textStyle}>{item.language}</Text>
          </TouchableOpacity>
        ))
      }
      </View>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    mainView: {
      backgroundColor: 'lightpink',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      flexDirection: 'row',
      margin: 10,
    },
    radio: {
      borderColor: 'black',
      borderWidth: 2,
      width: 20,
      height: 20,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonSelector: {
      backgroundColor: 'green',
      width: 12,
      height: 12,
      borderRadius: 16
    },
    textStyle: {
      marginLeft: 10,
      fontWeight: 'bold',
      fontSize: 16,
    }
  }
)

export default App;
