import React from 'react';
import { StyleSheet, View,Dimensions,ImageBackground } from 'react-native';
import  ProfileData  from '../Tools/Components/ProfileData.js'
import cardbg from'../assets/bg/bg-02.jpg'

// import Gradient from 'react-native-css-gradient';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class CardScreen extends React.Component {
  
  constructor(props) {
    super(props);
  }
  render(){
    const gradient = 'linear-gradient(180deg, #d1d2d4 0%, #ffffff 30%)';
  return (
    <View style={styles.container}>
      <ImageBackground source={cardbg} style={styles.bgImage}/>

      {/* <Gradient gradient={gradient} style={styles.gradStyle}/> */}
      <ProfileData pagetogo="card" navigation={this.props.navigation}/>
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
    // flexDirection: 'column',
    // alignItems: 'stretch',
    backgroundColor: '#fff',
  }
  });