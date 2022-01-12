import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList
} from 'react-native';
import { Icon } from 'react-native-elements';
export default class Intro extends Component {


  generateNumber(complex, length){
    switch(length){
      case 4: 
        var number = Math.random() * (10000 - 1000) + 1000;
        break;
      case 5:
        var number = Math.random() * (100000 - 10000) + 10000;
        break;
    }
    if(complex){
      this.props.navigation.navigate('Game',  { guess: Math.floor(number), size:length, complexity:true })
    }
    else{
      var str = Math.floor(number).toString();
      var strArray  = str.split('');
      const set = new Set(strArray);
      const hasDuplicates = set.size < strArray.length;
      if (hasDuplicates){
        return this.generateNumber(complex,length)
      }
      else{
        this.props.navigation.navigate('Game',  { guess: Math.floor(number), size:length, complexity:false })
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {
          title:'Main',
          data:[
            {key:1, name:'Not Completed', icon:"play", type:"ionicon", page:"Continue", gameMode:false},
            {key:2, name:'Statistics', icon:"stats-chart", type:"ionicon", page:"Statistics", gameMode:false},
          ]
        },
        {
          title:"New Game - Easy", 
          data:[
            {key:1, name:'4-Digits', icon:"bed", type:"ionicon", size: 4, complex: false, gameMode:true},
            {key:2, name:'5-Digits', icon:"boat", type:"ionicon", size: 5, complex: false, gameMode:true},
          ]
        },
        {
          title:"New Game - Hard", 
          data:[
            {key:1, name:'4-Digits', icon:"star-half", type:"ionicon",  size: 4, complex: true, gameMode:true},
            {key:2, name:'5-Digits', icon:"star", type:"ionicon", size: 5, complex: true, gameMode:true},
          ]
        },
      ]
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.data}
          renderSectionHeader={({section}) => {
            return (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  {section.title}
                </Text>
              </View>
            )
          }}
          renderItem={({item}) => {
            return (
            <View style={styles.container}>
            {item.gameMode &&
            <TouchableOpacity onPress={() => {this.generateNumber(item.complex,item.size)}} style= {styles.touchable}>
                <Icon reverse name={item.icon} type={item.type}/>              
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <Text  style={styles.name}>{item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
            {!item.gameMode &&
              <TouchableOpacity onPress={() => {this.props.navigation.navigate(item.page)}} style= {styles.touchable}>
              <Icon reverse name={item.icon} type={item.type}/>              
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
            }
            </View>
            )
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    marginTop:20,
    padding:10,
  },
  touchable:{
    flexDirection:"row",
    width:"100%",
  },
  titleContainer:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"#DCDCDC",
    padding:10
  },
  title:{
    fontSize:25,
    color:"#000000"
  },
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 20,
    flex: 1,
    marginTop:20,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign:"center",
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center",
  },
});
