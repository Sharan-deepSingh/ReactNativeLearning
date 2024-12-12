import {SectionList, StyleSheet, Text, View} from 'react-native'

function App() {
  let sectionListData = [
    {
      name: "Sharandeep Singh",
      age: 16,
      data: ["Java", "c++", "python"]
    }, 
    {
      name: "Harman Singh",
      age: 16,
      data: ["Jupyter", "Computer Hardware", "Django"]
    }, 
    {
      name: "Gurpreet Singh",
      age: 16,
      data: ["Java", "c++", "DataBase"]
    }, 
  ]

  return(
    <View>
      <Text style = {styles.topHeadingStyle}>Section List Demo</Text>

      <SectionList style = {styles.sectionStyle}
        sections={sectionListData}
        renderItem={({item}) => <Text style={styles.textStyle}>{item}</Text>}
        renderSectionHeader={({section: {name}}) => <Text style={styles.headerStyle}>Employee Name: {name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    backgroundColor: '#F0BB78',
    color: 'white',
    margin: 5,
    padidng: 5,
  },
  headerStyle: {
    fontSize: 23,
    marginTop: 25,
    backgroundColor: '#543A14',
    color: 'white',
    padding: 5,
    textAlign: 'center'
  },
  topHeadingStyle: {
    marginTop: 80,
    fontSize: 20,
    color: 'green',
    marginLeft: 25
  },
  sectionStyle: {

  }
})

export default App;