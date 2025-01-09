import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';


function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.webView}>
        <WebView
          source={{ uri: "https://softprodigy.com/" }}
        />
      </View>

      <View style={styles.textArea}>
        <Text style={styles.heading}>Platform Information</Text>
        <Text style={styles.bodyText}>You are currently using {Platform.OS} platform</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    webView: {
      marginTop: 60,
      flex: 7
    },
    textArea: {
      flex: 1,
      marginBottom: 30,
      marginLeft: 30,
      marginRight: 30,
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderWidth: 4,
      borderTopLeftRadius: 36,
      borderBottomRightRadius: 36,
      borderStyle: 'dashed'
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 20
    },
    bodyText: {
      fontSize: 16,
      marginLeft: 20,
      fontStyle: 'italic'
    }
  }
)

export default App;
