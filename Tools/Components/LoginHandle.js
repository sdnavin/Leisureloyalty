import React, { Component,useEffect } from 'react';
import  { View,Text,StyleSheet,Dimensions,TextInput,Modal, TouchableOpacity,Image,ScrollView,Linking,Animated,ImageBackground} from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
import { StackActions,NavigationActions, SafeAreaView } from 'react-navigation';
// import * as LocalAuthentication from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store';
import * as tools from '../../Tools/Components/Tools.js';
import PasswordCreator from '../../Tools/Components/PasswordCreator.js';
import appLogo from '../../assets/Icons/leisure_white.png'
// import faceLogo from '../../assets/facid.png'
import homebg from'../../assets/bg/bg-01.jpg'
import backIcon from'../../assets/Icons/back.png'

import colors from '../../Tools/constants/Colors';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

import i18n from 'i18n-js';
import Verfication from './Verification.js';
import {AdaptiveWidth,AdaptiveHeight} from '../Components/AdaptiveSize';
import Colors from '../../Tools/constants/Colors';
import HeaderLogo from './HeaderLogo.js';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import WebServices from '../constants/WebServices.js';
import ProfileData from './ProfileData.js';
import OverlayLoad from './OverlayLoad.js';


export default class LoginHandle extends Component {
    scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView
    
    constructor(props){
        super(props);
        this.state={
            visible:false,
            profileID:'',
            checkpass:false,
            checkuser:false,
            signPassword:"",
            mobileNo:"",
            email:"",
            signinMethod:1,
            countrycode:'QA',
            canSignIn:true,
            showPass:false,
            alreadyMember:true,
            pageState:1,
            otpModal:false,
            showPassModal:false
        }
        this.OnVerifyDone=this.OnVerifyDone.bind(this);
        this.OnDismissPass=this.OnDismissPass.bind(this);
    }
    
    
    countryCodes=[
        {
            label: '+974',
            value: 'QA',
        }
    ];
    onloadEnd(){
        // this.closeStack();
        
    }
    
    // useEffect(() => {
    //     console.log("prop1 has changed");
    //   }, [prop1]);
    //   useEffect(() => {
    //     console.log("prop2 has changed");
    //   }, [prop2]);
    
    static getDerivedStateFromProps(props, cstate) {
        // console.log(props.loginOpen+"P-"+props.pagetogo);


        if(props.showOtpprop!==cstate.otpModal){
            return {
                otpModal: props.showOtpprop
            };
        }
        if (props.loginOpen===false) {
            if(cstate.visible!==props.loginOpen){
                if(this.props.onDismiss!==undefined){
                    var dismiss=this.props.onDismiss;
                    if(dismiss!==undefined){
                        dismiss();
                    }
                }
            }
            return {
                visible: props.loginOpen
            };
        }else{
            return {
                visible: props.loginOpen
            };
        }
        return null;
    }
    
    checkLoading(elements){
        return(<Modal animationType={'slide'}transparent = {false} visible={this.state.visible} onRequestClose={ this.closeStack}> 
        <View style={{flex:1}} >
        {elements}
        <OverlayLoad size='small' color={Colors.whiteColor} isopen={this.props.isLoading} onDismiss={this.onloadEnd} />
        </View></Modal>);
        
    }
    drawGap=(valueGap)=>{
        return(
            <View
            style={{paddingTop:valueGap}}/>
            );
        }
        checkNumber(){
            dataReturn=[];
            if(this.state.checkuser&&this.state.mobileNo.length<=0&&this.state.signinMethod==1){
                dataReturn.push(
                    <Text key='0'  allowFontScaling ={false} style={styles.warning}>{i18n.t('pleaseentermobilenumber')}</Text>
                    );
                }
                return dataReturn;
            }
            checkEmail(){
                dataReturn=[];
                if(this.state.checkuser&&this.state.email.length<=0&&this.state.signinMethod==2){
                    dataReturn.push(
                        <Text key='0'  allowFontScaling ={false} style={styles.warning}>{i18n.t('pleaseenteremail')}</Text>
                        );
                        return dataReturn;
                    }
                }
                checkPassword(){
                    dataReturn=[];
                    if(this.state.checkpass&&this.state.signPassword.length===0){
                        dataReturn.push(
                            <Text key='0'   allowFontScaling ={false} style={styles.warning}>{i18n.t('pleaseenterpass')}</Text>
                            );
                        }
                        return dataReturn;
                    }
                    
