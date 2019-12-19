import React from 'react';
import {View,Alert,AppState,StatusBar} from 'react-native';
import HomeData from './HomeData.js';
import { AccountHandle } from './AccountHandle.js';
import { CardHandle } from './CardHandle.js';
import { OfferHandle } from './OfferHandle.js';
import AccountEditor from '../../Pages/StackPage/AccountEditor.js';
import ReciptsHandle from '../../Pages/StackPage/ReciptsHandle.js';
import BenifitsHandle from '../../Pages/StackPage/BenifitsHandle.js';
import * as SecureStore from 'expo-secure-store';
// import * as Brightness from 'expo-brightness';
import ClaimsHandle from '../../Pages/StackPage/ClaimsHandle.js';
import RedeemHandle from '../../Pages/StackPage/RedeemHandle.js';
import PasswordHandle from '../../Pages/StackPage/PasswordHandle.js';
import SettingsHandle from '../../Pages/StackPage/SettingsHandle.js';
import RedeemVoucher from '../../Pages/StackPage/RedeemVoucher';
import RedeemVenu from '../../Pages/StackPage/RedeemVenu';
import OfflineNotice from './OfflineNotice.js'
// import { NavigationEvents } from 'react-navigation';
import Rate, { AndroidMarket } from 'react-native-rate';

import {connect} from 'react-redux';
import {updateProfile,updateLoading,updateClaims,updateRedeem,updateMemberID,updateAccessToken,updateonDismiss} from '../../src/js/actions/profileActions';
import OverlayLoad from './OverlayLoad.js';
import PointsHandle from '../../Pages/StackPage/PointsHandle.js';

import WebServices from '../../Tools/constants/WebServices'
import * as Tools from '../Components/Tools'
import { Platform } from '@unimodules/core';
import PopUpVoucher from './PopUpVoucher.js';
import i18n from 'i18n-js';
import Colors from '../constants/Colors.js';
import LoginHandle from './LoginHandle.js';
import RegisterUser from './RegisterUser.js';
import Banner from './Banner.js';
import AppVersionChecker from './AppVersionChecker.js';




const MainURL='http://10.10.130.75:91/api/profile/';
// const MainURL='http://10.10.130.62:8989/';

const PopupInfo={
  Title:'',
  SubHeading:'',
  ContentCode:'',
  Buttons:[],
}

class ProfileData extends React.Component {
  
