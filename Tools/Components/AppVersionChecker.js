import React, { PureComponent } from 'react';
import { SafeAreaView, Text, Dimensions, StyleSheet,Linking,TouchableOpacity,Platform } from 'react-native';
const { width } = Dimensions.get('window');
import i18n from 'i18n-js';
import { getAppstoreAppVersion } from "react-native-appstore-version-checker";
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {connect} from 'react-redux';


  
class AppVersionChecker extends PureComponent {
    
    state = {
      needUpdate: false,
      canshow:false
    };
    
    componentDidMount() {
      // this.props.updateNetwork(true);
      setTimeout(()=>{
        this.setState({canshow:true});
        this.checkAppVersion();
      },1000)
      
    }
    
    CurrentiOSversion='1.0.2';
    CurrentAndroidversion='1.0.7';

    
    checkAppVersion(){
      if(Platform.OS==='ios'){
        //On IOS u can do
        getAppstoreAppVersion("1483032774") //put any apps id here
        .then(appVersion => {
          // console.log("iOS app version on appstore", appVersion);
          if(appVersion!==this.CurrentiOSversion){
            this.setState({needUpdate:true});
          }
        })
        .catch(err => {
          console.log("error occurred", err);
        });
      }else{
        // call https://play.google.com/store/apps/details?id=com.leisureloyalty
        getAppstoreAppVersion("com.leisureloyalty") //put any apps packageId here
        .then(appVersion => {
          // console.log("Android app version on playstore", appVersion);
          if(appVersion!==this.CurrentAndroidversion){
            this.setState({needUpdate:true});
          }
        })
        .catch(err => {
          console.log("error occurred", err);
        });
      }
    }
    
    render() {
      if (this.props.isConnected&&this.state.needUpdate&&this.state.canshow) {
        return (
          <SafeAreaView style={styles.offlineContainer}>
          <Text allowFontScaling={false} style={styles.offlineText}>{i18n.t('newupdate')}</Text>
          <TouchableOpacity 
          onPress={()=>{
            if(Platform.OS==='ios'){
              Linking.openURL('itms-apps://itunes.apple.com/app/apple-store/id1483032774?mt=8');
            }else{
              Linking.openURL('https://play.google.com/store/apps/details?id=com.leisureloyalty');
            }
            this.setState({needUpdate:false});
          }} style={styles.updateBut}><Text allowFontScaling={false} style={styles.updateText}>{i18n.t('update')}</Text></TouchableOpacity>
          </SafeAreaView>
          );
        }
        return null;
      }
    }
    const mapStateToProps = state=>{
      return {
          isConnected:state.profileReducer.isConnected,
      }                
  };
  
  const mapDispatchToProps = (dispatch) => {
      return{
      };
  }
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
      )(AppVersionChecker)
    
    const styles = StyleSheet.create({
      offlineContainer: {
        backgroundColor: '#b52424',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        bottom: 0,
        zIndex:10,
      },
      offlineText: { 
        color: '#fff',
        flex:0.8,
        fontFamily:'Cairo-Regular',
        fontSize:18,
        textAlign:'left',
        marginStart:widthPercentageToDP('4%')
        
      },
      updateBut:{
        backgroundColor: '#fff',
        borderRadius:10,
        flex:0.25,
        marginEnd:widthPercentageToDP('2%'),
        height:35,
        alignSelf:'center',
        justifyContent:'center',
      },
      updateText: { 
        color: '#b52424',
        fontFamily:'Cairo-Regular',
        justifyContent:'center',
        alignSelf:'center',
        fontSize:16,
      },
    });

    