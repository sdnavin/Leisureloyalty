import React, { Component } from 'react'
import {View,ScrollView,StyleSheet,Text,Image,ImageBackground,TouchableOpacity} from 'react-native';
import * as UiElements from '../../Tools/Components/UIElements'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';
// import Gradient from 'react-native-css-gradient';
import Colors from '../../Tools/constants/Colors';
import Voucher from '../../Tools/Components/Voucher';
// import vouchers from '../../Tools/constants/vouchers';
// import ButtonGroup from '../../Tools/Components/ButtonGroup';
import {AdaptiveWidth,AdaptiveHeight} from '../../Tools/Components/AdaptiveSize'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// import RedeemVenue from './RedeemVenue';
// import homebg from'../../assets/bg/bg-02.jpg'
import homebg1 from'../../assets/bg/bg-02.jpg'
import homebg2 from'../../assets/bg/bg-03.jpg'

// import appLogo from '../../assets/Icons/leisure_white.png'
import backIcon from'../../assets/Icons/back.png'
import StatusTracker from '../../Tools/Components/StatusTracker';
import HeaderLogo from '../../Tools/Components/HeaderLogo';
import BackButton from '../../Tools/Components/BackButton';
import { NavigationEvents } from 'react-navigation';

import {Dimensions } from "react-native";
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');


export default class RedeemVoucher extends Component {
    
    
    _myScroll=ScrollView;
    
    constructor(props){
        super(props);
        this.state={
            loading:true,
            selectedPage:0,
        }
        this.handler = this.handler.bind(this);
        this.onNavigatorEvent=this.onNavigatorEvent.bind(this);

    }

    onNavigatorEvent() {
        console.info(this.props.profile.FirstName);
        if(this.props.profile===undefined||this.props.profile.FirstName===undefined){
            this.props.navigation.navigate('Home');
            }
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
        handler(someValue) {
            this.setState({selectedPage: someValue});
            this.refs.scrollview.scrollTo({x: someValue*(width-20), y: 0, animated: true});
        }
        _contentViewScroll = (e) => {
            const scrolled =(e.nativeEvent.contentOffset.x);
            const position = (scrolled > 0) ? scrolled / width : 0;
            this.setState({selectedPage:Math.round(position)});
        }
        
        getVouchers(){
            var allines=[];
            var allvoucher=this.props.navigation.getParam('voucherInfo');
            for(let t=0;t<allvoucher.ActiveVouchers.length;t++){
                allines.push(
                    <Voucher key={t} voucherInfo={allvoucher.ActiveVouchers[t]} navigation={this.props.navigation} pagefrom={this.props.navigation.state.params.pagefrom} redeemPoint={this.props.navigation.state.params.redeemPoint} assignProfile={this.props.navigation.state.params.assignProfile}/>
                    )
                }
                return(allines);
            }
            
            render() {
                return (
                    <View style={{ flex:1,
                        flexDirection:'column',
                        height:height}}>
                        {/* <ImageBackground source={homebg} style={styles.bgImage}/> */}
                        <ImageBackground source={this.props.navigation.state.params.pagefrom==='card'?homebg1:homebg2} style={styles.bgImage}/>
                        
                        {/* {UiElements.drawGap(40)} */}
                        <HeaderLogo headerTitle={i18n.t('redeem')} border={true}/>
                        <NavigationEvents
                        onDidFocus={this.onNavigatorEvent}
                        />
                        <View  style={styles.redeemView}>
                        {/* <Image source={appLogo} style={styles.logoImg}/>
                    <View style={styles.titleView}><Text allowFontScaling={false} style={styles.titleTxt}>Redeem</Text></View> */}
                    {UiElements.drawGap(10)}
                    <StatusTracker selected={1}/>
                    
                    {UiElements.drawGap(15)}
                    <Text allowFontScaling={false} style={[styles.RedeemTitle]}>{i18n.t('choosevoucher')}</Text>
                    <Text allowFontScaling={false} style={styles.RedeemPoint}>{i18n.t('thevenue')}, {this.props.navigation.getParam('voucherInfo').Title} </Text>
                    
                    <View style={{marginLeft:10,marginRight:10,height:hp('50%')}}>
                    <ScrollView 
                    showsVerticalScrollIndicator = {false}
                    ref='_scrollView'
                    contentContainerStyle={styles.homeScrollView}
                    style={styles.view1}>
                    {this.getVouchers()}
                    {UiElements.drawGap(25)}
                    </ScrollView>
                    </View>
                    </View>
                    {/* <TouchableOpacity onPressIn={()=>{this.props.navigation.goBack();}}>
                    <Image source={backIcon} style={styles.backbut} ></Image>
                </TouchableOpacity> */}
                <BackButton  onpress={()=>{this.props.navigation.goBack();}}/>
                
                </View>
                )
            }
            
        }
        
        
        const styles = StyleSheet.create({
            redeemView:{
                height:height
                // transform:[{scaleX:1*AdaptiveHeight(810)},{scaleY:1*AdaptiveHeight(810)}],
            },
            backbut:{
                position:'absolute',
                alignSelf:'center',
                width:50,
                height:50,
                // bottom:hp('36%'),
                bottom:hp('30%'),
                zIndex:2,
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
                height:height/4,
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
        