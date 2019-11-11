import React, { Component } from 'react'
import {View,StyleSheet,Text,I18nManager,NativeModules,TouchableOpacity,Image,ImageBackground,Switch,} from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import * as SecureStore from 'expo-secure-store'
import Colors from '../../Tools/constants/Colors';
import * as Tools from '../../Tools/Components/Tools'
import RNRestart from 'react-native-restart';

import homebg from'../../assets/bg/bg-03.jpg'
import HeaderLogo from '../../Tools/Components/HeaderLogo';
// import { Updates } from 'expo';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import BackButton from '../../Tools/Components/BackButton';

import {Dimensions } from "react-native";



const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
// import RNRestart from 'react-native-restart'; // Import package from node modules

// Immediately reload the React Native Bundle

export default class SettingsHandle extends Component {
    
    
    
    constructor(props){
        super(props);
        this.state={
            change:false,
            samepass:0,
            loading:true,
            showCurrent:false,
            showNew:false,showConfirmNew:false,
            currentPass:'',
            newPass:'',
            confirmnewPass:'',
            currentPassRight:0,
            validNewPass:0,
            language:'',
            rated:false,
        }
    }
    componentDidMount(){
        SecureStore.getItemAsync('languageENAR').then(languagecheck=>{
            // console.log('LC :'+languagecheck);
            this.setState({language:languagecheck})
        });
        
        SecureStore.getItemAsync('appRated').then(appRate=>{
            // console.log('LC :'+languagecheck);
            if(Tools.stringIsContains(appRate,'true'))
                this.setState({rated:true});
                else
                this.setState({rated:false});

        });
        Tools.updateRatePoints(1);
    }
    
    
    
    changeHappened(){
        this.setState({change:true});
    }
    // rateApp=()=>{
    //     const options = {
    //         AppleAppID:"1483032774",
    //         GooglePackageName:"com.leisureloyalty",
    //         preferredAndroidMarket: AndroidMarket.Google,
    //         preferInApp:true,
    //         openAppStoreIfInAppFails:true,
    //         fallbackPlatformURL:"http://www.leisure.qa/app/",
    //     }
    //     Rate.rate(options, success=>{
    //         if (success) {
    //             this.setState({rated:true});
    //             SecureStore.setItemAsync('appRated','true');
    //         }
    //     })
    // }
    drawGap=(valueGap)=>{
        return(
            <View
            style={{paddingTop:valueGap}}/>
            );
        }
        
        
        drawLine=(colorstr)=>{
            return(
                <View
                style={{
                    borderBottomColor: colorstr,
                    borderBottomWidth: 0.5,
                }}/>
                );
            }
            
            setLoadingState(stateP){
                this.setState({loading:stateP});
            }
            
