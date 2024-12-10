import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App() {
  const gridData = [
    {
      name: "Mr. Singh",
      id: 1
    },
    {
      name: "Parneet",
      id: 2
    },
    {
      name: "Shubam",
      id: 3
    },
    {
      name: "Rahul",
      id: 4
    },
    {
      name: "Yogesh",
      id: 5
    },
    {
      name: "Jaspinder",
      id: 6
    },
    {
      name: "Karan",
      id: 7
    },
    {
      name: "Varinder",
      id: 8
    },
    {
      name: "Harwinder",
      id: 9
    },
    {
      name: "Harwinder",
      id: 10
    }
  ]

  return (
    <View>
      <Text style={styles.textStyle}>Grid Demo</Text>

      <ScrollView>
        <View style={styles.outerView}>
            {
              gridData.map((data) => 
                <View style={styles.boxStyle} key={data.id}>
                  <Text>{data.name}</Text>
                </View>
              )
            }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 40,
    fontSize: 20,
  },
  boxStyle: {
    backgroundColor: 'red',
    width: 115,
    height: 115,
    padding: 5,
    margin: 5,
    alignItems: 'center', 
    justifyContent: 'center',
  }, 
  outerView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 600 
  }
}) 

export default App;
