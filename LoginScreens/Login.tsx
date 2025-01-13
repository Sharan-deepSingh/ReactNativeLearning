import { Button, StyleSheet, Text, View } from 'react-native'

const Login = () => { 
    return (
        <View style={styles.viewStyle}>
            <Text>Login</Text>
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

export default Login;