import React, { Component } from 'react';
import  { DatePickerIOS,View,Modal,Text,StyleSheet,Dimensions,TextInput,Image, TouchableOpacity,Alert,Keyboard,KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Platform,ImageBackground  } from 'react-native';
import i18n from 'i18n-js';
import * as UIElements from './UIElements'
import * as Tools from './Tools'
import homebg from'../../assets/bg/bg-01.jpg'
import regLogo from'../../assets/Icons/register.png'
import backIcon from'../../assets/Icons/back.png'
import { StackActions,NavigationActions } from 'react-navigation';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

import Colors from '../constants/Colors';
import Verfication from './Verification';

import WebServices from '../../Tools/constants/WebServices'
import OverlayLoad from './OverlayLoad'

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

import {AdaptiveWidth,AdaptiveHeight,AdaptiveOffsetHeight} from '../Components/AdaptiveSize';
import HeaderLogo from './HeaderLogo';

export default class PasswordCreator extends Component {
    
    static navigationOptions = ({navigation}) => {
        return{
            header:null,
            headerVisible:false,
            visible:false
        }
    };
    
    constructor(props){
        super(props);
        this.state={
            password:'',
            confirmpassword:'',
            showPass:false,
            showConfirmPass:false,
            passwordCreate:false,passfilled:false,
            isLoading:false
        }
        this.OnVerifyDone=this.OnVerifyDone.bind(this);
    }
    
    CreatePassword(){
        this.setState({isLoading:true});
        
        verifyurl=WebServices.CreatePass.replace('{MemberID}',this.props.dataGot.MemberID).replace('{Password}',this.state.password)
        return fetch (WebServices.MainURL+verifyurl,{
            method: 'POST',
        },5000)
        .then((response) => response.text())
        .then((responseJson) => {
            console.log(responseJson);
            dateGot=responseJson.replace('"','').replace('"','');
            console.log("J R :"+dateGot);
            
            if(!Tools.stringIsContains(dateGot,'error')){
                if(dateGot=="Success"){
                    var loginProfile=this.props.assignProfile;
                    loginProfile(JSON.stringify(this.props.dataGot),'','');
                    this.closeStack();
                }else{
                    Alert.alert('Failed','');
                }
                this.setState({isLoading:false})
            }else{
                Alert.alert('Error Sign Up',dateGot);
                this.setState({isLoading:false})
            }
        })
        .catch((error) =>{
            console.error(error);
        });
    }
    onloadEnd(){
        console.log('load done');
      }

    checkLoading(elements){
            return(<Modal animationType={'slide'}transparent = {false} visible={this.state.visible}>
                <View style={{flex:1}} >
                {elements}
                <OverlayLoad size='small' color={Colors.whiteColor} isopen={this.state.isLoading} onDismiss={this.onloadEnd} />
                </View></Modal>);
           
        }
        
                        togglePassword(){
                            this.setState({showPass:!this.state.showPass});
                        }
                        
