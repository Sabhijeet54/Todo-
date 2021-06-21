import React, {Component} from 'react';

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
console.disableYellowBox = true;
export default class app extends Component {
  arr = [];
  id = 1;
  constructor() {
    super();
    this.state = {
      text: '',
      item: [{id: 1, data: '', checkBox: false}],
    };
  }

  storage = async () => {
    // if(this.arr.length==0){
    //   this.arr=JSON.parse(await AsyncStorage.getItem('mylist'))
    // }

    this.arr.push({id: this.id, data: this.state.text, checkBox: false});
    this.id++;
    await AsyncStorage.setItem('mylist', JSON.stringify(this.arr));
    this.setState({
      item: JSON.parse(await AsyncStorage.getItem('mylist')),
    });
    this.setState({text: ''});

    // console.warn(this.state.item);
  };
  delete = async () => {
    // console.warn(JSON.parse(await AsyncStorage.getItem('mylist')));
    try {
      await AsyncStorage.removeItem('mylist');
      this.setState({item: null});
      this.arr = [];
      console.warn('obj', this.arr);
      this.arr.push({id: this.id, data: this.state.text, checkBox: false});
    } catch (err) {
      console.warn(`The error is: ${err}`);
    }
    // console.warn(JSON.parse(await AsyncStorage.getItem('mylist')));
  };
  renderItem = ({item}) => {
    console.warn('item', item.id);

    return (
      (item.data)!=""?
      <View style={{height: 100, width: '100%', justifyContent: 'center'}}>
        <View
          style={{
            height: 60,
            width: '80%',
            backgroundColor: '#fff',
            left: 25,
            elevation: 10,
            // bottom:20,
            justifyContent: 'space-around',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
          }}>
          
            <View style={{width: '95%', position: 'absolute', left:10,}}>
              <Text numberOfLines={3} ellipsizeMode="tail" style={{}}>
                {item.data}
              </Text>
            </View>
          
        </View>
      </View>
    :<></>
    );
  };
  async componentDidMount() {
    this.setState({
      item: JSON.parse(await AsyncStorage.getItem('mylist')),
    });
    // this.delete();ss
  }

  render() {
    return (
      <>
        <View
          style={{
            height: 70,
            justifyContent: 'center',
            zIndex: 10,
            elevation: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 30}}> Today's tasks</Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 20}}
            onPress={() => {
              this.delete();
            }}>
            <Text style={{fontSize: 15}}>Delete All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.highlight}>
          <FlatList
            // style={{bottom: 30,top:5}}
            data={this.state.item}
            renderItem={this.renderItem}
            extraData={this.state}
            // keyExtractor={item => item.id}
          />
        </View>
        {/* {console.warn(this.state.items)} */}
        <View style={{height: 100, backgroundColor: '#E8EAED'}}>
          <TextInput
            style={styles.textinput}
            value={this.state.text}
            placeholder=" Write a task"
            // value={this.state.item}
            onChangeText={text => (text == '' ? ' ' : this.setState({text}))}
          />

          <TouchableOpacity
            style={styles.addWrapper}
            onPress={() => {
              this.state.text != '' ? this.storage() : '';

              // console.warn(this.state.text);
            }}>
            <Text style={{}}>{'+'}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    width: '70%',
    position: 'absolute', //Here is the trick
    bottom: 30,
    left: 13, //
    // backgroundColor:'green'
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
  },

  addWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 13,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },

  highlight: {
    // height: Dimensions.get('window').height,
    flex: 1,
    backgroundColor: '#E8EAED',
    // backgroundColor: 'red',
    // bottom:"20%"

    // fontWeight: '700',
  },
});