                    checkOnContinue(text){
                        this.setState({checkuser:text.length>0?false:true});
                    }
                    
                    checkOnNumberContinue(text){
                        
                        let newText = '';
                        let numbers = '0123456789.';
                        
                        for (var i=0; i < text.length; i++) {
                            if(numbers.indexOf(text[i]) > -1 ) {
                                newText = newText + text[i];
                                if(text[i]=="."){
                                    numbers = '0123456789'
                                }
                            }
                            else {
                                // your call back function
                                alert("Please enter numbers only");
                            }
                        }
                        this.setState({checkuser:text.length>0?false:true});
                    }
                    
                    checkMemberAvail(text){
                        this.setState({
                            profileID:text
                        });
                    }
                    togglePassword(){
                        this.setState({showPass:!this.state.showPass});
                    }
                    checkArabic(){
                        if(tools.stringIsContains(i18n.locale,'ar'))
                        return {right:width*0.7};
                        else
                        return {marginLeft:width/1.55};
                    }
                    passCodeEnter(){
                        if(this.state.pageState===1)
                        return(<View>
                            
                            <View style= {[styles.rowView,{width:width,justifyContent:'center'}]}>
                            <View style={styles.inputTextView} >
                            
                            <TextInput  allowFontScaling ={false}
                            onChangeText={(text)=>{this.setState({signPassword:text})}}
                            style={[styles.inputtext,{flex:0.9,width:widthPercentageToDP('90%'),}]}
                            placeholder="Password"
                            keyboardType='default'
                            // autoFocus={true}
                            secureTextEntry={!this.state.showPass}
                            returnKeyType='done'/></View>
                            <View style={styles.passwordButView}>
                            <Text  allowFontScaling ={false} style={[styles.passwordBut,]}
                            onPress={()=>
                                this.togglePassword()
                            }>{(!this.state.showPass)?i18n.t('show'):i18n.t('hide')}</Text></View>
                            </View>
                            {this.checkPassword()}
                            {/* {this.drawGap(10)} */}
                            </View>
                            );
                        }
                        
                        
                        //siginwithotp
                        signinwithOTP(){
                            if(this.state.profileID.length>0){
                                var sendOTP = this.props.sendOTP;
                                sendOTP(this.state.profileID);
                                // this.setState({otpModal:true});
                            }else{
                                this.setState({checkuser:true})
                            }
                            // this.setState({otpModal:true});
                        }
                        
