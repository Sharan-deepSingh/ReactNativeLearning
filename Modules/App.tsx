import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart } from './Redux/action';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function Header(props) {
  return (
    <View style={style.header}>
      <Text style={style.headerText}>Cart Items: {props.cartItems}</Text>
    </View>
  );
}



function App(props) {
  const dispatch = useDispatch()
  const [cartItems, setCartItems] = useState(0)
  const cartData = useSelector((state) => state.reducer)
  const dummyData = [
    {
      id: 0,
      name: 'Samsung Mobile',
      price: '20,000',
      model: '2025'
    },
    {
      id: 1,
      name: 'Samsung Mobile',
      price: '20,000',
      model: '2025'
    },
    {
      id: 2,
      name: 'Samsung Mobile',
      price: '20,000',
      model: '2025'
    },
    {
      id: 3,
      name: 'Samsung Mobile',
      price: '20,000',
      model: '2025'
    }
  ]

  useEffect(() => {
    setCartItems(cartData.length)
  }, [cartData])

  function List(props: any) {
    const addToCart = (item) => {
      dispatch(AddToCart(item))
    }

    return (
      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <View>
            <Text style={style.productText}>Product Id: {item.id}</Text>
            <Text style={style.productText}>Product Name: {item.name}</Text>
            <Text style={style.productText}>Product Price: {item.price}</Text>
            <Text style={style.productText}>Product Model: {item.model}</Text>
            <Button title='Add to cart' onPress={() => addToCart(item)} />
            <View style={style.line}></View>
          </View>
        )}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header cartItems={cartItems} />
      <List data={dummyData} />
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    backgroundColor: 'orange',
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 20,
    padding: 20
  },
  productText: {
    padding: 10
  },
  line: {
    backgroundColor: 'black',
    height: 1,
    marginLeft: 10,
    marginRight: 10
  }
})
export default App;