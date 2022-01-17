import React, { Component } from 'react';
import {iconSet} from '../helper/Icons';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const size = iconSet.length;
const tmpData = [
    {
      id:3, 
      name:"Group 1", 
      countMembers:51,
      icon: iconSet[Math.floor(Math.random() * (size - 1))]
    },
    {
      id:2, 
      name:"Group 2", 
      countMembers:10,
      icon: iconSet[Math.floor(Math.random() * (size - 1))]
    },
    {
      id:4, 
      name:"Group 3", 
      countMembers:58,
      icon: iconSet[Math.floor(Math.random() * (size - 1))]
    },
    {
      id:5, 
      name:"Group 4", 
      countMembers:63,
      icon: iconSet[Math.floor(Math.random() * (size - 1))]
    },
]


export default class Continue extends Component {

  constructor(props) {
    super(props);    
    this.state = { data:tmpData, isLoading: true }
    this.getAllKeys();
  }

  
  getAllKeys = async () => {
    let keys = [];
    var data = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      console.error(keys.length);
      for (var i = 0; i < keys.length; i++) {
        var jsonValue = await AsyncStorage.getItem(keys[i]);
        var parsedJson = JSON.parse(jsonValue);
        parsedJson.id = i;
        parsedJson.gameKey = keys[i]; 
        if(!parsedJson.completed){
          data.push(parsedJson);
        }
    }
    } catch(e) {
      console.warn(e);
    }
    this.setState({data:data, isLoading:false});
    console.warn(this.state);
  }

  loadGame = (key) => {
    console.warn(key);
    this.props.navigation.navigate('Game',  { isLoaded:true, key:key });
  };


  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Group = item.item;
          let mainContentStyle;
          if(Group.attachment) {
            mainContentStyle = styles.mainContent;
          }
          return(
            <TouchableOpacity style={styles.container} onPress={() => this.loadGame(Group.gameKey)} >
              <Icon reverse name={iconSet[Math.floor(Math.random() * (size - 1))]} type="ionicon"/>
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.groupName}>Game № {Group.id}</Text>
                  </View>
                  <Text style={styles.countRounds}>
                    Round: {Group.round}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:55,
    height:55,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60,
    backgroundColor:'yellow'
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight:4,
    borderRadius:10,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  countRounds:{
    color:"#20B2AA"
  },
  groupName:{
    fontSize:23,
    color:"#1E90FF"
  },
});  