                        pagetoCome(){
                            alllines=[];
                            switch(this.state.pageState){
                                case 1:
                                if(this.state.signinMethod===1){
                                    alllines.push( <View key={0}>
                                        {/* <TouchableOpacity style={styles.buttonB}
                                        onPress={()=>{this.checkOnContinue(this.state.mobileNo)
                                            this.checkMemberAvail(this.state.mobileNo)}}>
                                            <Gradient gradient={colors.gradientBut} style={styles.buttonB}>
                                            <Text  allowFontScaling ={false} style={styles.buttontxt}>{i18n.t('continue')}</Text>
                                            </Gradient>
                                        </TouchableOpacity> */}
                                        {/* {this.drawGap(heightPercentageToDP('2%'))} */}
                                        <TouchableOpacity
                                        onPress={()=>{this.refs.scrollSignin.scrollTo({x:width,y:0,animated:true})
                                        this.changeState('signinMethod',0)
                                        this.changeState('checkuser',false)}}>
                                        <Text  allowFontScaling ={false} style={styles.alttxt}>{i18n.t('useemail')}</Text>
                                        </TouchableOpacity>
                                        </View>)
                                    }else{
                                        alllines.push(<View key={1}>
                                            
                                            {/* <TouchableOpacity style={styles.buttonB}
                                            onPress={()=>{this.checkOnContinue(this.state.email)
                                                this.checkMemberAvail(this.state.email)}}>
                                                <Gradient gradient={colors.gradientBut} style={styles.buttonB}>
                                                <Text  allowFontScaling ={false} style={styles.buttontxt}>{i18n.t('continue')}</Text></Gradient>
                                            </TouchableOpacity> */}
                                            {/* {this.drawGap(20)} */}
                                            {/* {this.drawGap(heightPercentageToDP('2%'))} */}
                                            <TouchableOpacity
                                            onPress={()=>{this.refs.scrollSignin.scrollTo({x:0,y:0,animated:true})
                                            this.changeState('signinMethod',1)
                                            this.changeState('checkuser',false)}}>
                                            <Text  allowFontScaling ={false} style={styles.alttxt}>{i18n.t('usemobile')}</Text>
                                            </TouchableOpacity>
                                            </View>
                                            );
                                        }
                                        
                                        return(<View>
                                            
                                            <TouchableOpacity style={styles.buttonB}
                                            onPress={()=>{
                                                this.setState({checkuser:true,checkpass:true})
                                                this.signinProfile()}}>
                                                {/* <Gradient gradient={colors.gradientBut} style={styles.buttonB}> */}
                                                <Text  allowFontScaling ={false} style={styles.buttontxt}>{i18n.t('signin')}</Text>
                                                {/* </Gradient> */}
                                                </TouchableOpacity>
                                                {this.drawGap(10)}
                                                {this.state.signinMethod===1&&(<Text  allowFontScaling ={false} style={styles.alttxt}>{i18n.t('or')}</Text>)}
                                                {this.drawGap(10)}
                                                {this.state.signinMethod===1&&(<TouchableOpacity style={styles.buttonB}
                                                    onPress={()=>{this.signinwithOTP()}}>
                                                    {/* <Gradient gradient={colors.gradientBut} style={styles.buttonB}> */}
                                                    <Text  allowFontScaling ={false} style={styles.buttontxt}>{i18n.t('signotp')}</Text>
                                                    {/* </Gradient> */}
                                                    </TouchableOpacity>)}
                                                    {this.state.otpModal&&(<Verfication title={i18n.t('otpverification')}  onDone={this.OnVerifyDone}/>)}
                                                    {this.props.setpassmodal!==undefined&&(<PasswordCreator dataGot={this.props.setpassmodal} assignProfile={this.props.assignProfile}  onDismiss={this.OnDismissPass}/>)}
                                                    {this.drawGap(10)}
                                                    {alllines}
                                                    {this.drawGap(10)}
                                                    <TouchableOpacity onPress={()=> Linking.openURL(WebServices.resetPass)}>
                                                    <Text  allowFontScaling ={false} style={styles.alttxt}>{i18n.t('forgetpass')}</Text></TouchableOpacity>
                                                    </View>
                                                    );
                                                }
                                            }

                                            OnDismissPass(closestack){
                                                if(closestack){
                                                    this.closeStack();
                                                }
                                            }
                                            OnVerifyDone(otp,Vstate){
                                                if(otp.length>0&&Vstate){
                                                    var verifyOTP=this.props.verifyOTP;
                                                    verifyOTP(this.state.profileID,otp);
                                                    // this.setState({otpModal:false});


                                                    // this.closeStack();
                                                }else{
                                                    // this.setState({otpModal:false});
                                                    var closeOTP=this.props.closeOtpModal;
                                                    closeOTP();
                                                }
                                            }
                                            
                                            signinProfile(){
                                                if(this.state.signPassword.length>0){
                                                    // this.closeStack();
                                                    var handleToUpdate  =  this.props.assignProfile;
                                                    handleToUpdate(this.state.profileID,this.state.signPassword,this.state.signinMethod);
                                                }
                                            }
                                            
                                            signinProfilewithBio( user, pass,smethod){
                                                // console.log('use Bio');
                                                if(pass.length>0){
                                                    var handleToUpdate  =  this.props.assignProfile;
                                                    handleToUpdate(user,pass,smethod);
                                                    // this.closeStack();
                                                }
                                            }
                                            
