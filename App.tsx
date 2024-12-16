import { Component } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native'
import Student from './Student';

class App extends Component {
  constructor() {
    super();

    this.state = {
      studentName: ""
    }
  }

  updateName(name) {
    this.setState({studentName: name})
  }

  render() {
    return(
      <View>
        <Text style={styles.textStyle}>Hello { this.state.studentName }</Text>
        <TextInput style={styles.textStyle}
          placeholder='Enter your name to see magic' 
          onChangeText={ (name) => this.updateName(name) }       
        />
        <Student studentName={this.state.studentName}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    marginTop: 50
  }
}) 

export default App;
