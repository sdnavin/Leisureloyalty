import React from 'react';
import {  StyleSheet,Text, View,Dimensions,ImageBackground} from 'react-native';
import ProfileData from '../Tools/Components/ProfileData';

// import Gradient from 'react-native-css-gradient';
import homebg from'../assets/bg/bg-01.jpg'

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');


export default class HomeScreen extends React.Component {
  
  constructor(props){
    super(props);
  }
  
  render(){
    const gradient = 'linear-gradient(180deg, #d1d2d4 0%, #ffffff 30%)';
    return (
      <View style={styles.container}>
      <ImageBackground source={homebg} style={styles.bgImage}/>
      {/* <Text style={{paddingTop:50,fontSize:40}} onPress={()=>
      {
        var test=this.props.navigation.state.params.reload;
        test();
      }} >Reload</Text> */}
      {/* <Gradient gradient={gradient} style={styles.gradStyle}/> */}
      <ProfileData pagetogo="home" navigation={this.props.navigation} />
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
      backgroundColor: '#fff',
    }
  });
  
  
  