                                            signinBiometric(){
                                                /*LocalAuthentication.hasHardwareAsync().then(success => {
                                                    LocalAuthentication.supportedAuthenticationTypesAsync().then(types=>{
                                                        console.log("Types :"+types.length);
                                                        
                                                        LocalAuthentication.isEnrolledAsync().then(success=>{
                                                            console.log("Save bio :"+success);
                                                            
                                                            // The device supports touchid/faceid
                                                            // Get the stored credential
                                                            SecureStore.getItemAsync('userID').then(savedCredential => {
                                                                console.log("Save :"+savedCredential);
                                                                
                                                                if (savedCredential) 
                                                                {
                                                                    // If we already stored it
                                                                    LocalAuthentication.authenticateAsync(
                                                                        "Access to login"
                                                                        ).then(success => {
                                                                            if (success.success === true) {
                                                                                // Call the backend API to authenticate using the stored username+password
                                                                                this.signinProfilewithBio(savedCredential,"","");
                                                                            }
                                                                        }).catch(error => {
                                                                            console.log(error);
                                                                        });
                                                                    } else {
                                                                        // Fallback to normal login so the user inputs the credential
                                                                        console.log("Fallback");
                                                                    }
                                                                }).catch(error => {
                                                                    console.log(error);
                                                                });
                                                            }).catch(error => {
                                                                console.log(error);
                                                            });
                                                        }).catch(error => {
                                                            console.log(error);
                                                        });
                                                    }).catch(error => {
                                                        console.log(error);
                                                    });*/
                                                }
                                                
                                                
                                                
                                                getInputMethod(){
                                                    const elements=[0,1];
                                                    // let position = Animated.divide(this.scrollX, width);
                                                    return(
                                                        <View style={{flex:1}}>
                                                        {/* // <View> style={{flex:heightPercentageToDP('.1%'),borderWidth:2}}> */}
                                                        <ScrollView style={styles.scrolltabs}
                                                        ref='scrollSignin'
                                                        horizontal={true}
                                                        pagingEnabled={true} // animates ScrollView to nearest multiple of it's own width
                                                        showsHorizontalScrollIndicator={false}
                                                        // keyboardShouldPersistTaps='never'
                                                        // onScrollBeginDrag={()=>{Keyboard.dismiss()}}
                                                        // onScrollEndDrag={()=>{Keyboard.dismiss()}}
                                                        scrollEnabled={false}
                                                        // onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
                                                        //     [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
                                                        //   )} 
                                                        scrollEventThrottle={16} 
                                                        >
                                                        <View style={styles.scrolltab}>
                                                        <Text  allowFontScaling ={false} style={styles.subheading}>{i18n.t('entermobileno')}</Text>
                                                        {this.drawGap(15)} 
                                                        <View style={[styles.rowView,{width:width,justifyContent:'center'}]}>
                                                        {tools.stringIsContains(i18n.locale,'en')&&(
                                                            <View style={[styles.inputContainer,{marginEnd:10}]}> 
                                                            <Text allowFontScaling={false} style={styles.inputCode}>{'+974'}</Text>
                                                            </View>)}
                                                            
                                                            <View style={[styles.inputTextView,{flex:0.7}]} >
                                                            
                                                            <TextInput  allowFontScaling ={false} style={styles.inputtext}
                                                            onChangeText={(text)=>{this.checkOnNumberContinue(text)
                                                                this.checkMemberAvail(text)
                                                                this.changeState('mobileNo',text)}}
                                                                placeholder="Mobile number"
                                                                keyboardType='phone-pad' maxLength={8}
                                                                returnKeyType='done'></TextInput></View>
                                                                
                                                                {tools.stringIsContains(i18n.locale,'ar')&&(
                                                                    <View style={[styles.inputContainer,{marginStart:10}]}> 
                                                                    <Text allowFontScaling={false} style={styles.inputCode}>{'+974'}</Text>
                                                                    </View>)}
                                                                    
                                                                    </View>
                                                                    {this.checkNumber()}
                                                                    {this.drawGap(10)}
                                                                    {this.passCodeEnter()}
                                                                    {/* {this.pagetoCome()} */}
                                                                    {/* {this.drawGap(15)} */}
                                                                    </View>
                                                                    <View style={styles.scrolltab}>
                                                                    <Text  allowFontScaling ={false} style={styles.subheading}>{i18n.t('enteremail')}</Text> 
                                                                    {this.drawGap(15)} 
                                                                    <View style={ [styles.rowView,{width:width,justifyContent:'center'}]}>
                                                                    <View style={styles.inputTextView} >
                                                                    <TextInput allowFontScaling ={false} 
                                                                    onChangeText={(text)=>{this.checkOnContinue(text)
                                                                        this.checkMemberAvail(text)
                                                                        this.changeState('email',text)}}
                                                                        style={[styles.inputtext,{flex:0.9,width:widthPercentageToDP('90%'),marginStart:0}]}
                                                                        placeholder="Email"
                                                                        keyboardType='email-address'
                                                                        returnKeyType='done'></TextInput></View>
                                                                        </View>
                                                                        {this.checkEmail()}
                                                                        {this.drawGap(10)}
                                                                        {this.passCodeEnter()}
                                                                        {/* {this.pagetoCome()} */}
                                                                        {this.drawGap(heightPercentageToDP('5%'))}
                                                                        </View>
                                                                        </ScrollView>
                                                                        
                                                                        {this.pagetoCome()}
                                                                        </View>
                                                                        );
                                                                        
                                                                    }
                                                                    
