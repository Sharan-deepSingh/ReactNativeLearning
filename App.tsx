import { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';

function App() {
  const [data, setData] = useState(null)

  const getData = async () => {
    const url = "http://192.168.5.253:4000/users"
    const fetchResult = await fetch(url)
    const result = await fetchResult.json()
    setData(result)
    console.warn(result)
  }

  useEffect(()=>{
    getData()
  }, [])

  return (
    <View>
      <FlatList 
        data={data}
        renderItem={({item}) => 
          <View>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.age}</Text>
          </View>

        }
      />
    </View>
  );
}

export default App;
