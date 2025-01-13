import { Button, StyleSheet, Text, View } from 'react-native'

const Login = (props) => {
    const name = "Sharandeep Singh" 
    const work = "Software Engineer" 

    return (
        <View style={styles.viewStyle}>
            <Text>Login</Text>
            <Button title='chlo byi signup screen te' onPress={() => props.navigation.navigate("  ", {name, work})} />
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