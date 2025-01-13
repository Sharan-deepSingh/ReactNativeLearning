import { StyleSheet, Text, View } from 'react-native'

const Signup = () => {
    return (
        <View style={styles.viewStyle}>
            <Text>Signup</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        viewStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
)

export default Signup;
