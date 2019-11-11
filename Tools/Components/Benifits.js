import React from 'react';
import { StyleSheet, View,Text,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {Slider} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';
export class Benifits extends React.Component {
  constructor(props) {
    super(props);
  };
  
  render(){
    return (
      <View style={Benifitsstyles.container}>
     
      <Text style ={Benifitsstyles.heading}>{i18n.t('yourqar')} {this.props.cardData.targetValue-this.props.cardData.value} {i18n.t('awayfrom')} {this.props.cardData.targetName}!</Text>
      <Slider 
      disabled={true}
      value={this.props.cardData.value/this.props.cardData.targetValue} 
      maximumTrackTintColor="#ADD8FF"
      minimumTrackTintColor="#0080f6"
      thumbTintColor='rgba(0,0,0,0)'/>
      <TouchableOpacity 
      onPress={()=>{this.props.navigation.navigate('Benifits',{otherParam:this.props.cardData.targetName+' '+i18n.t('benifits'), backParam: i18n.t('home')
    })}}>
      <Text style ={Benifitsstyles.explore}>{i18n.t('explore')} {this.props.cardData.targetName} {i18n.t('benifits')}!</Text></TouchableOpacity>
      </View>
      );
    }
  }
  
  
  // PropTypes
  Benifits.propTypes = {
    cardData: PropTypes.object.isRequired
  }
  
  
  const Benifitsstyles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    heading: {
      fontSize: 20,
      textAlign:'left'
    },
    explore: {
      fontSize: 20,
      fontWeight: "200",
      textAlign: "right"
    }
  });
  
  