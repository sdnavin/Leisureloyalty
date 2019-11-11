import React, { Component } from 'react';
import  { DatePickerIOS,View,Modal,Text,StyleSheet,Dimensions,TextInput,Image, TouchableOpacity,Alert,Keyboard,KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Platform,ImageBackground  } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
import i18n from 'i18n-js';
import * as UIElements from './UIElements'
import * as Tools from './Tools'
import homebg from'../../assets/bg/bg-01.jpg'
import regLogo from'../../assets/Icons/register.png'
import backIcon from'../../assets/Icons/back.png'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

import { Header } from 'react-navigation';


// import DatePicker from 'react-native-datepicker';
// import RNPickerSelect from 'react-native-picker-select';
import Colors from '../constants/Colors';
// import Gradient from 'react-native-css-gradient';
import Verfication from './Verification';

import WebServices from '../../Tools/constants/WebServices'
import OverlayLoad from './OverlayLoad'

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

import {AdaptiveWidth,AdaptiveHeight,AdaptiveOffsetHeight} from '../Components/AdaptiveSize';
import HeaderLogo from './HeaderLogo';

export default class RegisterUser extends Component {
    
    static navigationOptions = ({navigation}) => {
        return{
            header:null,
            headerVisible:false,
            visible:false
            // title: 'Sign Up',
            // headerTintColor: Colors.darkfontColor,
            // headerStyle: {
            //     backgroundColor: Colors.orangeColor,
            
            // },
            // headerTitleStyle:{textAlign:'center',
            // fontWeight: 'bold',flex:1,
            // fontFamily:'Cairo-Bold',
            // fontSize: 20,
        }
    };
    
    constructor(props){
        super(props);
        this.state={
            firstname:'',
            lastname:'',
            email:'',
            dob:new Date(),
            password:'',confirmpassword:'',
            mobile:'',
            filled:false,
            gender:'',
            allowFaceID:false,
            
            showPass:false,
            showConfirmPass:false,
            
            showDate:false,
            checked:false,memberid:'',
            alreadyExist:0,
            passwordCreate:false,passfilled:false,isLoading:false,passsame:false,
        }
        this.OnVerifyDone=this.OnVerifyDone.bind(this);
    }
    
    changeCheck=false;
    
