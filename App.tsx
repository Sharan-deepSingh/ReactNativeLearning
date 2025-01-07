import { useState } from 'react';
import {
  _View,
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


function App() {
  const [animating, setAnimating] = useState(false)
  const [modalPresented, setModalPresented] = useState(false)

  return (
    // iOS don't support background color so we need to use a view give height to it as required and give backgroudn color to it as done in below example
    <View style={{ flex: 1 }}>
      <View style={{ height: 50, backgroundColor: 'green' }}>
        <StatusBar
          animated={true}
          // backgroundColor={'green'} iOS don't support this
          barStyle={'dark-content'}
          translucent={false}
          showHideTransition={'slide'}
        />
      </View>

      <Text style={styles.textStyle}>This is an example for Activity Indecator, Modal, Status Bar and Pressable</Text>
      <View style={styles.activityIndicatorView}>
        <ActivityIndicator />
        <ActivityIndicator animating={animating} size={'large'} />
        <ActivityIndicator color='green' />
        <ActivityIndicator color='purple' size='large' />
        <Button title='Press me to see magic' onPress={() => setAnimating(true)} />
      </View>

      <View style={styles.modalMainView} >
        <Pressable
          onPressOut={() => setModalPresented(true)}
        >
          <Text>Press Me to see Modal and how (onPressOut works) in Pressable</Text>
        </Pressable>

        <Modal
          animationType='slide'
          visible={modalPresented}
          transparent={true}
        >
          <View style={styles.modalTopLevelView}>
            <View style={styles.modalContent}>
              <Text>This is a simple modal and Pressable example</Text>
              <Pressable
                onLongPress={() => setModalPresented(false)}
                style={{ borderRadius: 8, backgroundColor: 'red', marginTop: 20 }}
              >
                <Text style={styles.longPressTextStyle}>Long press to close Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

    </View>
  )
}

const styles = StyleSheet.create(
  {
    textStyle: {
      fontSize: 14,
      marginTop: 70,
      margin: 20
    },
    activityIndicatorView: {
      backgroundColor: 'lightpink',
      margin: 20,
      padding: 20
    },
    modalMainView: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalTopLevelView: {
      backgroundColor: "rgba(0,0,0,0.5)",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 16
    },
    longPressTextStyle: {
      color: 'white',
      textAlign: 'center',
      padding: 6
    }
  }
)

export default App;
