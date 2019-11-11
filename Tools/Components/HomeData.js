import { Text } from 'react-native';
import { RefreshControl,ScrollView,Image} from 'react-native';
import React from 'react';
import {CardInfo} from './CardInfo';
import { StyleSheet, View,Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import GetStarted from './GetStarted';
import ScrollContent from './ScrollContent';
import * as SecureStore from 'expo-secure-store';
import {connect} from 'react-redux';
import {AdaptiveWidth,AdaptiveHeight,AdaptiveOffsetHeight,AdaptiveOffsetWidth} from '../Components/AdaptiveSize'
import appLogo from '../../assets/Icons/leisure_white.png'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



import i18n from 'i18n-js';

import AdBlock from "./AdBlock"
import parkDetails from '../constants/parkDetails';
import Colors from '../constants/Colors';

import * as UIElements from "../Components/UIElements";
import * as tools from '../Components/Tools';
import OurPark from './OurPark';
import HeaderLogo from './HeaderLogo';
// import {en,ar} from '../../assets/Localization/Localize';
// import { NativeModules } from "react-native";


// i18n.fallbacks = true;
// i18n.translations = { en,ar };
// i18n.locale = Localization.locale;
// i18n.locale=global.locale;

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
class HomeData extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loginRequested:false,
        };
    }
    
    componentDidMount(){
        
        tools.updateRatePoints(1);
        
        if(this.props.profile!=undefined&&this.props.profile.FirstName!=undefined){
            
        }else{
            // this.signinwithSavedPass();
            setTimeout(() => {
                this.signinwithSavedPass();
            }, 500);  
        }
    }
    
    //   handleAppStateChange = (nextAppState) => {
    //       console.log(""+nextAppState);
    
    //     if (nextAppState === 'inactive') {
    //       console.log('the app is closed');
    //       SecureStore.setItemAsync('initLogin','');
    //     }    
    //   }
    
    
    
    componentWillUnmount(){
        // this.mounted=false;
        // AppState.removeEventListener('change', this.handleAppStateChange);
    }
    
    
    
    signinwithSavedPass(){
        
        // SecureStore.setItemAsync('accessToken',dateGot.access_token);
        // SecureStore.setItemAsync('refreshToken',dateGot.refresh_token);
        // SecureStore.setItemAsync('userID',dateGot.MemberID);
        
        if(global.initProfile===undefined){
            global.initProfile="Y";
            SecureStore.getItemAsync('accessToken').then(savedPass=>{
                // Call the backend API to authenticate using the stored username+password
                // this.signinProfilewithBio(savedCredential,savedPass);
                if(savedPass!=undefined&&savedPass!=null&&savedPass.length>0){
                    var handleToUpdate  =  this.props.assignProfile;
                    handleToUpdate(savedPass,"","");
                }
            }).catch(error => {
                console.log(error);
            });
        } else {
            // console.log("Home Fallback");
        }
    }
    
    
    
    checkLogin(){
        // console.log(this.state.loginRequested+"PP");
        
        if(this.state.loginRequested)
        return;
        
        SecureStore.setItemAsync('loginRequested','Y');
        this.props.navigation.navigate('FullScreen',{assignProfile:this.props.assignProfile,sendOTP:this.props.sendOTP,verifyOTP:this.props.verifyOTP});
    }
    
    refreshListView () {
        updateprofile= this.props.assignProfile;
        updateprofile("user","","");
        this.setState({refreshing: false});
        this.forceUpdate();
    }
    
    getProfileDetails(){
        if(this.props.profile!=null&&this.props.profile.FirstName!=null){
            return(
                // <View style={{padding:5}}>
                // {/* <Text style={styles.heading} allowFontScaling ={false}>{i18n.t('hi')}, {this.props.profile.FirstName}!</Text> */}
                this.addCardDetails()
                // </View>
                );
            }return(
                <View style={{padding:5}}>
                {/* <Text style={styles.heading } allowFontScaling ={false}>{i18n.t('trimoo')}</Text> */}
                <GetStarted navigation={this.props.navigation} assignProfile={this.props.assignProfile} sendOTP={this.props.sendOTP} verifyOTP={this.props.verifyOTP} pagefrom='home'/>
                </View>
                )
            }
            refreshControl(){
                return (
                    <RefreshControl
                    tintColor={Colors.whiteColor}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>this.refreshListView()} />
                    )
                }
                addCardDetails(){
                    if(this.props.profile!=null&&this.props.profile.CardNo!=null){
                        return(
                            <View>
                            {/* {UIElements.drawGap(AdaptiveWidth(20))} */}
                            <CardInfo cardData={this.props.profile} pagefrom='home'/>
                            {/* <View style={{paddingBottom:AdaptiveHeight(30)}}/> */}
                            {/* <Benifits cardData={this.props.profile.cardData} navigation={this.props.navigation}/> */}
                            {/* <View style={{paddingBottom:25}}/> */}
                            </View>
                            );
                        }
                    }
                    
                    render() {
                        return (
                            <View style={{height:hp('95%')}}>
                            <ScrollView 
                            contentContainerStyle={styles.homeScrollView}
                            style={styles.homeView}
                            showsVerticalScrollIndicator = {false}
                            refreshControl={this.refreshControl()}>
                            {/* <Image source={bghome} style={styles.bghome}></Image> */}
                            <HeaderLogo headerTitle={i18n.t('welcome')+' '+(this.props.profile!=null&&this.props.profile.FirstName!=null?this.props.profile.FirstName:(i18n.t('toleisure')))+''} />
                            {/* <View style={{padding:AdaptiveHeight(40)}}/>
                            <Image source={appLogo} style={styles.logoImg}/>
                        <View style={styles.titleView}><Text allowFontScaling={false} style={styles.titleTxt}>Welcome {this.props.profile!=null&&this.props.profile.FirstName!=null?this.props.profile.FirstName:'to Leisure'} ! </Text></View> */}
                        <View style={{padding:5}}>
                        {UIElements.drawGap(hp('2%'))}
                        
                        {/* {UIElements.drawGap(AdaptiveOffsetWidth(0.15,120))} */}
                        {/* {UIElements.drawGap(hp('1%'))} */}
                        {this.getProfileDetails()}</View>
                        {/* <View style={{paddingBottom:15}}/> */}
                        {/* {this.getOffers()} */}
                        {/* {this.getBanners()} */}
                        <OurPark pagefrom='home'/>
                        {/* {UIElements.drawGap(AdaptiveHeight(4))} */}
                        
                        {/* {UIElements.drawGap(AdaptiveOffsetWidth(0.2,80))} */}
                        </ScrollView>
                        </View>
                        );
                    }
                    
                    getBanners(){
                        return(<View style={{flex:1,justifyContent:'center',width:width}}>
                        <AdBlock parkInfo={parkDetails.AB} navigation={this.props.navigation}/>
                        <AdBlock parkInfo={parkDetails.VC} navigation={this.props.navigation}/>
                        <AdBlock parkInfo={parkDetails.SD} navigation={this.props.navigation}/>
                        </View>);
                    }
                    
                    getOffers(){
                        lines=[];
                        if(this.props.profile!=null&&this.props.profile.FirstName!=null){
                            lines.push( <ScrollContent navigation={this.props.navigation} key='rco' title={i18n.t('recommendedoffer')}  noofViews ={4} />);
                        }else{
                            lines.push( <ScrollContent navigation={this.props.navigation} key='lo' title={i18n.t('latestoffer')} noofViews ={5} />);
                        }
                        lines.push( <ScrollContent navigation={this.props.navigation}
                            key='po' 
                            color='rgba(0,0,0,.01)'
                            title={i18n.t('partneroffer')} 
                            noofViews ={4} />);
                            lines.push( <ScrollContent navigation={this.props.navigation} key='wn' title={i18n.t('whatsnew')} noofViews ={6} />);
                            return lines;
                        }
                    }
                    
                    const styles = StyleSheet.create({
                        
                        bgImg:{
                            position:'absolute',
                            width:width,
                            height:height,
                        },
                        heading: {
                            fontFamily: 'Cairo-Bold',
                            fontSize: AdaptiveWidth(13),
                            fontWeight: 'bold',
                            paddingBottom:15,
                            textAlign:'left',
                            color:Colors.darkfontColor
                        },
                        homeView: {
                        },
                        homeScrollView: {
                        }
                    });
                    
                    // PropTypes
                    HomeData.propTypes = {
                        profile: PropTypes.object
                    }
                    
                    const mapStateToProps = state=>{
                        return {
                            locale: state.profileReducer.locale,
                        }                
                    };
                    
                    export default connect(
                        mapStateToProps,
                        null
                        )(HomeData)