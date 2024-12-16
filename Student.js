import { Component } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native'

class Student extends Component {
    render() {
        return (
            <View>
                <Text>This is the another magic {this.props.studentName}</Text>
            </View>
        )
    }
}

export default Student