import * as React from 'react';
import { Text, View, StyleSheet,Alert, TouchableOpacity,Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import i18n from 'i18n-js';

// import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeScanner from './BarcodeScanner';

import Colors from '../constants/Colors';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import TabBarIcon from './TabBarIcon';
import { SafeAreaView } from 'react-navigation';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
export default class BarcodeScan extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };
  
  constructor(props){
    super(props);

    this.handleBarCodeScanned=this.handleBarCodeScanned.bind(this);
  }
  
  // async componentDidMount() {
  //   this.getPermissionsAsync();
  // }
  
  // getPermissionsAsync = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({ hasCameraPermission: status === 'granted' });
  // };
  
  render() {
    // const { hasCameraPermission, scanned } = this.state;
    
    // if (hasCameraPermission === null) {
    //   return <Text>Requesting for camera permission</Text>;
    // }
    // if (hasCameraPermission === false) {
    //   return <Text>No access to camera</Text>;
    // }
    return (
      <SafeAreaView style={{ flex:1,marginTop:20}} >
      <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // height: heightPercentageToDP('30%') ,
        marginBottom:15
      }}>
      
      <BarcodeScanner
      navigation={this.props.navigation}
      onBarCodeScanGotData={this.handleBarCodeScanned}
      style={{flex:1,backgroundColor:'white'}}
      // style={StyleSheet.absoluteFillObject}
      />
      </View>
      <TouchableOpacity style={{  position:'absolute',
        bottom:heightPercentageToDP('2%'),
        alignSelf:'center',
        width:50,
        height:50,}} onPress={()=>this.handleBarCodeScanned(undefined)} >
      <TabBarIcon selectedColor={ Colors.whiteColor } 
        style={{alignSelf:'center'}}
        width={30}
        height={30}
        focused={true}
        name={'close'}/></TouchableOpacity>
      </SafeAreaView>
      );
    }
    
    handleBarCodeScanned( edata) {
      this.setState({ scanned: true });
      var assignValue  =   this.props.onScanDone;

      if(edata===undefined)
        assignValue('');
      else{  
      assignValue(edata);
      }
    }
  }
  