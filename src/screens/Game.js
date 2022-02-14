import React, { Component, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

export default class Game extends Component {
  
  constructor(props) {
    super(props);
    const key = Math.floor((Math.random() * 99999999999999999) + 1).toString();
    const loadedGame = props.route.params.isLoaded;
    this.flatList = React.createRef();
    if (loadedGame){
      const gameId = props.route.params.key;
      this.state = {
        msg: '',
        analyze:'',
        messages: [],
        game:gameId,
        round:0,
        guessedValue:null,
        disabledInput: true,
      };      
      this.loadData(gameId);
    }
    else{
      this.state = {
        msg: '',
        analyze:'',
        messages: [
          {id:1, sent: false, msg: 'Welcome to the game', icon:'chatbubble'},
          {id:222, sent: false, msg: 'Please enter the number with the length of = '+props.route.params.size.toString(), icon:'chatbubble'},
          {id:12, sent: true,  msg: 'Lorem ipsum dolor', icon:'person'},
        ],
        game:key,
        round:0,
        guessedValue: props.route.params.guess,
        disabledInput:true,
      };
      this.initData(key);
    }    
    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
    this.renderItem   = this._renderItem.bind(this);
  }
  reply() {
    var messages = this.state.messages;
    messages.push({
      id:Math.floor((Math.random() * 99999999999999999) + 1),
      sent: false,
      msg: this.state.analyze,
      icon:'chatbubble'
    });
    var round = this.state.round;
    this.setState({round:round});
    this.updateMessages(this.state.game,messages);
    this.setState({msg:'', messages:messages,analyze:''});    
  }

  send() {
    if (this.state.msg.length > 0) {
      var messages = this.state.messages;
      messages.push({
        id:Math.floor((Math.random() * 99999999999999999) + 1),
        sent: true,
        msg: this.state.msg,
        icon:'person'
      });
      this.setState({messages:messages});
      this.analyze(); 
    }
  }

  loadData = async (key) =>{
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      var parsedJsonValue = JSON.parse(jsonValue);
      this.setState({round:parsedJsonValue.round, messages: parsedJsonValue.messages, guessedValue:parsedJsonValue.requiredValue});
    } catch(e) {
      console.error(e)
    }
    
  }

  initData = async (key) => {    
    try {
      const guess = this.props.route.params.guess;      
      const completed = false;
      var value = {
        completed: completed,
        messages: this.state.messages,
        requiredValue:guess,
        round:0,
      }
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key.toString(), jsonValue)
    } catch (e) {
      console.error(e);
    }
  }

  updateMessages = async (key, messages) =>{
    try{
      var jsonValue = await AsyncStorage.getItem(key.toString())
      if (jsonValue == null){
        console.error("Error at updating the message");
        return;
      }
      jsonValue = JSON.parse(jsonValue)
      jsonValue.round = jsonValue.round + 1;
      jsonValue.messages = messages;
      await AsyncStorage.setItem(key.toString(), JSON.stringify(jsonValue))
    } catch (e) {
      console.error(e);
    }
  }

  updateStatus = async (key) =>{
    try{
      var jsonValue = await AsyncStorage.getItem(key)
      jsonValue != null ? JSON.parse(jsonValue) : null;
      if (jsonValue == null){
        console.error("Error at updating the message");
        return;
      }
      jsonValue = JSON.parse(jsonValue)
      jsonValue.completed = true;
      jsonValue.messages = {};
      await AsyncStorage.setItem(key, JSON.stringify(jsonValue))
    } catch (e) {
      console.error(e);
    }
  }


  analyze(){
    var answer = this.state.guessedValue.toString();
    var guessedVal = this.state.msg.toString();
    if(answer == guessedVal){
      this.setState({analyze:'Congratulations you have won!'});
      setTimeout(() => {
        this.reply();
        this.updateStatus(this.state.game);
        this.setState({disabledInput:false});
      }, 100);
      return;
    }

    if(guessedVal.length !== answer.length){
      this.setState({analyze:'Length of the number doesnot equal'})
      setTimeout(() => {
        this.reply();
      }, 100);
      return;
    }
    var oxen = this.genOxen();
    var cows = this.genCows();
    this.setState({analyze: oxen.toString()+' oxes '+cows.toString()+' cows'})
    setTimeout(() => {
      this.reply();
    }, 100);
  }

  genOxen(){
    var answer =  this.state.guessedValue.toString();
    var guessedVal = this.state.msg.toString();
    var oxen = 0;
    for (let i = 0; i < answer.length; i++) {
      if( answer[i]==guessedVal[i]){
        oxen++;
      }
    }
    return oxen;
  }

  genCows(){
    var answer = this.state.guessedValue.toString();
    var guessedVal = this.state.msg.toString();
    var cows = 0;
    for (let i = 0; i < answer.length; i++) {
      for (let j = 0; j < guessedVal.length; j++) {
        if( i == j){
          continue;
        }
        else{
          if( answer[i]==guessedVal[j]){
            cows++;
          }
        }
      }
    }
    return cows;
  }

  _renderItem = ({item}) => {
    if (item.sent === false) {
      return (
        <View style={styles.eachMsg}>
        <View
        style={{
          alignItems: 'center',
          marginBottom:7,
        }}
        >
        <Icon name={item.icon} type='ionicon'/>
        </View>
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    } else{
      return (
        <View style={styles.rightMsg} >
          <View style={styles.rightBlock} >
            <Text style={styles.rightTxt}>{item.msg}</Text>
          </View>
          <View
          style={{
            alignItems: 'center',
            marginBottom:7,
          }}
          >
          <Icon name={item.icon} type='ionicon'/>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.mainScreen} >
            <FlatList          
            ref= {this.flatList}
            onContentSizeChange= {()=> this.flatList.current.scrollToEnd({animated:false})} 
              style={styles.list}
              extraData={this.state}
              data={this.state.messages}
              keyExtractor = {(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}/>
            <View style={styles.input}>
              <TextInput
                style={{flex: 1 }}
                value={this.state.msg}
                placeholderTextColor = "#696969"
                onChangeText={msg => this.setState({ msg })}
                keyboardType="numeric"
                editable={this.state.disabledInput}
                selectTextOnFocus={this.state.disabledInput}
                onSubmitEditing={() => this.send()}
                placeholder="Type a message"
                returnKeyType="send"/>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainScreen:{
    flex: 1,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    backgroundColor:"red"
  },
  right: {
    flexDirection: 'row',
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor:'#696969',
    borderWidth:1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: 'gray',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
}); 