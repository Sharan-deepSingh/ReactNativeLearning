import { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

function App() {
  const [data, setData] = useState(null)
  const [update, setUpdate] = useState(false)
  const [updateItem, setUpdateItem] = useState(null)
  const getData = async () => {
    const url = "http://192.168.5.253:3000/users"
    const result = await fetch(url)
    const jsonResult = await result.json()
    setData(jsonResult)
  }

  const deleteData = async (id) => {
    const url = `http://192.168.5.253:3000/users/${id}`
    const result = await fetch(url, {
      method: "DELETE"
    })
    getData()
  }

  const updateData = async (data) => {
    const url = `http://192.168.5.253:3000/users/${data.id}`
    const result = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    getData()
    setUpdate(false)
    console.warn(result)
  }

  const openUpdatePopup = (item) => {
    setUpdateItem(item)
    setUpdate(true)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={[{ flex: 1 }, styles.parentView]}>
      <Text style={styles.topText}>List with API</Text>

      <View style={styles.headingView}>
        <Text style={styles.text}>Name</Text>
        <Text style={styles.text}>Age</Text>
        <Text style={styles.text}>Operations</Text>
      </View>

      {
        data ?
          <FlatList
            data={data}
            renderItem={({ item }) => <Cell item={item} deleteData={deleteData} openUpdatePopup={openUpdatePopup} update={update} updateData={updateData} updateItem={updateItem}/>}
          />
          : null
      }

    <UpdatePopup update={update} updateData={updateData} updateItem={updateItem}/>

    </View>
  );
}


function Cell(props) {
  return (
    <View style={styles.headingView}>
      <Text style={styles.text}>{props.item.name}</Text>
      <Text style={styles.text}>{props.item.age}</Text>

      <View style={styles.buttonsStyle}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => props.deleteData(props.item.id)} >
          <Text style={styles.button}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => props.openUpdatePopup(props.item)}>
          <Text style={styles.button}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function UpdatePopup(props) {
  const [age, setAge] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (props.updateItem) {
      setAge(props.updateItem.age || '');
      setName(props.updateItem.name || '');
    }
  }, [props.updateItem]);

  return (
    <Modal
      transparent={true}
      visible={props.update}
      animationType='slide'
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View style={styles.updateView}>
          <Text style={styles.updateViewHeading}>Enter updated Values</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter Age'
            value={age}
            onChangeText={(value)=>setAge(value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder='Enter Name'
            value={name}
            onChangeText={(value)=>setName(value)}
          />
          <TouchableOpacity 
            style={{borderBottomRightRadius: 16, borderBottomLeftRadius: 16, backgroundColor: 'skyblue'}}
            onPress={()=>props.updateData({id: props.updateItem.id, age: age, name: name})}
          >
            <Text style={[styles.button, {backgroundColor: 'rgba(0,0,0,0)'}]}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    flex: 1,
    padding: 10,
  },
  topText: {
    fontSize: 26,
    margin: 30,
    marginTop: 80
  },
  headingView: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonsStyle: {
    fontSize: 16,
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: 'skyblue',
    color: 'white',
    textAlign: 'center',
    paddingTop: 11,
    paddingBottom: 11,
    borderBottomLeftRadius: 14
  },
  updateView: {
    width: 350,
    height: 195,
    backgroundColor: 'rgba(240, 240, 240, 1)',
    borderRadius: 16,
  },
  textInput: {
    fontSize: 18,
    borderWidth: 2,
    borderColor: 'orange',
    margin: 8,
    borderRadius: 8,
    padding: 6
  },
  updateViewHeading: {
    margin: 14,
    fontSize: 18,
    textAlign: 'center'
  }
})

export default App;