                                                                    // getBiometric(){
                                                                    //     return(<View>
                                                                    //         <TouchableOpacity style ={styles.touchid}
                                                                    //         onPress={()=>this.signinBiometric()}>
                                                                    //         <Image source={faceLogo} style={{height: 80, width: 80,alignSelf:'center'}}  ></Image>
                                                                    //         {/* <Text style={styles.buttontxt}>
                                                                    //         {i18n.t('touchfaceid')}
                                                                //     </Text> */}
                                                                //     </TouchableOpacity>
                                                                //     </View>);
                                                                // }
                                                                
                                                                checkBiometric(){
                                                                    SecureStore.getItemAsync('useBiometric').then(useBiometric=>{
                                                                        if(useBiometric==='Y')
                                                                        this.signinBiometric();
                                                                    }).catch(error => {
                                                                        console.log(error);
                                                                    });
                                                                }
                                                                
                                                                
                                                                changeState(statename,valueMethod){
                                                                    this.setState({[statename]:valueMethod});
                                                                }
                                                                render() {
                                                                    
                                                                    return (
                                                                        this.checkLoading(
                                                                            <SafeAreaView style={styles.homeView}>
                                                                            <ImageBackground source={homebg} style={styles.bgImage}/>
                                                                            {/* <StatusBar backgroundColor='blue' barStyle="dark-content"/> */}
                                                                            {/* <Gradient gradient={colors.gradient} style={styles.gradStyle}/> */}
                                                                            {/* <TouchableOpacity
                                                                            onPress={()=>{this.closeStack()}}><Text allowFontScaling={false} style={styles.cancelB}>{i18n.t('cancel')}</Text></TouchableOpacity> */}
                                                                            {/* <Text style={styles.heading}> {i18n.t('trimoo')} </Text> */}
                                                                            {/* <Image source={appLogo} style={styles.logoImg}/>
                                                                        <View style={styles.titleView}><Text allowFontScaling={false} style={styles.titleTxt}>Login</Text></View> */}
                                                                        {/* {this.drawGap(AdaptiveHeight(25))} */}
                                                                        <HeaderLogo headerTitle={i18n.t('login')} border={true}/>
                                                                        <SafeAreaView style={styles.boxcontainer}>
                                                                        {this.getInputMethod()}
                                                                        {this.drawGap(10)}
                                                                        {/* {this.getBiometric()} */}
                                                                        {/* {this.drawGap(10)} */}
                                                                        <TouchableOpacity
                                                                        onPress={()=>
                                                                            this.setState({showRegister:true})
                                                                            //     this.props.navigation.navigate('Register',{
                                                                            //     pagefrom:'login',
                                                                            //     assignProfile:this.props.assignProfile,
                                                                            // })
                                                                        }>
                                                                        <Text allowFontScaling ={false} style={[styles.alttxt,{
                                                                            fontSize: 18}]}>{i18n.t('newuser')}</Text>
                                                                            </TouchableOpacity>
                                                                            {/* {this.drawGap(10)} */}
                                                                            <TouchableOpacity onPress={()=>{this.closeStack()}}><Image source={backIcon} style={styles.backIcon}/></TouchableOpacity>
                                                                            </SafeAreaView>
                                                                            {/* <Image source={graph1} style={styles.graph1}/> */}
                                                                            {this.state.showRegister&&(<ProfileData pagetogo='register' pagefrom='login' navigation={this.props.navigation} onDismiss={()=>this.setState({showRegister:false})} />)}
                                                                            </SafeAreaView>
                                                                            )
                                                                            )
                                                                        }
                                                                        
