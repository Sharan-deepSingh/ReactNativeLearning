import { StyleSheet, Text, View } from 'react-native'

const Signup = (props) => {
    const { name, work } = props.route.params;

    return (
        <View style={styles.viewStyle}>
            <Text>Signup</Text>
            <Text></Text>
            <Text></Text>
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