                        render() {
                            return (this.checkLoading(
                                <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                                >
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View >
                                <ImageBackground source={homebg} style={styles.bgImage}/>
                                <ScrollView 
                                showsVerticalScrollIndicator = {false}
                                ref='_scrollView'
                                contentContainerStyle={styles.homeScrollView}
                                style={styles.homeView}>
                            <HeaderLogo headerTitle={i18n.t('setpass')} border={true}/>
                            {UIElements.drawGap(heightPercentageToDP('5%'))}
                                        <View style={styles.formInput} >
                                        {UIElements.drawGap(30)}
                                        <View style={styles.rowView}>
                                        <View style ={styles.inputView}>
                                        <TextInput allowFontScaling={false} style ={styles.inputValue}
                                        editable={true}
                                        value={this.state.password}
                                        secureTextEntry={!this.state.showPass}
                                        onChangeText={(text) => {this.checkPassword(text)}}
                                        returnKeyType='done'
                                        placeholder='Password'></TextInput>
                                        <View style={styles.passwordButView}>
                                        <Text allowFontScaling={false} style={[styles.passwordBut,]}
                                        onPress={()=>
                                            this.togglePassword()
                                        }>{(!this.state.showPass)?i18n.t('show'):i18n.t('hide')}</Text></View>
                                        </View>
                                        </View>
                                        {UIElements.drawGap(10)}
                                        {UIElements.drawLine(Colors.darkfontColor)}
                                        {UIElements.drawGap(10)}
                                        <View style={styles.rowView}>
                                        <View style ={styles.inputView}>
                                        <TextInput allowFontScaling={false} style ={styles.inputValue}
                                        editable={true}
                                        value={this.state.confirmpassword}
                                        secureTextEntry={!this.state.showConfirmPass}
                                        onChangeText={(text) => {this.checkConfirmPassword(text)}}
                                        returnKeyType='done'
                                        placeholder='Confirm Password'></TextInput>
                                        <View style={styles.passwordButView}>
                                        <Text allowFontScaling={false} style={[styles.passwordBut,]}
                                        onPress={()=>
                                            this.setState({showConfirmPass:!this.state.showConfirmPass})
                                        }>{(!this.state.showConfirmPass)?i18n.t('show'):i18n.t('hide')}</Text></View>
                                        </View>
                                        </View>
                                        
                                        {UIElements.drawGap(30)}
                                     
                                        
                                        <TouchableOpacity
                                        onPress={()=>this.setPassword()}
                                        style={[styles.buttonSign]}
                                        disabled={this.state.passfilled===false?true:false}>
                                        <Image source={regLogo} style={[styles.regImg,this.state.passfilled==false?{tintColor:Colors.inputboxColor}:{tintColor:Colors.whiteColor}]}/>
                                        <Text allowFontScaling={false} style={[styles.buttonReg,this.state.passfilled==false?{color:Colors.inputboxColor}:{color:Colors.whiteColor}]}>{i18n.t('setpass')}</Text>
                                        </TouchableOpacity>
                                        {UIElements.drawGap(65)}
                                        </View>
                                        </ScrollView>
                                        </View>
                                        
                                        </TouchableWithoutFeedback>
                                        </KeyboardAvoidingView>)
                                        )
                                    }
                                    
                                    OnBack(){
                                        this.closeStack(false);
                                    }
                                    
                                    closeStack = (onclose) =>{
                                        {
                                            var dismiss=this.props.onDismiss;
                                            dismiss(onclose);
                                            // this.setState({visible:false})
                                        }
                                    }
                                   
                                            checkPassword(text){
                                                this.setState({password:text});
                                            }
                                            checkConfirmPassword(text){
                                                this.setState({confirmpassword:text},()=>{
                                                    if(!Tools.stringIsEmpty(this.state.password)&&this.state.password===this.state.confirmpassword)
                                                    this.setState({passfilled:true});
                                                    else
                                                    this.setState({passfilled:false});
                                                });
                                                
                                            }
                                            setPassword(){
                                                this.CreatePassword();
                                            }
                                            
                                            OnVerifyDone(otpvalue,Vstate){
                                                this.VerifyOtpWS(otpvalue);
                                                this.setState({otpModal:false})
                                            }
                                            
