import React from 'react';
import {  StyleSheet, View,Dimensions,ImageBackground } from 'react-native';
import  ProfileData from '../Tools/Components/ProfileData.js';
// import Gradient from 'react-native-css-gradient';
import accountbg from'../assets/bg/bg-03.jpg'

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
export default class AccountScreen extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    const gradient = 'linear-gradient(180deg, #d1d2d4 0%, #ffffff 30%)';
    
    return (
      <View style={styles.container}>
      <ImageBackground source={accountbg} style={styles.bgImage}/>
      {/* <Gradient gradient={gradient} style={styles.gradStyle}/> */}
      <ProfileData pagetogo="account" navigation={this.props.navigation}/>
      </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    bgImage:{
      position:'absolute',
      alignSelf:'center',
      width:'100%',
      height:height,
      resizeMode:'contain'
    },
    gradStyle:{
      position:'absolute',
      width:width,
      height:height,
      zIndex:-1,
    },
    container: {
      flex: 1,
      // paddingTop:50,
      flexDirection: 'column',
      backgroundColor: '#fff',
    }
  });
  