                                                                        closeStack = () =>{
                                                                            {
                                                                                
                                                                                this.setState({visible:false},
                                                                                    ()=>{
                                                                                        var dismiss=this.props.onDismiss;
                                                                                        if(dismiss!==undefined){
                                                                                            dismiss();
                                                                                        }
                                                                                    })
                                                                                    // const navigateAction = StackActions.reset({
                                                                                    //     index: 0,
                                                                                    //     key: null,
                                                                                    //     actions: [NavigationActions.navigate({ routeName:'Main'})]
                                                                                    // })
                                                                                    // this.props.navigation.dispatch(navigateAction)
                                                                                }
                                                                            }
                                                                        }
                                                                        
                                                                        const styles = StyleSheet.create({
                                                                            // wholeContainer:{
                                                                            //     // transform:[{scaleX:1*AdaptiveHeight(810)},{scaleY:1*AdaptiveHeight(810)}],
                                                                            // },
                                                                            backIcon:{
                                                                                alignSelf:'center',
                                                                                marginTop:20,
                                                                                width:30,
                                                                                height:30,
                                                                                transform:[{rotateZ:'-90deg'}]
                                                                            },
                                                                            
                                                                            bgImage:{
                                                                                position:'absolute',
                                                                                alignSelf:'center',
                                                                                width:'100%',
                                                                                height:height,
                                                                                resizeMode:'contain'
                                                                            },
                                                                            touchid:{
                                                                                flex:1,
                                                                                // alignContent:'center',
                                                                                // justifyContent:'center',
                                                                                width:width,
                                                                            },
                                                                            scrolltab:{
                                                                                flex:1,
                                                                                // height:heightPercentageToDP('30%'),
                                                                                width:width,
                                                                                // borderWidth:1,
                                                                            },
                                                                            scrolltabs:{
                                                                                flex:2,
                                                                                flexDirection:'row',
                                                                                // alignContent:'space-between'
                                                                            },
                                                                            gradStyle:{
                                                                                position:'absolute',
                                                                                width:width,
                                                                                height:height,
                                                                                zIndex:-1,
                                                                            },
                                                                            warning:{
                                                                                color:Colors.warningColor,
                                                                                marginTop:15,
                                                                                width:widthPercentageToDP('90%'),
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
                                                                            rowView:{
                                                                                flexDirection:'row',
                                                                                // justifyContent:'space-evenly'
                                                                            },cancelB:{
                                                                                width:width,
                                                                                padding:10,
                                                                                color:'#1d78cb',
                                                                                fontWeight:'300',
                                                                                textAlign:'right',
                                                                                color:colors.darkfontColor,
                                                                                fontFamily:'Cairo-Regular',
                                                                                fontSize: 20,
                                                                            },
                                                                            buttonB:{
                                                                                // flex:1,
                                                                                width:widthPercentageToDP('90%'),
                                                                                height:50,
                                                                                alignSelf:'center',
                                                                                alignItems:'center',
                                                                                backgroundColor:'transparent',
                                                                                borderRadius:10,
                                                                                borderWidth:2,
                                                                                borderColor:Colors.whiteColor,
                                                                                justifyContent:'center'
                                                                            },buttontxt:{
                                                                                alignSelf:'center',
                                                                                color:'white',
                                                                                fontSize:20,
                                                                                // paddingTop:15,
                                                                                fontWeight:'bold',
                                                                                
                                                                                fontFamily:'Cairo-Bold',
                                                                                fontSize: 20,
                                                                                // lineHeight: AdaptiveWidth(18) * 1.6,
                                                                                // height: AdaptiveWidth(18)* 1.3,
                                                                            },alttxt:{
                                                                                alignSelf:'center',
                                                                                color:colors.blueHardColor,
                                                                                fontSize:15,
                                                                                fontWeight:'400',
                                                                                fontFamily:'Cairo-Regular',
                                                                                fontSize: 15,
                                                                            },
                                                                            inputTextView:{
                                                                                height:50,
                                                                                // width:widthPercentageToDP('75%'),
                                                                                // flex:0.9,
                                                                                // borderWidth:1,
                                                                                backgroundColor:colors.inputboxColor,
                                                                                borderRadius:10,
                                                                                borderWidth:2,
                                                                                borderColor:colors.whiteColor,
                                                                                // padding:10,
                                                                                // marginStart:10,
                                                                            },
                                                                            inputtext:{
                                                                                fontSize: 20,
                                                                                // lineHeight:50,
                                                                                // height:50,
                                                                                textAlign:'left',
                                                                                fontWeight:'200',
                                                                                color: colors.inputfontColor,
                                                                                // width:widthPercentageToDP('75%'),
                                                                                // flex:1,
                                                                                // borderWidth:1,
                                                                                // backgroundColor:colors.inputboxColor,
                                                                                // borderRadius:10,
                                                                                // borderWidth:2,
                                                                                // borderColor:colors.whiteColor,
                                                                                padding:10,
                                                                                // marginStart:10,
                                                                                fontFamily:'Cairo-Regular',
                                                                                
                                                                            },
                                                                            inputContainer:{
                                                                                backgroundColor:colors.inputboxColor,
                                                                                tintColor:colors.inputboxColor,
                                                                                color:colors.inputboxColor,
                                                                                borderRadius:10,
                                                                                borderWidth:2,
                                                                                borderColor:colors.whiteColor,
                                                                                height:50,
                                                                                flex:0.2,
                                                                                justifyContent:'center'
                                                                            },
                                                                            inputCode: {
                                                                                textAlign:'left',
                                                                                fontWeight:'200',
                                                                                color: colors.inputfontColor,
                                                                                // width:200,
                                                                                // padding:10,
                                                                                // marginStart:10,
                                                                                alignSelf:'center',
                                                                                fontFamily:'Cairo-Regular',
                                                                                fontSize: 22,
                                                                            },
                                                                            // inputIOSContainer:{
                                                                            //     backgroundColor:colors.inputboxColor,
                                                                            //     borderRadius:10,
                                                                            //     borderWidth:2,
                                                                            //     borderColor:colors.whiteColor,
                                                                            //     height:AdaptiveWidth(7.5),
                                                                            // },
                                                                            // inputIOS: {
                                                                            //     fontSize: 20,
                                                                            //     textAlign:'left',
                                                                            //     fontWeight:'200',
                                                                            //     color: colors.inputfontColor,
                                                                            //     width:(width/4),
                                                                            //     padding:10,
                                                                            //     fontFamily:'Cairo-Regular',
                                                                            //     fontSize: AdaptiveWidth(18),
                                                                            
                                                                            // },
                                                                            // inputAndroidContainer:{
                                                                            //     backgroundColor:colors.inputboxColor,
                                                                            //     borderRadius:10,
                                                                            //     borderWidth:2,
                                                                            //     borderColor:colors.whiteColor,
                                                                            //     height:AdaptiveWidth(7.5),
                                                                            // },
                                                                            // inputAndroid: {
                                                                            //     fontSize: 20,
                                                                            //     textAlign:'left',
                                                                            //     fontWeight:'200',
                                                                            //     color: colors.inputfontColor,
                                                                            //     width:(width/4),
                                                                            //     padding:10,
                                                                            //     fontFamily:'Cairo-Regular',
                                                                            //     fontSize: AdaptiveWidth(18),
                                                                            // },
                                                                            subheading: {
                                                                                alignSelf:'center',
                                                                                textAlign:'left',
                                                                                fontWeight: '100',
                                                                                // marginStart:widthPercentageToDP('1%'),
                                                                                color:colors.blueHardColor,
                                                                                width:widthPercentageToDP('90%'),
                                                                                fontFamily:'Cairo-Regular',
                                                                                fontSize: 18,
                                                                                lineHeight: 18 * 1.6,
                                                                                height: 18* 1.3, 
                                                                            },
                                                                            boxcontainer: {
                                                                                // flex:1,
                                                                                // flexDirection:'column',
                                                                                position:'absolute',
                                                                                marginTop:heightPercentageToDP('19%'),
                                                                                // transform:[{scaleX:1*AdaptiveHeight(810)},{scaleY:1*AdaptiveHeight(810)}],
                                                                            },
                                                                            homeView: {
                                                                                // alignItems:'center',
                                                                                flex:1,
                                                                                
                                                                            },passwordBut:{
                                                                                textAlign:'left',
                                                                                alignSelf:'center',
                                                                                textAlign:'center',
                                                                                fontWeight: '100',
                                                                                zIndex:1,
                                                                                fontFamily:'Cairo-Regular',
                                                                                color:colors.whiteColor,
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
                                                                                transform:[{translateX:widthPercentageToDP('38%')}]
                                                                            }
                                                                        });