  FeedBack=[];
  loaded=0;
  constructor(props) {
    super(props);
    this.state={
      showPop:false,
      showOtp:false,
      reload:false,
      rated:false,
      ratePoints:0,
      pagetogo:'',
      // showLoading:false,
      popupInfo:{},
      appState: AppState.currentState,
      loginOpen:true,setpass:undefined
    }
    // this.onNavigatorEvent=this.onNavigatorEvent.bind(this);
    
    
    this.handler = this.handler.bind(this);
    this.VerifyOTP = this.VerifyOTP.bind(this);
    this.SendMobileOTP = this.SendMobileOTP.bind(this);
    
    this.ClaimProfile = this.ClaimProfile.bind(this);
    this.ClaimPoints=this.ClaimPoints.bind(this);
    
    this.RedeemProfile = this.RedeemProfile.bind(this);
    this.RedeemPoints=this.RedeemPoints.bind(this);
    
    this.AssignProfile = this.AssignProfile.bind(this);
    
    this.OnVerifyDone=this.OnVerifyDone.bind(this);
    this.onloadEnd=this.onloadEnd.bind(this);
    this.closeOtp=this.closeOtp.bind(this);
    
  }
  
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    SecureStore.getItemAsync('appRated').then(appRate=>{
      // console.log('LC :'+languagecheck);
      if(Tools.stringIsContains(appRate,'true'))
      this.setState({rated:true});
      else
      this.setState({rated:false});
      
    });
    // Brightness.getBrightnessAsync().then(val=>{
    //   // console.log("V :"+val);
    //   if(val==1&&global.brightness==undefined){
    //     global.brightness=val;
    //   }else if(val!=1){ 
    //     global.brightness=val;
    //   }
    // });
  }
  
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  
  
  // rateApp=()=>{
  //   const options = {
  //     AppleAppID:"1483032774",
  //     GooglePackageName:"com.leisureloyalty",
  //     preferredAndroidMarket: AndroidMarket.Google,
  //     preferInApp:true,
  //     openAppStoreIfInAppFails:true,
  //     fallbackPlatformURL:"http://www.leisure.qa/app/",
  //   }
  //   Rate.rate(options, success=>{
  //     if (success) {
  //       this.setState({rated:true});
  //       SecureStore.setItemAsync('appRated','true');
  //     }
  //   })
  // }
  
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!'+this.props.pagetogo);
        
        if(this.props.pagetogo==="login"||this.props.pagetogo==="register"){
        }else{
          // console.log('App has come to the foreground!');
          this.AssignProfile("user",'','');
        }
      }
      this.setState({appState: nextAppState});
    };
    
    
    
    
    onloadEnd=()=>{
      // console.log("Loading End");
      // console.log(this.props.onExitDismiss);
      this.FeedBack=this.props.onExitDismiss.FeedBack;
      // console.log("Loading End"+this.FeedBack.length);
      if(this.FeedBack!=undefined&&this.FeedBack.length>0){
        Alert.alert(this.FeedBack[0],(this.FeedBack[1]==undefined?'':this.FeedBack[1]));
        this.FeedBack=[];
        this.props.updateonDismiss({'FeedBack':this.FeedBack});
      }
      
    }
    
    handler(someValue) {
      this.props.updateProfile(someValue);
      this.updateProfileWs(someValue);
    }
    setloading(loadstate){
      if(loadstate)
      this.props.updateLoading(loadstate);
    }
    
    
    updateProfileWs(someValue){
      this.props.updateLoading(true);
      // this.LoaderView.show();
      
      var details = {
        'FirstName': someValue.FirstName,
        'LastName': someValue.LastName,
        'Mobile': someValue.Mobile,
        'Email': someValue.Email,
      };
      
      // console.log('bearer '+this.props.accessToken.access_token+'//'+JSON.stringify(details));
      
      verifyurl=WebServices.UpdateProfile.replace('{MemberID}',this.props.accessToken.MemberID);
      // console.log('url '+verifyurl);
      
      return fetch(WebServices.MainURL +verifyurl, {
        method: 'POST',
        headers: {
          'Authorization':'Bearer '+this.props.accessToken.access_token,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(details)
      }, 5000)
      .then((response) => response.text())
      .then((responseJson) => {
        dataGot = responseJson;
        
        // console.log("J R :"+dataGot);
        if (!Tools.stringIsContains(responseJson, 'error')) {
          if(Tools.stringIsContains(responseJson, 'success')) {
            this.FeedBack=[(i18n.t('updatesuccess')), i18n.t('profileupdated')];
          }else{
            this.FeedBack=[(i18n.t('updatefail')), i18n.t('profilenotupdated')];
          }
        }
        else {
          this.FeedBack=[(i18n.t('updatefail')), dataGot.error];
        }
        this.props.updateonDismiss({'FeedBack':this.FeedBack});
        this.props.updateLoading(false);
      })
      .catch((error) =>{
        console.error(error);
        this.props.updateLoading(false);
        // this.LoaderView.close();
      });
    }
    
    SendMobileOTP(MobileNo) {
      this.VerifyMobileLoginOTP(MobileNo);
    }
    
    closeOtp(){
      this.setState({showOtp:false});
    }
    
    
    VerifyOTP(MobileNo,otp) {
      this.VerifyLoginwithOTP(MobileNo,otp);
    }
    
    VerifyMobileLoginOTP(MobileNo){
      this.props.updateLoading(true);
      // this.LoaderView.show();
      
      InMobileNo="+974"+MobileNo;
      
      // console.log(InMobileNo);
      
      return fetch(WebServices.MainURL + WebServices.VerifyLoginOTP, {
        method: 'GET',
        headers: {
          'MobileNo':InMobileNo
        },
      }, 5000)
      .then((response) => response.text())
      .then((responseJson) => {
        // console.log(responseJson);
        // this.LoaderView.close();
        
        // console.log("J R :"+dataGot);
        if (!Tools.stringIsContains(responseJson, 'error')) {
          if (responseJson != "Success") {
            this.FeedBack=[i18n.t('loginfail'), i18n.t('pleasecheckmobileno')];
          }
          else {
            this.setState({showOtp:true});
            // console.log("U LM:"+MobileNo);
            // this.fetchUserProfile(dataGot.MemberID, dataGot.token_type, dataGot.access_token);
          }
        }
        else {
          this.FeedBack=[i18n.t('loginfail'), ""];
        }
        this.props.updateonDismiss({'FeedBack':this.FeedBack});
        this.props.updateLoading(false);
        
      })
      .catch((error) =>{
        console.error(error);
        this.props.updateLoading(false);
        // this.LoaderView.close();
      });
    }
    
    VerifyLoginwithOTP(Lusername,LOTP){
      this.setState({showOtp:false});
      this.props.updateLoading(true);
      // this.LoaderView.show();
      
      console.info(Lusername+"//"+LOTP);
      
      var details = {
        'mobile': "+974"+Lusername,
        'otp': LOTP,
        'grant_type': 'MobileOTP'
      };
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      return fetch(WebServices.MainURL + WebServices.Login, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + ((Platform.OS === 'ios') ? WebServices.base64Ios : WebServices.base64And),
          'Content-Type': 'text/plain'
        },
        body: formBody
      }, 5000)
      .then((response) => response.text())
      .then((responseJson) => {
        // console.log(responseJson);
        dataGot = JSON.parse(responseJson);
        // console.log("J R :"+dataGot);
        if (!Tools.stringIsContains(responseJson, 'error')) {
          // this.props.updateLoading(false);
          // this.LoaderView.close();
          if (dataGot == "Failed") {
            this.FeedBack=[i18n.t('loginfail'),i18n.t('pleasecheckcred')];
          }
          else if (dataGot == "NotVerified") {
            this.FeedBack=[i18n.t('loginfail'), i18n.t('pleaseverify')];
          }
          
          else {
            if(dataGot.HasPassword==='1'){
              SecureStore.setItemAsync('accessToken',responseJson);
              this.fetchUserProfile(dataGot.MemberID, dataGot.access_token);
            }else{
              //create Password
              this.setState({setpass:dataGot});
              
            }
            
            
          }
          this.props.updateonDismiss({'FeedBack':this.FeedBack});
          this.props.updateLoading(false);
        }
        else {
          this.FeedBack=[i18n.t('loginfail'), dataGot.error_description];
          this.props.updateonDismiss({'FeedBack':this.FeedBack});
          this.props.updateLoading(false);
          // this.LoaderView.close();
        }
      })
      .catch((error) =>{
        console.error(error);
        this.props.updateLoading(false);
        // this.LoaderView.close();
      });
    }
    
    
    VerifyLogin(Lusername,Lpassword,Lismobile){
      this.props.updateLoading(true);
      // this.LoaderView.show();
      
      console.info(Lusername+""+Lpassword+":"+Lismobile);
      
      var details = {
        'username': ((Lismobile===1)?"+974":"")+Lusername,
        'password': Lpassword,
        'grant_type': 'password'
      };
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
        // console.log('P :'+(encodedKey + "=" + encodedValue));
        
      }
      formBody = formBody.join("&");
      
      // console.log('B64 :'+((Platform.OS==='ios')?WebServices.base64Ios:WebServices.base64And));
      // verifyurl=WebServices.Login.replace('{MobileOrEmail}',Lismobile==1?"974":""+Lusername).replace('{Password}',Lpassword).replace('{IsMobile}',Lismobile)
      return fetch(WebServices.MainURL + WebServices.Login, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + ((Platform.OS === 'ios') ? WebServices.base64Ios : WebServices.base64And),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }, 5000)
      .then((response) => response.text())
      .then((responseJson) => {
        // console.log(responseJson);
        dataGot = JSON.parse(responseJson);
        // console.log("J R :"+dataGot);
        if (!Tools.stringIsContains(responseJson, 'error')) {
          // this.props.updateLoading(false);
          // this.LoaderView.close();
          if (dataGot == "Failed") {
            this.FeedBack=[i18n.t('loginfail'), i18n.t('pleasecheckcred')];
          }
          else if (dataGot == "NotVerified") {
            this.FeedBack=[i18n.t('loginfail'), i18n.t('pleaseverify')];
          }
          else {
            
            // console.log("U :"+((Lismobile===1)?"+974":"")+Lusername);
            // console.log("UP :"+Lpassword);
            this.props.updateAccessToken(dataGot);
            
            SecureStore.setItemAsync('accessToken',responseJson);
            
            
            // SecureStore.setItemAsync('userID',((Lismobile===1)?"+974":"")+Lusername);
            // SecureStore.setItemAsync('pass',Lpassword);
            // SecureStore.setItemAsync('loginMethod',""+Lismobile);
            // this.LoaderView.close();
            this.fetchUserProfile(dataGot.MemberID,  dataGot.access_token);
          }
          this.props.updateonDismiss({'FeedBack':this.FeedBack});
          this.props.updateLoading(false);
        }
        else {
          if(Tools.stringIsContains(dataGot.error_description,'incorrect')){
            this.FeedBack=[i18n.t('loginfail'), i18n.t('usernamepasswrong')];
          }else if(Tools.stringIsContains(dataGot.error_description,'mobile number not verified')){
            this.FeedBack=[i18n.t('loginfail'), i18n.t('mobilenotverify')];
          }else if(Tools.stringIsContains(dataGot.error_description,'email not verified')){
            this.FeedBack=[i18n.t('loginfail'), i18n.t('emailnotverify')];
          }
          
          this.props.updateonDismiss({'FeedBack':this.FeedBack});
          this.props.updateLoading(false);
          
        }
      })
      .catch((error) =>{
        console.error(error);
        // this.FeedBack=[i18n.t('loginfail'), dataGot.error_description];
        this.props.updateonDismiss({'FeedBack':this.FeedBack});
        setTimeout(()=>this.props.updateLoading(false),500);
      });
    }
    
    refreshAccesstoken(){
      this.props.updateLoading(true);
      // this.LoaderView.show();
      console.log('RT :'+this.props.accessToken.refresh_token);
      
      var details = {
        'refresh_token': this.props.accessToken.refresh_token,
        'grant_type': 'refresh_token'
      };
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      return fetch(WebServices.MainURL + WebServices.RefreshToken, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + ((Platform.OS === 'ios') ? WebServices.base64Ios : WebServices.base64And),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }, 5000)
      .then((response) => response.text())
      .then((responseJson) => {
        console.log('RT :'+responseJson);
        dataGot = JSON.parse(responseJson);
        // console.log("J R :"+dataGot);
        if (!Tools.stringIsContains(responseJson, 'error')) {
          // this.LoaderView.close();
          if (dataGot == "Failed") {
            this.FeedBack=[i18n.t('loginfail'), i18n.t('pleasecheckcred')];
          }
          else if (dataGot == "NotVerified") {
            this.FeedBack=[i18n.t('loginfail'),i18n.t('pleaseverify')];
          }
          else {
            //check for new state of authentication - ask shanoj
            // this.LoaderView.close();
            SecureStore.setItemAsync('accessToken',responseJson);
            this.fetchUserProfile(dataGot.MemberID, dataGot.access_token);
          }
        }
        else {
          // this.FeedBack=[i18n.t('loginfail'), dataGot.error_description];
          // this.props.updateLoading(false);
        }
        this.props.updateonDismiss({'FeedBack':this.FeedBack});
        this.props.updateLoading(false);
      })
      .catch((error) =>{
        console.error(error);
        this.props.updateLoading(false);
        // this.LoaderView.close();
      });
    }
    
    fetchUserProfile(LmemberID,LaccessToken){
      this.props.updateLoading(true);
      verifyurl=WebServices.ProfileDetails.replace('{MemberID}',LmemberID);
      return fetch (WebServices.MainURL+verifyurl,{
        method: 'GET',
        headers:{
          'Authorization':'Bearer'+' '+LaccessToken,
        },
      },5000)
      .then((response) => response.text())
      .then((responseJson) => {
        this.loaded=0;
        this.setState({setpass:undefined});
        // console.log('UP '+responseJson);
        if(Tools.stringIsEmpty(responseJson)){
          this.props.updateLoading(false);
          return;
        }
        dataGot=JSON.parse(responseJson);
        
        if(Tools.stringIsContains(responseJson,'denied')){
          this.refreshAccesstoken();
        }
        else if(!Tools.stringIsContains(responseJson,'error')){
          //gotprofile
          this.props.updateProfile(dataGot);
          // console.log(LmemberID+'In');
          this.fetchClaimsProfile(LmemberID,LaccessToken);
          this.fetchRedeemProfile(LmemberID,LaccessToken);
          
        }else{
          this.props.updateLoading(false);
          this.FeedBack=['Login Error',dataGot.Message];
          this.props.updateonDismiss(this.FeedBack);
          console.log('In'+this.FeedBack.length);
        }
        this.props.updateonDismiss({'FeedBack':this.FeedBack});
        this.setState({loginOpen:false});
        
      })
      .catch((error) =>{
        // console.log('UPE '+error);
        this.loaded=1;
        this.setState({setpass:undefined});
        // console.error(error);
        this.FeedBack=['Login Error',dataGot.Message];
        this.props.updateonDismiss({'FeedBack':this.FeedBack});
        this.props.updateLoading(false);
        // this.LoaderView.close();
      });
    }
    
    fetchClaimsProfile(LmemberID,LaccessToken){
      // console.log(LmemberID+','+LaccessToken);
      
      this.props.updateLoading(true);
      // this.LoaderView.show();
      verifyurl=WebServices.ClaimsProfile.replace('{MemberID}',LmemberID);
      return fetch (WebServices.MainURL+verifyurl,{
        method: 'GET',
        headers:{
          'Authorization':'Bearer'+' '+LaccessToken,
        },
      },5000)
      .then((response) => response.text())
      .then((responseJson) => {
        dataGot=JSON.parse(responseJson);
        
        if(!Tools.stringIsContains(responseJson,'denied')&&!Tools.stringIsContains(responseJson,'error')){
          this.props.updateClaims(dataGot);

          // this.LoaderView.close();
        }else{
          console.log("E :"+responseJson);

          if(Tools.stringIsContains(responseJson,'denied')){
            this.refreshAccesstoken();
          }
          // Alert.alert('Claim Error',dataGot.Message);
          // this.LoaderView.close();
        }
        this.props.updateLoading(false);
        
      })
      .catch((error) =>{
        console.error(error);
        this.props.updateLoading(false);
        // this.LoaderView.close();
        // Alert.alert('Claim Error','');
      });
    }
    
    fetchClaimPoints(LmemberID,LaccessToken,tokenId){
      // console.log(LmemberID+','+LaccessToken);
      
      this.props.updateLoading(true);
      // this.LoaderView.show();
      verifyurl=WebServices.ClaimPoints.replace('{MemberID}',LmemberID).replace('{InvoiceCode}',tokenId);
      // console.log('url :'+verifyurl);
      
      return fetch (WebServices.MainURL+verifyurl,{
        method: 'POST',
        headers:{
          'Authorization':'Bearer'+' '+LaccessToken,
        },
      },5000)
      .then((response) => response.text())
      .then((responseJson) => {
        if(Tools.stringIsContains(responseJson,'denied')){
          this.refreshAccesstoken();
        }
        // console.log(responseJson);
        // dataGot=JSON.parse(responseJson);
        else if(Tools.stringIsContains(responseJson,'already')){
          this.FeedBack=[i18n.t('claimfail'),i18n.t('alreadyclaimed')+tokenId];
        }
        else if(Tools.stringIsContains(responseJson,'notfound')||Tools.stringIsContains(responseJson,'error')||Tools.stringIsContains(responseJson,'invalid')){
          this.FeedBack=[i18n.t('claimfail'),i18n.t('failclaimed')+tokenId];
        }else if(Tools.stringIsContains(responseJson,'success')) {
          this.FeedBack=[i18n.t('claimsuccess'),i18n.t('successclaimed')+tokenId];
        }else{
          this.FeedBack=[i18n.t('claimfail'),i18n.t('failclaimed')+tokenId];
        }
        this.props.updateonDismiss({'FeedBack':this.FeedBack});
        this.props.updateLoading(false);
      })
      .catch((error) =>{
        console.error(error);
        this.props.updateLoading(false);
        // this.LoaderView.close();
      });
    }
    
    
    fetchRedeemProfile(LmemberID,LaccessToken){
      
      this.props.updateLoading(true);
      // this.LoaderView.show();
      verifyurl=WebServices.RedeemDetails.replace('{MemberID}',LmemberID);
      // console.log(LmemberID+'/'+LaccessToken+' V :'+verifyurl);
      return fetch (WebServices.MainURL+verifyurl,{
        method: 'GET',
        headers:{
          'Authorization':'Bearer'+' '+LaccessToken,
        },
      },5000)
      .then((response) => response.text())
      .then((responseJson) => {
        // console.log(responseJson);
        dataGot=JSON.parse(responseJson);
        
        if(!Tools.stringIsContains(responseJson,'denied')||!Tools.stringIsContains(responseJson,'error')){
          this.props.updateRedeem(dataGot);
        }else{
          if(Tools.stringIsContains(responseJson,'denied')){
            this.refreshAccesstoken();
          }
        }
        this.props.updateLoading(false);
        // this.LoaderView.close();
      })
      .catch((error) =>{
        // console.log(error);
        this.props.updateLoading(false);
        // this.LoaderView.close();
        // Alert.alert('Claim Error','');
      });
    }
    
    fetchRedeemPoints(LmemberID,LaccessToken,tokenId,passcode){
      // console.log(LmemberID+','+LaccessToken);
      this.props.updateLoading(true);
      // this.LoaderView.show();
      verifyurl=WebServices.RedeemPoints.replace('{MemberID}',LmemberID).replace('{VoucherId}',tokenId).replace('{PassCode}',passcode);
      // console.log('url :'+verifyurl);
      
      return fetch (WebServices.MainURL+verifyurl,{
        method: 'POST',
        headers:{
          'Authorization':'Bearer'+' '+LaccessToken,
        },
      },5000)
      .then((response) => response.text())
      .then((responseJson) => {
        // console.log(responseJson);
        // this.LoaderView.close();
        // dataGot=JSON.parse(responseJson);
        if(Tools.stringIsContains(responseJson,'denied')){
          this.refreshAccesstoken();
        }
        else if(Tools.stringIsContains(responseJson,'already')){
          //gotprofile
          this.FeedBack=[i18n.t('redeemfail'),i18n.t('alreadyredeemed')+tokenId];
        }
        else if(!Tools.stringIsContains(responseJson,'invalid')&&!Tools.stringIsContains(responseJson,'error')&&!Tools.stringIsContains(responseJson,'authorization')){
          //gotprofile
          // Alert.alert('Redeem Success','Successfully claimed : '+tokenId);
          PopupInfo.Title=i18n.t('congrats')
          PopupInfo.SubHeading=i18n.t('yourvoucherno')
          PopupInfo.ContentCode=responseJson
          
          this.setState({showPop:true});
        }else if (Tools.stringIsContains(responseJson,'invalid')){
          this.FeedBack=[i18n.t('redeemfail'),i18n.t('invalidpass')];
        }else {
          this.FeedBack=[i18n.t('redeemfail'),i18n.t('failredeemed')+tokenId];
        }
        this.props.updateonDismiss({'FeedBack':this.FeedBack});
        this.props.updateLoading(false);
      })
      .catch((error) =>{
        // console.error(error);
        this.props.updateLoading(false);
        // this.LoaderView.close();
      });
    }
    
    AssignProfile(profileIn,profilePass,isMobile) {
      
      
      if(!this.props.isConnected){
        this.loaded=1;
        return;
      }
      
      // console.log("P :"+profileIn);
      if(profileIn.length==0){
        this.props.updateProfile({});
        this.props.updateAccessToken({});
        SecureStore.setItemAsync('accessToken','');
      }
      else{
        if(profilePass.length>0){
          this.VerifyLogin(profileIn,profilePass,isMobile);
        }else if(profileIn=="user"){
          
          SecureStore.getItemAsync('accessToken').then(accessToken=>{
            dataGot=JSON.parse(accessToken);
            this.props.updateAccessToken(dataGot);
            this.fetchUserProfile(this.props.accessToken.MemberID, this.props.accessToken.access_token);
          });
          
        }else{
          dataGot=JSON.parse(profileIn);
          this.props.updateAccessToken(dataGot);
          this.fetchUserProfile(dataGot.MemberID, dataGot.access_token);
        }
        // this.props.updateLoading(true);
        // this.fetchProfile(profileIn)
      }
    }
    
    ClaimProfile() {
      // console.log("P :"+profileIn);
      this.fetchClaimsProfile(this.props.accessToken.MemberID,this.props.accessToken.access_token);
      
    }
    
    ClaimPoints(tokenCode) {
      // console.log("TC :"+tokenCode);
      this.fetchClaimPoints(this.props.accessToken.MemberID,this.props.accessToken.access_token,tokenCode);
    }
    
    RedeemProfile() {
      this.fetchRedeemProfile(this.props.accessToken.MemberID,this.props.accessToken.access_token);
    }
    
    RedeemPoints(tokenCode,tokenPass) {
      // console.log(tokenPass+" TC :"+tokenCode);
      this.fetchRedeemPoints(this.props.accessToken.MemberID,this.props.accessToken.access_token,tokenCode,tokenPass);
    }
    
    fetchProfile(profileID){
      return fetch(MainURL+profileID)
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.updateProfile(responseJson);
        this.props.updateLoading(false);
        // this.LoaderView.close();
        //  setTimeout(()=>this.props.updateLoading(false),2000);
      })
      .catch((error) =>{
        console.error(error);
        this.props.updateLoading(false);
      });
    }
    // onNavigatorEvent() {
    //   //  console.log(global.brightness+" B : 1"+this.props.pagetogo);
    //   if(this.props.pagetogo==='card'){
    //     Brightness.setBrightnessAsync(1);
    //     // console.log("B : 1")
    //   }else{
    //     if(global.brightness!==-1){
    //       Brightness.setBrightnessAsync(global.brightness);
    //       // console.log("BC : "+global.brightness);
    //     }
    //   }
    // }
    
    static getDerivedStateFromProps(props, state) {
      
      if(props.isConnected===true){
        // console.log("In PD - "+props.isConnected);
        return{
          reload:props.isConnected
        }
      }
      return null;
    }
    
    
    
    
    checkLoading(elements){
      
      if(this.state.reload&&this.loaded!==0){
        // console.log("In - "+this.loaded);
        this.loaded=0;
        this.AssignProfile('user','','');
      }
      return(<View style={{flex:1}} >
        <StatusBar barStyle="light-content" backgroundColor='black'/>
        <AppVersionChecker/>
        <OfflineNotice />
        {/* <NavigationEvents onDidFocus={this.onNavigatorEvent}/> */}
        {elements}
        {(this.state.showPop)&&(<PopUpVoucher onDone={this.OnVerifyDone} content={PopupInfo}/>)}
        <OverlayLoad size='small' color={Colors.whiteColor} isopen={this.props.isLoading} onDismiss={this.onloadEnd} />
        <Banner/>
        </View>);
      }
      
      OnVerifyDone(Vstate){
        this.setState({showPop:false});
        if(Vstate){
          this.AssignProfile('user','','')
          this.props.navigation.navigate('Home');
        }
      }
      
      //   checkLogin(){
      //     if(this.props.profile&&this.props.profile.profileId){
      //       return;
      //     }
      //     if(this.props.isLoading)
      //     return;
      //       console.log("PP"+this.props.profile.profileId);
      //       this.props.navigation.navigate('FullScreen',{assignProfile:this.AssignProfile});
      // }
      
      render(){
        
        if(this.props.pagetogo==="home"){        
          
          // this.checkLogin();
          return(
            
            // <HomeData profile={this.props.profile} navigation={this.props.navigation} assignProfile={this.AssignProfile}/>
            this.checkLoading(<HomeData profile={this.props.profile} navigation={this.props.navigation} assignProfile={this.AssignProfile} sendOTP={this.SendMobileOTP} verifyOTP={this.VerifyOTP} />)
            );
          }else if(this.props.pagetogo==="login"){
            // this.checkLogin();
            return(
              
              // <HomeData profile={this.props.profile} navigation={this.props.navigation} assignProfile={this.AssignProfile}/>
              this.checkLoading(<LoginHandle profile={this.props.profile} navigation={this.props.navigation} setpassmodal={this.state.setpass} showOtpprop={this.state.showOtp} closeOtpModal={this.closeOtp} visible={this.state.loginOpen} isLoading={this.props.isLoading} assignProfile={this.AssignProfile} sendOTP={this.SendMobileOTP} verifyOTP={this.VerifyOTP} onDismiss={this.props.onDismiss} />)
              );
            }else if(this.props.pagetogo==="register"){
              // this.checkLogin();
              return(
                
                // <HomeData profile={this.props.profile} navigation={this.props.navigation} assignProfile={this.AssignProfile}/>
                this.checkLoading(<RegisterUser profile={this.props.profile} onDismiss={this.props.onDismiss}  pagefrom={this.props.pagefrom} closeOtpModal={this.closeOtp} navigation={this.props.navigation} assignProfile={this.AssignProfile} sendOTP={this.SendMobileOTP} verifyOTP={this.VerifyOTP} />)
                );
              }else  if(this.props.pagetogo==="account"){        
                
                return(
                  this.checkLoading(<AccountHandle profile={this.props.profile} navigation={this.props.navigation} isLoading={this.props.isLoading} assignProfile={this.AssignProfile} redeem={this.props.redeem} redeemProfile={this.RedeemProfile} redeemPoint={this.RedeemPoints}/>)
                  );
                }else  if(this.props.pagetogo==="card"){        
                  
                  return(
                    this.checkLoading(<CardHandle profile={this.props.profile} navigation={this.props.navigation} isLoading={this.props.isLoading} assignProfile={this.AssignProfile} redeem={this.props.redeem} redeemProfile={this.RedeemProfile} redeemPoint={this.RedeemPoints}/>)
                    );
                  }else  if(this.props.pagetogo==="offer"){
                    return(
                      this.checkLoading(<OfferHandle profile={this.props.profile} navigation={this.props.navigation}/>)
                      );
                    }else  if(this.props.pagetogo==="accountEdit"){          
                      
                      return(
                        this.checkLoading(<AccountEditor navigation={this.props.navigation} profile={this.props.profile} handler = {this.handler} /*saveChange={this.props.saveChange}*//>)
                        );
                      }else  if(this.props.pagetogo==="receipts"){
                        return(
                          this.checkLoading(<ReciptsHandle profile={this.props.profile}/>)
                          );
                        }else  if(this.props.pagetogo==="benifits"){
                          return(
                            this.checkLoading(<BenifitsHandle profile={this.props.profile} navigation={this.props.navigation}/>)
                            );
                          }else  if(this.props.pagetogo==="claims"){         
                            
                            return(
                              this.checkLoading(<ClaimsHandle profile={this.props.profile} pagefrom={this.props.pagefrom} claims={this.props.claims} navigation={this.props.navigation} claimprofile={this.ClaimProfile} claimpoint={this.ClaimPoints}/>)
                              );
                            }else  if(this.props.pagetogo==="redeems"){          
                              
                              return(
                                this.checkLoading(<RedeemHandle profile={this.props.profile} pagefrom={this.props.pagefrom} redeem={this.props.redeem} navigation={this.props.navigation} redeemProfile={this.RedeemProfile} redeemPoint={this.RedeemPoints}/>)
                                );
                              }else  if(this.props.pagetogo==="redeemVoucher"){          
                                
                                
                                return(
                                  this.checkLoading(<RedeemVoucher profile={this.props.profile} pagefrom={this.props.pagefrom} redeem={this.props.redeem} navigation={this.props.navigation} redeemProfile={this.RedeemProfile} redeemPoint={this.RedeemPoints}/>)
                                  );
                                }else  if(this.props.pagetogo==="redeemVenu"){         
                                  
                                  return(
                                    this.checkLoading(<RedeemVenu profile={this.props.profile} pagefrom={this.props.pagefrom} redeem={this.props.redeem} navigation={this.props.navigation} redeemProfile={this.RedeemProfile} redeemPoint={this.RedeemPoints}/>)
                                    );
                                  }else  if(this.props.pagetogo==="points"){
                                    return(
                                      this.checkLoading(<PointsHandle profile={this.props.profile}/>)
                                      );
                                    }else  if(this.props.pagetogo==="changepassword"){         
                                      
                                      
                                      return(
                                        this.checkLoading(<PasswordHandle  profile={this.props.profile} navigation ={this.props.navigation}/>)
                                        );
                                      }else  if(this.props.pagetogo==="settings"){          
                                        
                                        return(
                                          this.checkLoading(<SettingsHandle  profile={this.props.profile} navigation ={this.props.navigation}/>)
                                          );
                                        }
                                      }
                                    }
                                    const mapStateToProps = state=>{
                                      return {
                                        profile: state.profileReducer.profile,
                                        memberID:state.profileReducer.memberID,
                                        accessToken:state.profileReducer.accessToken,
                                        claims: state.profileReducer.claims,
                                        redeem: state.profileReducer.redeem,
                                        isLoading: state.profileReducer.isLoading,
                                        onExitDismiss:state.profileReducer.onExitDismiss,
                                        isConnected:state.profileReducer.isConnected,
                                      }                
                                    };
                                    
                                    const mapDispatchToProps = (dispatch) => {
                                      return{
                                        updateClaims:(cData)=> dispatch(updateClaims(cData)),
                                        updateRedeem:(cData)=> dispatch(updateRedeem(cData)),
                                        updateProfile: (pData) => dispatch(updateProfile(pData)),
                                        updateMemberID: (pData) => dispatch(updateMemberID(pData)),
                                        updateAccessToken: (pData) => dispatch(updateAccessToken(pData)),
                                        updateLoading: (loadState) => dispatch(updateLoading(loadState)),
                                        updateonDismiss: (loadState) => dispatch(updateonDismiss(loadState)),
                                        
                                      };
                                    }
                                    
                                    // function mapDispatchToProps(dispatch,ownprops) {
                                    //   return {
                                    //     dispatch,
                                    //     ...bindActionCreators({ updateProfile, updateLoading }, dispatch)
                                    //   }
                                    // }
                                    
                                    export default connect(
                                      mapStateToProps,
                                      mapDispatchToProps
                                      )(ProfileData)
                                      
                                      
                                      
                                      
                                      
                                      