                                            checkPassFilled(){
                                                if(this.state.passfilled){
                                                    return(
                                                        <Text allowFontScaling={false} style={styles.buttontext}>{i18n.t('setpass')}</Text>
                                                        );
                                                    }else{
                                                        return(
                                                            <Text allowFontScaling={false} style={styles.buttontext}>{i18n.t('setpass')}</Text>
                                                            );
                                                        }
                                                    }
                                                }
                                                        
                                                        const styles = StyleSheet.create({
                                                            loadingSty: {
                                                                position: 'absolute',
                                                                left: 0,
                                                                right: 0,
                                                                top: 0,
                                                                bottom: 0,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                backgroundColor:'#19191999',
                                                                zIndex:10,
                                                              },
                                                            
                                                            warning:{
                                                                color:Colors.warningColor,
                                                                marginTop:15,
                                                                width:300,
                                                                alignSelf:'center',
                                                                textAlign:'left',
                                                                // paddingBottom:15,
                                                                fontWeight:'bold',
                                                                // marginStart:-80,
                                                                fontFamily:'Cairo-Bold',
                                                                fontSize: 15,
                                                                lineHeight: 15* 1.6,
                                                                // borderWidth:1,
                                                            },
                                                            
                                                            genderview: {
                                                                flexDirection:'column',
                                                                flex:1,
                                                                // borderWidth:2,
                                                                alignContent:'center',
                                                                justifyContent:'center',
                                                            }
                                                            ,passwordBut:{
                                                                alignSelf:'flex-end',
                                                                textAlign:'right',
                                                                fontWeight: '100',
                                                                zIndex:1,
                                                                fontFamily:'Cairo-Regular',
                                                                color:Colors.whiteColor,
                                                                fontSize: 18,
                                                            },passwordButView:{
                                                                position:'absolute',
                                                                flex:1,
                                                                flexDirection:'row',
                                                                fontSize: 15,
                                                                height:40,
                                                                // height:45,
                                                                fontWeight: '400',
                                                                width:50,
                                                                // borderWidth:1,
                                                                transform:[{translateX:120}]
                                                            },
                                                            switchview:{
                                                                // flex:(Platform.OS==='ios'?(0.5):1),
                                                                flex:0.5,
                                                                // borderWidth:1,
                                                                justifyContent:'center',
                                                            },switch:{
                                                                alignSelf:'flex-end',
                                                            },
                                                            buttonSign:{
                                                                // flex:1,
                                                                width:120,
                                                                height:50,
                                                                alignSelf:'center',
                                                                alignItems:'center',
                                                                borderRadius:10,
                                                                justifyContent:'center'
                                                            },
                                                            buttontext:{
                                                                fontSize:16,
                                                                color:'white',
                                                                fontFamily:'Cairo-Regular',
                                                            },
                                                            buttonReg:{
                                                                fontSize:16,
                                                                // lineHeight:18,
                                                                // height:20,
                                                                color:'white',
                                                                fontFamily:'Cairo-Regular',
                                                                
                                                            },dateValue:{
                                                                fontSize: 16,
                                                                fontWeight:'bold',
                                                                width:'100%',
                                                                
                                                                // borderWidth:2,
                                                            },
                                                            inputView:{
                                                                flex:1,
                                                                // borderWidth:1,
                                                                flexDirection:'column',
                                                                alignContent:'center',
                                                                alignItems:'center',
                                                                alignSelf:'center',
                                                                
                                                                height:50,
                                                                
                                                                backgroundColor:Colors.inputboxColor,
                                                                borderRadius:10,
                                                                borderWidth:2,
                                                                borderColor:Colors.whiteColor,
                                                                
                                                                // alignItems:'flex-start',
                                                                // alignContent:'flex-start',
                                                            },inputIOS: {
                                                                fontSize: 16,
                                                                alignSelf:'flex-start',
                                                                // textAlign:'left',
                                                                fontWeight:'bold',
                                                                color: 'black',
                                                            },
                                                            inputAndroid: {
                                                                fontSize: 16,
                                                                alignSelf:'flex-start',
                                                                // textAlign:'left',
                                                                fontWeight:'bold',
                                                                color: 'black',
                                                            },
                                                            formInput:{
                                                                // flex:1,
                                                                // padding:10,
                                                                // position:'absolute',
                                                                // flex:1,
                                                                // alignSelf:'center',
                                                                // borderWidth:1,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                // transform:[{scaleX:1*AdaptiveHeight(810)},{scaleY:1*AdaptiveHeight(810)}],
                                                            },
                                                            inputValue: {
                                                                fontSize: 20,
                                                                textAlign:'left',
                                                                fontWeight:'200',
                                                                // height:50,
                                                                color: Colors.inputfontColor,
                                                                width:'100%',
                                                                // borderWidth:1,
                                                                // backgroundColor:Colors.inputboxColor,
                                                                // borderRadius:10,
                                                                // borderWidth:2,
                                                                // borderColor:Colors.whiteColor,
                                                                padding:10,
                                                                // marginStart:10,
                                                                // marginBottom:10,
                                                                
                                                                fontFamily:'Cairo-Regular',
                                                                fontSize: 20,
                                                            },
                                                            inputValueNo: {
                                                                fontSize: 20,
                                                                textAlign:'left',
                                                                fontWeight:'200',
                                                                // height:50,
                                                                color: Colors.inputfontColor,
                                                                width:'100%',
                                                                // borderWidth:1,
                                                                // backgroundColor:Colors.inputboxColor,
                                                                // borderRadius:10,
                                                                // borderWidth:2,
                                                                // borderColor:Colors.whiteColor,
                                                                padding:10,
                                                                // marginStart:10,
                                                                // marginBottom:10,
                                                                
                                                                fontFamily:'Cairo-Regular',
                                                                fontSize: 20,
                                                            },
                                                            mobileView:{
                                                                borderColor:Colors.whiteColor,
                                                                height:50, 
                                                                backgroundColor:Colors.inputboxColor,
                                                                borderRadius:10,
                                                                borderWidth:2,
                                                                // marginRight:10,
                                                                // marginLeft:-10,
                                                                alignItems:'center',
                                                                width:'22%',
                                                                justifyContent:'center'
                                                            },
                                                            inputConst: {
                                                                alignSelf:'center',
                                                                // paddingStart:5,
                                                                // paddingEnd:10,
                                                                paddingTop:4,
                                                                // marginStart:AdaptiveWidth(10),
                                                                textAlign:'center',
                                                                textAlignVertical:'center',
                                                                fontWeight: '100',
                                                                color:Colors.inputfontColor,
                                                                fontFamily:'Cairo-Regular',
                                                                fontSize: 20,
                                                                height:50, 
                                                            },
                                                            Ctitle:{
                                                                // width:150,
                                                                // fontSize: 18,
                                                                fontWeight: 'bold',
                                                                textAlign:'center',
                                                                marginTop:15,
                                                                marginBottom:15,
                                                                flex:1,
                                                                color:Colors.darkfontColor,
                                                                // height:  AdaptiveWidth(10), 
                                                                fontFamily:'Cairo-Bold',
                                                                fontSize: AdaptiveWidth(16),
                                                                lineHeight: AdaptiveWidth(16) * 1.4,
                                                                height: AdaptiveWidth(16)* 1.2, 
                                                            },
                                                            detailstitle:{
                                                                // width:150,
                                                                // fontSize: 18,
                                                                fontWeight: 'bold',
                                                                textAlign:'left',
                                                                marginTop:15,
                                                                marginBottom:15,
                                                                flex:0.5,
                                                                color:Colors.darkfontColor,
                                                                // height:  AdaptiveWidth(10), 
                                                                fontFamily:'Cairo-Bold',
                                                                fontSize: AdaptiveWidth(21),
                                                                lineHeight: AdaptiveWidth(21) * 1.4,
                                                                height: AdaptiveWidth(21)* 1.2, 
                                                            },
                                                            rowView:{
                                                                // // flex:1,
                                                                // marginLeft:10,
                                                                // marginRight:10,
                                                                width:'92%',
                                                                alignSelf:'center',
                                                                flexDirection:'row',
                                                            },cancelB:{
                                                                padding:10,
                                                                color:'#1d78cb',
                                                                fontSize:20,
                                                                fontWeight:'300',
                                                                textAlign:'left',
                                                                // borderWidth:1,
                                                                alignSelf:'flex-start',
                                                                fontFamily:'Cairo-Bold',
                                                                fontSize: AdaptiveWidth(18),
                                                                // lineHeight: AdaptiveWidth(18) * 1.6,
                                                                // height: AdaptiveWidth(18)* 1.3, 
                                                            },
                                                            inputtext:{
                                                                letterSpacing:width/4.5,
                                                                // fontSize: 20,
                                                                textAlign:'left',
                                                                fontWeight:'bold',
                                                                height:45,
                                                                color: 'black',
                                                                
                                                                fontFamily:'Cairo-Bold',
                                                                fontSize: AdaptiveWidth(18),
                                                                lineHeight: AdaptiveWidth(18) * 1.6,
                                                                height: AdaptiveWidth(18)* 1.3, 
                                                            },
                                                            heading: {
                                                                fontSize: 30,
                                                                fontWeight: 'bold',
                                                                paddingBottom:15,
                                                                alignSelf:'center'
                                                            },
                                                            
                                                            subheading: {
                                                                textAlign:'center',
                                                                fontWeight: 'bold',
                                                                paddingBottom:15,
                                                                color:Colors.darkfontColor,
                                                                
                                                                fontFamily:'Cairo-Bold',
                                                                fontSize: AdaptiveWidth(16),
                                                                lineHeight: AdaptiveWidth(16) * 1.6,
                                                                // height: AdaptiveWidth(16)* 1.3, 
                                                            },
                                                            boxcontainer: {
                                                                // backgroundColor: 'white',
                                                                // padding:10,
                                                                borderRadius:10,
                                                                borderWidth:1
                                                            },
                                                            homeScrollView: {
                                                                // padding:15,
                                                                
                                                            },homeView: {
                                                                // flex:1,
                                                            },bgImage:{
                                                                position:'absolute',
                                                                alignSelf:'center',
                                                                width:'100%',
                                                                height:height,
                                                                resizeMode:'contain'
                                                            },logoImg:{
                                                                alignSelf:'flex-start',
                                                                marginLeft:15,
                                                                width:70.2*(AdaptiveWidth(280)),
                                                                height:65.3*AdaptiveWidth(280),
                                                                // maxWidth:220,
                                                            },regImg:{
                                                                alignSelf:'center',
                                                                marginTop:20,
                                                                width:90,
                                                                height:90,
                                                                // maxWidth:220,
                                                            },backIcon:{
                                                                alignSelf:'center',
                                                                marginTop:20,
                                                                width:40,
                                                                height:40,
                                                                
                                                            }
                                                        });