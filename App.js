import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store'

import React from 'react';
import { Platform, StatusBar, StyleSheet, View} from 'react-native';

import { Provider } from 'react-redux';
import { store } from './src/ProfileStore';
import Localisation from './Tools/Components/Localisation';
import SplashScreen from 'react-native-splash-screen';

export default class  App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      fontload:false
    }
  }
  async componentDidMount(){
    StatusBar.setBarStyle('light-content', true);
    console.log(StatusBar.barStyle);
    
    // await Font.loadAsync({
    //   'Cairo-Bold': require('./assets/Fonts/Cairo-Bold.ttf')
    // });
    
    // await Font.loadAsync({
    //   'Cairo-Regular': require('./assets/Fonts/Cairo-Regular.ttf')
    // });
    
    this.setState({fontload:true});
    // SplashScreen.hide();
    setTimeout(() => SplashScreen.hide() , 1000);
  }
  
  componentWillUnmount (){
    SecureStore.setItemAsync('initLogin','');
  }
  render(){ 
    return (
      <Provider store = {store}>
      <StatusBar barStyle="light-content" backgroundColor='black'/>
      <View style={styles.container}>
      
      {this.state.fontload&&(<Localisation props={this.props}/>)}
      
      
      {/* // <AppNavigation/> */}
      
      </View> 
      </Provider>
      
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });
  
  