import React, { Component } from 'react'
import {View,ScrollView,StyleSheet,Text,Image,ImageBackground,TextInput,TouchableOpacity} from 'react-native';
import * as UiElements from '../../Tools/Components/UIElements'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';
import Colors from '../../Tools/constants/Colors';
// import Voucher from '../../Tools/Components/Voucher';
// import vouchers from '../../Tools/constants/vouchers';
// import ButtonGroup from '../../Tools/Components/ButtonGroup';
// import RedeemVenue from './RedeemVenue';
import homebg1 from'../../assets/bg/bg-02.jpg'
import homebg2 from'../../assets/bg/bg-03.jpg'
import { NavigationEvents } from 'react-navigation';

import StatusTracker from '../../Tools/Components/StatusTracker';
import HeaderLogo from '../../Tools/Components/HeaderLogo';

import {Dimensions } from "react-native";
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BackButton from '../../Tools/Components/BackButton';

import * as Tools from '../../Tools/Components/Tools.js'


export default class RedeemVenu extends Component {
    
    _myScroll=ScrollView;
    
    constructor(props){
        super(props);
        this.state={
            loading:true,
            passcode:'',
            otpModal:false
        }
        this.OnVerifyDone=this.OnVerifyDone.bind(this);
        this.onNavigatorEvent=this.onNavigatorEvent.bind(this);

    }

    onNavigatorEvent() {
        console.info(this.props.profile.FirstName);
        if(this.props.profile===undefined||this.props.profile.FirstName===undefined){
            this.props.navigation.navigate('Home');
            }
        }
 
    componentDidMount(){
        Tools.updateRatePoints(1);
    }
    
    
    setLoadingState(stateP){
        this.setState({loading:stateP});
    }
    
    performActionWithTime(callback,params,timeTaken){
        setTimeout(() => {callback(params)},timeTaken);
    }
    
    
    getLoading(){
        return(
            <View>
            {UiElements.drawGap(10)}
            </View>
            )
        }
        
        
        
        render() {
            return (
                <View style={{flex:1}}>
                {/* <ImageBackground source={homebg} style={styles.bgImage}/> */}
                <ImageBackground source={this.props.navigation.state.params.pagefrom==='card'?homebg1:homebg2} style={styles.bgImage}/>
                
                {/* {UiElements.drawGap(40)} */}
                <HeaderLogo headerTitle={i18n.t('redeem')} border={true}/>
                <NavigationEvents
                onDidFocus={this.onNavigatorEvent}
                />
                {UiElements.drawGap(15)}
                <View  style={styles.redeemView}>
                <StatusTracker selected={2}/>
                {UiElements.drawGap(15)}
                <Text allowFontScaling={false} style={[styles.RedeemTitle]}>{i18n.t('venuepasscode')}</Text>
                <Text allowFontScaling={false} style={styles.RedeemPoint}>{i18n.t('venueoperatorpass')}</Text>
                {UiElements.drawGap(15)}
                
                <View style={{alignSelf:'center'}}>
                <TextInput  allowFontScaling ={false}
                onChangeText={(text)=>{this.setState({passcode:text})}}
                style={styles.inputValue}
                placeholder="Enter Passcode here"
                keyboardType='number-pad'
                secureTextEntry={true}
                returnKeyType='done'/>
                {UiElements.drawGap(15)}
                <TouchableOpacity style={styles.Button} onPress={()=>{this.onSubmitPass()}}>
                <Text style={styles.buttontext} >{i18n.t('submit')}</Text>
                </TouchableOpacity>
                {/* {this.state.otpModal&&(<er onDone={this.OnVerifyDone}/>)} */}
                </View>
                </View>
                <BackButton  onpress={()=>{this.props.navigation.goBack();}}/>
                {/* <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                <Image source={backIcon} style={styles.backbut} ></Image>
            </TouchableOpacity> */}
            </View>
            )
        }
        
        onSubmitPass(){
            var redeemPoint= this.props.navigation.state.params.redeemPoint;
            redeemPoint(this.props.navigation.state.params.selectedVoucher.Id,this.state.passcode);
            // this.setState({otpModal:true});
        }
        
        OnVerifyDone(Vstate){
            this.setState({otpModal:false});
            if(Vstate){
                console.info(this.props.navigation.state.params.assignProfile);
                assignProfile=this.props.navigation.state.params.assignProfile;
                updateprofile("user","","");
                this.props.navigation.navigate('Home');
            }
        }
        
    }
    
    
    const styles = StyleSheet.create({
        redeemView:{
            justifyContent:'center',
            // transform:[{scaleX:1*AdaptiveHeight(810)},{scaleY:1*AdaptiveHeight(810)}],
        },
        inputValue: {
            fontSize: 20,
            textAlign:'left',
            fontWeight:'200',
            height:60,
            color: Colors.inputfontColor,
            width:320,
            // borderWidth:1,
            backgroundColor:Colors.inputboxColor,
            borderRadius:10,
            borderWidth:2,
            borderColor:Colors.whiteColor,
            padding:10,
            // marginStart:10,
            marginBottom:10,
            fontFamily:'Cairo-Regular',
        },
        Button:{
            // flex:1,
            width:200,
            height:40,
            alignSelf:'center',
            alignItems:'center',
            backgroundColor:Colors.backgroudColor,
            borderRadius:10,borderWidth:2,borderColor:Colors.whiteColor,
            justifyContent:'center'
        },
        buttontext:{
            fontSize:20,
            color:'white',
            fontFamily:'Cairo-Regular',
            alignSelf:'center'
        },
        RedeemTitle:{
            fontWeight:'200',
            fontSize:35,
            fontFamily:'Cairo-Regular',
            color:Colors.violetColor,
            textAlign:'center',
            height:35*1.1,
            lineHeight:35*1.3,
            textAlignVertical:'center'
        },
        RedeemPoint:{
            fontWeight:'100',
            fontSize:18,
            fontFamily:'Cairo-Regular',
            color:Colors.whiteColor,
            textAlign:'center',
        },
        
        backIcon:{
            alignSelf:'center',
            marginTop:20,
            width:50,
            height:50,
        },
        
        backbut:{
            position:'absolute',
            alignSelf:'center',
            width:50,
            height:50,
            // bottom:hp('36%'),
            bottom:hp('3%'),
            zIndex:2,
        },
        
        bgImage:{
            position:'absolute',
            alignSelf:'center',
            width:'100%',
            height:height,
            resizeMode:'contain'
        },
        homeScrollView: {
            // padding:15,
            
        },homeView: {
            // flex:1,
            justifyContent:'center'
        },
        view1: {
            // margin: 10,
            // width: width - 40,
            // height: height-250,
            borderRadius: 10,
            paddingTop:20,
            paddingBottom:20,
            height:height*0.55
        },
        
        gradStyle:{
            position:'absolute',
            width:width,
            height:height,
            zIndex:-1,
            // borderRadius:15,
        },
        heading: {
            textAlign:'left',
            fontSize: 40,
            fontWeight: 'bold',
            fontFamily:'Cairo-Bold'
            
        },
    });
    