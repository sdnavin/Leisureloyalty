import { Text,Image } from 'react-native';
import { RefreshControl,ScrollView,Switch,TouchableOpacity,Linking} from 'react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import { Platform } from '@unimodules/core';
import GetStarted from './GetStarted'
import * as SecureStore from 'expo-secure-store';
import {Dimensions } from "react-native";
const window = Dimensions.get('window');
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

import i18n from 'i18n-js';
import { NativeModules } from "react-native";
import Colors from '../constants/Colors';
import appLogo from '../../assets/Icons/leisure_white.png'
import myinfoIcon from '../../assets/Icons/user.png'
import signoutIcon from '../../assets/Icons/sign-out.png'
import claimIcon from '../../assets/Icons/rewards.png' 
import redeemIcon from '../../assets/Icons/redeem.png' 
import settingsIcon from '../../assets/Icons/settings.png' 
import passIcon from '../../assets/Icons/lock.png' 
// import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderLogo from './HeaderLogo';
import WebServices from '../constants/WebServices';
import ProfileData from './ProfileData';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import * as Tools from '../Components/Tools'

export class AccountHandle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            pushNotify:false,
            emailNotify:false,
            allowFaceID:false,
            smsNotify:false,
            languageENAR:'',
            showLogin:false
        };
        this.onNavigatorEvent=this.onNavigatorEvent.bind(this);
    }
    
    
    static getDerivedStateFromProps(props, cstate) {
        if(props.profile!==undefined&&props.profile.FirstName!==undefined){
            return {
                showLogin: false
            };
        }
        return null;
    }
    
    componentDidMount(){
        Tools.updateRatePoints(1);
        SecureStore.getItemAsync('useBiometric').then(useBiometric=>{
            this.setState({allowFaceID:((useBiometric==='Y')?true:false)});
        });
        SecureStore.getItemAsync('languageENAR').then(languagecheck=>{this.setState({languageENAR:languagecheck})});
    }
    
    onNavigatorEvent() {
        console.info(this.props.profile.FirstName);
        if((this.props.profile===undefined||this.props.profile.FirstName===undefined)){
            this.setState({showLogin:true});
            // this.props.navigation.navigate('FullScreen',{
            //     navigation:this.props.navigation,
            //     assignProfile:this.props.assignProfile,
            //     sendOTP:this.props.sendOTP,
            //     verifyOTP:this.props.verifyOTP});
        }
    }
    
    
    refreshListView () {
        this.setState({refreshing: false});
        updateprofile= this.props.assignProfile;
        updateprofile("user","","");
        // fetchData().then(() => {
        //   this.setState({refreshing: false});
        // });
    }
    refreshControl(){
        
        return (
            <RefreshControl
            tintColor={Colors.whiteColor}
            refreshing={this.state.refreshing}
            onRefresh={()=>this.refreshListView()} />
            )
        }
        
        getImageSource(){
            // console.log("CC "+this.props.profile.urlImage);
            if(this.props.profile.urlImage===''){
                return( require('../../assets/dp.png'));
            }else{
                return({uri:this.props.profile.urlImage,isStatic:true});
            }
        }
        loadLogin=false;
        addProfileDetails(){
            
            
            if(this.props.profile.FirstName!=null){
                if(this.props.profile.CardNo!=null){
                    return(
                        <View style={{padding:15}} >
                        
                        {/* // <View style={styles.dpView}>
                        // <Image style={styles.dp}
                        // source={this.getImageSource()}
                        // />
                    // </View> */}
                    
                    {/* <View style={{paddingBottom:10}}/> */}
                    
                    <Text allowFontScaling={false} style={styles.heading}>{this.props.profile.FirstName}</Text>
                    <Text allowFontScaling={false} style={styles.pId}>{i18n.t('yourpoints')} {this.props.profile.Points}</Text>
                    <Text allowFontScaling={false} style={styles.pId}>{i18n.t('membership')} #{this.props.profile.CardNo}</Text>
                    
                    {this.drawGap(heightPercentageToDP('5%'))}
                    <View>
                    <View style={styles.rowViewButton}>
                    <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>{this.props.navigation.navigate('AccountEdit')}} >
                    <Image source={myinfoIcon} style={styles.profileIcon}/>
                    <Text allowFontScaling={false} style={styles.profileTxt}>{i18n.t('myinfo')}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{justifyContent:'center'}} onPress={() =>
                        this.props.navigation.navigate('Claims',{
                            otherParam: i18n.t('claimpoints'),backParam: i18n.t('myaccount'), pagefrom:'account'
                        })}>
                        <Image source={claimIcon} style={styles.profileIcon}/>
                        <Text allowFontScaling={false} style={styles.profileTxt}>{i18n.t('claimpoint')}</Text>
                        
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() =>
                            this.props.navigation.navigate('Redeem',{
                                otherParam: 'Redeem Points',backParam: i18n.t('myaccount') ,pagefrom:'account',profile:this.props.profile,redeem:this.props.redeem,redeemPoint:this.props.redeemPoint,redeemProfile:this.props.redeemProfile
                            })}>
                            <Image source={redeemIcon} style={styles.profileIcon}/>
                            <Text allowFontScaling={false} style={styles.profileTxt}>{i18n.t('redeemvouchers')}</Text>
                            
                            </TouchableOpacity>
                            
                            </View>
                            {this.drawGap(heightPercentageToDP('3%'))}
                            
                            <View style={styles.rowViewButton}>
                            <TouchableOpacity style={{justifyContent:'center'}} onPress={() =>
                                {
                                    Linking.openURL(WebServices.resetPass);
                                    // this.props.navigation.navigate('Password',{
                                    //     otherParam: (i18n.t('changepass')),backParam:i18n.t('myaccount') 
                                    // });
                                }}>
                                <Image source={passIcon} style={styles.profileIcon}/>
                                <Text allowFontScaling={false} style={styles.profileTxt}>{i18n.t('changepass')}</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={{justifyContent:'center'}} onPress={() =>
                                    this.props.navigation.navigate('Settings',{
                                        otherParam: (i18n.t('changepass')),backParam:i18n.t('myaccount') 
                                    })}>
                                    <Image source={settingsIcon} style={styles.profileIcon}/>
                                    <Text allowFontScaling={false} style={styles.profileTxt}>{i18n.t('settings')}</Text>
                                    
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>{this.SignOut()}}>
                                    <Image source={signoutIcon} style={styles.profileIcon}/>
                                    <Text allowFontScaling={false} style={styles.profileTxt}>{i18n.t('signout')}</Text>
                                    
                                    </TouchableOpacity>
                                    
                                    </View>
                                    </View>
                                    
                                    
                                    
                                    {/* {this.getAccountEditor()} */}
                                    {/* {this.getCommunicationPref()} */}
                                    {/* {this.checkProfileCommunicationPref()} */}
                                    {/* {this.getAppPref()} */}
                                    {/* {this.getHelp()} */}
                                    </View>
                                    );
                                }
                            }else{
                                return(
                                    <View>
                                    {/* <Text allowFontScaling={false} style={styles.headingIn}>{i18n.t('myaccount')}</Text>
                                <Text allowFontScaling={false} style={styles.subheading}>{i18n.t('managesetting')}</Text> */}
                                {this.drawGap(20)}
                                {/* <GetStarted navigation={this.props.navigation} assignProfile={this.props.assignProfile}/> */}
                                {/* {this.getCommunicationPref()} */}
                                {this.checkProfileCommunicationPref()}
                                {/* {this.getAppPref()} */}
                                {this.getHelp()}
                                </View>
                                );
                            }
                        }
                        drawGap=(valueGap)=>{
                            return(
                                <View
                                style={{paddingTop:valueGap}}/>
                                );
                            }
                            
                            getAccountEditor(){
                                return(
                                    <View style={styles.accountView}>
                                    <Text allowFontScaling={false} style={styles.detailshead}>{i18n.t('accountdetails')}</Text>
                                    {this.drawLine('black')}
                                    <Text  allowFontScaling={false} style={styles.detailstitle} onPress={() =>
                                        this.props.navigation.navigate('AccountEdit',{navigation:this.props.navigation})
                                    }>{i18n.t('yourprofile')}</Text>
                                    {this.drawLine('grey')}
                                    {/* <Text style={styles.detailstitle}
                                    onPress={() =>
                                        this.props.navigation.navigate('Receipts',{
                                            otherParam: i18n.t('receiptsandtransactions'),backParam:i18n.t('myaccount') 
                                        })}>{i18n.t('receiptsandtransactions')}</Text>
                                    {this.drawLine('grey')} */}
                                    <Text allowFontScaling={false}  style={styles.detailstitle}onPress={() =>
                                        this.props.navigation.navigate('Claims',{
                                            otherParam: i18n.t('claimpoints'),backParam: i18n.t('myaccount'), color:Colors.yellowColor 
                                        })}>{i18n.t('claimpoints')}</Text>
                                        {this.drawLine('grey')}
                                        {/* <Text style={styles.detailstitle}
                                        onPress={() =>
                                            this.props.navigation.navigate('Benifits',{
                                                otherParam:i18n.t('leisuregold'),backParam: i18n.t('myaccount') 
                                            })}>{i18n.t('leisuregold')}</Text>
                                        {this.drawLine('grey')} */}
                                        {/* <Text style={styles.detailstitle}
                                        onPress={() =>
                                            this.props.navigation.navigate('Points',{
                                                otherParam: i18n.t('pointscalculator'),backParam:i18n.t('myaccount') 
                                            })}>{i18n.t('pointscalculator')}</Text>
                                        {this.drawLine('grey')} */}
                                        <Text allowFontScaling={false}  style={styles.detailstitle}
                                        onPress={() =>
                                            this.props.navigation.navigate('Password',{
                                                otherParam: (i18n.t('changepass')),backParam:i18n.t('myaccount') 
                                            })}>{i18n.t('changeyourpass')}</Text>
                                            </View>
                                            );
                                        }
                                        toggleSwitch(stateName){
                                            switch(stateName){
                                                case 'p':{
                                                    this.setState({pushNotify:!this.state.pushNotify});
                                                    return;
                                                }case 'e':{
                                                    this.setState({emailNotify:!this.state.emailNotify});
                                                    return;
                                                }case 's':{
                                                    this.setState({smsNotify:!this.state.smsNotify});
                                                    return;
                                                }case 'f':{
                                                    this.setState({allowFaceID:!this.state.allowFaceID},()=>{SecureStore.setItemAsync('useBiometric',this.state.allowFaceID?'Y':'N')});
                                                    return;
                                                }
                                            }
                                            // this.setState(stateName==='p'?({pushNotify:!this.state.pushNotify}):stateName==="e"?({emailNotify:!this.state.emailNotify}):({smsNotify:!this.state.smsNotify}))
                                        }
                                        
                                        checkProfileCommunicationPref(){
                                            if(this.props.profile.FirstName!=null){
                                                return(
                                                    <View style={styles.accountView}>
                                                    <Text allowFontScaling={false}  style={styles.detailshead}>{i18n.t('communicationpreferences')}</Text>
                                                    {this.drawLine('black')}
                                                    {this.drawLine('grey')}
                                                    <View style={styles.rowView}>
                                                    <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('emailnotification')}</Text>
                                                    <View style={styles.switchview}>
                                                    <Switch style={styles.switch}
                                                    // thumbColor={Colors.orangeColor}
                                                    onValueChange={()=>this.toggleSwitch('e')}
                                                    value={this.state.emailNotify}></Switch></View>
                                                    </View>
                                                    
                                                    {this.drawLine('grey')}
                                                    <View style={styles.rowView}>
                                                    <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('smsnotification')}</Text>
                                                    <View style={styles.switchview}>
                                                    <Switch style={styles.switch}
                                                    // thumbColor={Colors.orangeColor}
                                                    onValueChange={()=>this.toggleSwitch('s')}
                                                    value={this.state.smsNotify}></Switch></View>
                                                    </View></View>
                                                    )
                                                }
                                            }
                                            
                                            getCommunicationPref(){
                                                return(
                                                    // <View style={styles.accountView}>
                                                    // <Text style={styles.detailshead}>{i18n.t('communicationpreferences')}</Text>
                                                    // {this.drawLine('black')}
                                                    {/* <View style={styles.rowView}>
                                                    <Text style={styles.detailstitle}>{i18n.t('pushnotification')}</Text>
                                                    <View style={styles.switchview}>
                                                    <Switch style={styles.switch}
                                                    onValueChange={()=>this.toggleSwitch('p')}
                                                    value={this.state.pushNotify}></Switch></View>
                                                </View> */}
                                                // {this.checkProfileCommunicationPref()}
                                                // </View>
                                                );
                                            }
                                            
                                            checkProfileAppPref(){
                                                if(this.props.profile.profileId!=null){
                                                    return(
                                                        <View>    
                                                        <View style={styles.rowView}>
                                                        <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('allowfaceid')}</Text>
                                                        <View style={styles.switchview}>
                                                        <Switch style={styles.switch}
                                                        onValueChange={()=>this.toggleSwitch('f')}
                                                        value={this.state.allowFaceID}></Switch>
                                                        </View>
                                                        </View>
                                                        {this.drawLine('grey')}</View>
                                                        )
                                                    }
                                                }
                                                
                                                getAppPref(){
                                                    return(
                                                        <View style={styles.accountView}>
                                                        <Text  allowFontScaling={false} style={styles.detailshead}>{i18n.t('apppreferences')}</Text>
                                                        {this.drawLine('black')}
                                                        {this.checkProfileAppPref()}
                                                        <Text  allowFontScaling={false} style={styles.detailstitle}>{i18n.t('country')}</Text>
                                                        {this.drawLine('grey')}
                                                        <View style={styles.rowView}>
                                                        <Text allowFontScaling={false}  style={styles.detailstitle} >{i18n.t('language')}</Text>
                                                        <View style={styles.switchview}>
                                                        <Text allowFontScaling={false}  style={styles.detailsdata} onPress={()=>{this.changeLanguage(this.state.languageENAR)}}>{i18n.t('switchto')}</Text></View>
                                                        </View>
                                                        </View>
                                                        );
                                                    }
                                                    
                                                    checkProfileHelp(){
                                                        if(this.props.profile.FirstName!=null){
                                                            return(
                                                                <View>    
                                                                <Text allowFontScaling={false}  style={styles.detailstitle}
                                                                onPress={() =>this.SignOut()}>{i18n.t("signout")}</Text>
                                                                {this.drawLine('grey')}
                                                                </View>
                                                                )
                                                            }
                                                        }
                                                        
                                                        SignOut(){
                                                            SecureStore.setItemAsync('loginRequested','N');
                                                            var assignSignout  =   this.props.assignProfile;
                                                            assignSignout('','','');
                                                            this.props.navigation.navigate('Homescreen',{
                                                                navigation:this.props.navigation,
                                                            })
                                                        }
                                                        
                                                        changeLanguage(langToggle){
                                                            langToggle=(langToggle.indexOf("ar") > -1)?'en':'ar';
                                                            // console.log("lang :"+langToggle);
                                                            this.setState({languageENAR:langToggle});
                                                            SecureStore.setItemAsync('languageENAR',langToggle);
                                                            NativeModules.DevSettings.reload();
                                                        }
                                                        
                                                        getHelp(){
                                                            return(
                                                                <View style={styles.accountView}>
                                                                {/* <Text allowFontScaling={false}  style={styles.detailshead}>{i18n.t('help')}</Text>
                                                                {this.drawLine('black')}
                                                                <Text allowFontScaling={false}  style={styles.detailstitle} 
                                                                onPress={() =>
                                                                    this.props.navigation.navigate('Help',{
                                                                        otherParam: 'Help & Support',backParam:i18n.t('myaccount') 
                                                                    })}
                                                                    >{i18n.t('helpnsupport')}</Text>
                                                                    {this.drawLine('grey')}
                                                                    <Text allowFontScaling={false}  style={styles.detailstitle}
                                                                    onPress={() =>
                                                                        this.props.navigation.navigate('Contact',{
                                                                            otherParam: i18n.t('contactus'),backParam: i18n.t('close')
                                                                        })}
                                                                        >{i18n.t('contactus')}</Text>
                                                                    {this.drawLine('grey')} */}
                                                                    {this.checkProfileHelp()}
                                                                    {/* <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('appversion')} 1</Text> */}
                                                                    </View>
                                                                    );
                                                                }
                                                                
                                                                drawLine=(colorstr)=>{
                                                                    return(
                                                                        <View
                                                                        style={{
                                                                            borderBottomColor: colorstr,
                                                                            borderBottomWidth: 1,
                                                                        }}
                                                                        />
                                                                        );
                                                                    }
                                                                    
                                                                    
                                                                    render() {
                                                                        
                                                                        return (
                                                                            <View
                                                                            style={{flex:1}}>
                                                                            
                                                                            <ScrollView 
                                                                            contentContainerStyle={styles.homeScrollView}
                                                                            style={styles.homeView}
                                                                            showsVerticalScrollIndicator = {false}
                                                                            refreshControl={this.refreshControl()}>
                                                                            {/* <Image source={appLogo} style={styles.logoImg}/>
                                                                        <View style={styles.titleView}><Text style={styles.titleTxt}> {i18n.t('myaccount')}</Text></View> */}
                                                                        
                                                                        <HeaderLogo headerTitle={i18n.t('myaccount')} border={true}/>
                                                                        
                                                                        {this.addProfileDetails()}
                                                                        </ScrollView>
                                                                        <NavigationEvents
                                                                        onDidFocus={this.onNavigatorEvent}
                                                                        />
                                                                        {this.state.showLogin&&(<ProfileData pagetogo='login' navigation={this.props.navigation}  onDismiss={()=>{
                                                                            this.props.navigation.navigate('Homescreen');
                                                                            this.setState({showLogin:false})
                                                                        }
                                                                    } />)}
                                                                    </View>
                                                                    );
                                                                }
                                                            }
                                                            
                                                            const styles = StyleSheet.create({
                                                                rowViewButton:{
                                                                    flexDirection:'row',
                                                                    width:'100%',
                                                                    justifyContent:'space-evenly'
                                                                },
                                                                profileTxt:{
                                                                    fontFamily:'Cairo-Regular',
                                                                    fontWeight:'100',
                                                                    color:Colors.whiteColor,
                                                                    fontSize:17,
                                                                    textAlign:'center',
                                                                    width:100
                                                                },
                                                                profileIcon:{
                                                                    marginLeft:15,
                                                                    marginRight:15,
                                                                    width:70,
                                                                    height:70,
                                                                },
                                                                logoImg:{
                                                                    alignSelf:'flex-start',
                                                                    marginLeft:0,
                                                                    width:70.2*(width/280),
                                                                    height:65.3*(width/280),
                                                                    // maxWidth:220,
                                                                }, titleView:{
                                                                    position:'absolute',
                                                                    borderWidth:2,
                                                                    borderRadius:10,
                                                                    alignSelf:'flex-end',
                                                                    transform:[{translateX:width/4.5},{translateY:50}],
                                                                    borderColor:Colors.whiteColor,
                                                                },
                                                                titleTxt:{
                                                                    color:Colors.whiteColor,
                                                                    fontFamily:'Cairo-Regular',
                                                                    fontSize: (width/15),
                                                                    paddingLeft:10,
                                                                    paddingRight:100,
                                                                },
                                                                dpView:{
                                                                    alignItems:'center',
                                                                },
                                                                dp:{
                                                                    width: 200,
                                                                    height: 200,
                                                                    borderRadius: 200/ 2,
                                                                },
                                                                heading: {
                                                                    textAlign:'left',
                                                                    fontSize: 28,
                                                                    fontWeight: 'bold',
                                                                    color:Colors.whiteColor,
                                                                    fontFamily:'Cairo-Bold'
                                                                },
                                                                headingIn: {
                                                                    textAlign:'left',
                                                                    fontSize: 30,
                                                                    fontWeight: '200',
                                                                    paddingBottom:5,
                                                                    color:Colors.whiteColor,
                                                                    fontFamily:'Cairo-Regular'
                                                                },
                                                                subheading: {
                                                                    textAlign:'left',
                                                                    fontSize: 20,
                                                                    fontWeight: '100',
                                                                    color:Colors.blueHardColor,
                                                                    fontFamily:'Cairo-Regular'
                                                                },
                                                                pId: {
                                                                    textAlign:"left",
                                                                    fontSize: 20,
                                                                    fontWeight: '100',
                                                                    color:Colors.whiteColor,
                                                                    fontFamily:'Cairo-Regular'
                                                                },detailshead:{
                                                                    fontSize: 25,
                                                                    fontWeight: '200',
                                                                    paddingBottom:15,
                                                                    textAlign:'left',
                                                                    color:Colors.darkfontColor,
                                                                    fontFamily:'Cairo-Regular'
                                                                },detailstitle:{
                                                                    fontSize: 20,
                                                                    fontWeight: '200',
                                                                    paddingTop:20,
                                                                    paddingBottom:20,
                                                                    width:220,
                                                                    textAlign:'left',
                                                                    color:Colors.blueHardColor,
                                                                    fontFamily:'Cairo-Regular',
                                                                    // borderWidth:1,
                                                                    flex:0.5
                                                                },detailsdata:{
                                                                    fontSize: 18,
                                                                    fontWeight: '200',
                                                                    // paddingTop:20,
                                                                    // paddingBottom:20,
                                                                    // width:120,
                                                                    textAlign:'right',
                                                                    color:Colors.blueHardColor,
                                                                    fontFamily:'Cairo-Regular'
                                                                    
                                                                },
                                                                homeView: {
                                                                    flex: 1,
                                                                    // backgroundColor:'#fff',
                                                                },
                                                                homeScrollView: {
                                                                    // marginTop:30,
                                                                    // backgroundColor:'#fff',
                                                                    // padding:15,
                                                                },
                                                                accountView: {
                                                                    paddingTop:25,
                                                                },
                                                                switchview:{
                                                                    // flex:(Platform.OS==='ios'?(0.5):1),
                                                                    flex:0.5,
                                                                    // borderWidth:1,
                                                                    justifyContent:'center',
                                                                },switch:{
                                                                    // flex:(Platform.OS==='ios'?(0.5):1),
                                                                    // flex:0.5,
                                                                    // borderWidth:2,
                                                                    alignSelf:'flex-end',
                                                                    color:Colors.orangeColor
                                                                    // justifyContent:'flex-end'
                                                                    // left:(Platform.OS==='ios'?(window.width/7):0)
                                                                },rowView:{
                                                                    flex: 1, 
                                                                    flexDirection: 'row'
                                                                },
                                                            });
                                                            
                                                            