            performActionWithTime(callback,params,timeTaken){
                setTimeout(() => {callback(params)},timeTaken);
            }
            
            
            toggleSwitch(stateName){
                this.changeHappened();
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
            render() {
                return (
                    <View style={{flex:1}}>
                    <ImageBackground source={homebg} style={styles.bgImage}/>
                    {/* {this.drawGap(40)} */}
                    <HeaderLogo headerTitle={i18n.t('settings')} border={true}/>
                    {this.drawGap(10)}
                    <View style={{paddingLeft:15,paddingRight:15,flex:1}}>
                    {/* <Text allowFontScaling={false}  style={styles.detailshead}>{i18n.t('communicationpreferences')}</Text> */}
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
                    </View>
                    
                    {this.drawLine('grey')}
                    
                    <TouchableOpacity style={styles.rowView} onPress={()=>{Tools.rateApp(false)}} >
                    <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('rateapp')}</Text>
                    </TouchableOpacity>
                    
                    {this.drawLine('grey')}
                    {/* <View style={styles.rowView}>
                    <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('allowfaceid')}</Text>
                    <View style={styles.switchview}>
                    <Switch style={styles.switch}
                    trackColor={Colors.backgroudColor}
                    ios_backgroundColor={Colors.backgroudColor}
                    // thumbColor={Colors.orangeColor}
                    onValueChange={()=>this.toggleSwitch('f')}
                    value={this.state.allowFaceID}></Switch></View> 
                </View>*/}
                {this.drawLine('grey')}
                <View style={styles.rowView}>
                <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('language')}</Text>
                <TouchableOpacity style={Tools.stringIsContains(this.state.language,'en')?styles.selectedBorder:styles.notselectedBorder}  onPress={()=>{this.OnSelectedLanguage('en')}}>
                <Text allowFontScaling={false}  style={styles.inputData}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Tools.stringIsContains(this.state.language,'ar')?styles.selectedBorder:styles.notselectedBorder} onPress={()=>{this.OnSelectedLanguage('ar')}} >
                <Text allowFontScaling={false}  style={styles.inputData}>العَرَبِيَّة</Text>
                </TouchableOpacity>
                </View>
                {this.state.change&& (<View>{this.drawGap(10)}
                <TouchableOpacity style={styles.Button} onPress={()=>{this.OnSave()}}>
                <Text style={styles.buttontext} >{i18n.t("save")}</Text>
                </TouchableOpacity>
                </View>)}
                </View>
                <BackButton onpress={()=>this.props.navigation.goBack()}/>
                </View>
                )
            }
            OnSelectedLanguage(langcode){
                
                this.setState({language:langcode},()=>{this.changeHappened()})
            }
            
            changeLanguage(langToggle){
                SecureStore.getItemAsync('languageENAR').then(lan=>{
                    
                    if(lan!==langToggle){
                        // langToggle=(langToggle.indexOf("ar") > -1)?'en-QA':'ar-QA';
                        console.log("lang :"+langToggle);
                        // this.setState({languageENAR:langToggle});
                        SecureStore.setItemAsync('languageENAR',langToggle);
                        i18n.locale=langToggle;
                        CheckRTL=(i18n.locale.indexOf("ar") > -1)?true:false;
                        I18nManager.allowRTL(true);
                        I18nManager.forceRTL(CheckRTL);
                        RNRestart.Restart();
                        // this.forceUpdate();
                        // NativeModules.DevSettings.reload();
                        // Updates.reloadFromCache();
                    }
                });
            }
            
            OnSave(){
                console.log("lang :"+this.state.language);
                //update server
                this.setState({change:false});
                this.changeLanguage(this.state.language);
            }
            
        }
        
        
        const styles = StyleSheet.create({
            selectedBorder:{
                borderRadius:15,
                backgroundColor:'#62a7d9',
                flex:0.3,
                height:'50%',
                justifyContent:'center',
                alignSelf:'center'
            },
            notselectedBorder:{
                flex:0.3,
                height:'50%',
                justifyContent:'center',
                alignSelf:'center'
            },
            detailstitle:{
                fontSize: 20,
                fontWeight: '200',
                paddingTop:20,
                paddingBottom:20,
                width:220,
                textAlign:'left',
                color:Colors.blueHardColor,
                fontFamily:'Cairo-Regular',
                flex:0.75
            },
            inputData:{
                fontSize: 18,
                fontWeight: '200',
                color:Colors.blueHardColor,
                fontFamily:'Cairo-Regular',
                textAlign:'center',
                alignSelf:'center'
            },
            switchview:{
                // flex:(Platform.OS==='ios'?(0.5):1),
                flex:0.5,
                // borderWidth:1,
                justifyContent:'center',
            },switch:{
                // borderWidth:2,
                alignSelf:'flex-end',
                color:Colors.orangeColor,
                
            },
            
            logoImg:{
                alignSelf:'flex-start',
                marginLeft:15,
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
            bgImage:{
                position:'absolute',
                alignSelf:'center',
                width:'100%',
                height:height,
                resizeMode:'contain'
            },
            warning:{
                color:Colors.warningColor,
                marginTop:15,
                // paddingBottom:15,
                fontWeight:'bold',
                marginStart:width/9,
                fontFamily:'Cairo-Bold',
                fontSize: 18
            },
            gradStyle:{
                position:'absolute',
                width:width,
                height:height,
                zIndex:-1,
                // borderRadius:15,
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
            rowView:{
                flexDirection: 'row',
                height:80,
            },   
            homeView: {
                flex: 1,
                // backgroundColor:'#fff',
            },
            homeScrollView: {
                // backgroundColor:'#fff',
                padding:15,
                
            },heading: {
                textAlign:'left',
                fontSize: 35,
                fontWeight: 'bold',
                color:Colors.darkfontColor,fontFamily:'Cairo-Bold'
            },
            subheading: {
                flex:0.45,
                textAlign:'left',
                paddingTop:10,
                fontSize: 18,
                // height:40,
                textAlignVertical:'center',
                fontWeight: 'bold',
                color:Colors.darkfontColor,
                fontFamily:'Cairo-Bold',
                // borderWidth:1
            },inputView:{
                flex:1,
                // borderWidth:2,
                flexDirection:'column',
                alignItems:'flex-start',
                alignContent:'flex-start',
                borderWidth:2,
                borderColor:Colors.whiteColor,
                backgroundColor:Colors.inputboxColor,
                borderRadius:15,
                marginBottom:20,
            }
            
        });
        SettingsHandle.propTypes = {
            profile: PropTypes.object.isRequired,
        }