    CreateProfile(){
        this.setState({isLoading:true});
        return fetch (WebServices.MainURL+WebServices.CreateProfile,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FirstName: this.state.firstname,
                LastName: this.state.lastname,
                Email: this.state.email,
                Mobile:"+974"+this.state.mobile,
                JoinFrom:Platform.OS
            }),
        },5000)
        .then((response) => response.text())
        .then((responseJson) => {
            dateGot=responseJson.replace('"','').replace('"','');
            console.log("J R :"+dateGot);
            // this.setState({memberid:dateGot,isLoading:false,otpModal:true});
            // return;
            if(dateGot=='-1'||dateGot=='-2'){
                this.setState({isLoading:false})
                this.setState({alreadyExist:dateGot});
            }else if(!Tools.stringIsContains(dateGot,'error')){
                this.setState({memberid:dateGot,isLoading:false,otpModal:true});
            }else{
                Alert.alert('Error Sign Up');
                this.setState({isLoading:false})
            }
        })
        .catch((error) =>{
            console.error(error);
        });
    }
    
    VerifyOtpWS(otpcode){
        this.setState({isLoading:true});
        
        verifyurl=WebServices.VerifyMemberOTP.replace('{MemberID}',this.state.memberid).replace('{OTPCode}',otpcode)
        return fetch (WebServices.MainURL+verifyurl,{
            method: 'GET',
        },5000)
        .then((response) => response.text())
        .then((responseJson) => {
            console.log(responseJson);
            dateGot=responseJson.replace('"','').replace('"','');
            console.log("J R :"+dateGot);
            this.setState({isLoading:false});
            if(!Tools.stringIsContains(dateGot,'error')){
                if(dateGot=="Success"){
                    this.setState({passwordCreate:true});
                }else{
                    setTimeout(()=>Alert.alert('Otp Failed','Please enter the correct OTP'),500);
                }
            }else{
                setTimeout(()=>Alert.alert('Error Sign Up',dateGot),500);
            }
        })
        .catch((error) =>{
            this.setState({isLoading:false});
            console.error(error);
        });
    }
    
    CreatePassword(){
        this.setState({isLoading:true});
        
        verifyurl=WebServices.CreatePass.replace('{MemberID}',this.state.memberid).replace('{Password}',this.state.password)
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
                    loginProfile(this.state.mobile,this.state.password,1);
                    this.closeStack();
                }else{
                    Alert.alert('Sigup Failed','');
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
        
        
        return(<Modal animationType={'slide'}
        onRequestClose={ this.closeStack}
        // onBackButtonPress={() => 
        //     {
        //    this.closeStack();
        // }}
            transparent = {false} visible={this.state.visible}>
            <View style={{flex:1}} >
            {elements}
            <OverlayLoad size='small' color={Colors.whiteColor} isopen={this.state.isLoading} onDismiss={this.onloadEnd} />
            </View></Modal>);
            
        }
        
        toggleSwitch(stateName){
            switch(stateName){
                case 'f':{
                    this.setState({allowFaceID:!this.state.allowFaceID});
                    return;
                }
            }
            // this.setState(stateName==='p'?({pushNotify:!this.state.pushNotify}):stateName==="e"?({emailNotify:!this.state.emailNotify}):({smsNotify:!this.state.smsNotify}))
        }
        
        changeHappened(){
            if(this.state.alreadyExist!=0)
            this.setState({alreadyExist:0});
            if(!Tools.stringIsEmpty(this.state.firstname)&&!Tools.stringIsEmpty(this.state.email)&&!Tools.stringIsEmpty(this.state.mobile)&&!Tools.stringIsEmpty(this.state.lastname)){
                this.setState({filled:true});
            }
        }
        getGender(){
            const placeholder = {
                label: 'Select gender',
                value: null,
                color: '#9EA0A4',
            };
            const genders = [
                {
                    label: 'Male',
                    value: 'm',
                },
                {
                    label: 'Female',
                    value: 'f',
                }
            ];
            
            return(
                <View style={styles.genderview}>
                {/* <RNPickerSelect
                    placeholder={placeholder}
                    items={genders}
                    onValueChange={value => {
                        this.changeHappened();
                        this.setState({gender:value});
                    }}
                    style={{...styles}}
                    value={this.state.gender}
                /> */}
                </View>);
            }
            
            getDate(){
                if(this.state.showDate)
                return(
                    <View style={{flex: 1,
                        justifyContent: 'center',}}>
                        <DatePickerIOS
                        mode='date'
                        date={this.state.dob}
                        onDateChange={(date)=>{
                            this.setState({dob:date});
                            this.changeHappened();
                        }}/>
                        <TouchableOpacity style ={{flex:1,justifyContent:"center",backgroundColor:'#0079d4',borderRadius:5,paddingTop:10,paddingBottom:10}}
                        onPress={()=>{{this.setState({showDate:false})}}}>
                        <Text allowFontScaling={false} style ={{fontSize:16,fontWeight:'bold',alignSelf:'center',color:'white'}}>Done</Text>
                        </TouchableOpacity>
                        </View>
                        
                        
                        );
                    }
                    drawLinewithGap(){
                        return(
                            <View>
                            {/* {UIElements.drawGap(10)} */}
                            {/* {UIElements.drawLine('grey')} */}
                            {UIElements.drawGap(10)}
                            </View>
                            );
                        }
                        togglePassword(){
                            this.setState({showPass:!this.state.showPass});
                        }
                        
                        render() {
                            const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
                            return (this.checkLoading(
                                <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios' ? 'padding' : 'undefined')} enabled>
                                
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View >
                                <ImageBackground source={homebg} style={styles.bgImage}/>
                                
                                {/* <Gradient gradient={Colors.gradient} style={styles.gradStyle}/> */}
                                
                                <ScrollView 
                                showsVerticalScrollIndicator = {false}
                                ref='_scrollView'
                                contentContainerStyle={styles.homeScrollView}
                                style={styles.homeView}>
                                {/* {UIElements.drawGap(40)} */}
                                {/* <Image source={appLogo} style={styles.logoImg}/>
                            <View style={styles.titleView}><Text allowFontScaling={false} style={styles.titleTxt}>Register</Text></View> */}
                            <HeaderLogo headerTitle={i18n.t('register')} border={true}/>
                            {UIElements.drawGap(heightPercentageToDP('5%'))}
                            
                            {!this.state.passwordCreate&&(
                                
                                <View style={styles.formInput}>
                                
                                
                                <View style={styles.rowView}>
                                {/* <Text allowFontScaling={false} style={styles.detailstitle}>First Name</Text> */}
                                <View style ={styles.inputView}>
                                <TextInput allowFontScaling={false} style ={styles.inputValue}
                                editable={true}
                                // value={this.state.firstname}
                                onChangeText={(text) => {this.setState({firstname:text});
                                this.changeHappened();}}
                                returnKeyType='done'
                                keyboardType='default'
                                placeholder='First Name'></TextInput>
                                </View>
                                </View>
                                {this.drawLinewithGap()}
                                <View style={styles.rowView}>
                                {/* <Text allowFontScaling={false} style={styles.detailstitle}>Last Name</Text> */}
                                <View style ={styles.inputView}>
                                <TextInput allowFontScaling={false} style ={styles.inputValue}
                                editable={true}
                                // value={this.state.lastname}
                                onChangeText={(text) => {this.setState({lastname:text});
                                this.changeHappened();}}
                                returnKeyType='done'
                                placeholder='Last Name'></TextInput>
                                </View>
                                </View>
                                {this.drawLinewithGap()}
                                
                                <View style={styles.rowView}>
                                {/* <Text allowFontScaling={false} style={styles.detailstitle}>{i18n.t('email')}</Text> */}
                                <View style ={styles.inputView}>
                                <TextInput allowFontScaling={false} style ={styles.inputValue}
                                editable={true}
                                // value={this.state.email}
                                onChangeText={(text) => {this.setState({email:text});
                                this.changeHappened();}}
                                keyboardType='email-address'
                                returnKeyType='done'
                                placeholder='Email'></TextInput>
                                </View>
                                </View>
                                {this.drawLinewithGap()}
                                
                                <View style={styles.rowView}>
                                {/* <Text allowFontScaling={false} style={styles.detailstitle}>{i18n.t('mobile')}</Text> */}
                                {/* <View style ={styles.inputView}>  */}
                                
                                {Tools.stringIsContains(i18n.locale,'en')&&(
                                    <View style={[styles.mobileView,{marginEnd:10}]}> 
                                    <Text allowFontScaling={false} style={styles.inputConst}>{'+974'}</Text> 
                                    </View>)}
                                    
                                    {/* </View> */}
                                    <View style ={styles.inputView}><TextInput allowFontScaling={false} style ={styles.inputValueNo}
                                    editable={true}
                                    // value={this.state.mobile}
                                    onChangeText={(text) => {this.checkOnNumberContinue(text);
                                        this.changeHappened();}}
                                        keyboardType='phone-pad'
                                        returnKeyType='done'
                                        maxLength={8}
                                        placeholder='Mobile number'></TextInput></View>
                                        
                                        {Tools.stringIsContains(i18n.locale,'ar')&&(
                                            <View style={[styles.mobileView,{marginStart:10}]}> 
                                            <Text allowFontScaling={false} style={styles.inputConst}>{'+974'}</Text> 
                                            </View>)}
                                            </View>
                                            {/* {this.drawLinewithGap()}
                                            <View style={styles.rowView}>
                                            <Text style={styles.detailstitle}>{i18n.t('dob')}</Text>
                                            <View style={[styles.inputView,{flexDirection:'column',justifyContent:'center'}]}>
                                            <Text style={[styles.dateValue,{color:(this.state.showDate?'grey':'black')}]} onPress={()=>{this.setState({showDate:true})}}>{this.state.dob.getDate()}/{this.state.dob.getMonth()+1}/{this.state.dob.getFullYear()}</Text></View>
                                            </View>
                                            {this.getDate()}
                                            {this.drawLinewithGap()}
                                            <View style={styles.rowView}>
                                            
                                            <Text style={styles.detailstitle}>{i18n.t('gender')}</Text>
                                            {this.getGender()}
                                        </View> */}
                                        
                                        
                                        {/* {this.drawLinewithGap()}
                                        <View style={styles.rowView}>
                                        <Text style={styles.detailstitle}>{i18n.t('allowfaceid')}</Text>
                                        <View style={styles.switchview}>
                                        <Switch style={styles.switch}
                                        onValueChange={()=>this.toggleSwitch('f')}
                                        value={this.state.allowFaceID}></Switch>
                                    </View></View> */}
                                    
                                    
                                    {this.drawLinewithGap()}
                                    {/* <View style={styles.rowView}> */}
                                    {/* <CheckBox 
                                        value={this.state.checked}
                                        onValueChange={() => this.setState({checked: !this.state.checked})}
                                        />
                                        <Text allowFontScaling={false} style={{marginTop: 5, fontFamily:'Cairo-Regular',
                                        fontSize: AdaptiveWidth(25),
                                        lineHeight: AdaptiveWidth(25) * 1.6,
                                    height: AdaptiveWidth(25)* 1.3, }}> By signing up, you agree the Leisure terms of use.</Text> */}
                                    {/* </View> */}
                                    {UIElements.drawGap(40)}
                                    <TouchableOpacity
                                    onPress={()=>this.signUp()}
                                    style={[styles.buttonSign]}
                                    // {backgroundColor:this.state.change?'#0079d4':'gray'}
                                    disabled={this.state.filled===false?true:false}>
                                    <Image source={regLogo} style={[styles.regImg,this.state.filled==false?{tintColor:Colors.inputboxColor}:{tintColor:Colors.whiteColor}]}/>
                                    <Text allowFontScaling={false} style={[styles.buttonReg,this.state.filled==false?{color:Colors.inputboxColor}:{color:Colors.whiteColor}]}>{i18n.t('register')}</Text>
                                    </TouchableOpacity>
                                    {UIElements.drawGap(65)}
                                    <TouchableOpacity
                                    onPress={()=>this.closeStack()}
                                    style={[styles.buttonSign]}>
                                    <Image source={backIcon} style={[styles.backIcon,{transform:[{rotateZ:'-90deg'}]}]}/>
                                    </TouchableOpacity>
                                    {this.state.otpModal&&(<Verfication title='OTP Verify' details='Verify your mobile number' onDone={this.OnVerifyDone}/>)}
                                    {this.checkUserMobile()}
                                    <View >
                                    </View>
                                    </View>)}
                                    {this.state.passwordCreate&&(
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
                                        {/* <TouchableOpacity
                                            onPress={()=>this.setPassword()}
                                            style={[styles.buttonSign]}
                                            disabled={this.state.passfilled===false?true:false}>
                                            <Image source={regLogo} style={styles.regImg}/>
                                            {this.checkPassFilled()}
                                        </TouchableOpacity> */}
                                        
                                        <TouchableOpacity
                                        onPress={()=>this.setPassword()}
                                        style={[styles.buttonSign]}
                                        // {backgroundColor:this.state.change?'#0079d4':'gray'}
                                        disabled={!this.state.passsame&&(this.state.passfilled===false)?true:false}>
                                        <Image source={regLogo} style={[styles.regImg,this.state.passfilled==false?{tintColor:Colors.inputboxColor}:{tintColor:Colors.whiteColor}]}/>
                                        <Text allowFontScaling={false} style={[styles.buttonReg,((!this.state.passsame&&this.state.passfilled==false)?{color:Colors.inputboxColor}:{color:Colors.whiteColor})]}>{i18n.t('setpass')}</Text>
                                        </TouchableOpacity>
                                        {UIElements.drawGap(65)}
                                        {this.checkSamePass()}
                                        </View>
                                        )}
                                        </ScrollView>
                                        </View>
                                        
                                        </TouchableWithoutFeedback>
                                        </KeyboardAvoidingView>)
                                        )
                                    }
                                    
                                    closeStack = () =>{
                                        {
                                            var dismiss=this.props.onDismiss;
                                            dismiss();
                                            this.setState({visible:false})
                                            // const navigateAction = StackActions.reset({
                                            //     index: 0,
                                            //     key: null,
                                            //     actions: [NavigationActions.navigate({ routeName:'Main'})]
                                            // })
                                            // this.props.navigation.dispatch(navigateAction)
                                        }
                                    }
                                    checkUserMobile(){
                                        if(this.state.alreadyExist==-1){
                                            return(
                                                <Text allowFontScaling={false} style={styles.warning}>{i18n.t('mobileexist')}</Text>);
                                            }else if(this.state.alreadyExist==-2){
                                                return(
                                                    <Text allowFontScaling={false} style={styles.warning}>{i18n.t('emailexist')}</Text>);
                                                }
                                            }
                                            
                                            checkSamePass(){
                                                if(this.state.passfilled){
                                                    if(!this.state.passsame){
                                                        return(
                                                            <Text allowFontScaling={false} style={styles.warning}>{i18n.t('confirmpassnotsame')}</Text>);
                                                        }
                                                    }
                                                    
                                                }
                                                checkPassword(text){
                                                    this.setState({password:text});
                                                }
                                                checkConfirmPassword(text){
                                                    this.setState({confirmpassword:text},()=>{
                                                        if(!Tools.stringIsEmpty(this.state.password)&&(!Tools.stringIsEmpty(this.state.confirmpassword)))//this.state.password===this.state.confirmpassword)
                                                        this.setState({passfilled:true});
                                                        else
                                                        this.setState({passfilled:false});
                                                        if(!Tools.stringIsEmpty(this.state.confirmpassword)&&this.state.password===this.state.confirmpassword){
                                                            this.setState({passsame:true});
                                                        }else{
                                                            this.setState({passsame:false});
                                                        }
                                                    });
                                                    
                                                }
                                                setPassword(){
                                                    this.CreatePassword();
                                                }
                                                signUp(){
                                                    this.CreateProfile(this.state.firstname,this.state.lastname,this.state.email,this.state.mobile);
                                                    // this.setState({passwordCreate:true})
                                                }
                                                OnVerifyDone(otpvalue,Vstate){
                                                    this.VerifyOtpWS(otpvalue);
                                                    this.setState({otpModal:false})
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
                                                    this.setState({mobile:text})
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
                                                        checkFormFilled(){
                                                            if(this.state.filled){
                                                                return(
                                                                    // <Gradient gradient={Colors.gradientBut} style={styles.buttonSign}>
                                                                    <Text allowFontScaling={false} style={styles.buttonReg}>{i18n.t('register')}</Text>
                                                                    // </Gradient>
                                                                    );
                                                                }else{
                                                                    return(
                                                                        <Text allowFontScaling={false} style={styles.buttonReg}>{i18n.t('register')}</Text>
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
                                                                    // width:300,
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
                                                                    width:30,
                                                                    height:30,
                                                                    
                                                                }
                                                            });