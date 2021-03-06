import React, {PureComponent} from 'react';
import {
    SafeAreaView,
    StyleSheet,Dimensions,Text
}from 'react-native';

// import { RNCamera } from 'react-native-camera';
import * as Tools from '../Components/Tools';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

import * as Permissions from 'expo-permissions';

import { BarCodeScanner as BScan } from 'expo-barcode-scanner';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Platform } from '@unimodules/core';

export default class BarcodeScanner extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            scanned: false,
        }
    }
    
    
    
    
    async componentDidMount() {
        Tools.updateRatePoints(2);
        this.getPermissionsAsync();
    }
    
    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' },()=>{console.log("hi"); this.forceUpdate()});
    };
    // componentDidMount(){
    //     Tools.updateRatePoints(2);
    // }
    
    
    render() {
        
        const { hasCameraPermission } = this.state;
        
        if (hasCameraPermission === null) {
          return <Text style={styles.heading} >Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text style={styles.heading}  >No access to camera</Text>;
        }
        
        return (
            <SafeAreaView style={{flex:1}}>
            {/* {(isActive)&& */}
            <BScan
            onBarCodeScanned={this.handleBarCodeScanned}
            style={[styles.preview,Platform.OS==='ios'?{}:{flex:1}]}
            />
            {/* // } */}
            {/* // <RNCamera
                // ref={cam => this.camera = cam}
                // style={this.props.style}
                // type={RNCamera.Constants.Type.back}
                // onBarCodeRead={this.onBarCodeRead}
                //   captureAudio={false}
            //   /> */}
            </SafeAreaView>
            )
        }
        handleBarCodeScanned = ({ type, data }) => {
            // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
            var onDone=this.props.onBarCodeScanGotData;
            onDone(data);
        };
        
        onBarCodeRead = (e) => {
            var onDone=this.props.onBarCodeScanGotData;
            onDone(e);
        }
        
    }
    
    const styles = StyleSheet.create({
        heading:{
            justifyContent:'center',
            textAlign:'center',
            fontSize:20,
            fontWeight:'300',
            color:'white',
            fontFamily:'Cairo-Regular',
        },
        container: {
            flex: 1,
            flexDirection: 'row',
        },
        preview: {
            width:width,
            height:heightPercentageToDP('25%'),
            // width:300,height:300,
            // width:width/1.1,
            // height:height/9
            // justifyContent: 'center',
            // alignItems: 'center'
        },
        cameraIcon: {
            margin: 5,
            height: 40,
            width: 40
        },
        bottomOverlay: {
            position: "absolute",
            width: "100%",
            flex: 20,
            flexDirection: "row",
            justifyContent: "space-between"
        },
    });
    