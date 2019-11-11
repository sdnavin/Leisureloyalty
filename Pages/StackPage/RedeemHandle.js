import React, { Component } from 'react'
import {View,ScrollView,StyleSheet,Text,ImageBackground,RefreshControl,TouchableOpacity,Image} from 'react-native';
// import Loader from 'react-native-easy-content-loader';
import * as UiElements from '../../Tools/Components/UIElements'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';
// import Gradient from 'react-native-css-gradient';
import Colors from '../../Tools/constants/Colors';
// import Voucher from '../../Tools/Components/Voucher';
// import ButtonGroup from '../../Tools/Components/ButtonGroup';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from'moment'

import RedeemVenue from './RedeemVenue';
import homebg1 from'../../assets/bg/bg-02.jpg'
import homebg2 from'../../assets/bg/bg-03.jpg'

import StatusTracker from '../../Tools/Components/StatusTracker';
import HeaderLogo from '../../Tools/Components/HeaderLogo';
import BackButton from '../../Tools/Components/BackButton';
import * as Tools from '../../Tools/Components/Tools.js'
import historyB from '../../assets/Icons/history.png'
import OverlayLoad from '../../Tools/Components/OverlayLoad.js';


import {Dimensions } from "react-native";
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { NavigationEvents } from 'react-navigation';


export default class RedeemHandle extends Component {
    
    
    loaded=false;
    _myScroll=ScrollView;
    
    constructor(props){
        super(props);
        this.state={
            loading:true,
            selectedPage:0,
            showHistory:false,
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
    
    
    componentDidMount(){
        if(global.selectedRedeemPage===undefined)
        global.selectedRedeemPage=0;
        
        Tools.updateRatePoints(1);
        
        this.setState({selectedPage: global.selectedRedeemPage,showHistory:(global.selectedRedeemPage!=0?true:false)});
    }
    
    
    
    performActionWithTime(callback,params,timeTaken){
        setTimeout(() => {callback(params)},timeTaken);
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
    getTransfers(){
        if(this.props.navigation.state.params.profile==undefined||(this.props.navigation.state.params.profile!=undefined&&(this.props.navigation.state.params.redeem==undefined||this.props.navigation.state.params.redeem.RedeemHistory.length==0))){
            return(
                <View>
                {UiElements.drawGap(10)}
                <Text style={styles.simplelabel} >
                {i18n.t('noredeem')}
                </Text>
                <TouchableOpacity style={styles.tryagain} onPress={()=>{this.refreshListView()}}>
                <Text style={styles.tryagaintext}>{i18n.t('tryagain')}</Text>
                </TouchableOpacity></View>);
            }else{
                
                return(
                    <View style={{marginLeft:10,marginRight:10}}>
                    {UiElements.drawGap(10)}
                    <View style={styles.rowTView}>
                    <Text style={[styles.subheading,
                        {flex:.25,}]}>
                        {i18n.t('date')}
                        </Text>
                        <Text style={[styles.subheading,
                            {flex:0.3}]}>
                            {i18n.t('voucher')}
                            </Text>
                            <Text style={[styles.subheading,
                                {flex:0.3,}]}>
                                {i18n.t('voucherno')}
                                </Text>
                                <Text style={[styles.subheading,
                                    {flex:0.15}]}>
                                    {i18n.t('points')}
                                    </Text>
                                    
                                    </View>
                                    {UiElements.drawGap(10)}
                                    {UiElements.drawLine(Colors.darkfontColor,width/1.1,.85)}
                                    {this.getRedeems()}
                                    </View>
                                    );
                                }
                            }
                            
                            refreshControl(){
                                return (
                                    <RefreshControl
                                    tintColor={Colors.whiteColor}
                                    refreshing={this.state.refreshing}
                                    onRefresh={()=>this.refreshListView()} />
                                    )
                                }
                                
                                refreshListView () {
                                    this.setState({loading:true});
                                    var redeemProfile=this.props.navigation.state.params.redeemProfile;
                                    redeemProfile();
                                    setTimeout(()=>{
                                        this.setState({refreshing: false});
                                        this.setState({selectedPage:1})
                                    },500);
                                }
                                
                                getRedeems(){
                                    transactionsArray=[];
                                    redeemTransaction=[];
                                    redeemTransaction=this.props.navigation.state.params.redeem.RedeemHistory;//.filter(redeemD=>((new Date(redeemD.RedeemDate)-new Date())>0));
                                    console.log("L :"+redeemTransaction.length);
                                    redeemTransaction=redeemTransaction.sort((a,b)=>((new Date(b.RedeemDate)-new Date(a.RedeemDate))));
                                    console.log("L :"+redeemTransaction.length);

                                    // dates.filter(d => new Date(d) - new Date() > 0);
                                    for(let t=0;t<redeemTransaction.length;t++){
                                        console.log(new Date(redeemTransaction[t].RedeemDate));
                                        transactionsArray.push(
                                            <View key ={t}>
                                            {UiElements.drawGap(15)}
                                            <View style={styles.rowTView}>
                                            <Text style={[styles.pointtxt,
                                                {flex:.25}]}>{moment(redeemTransaction[t].RedeemDate).format('DD/MM/YYYY')}</Text>
                                                <Text style={[styles.pointtxt,
                                                    {flex:0.3}]}>{Tools.stringIsContains(i18n.locale,"en")?redeemTransaction[t].VoucherTitleEn:redeemTransaction[t].VoucherTitleAr}</Text>
                                                    <Text style={[styles.pointtxt,
                                                        {flex:0.3}]}>{redeemTransaction[t].Venue}</Text>
                                                        <Text style={[styles.pointtxt,
                                                            {flex:0.15}]}>{redeemTransaction[t].Points}</Text>
                                                            </View>
                                                            {UiElements.drawGap(15)}
                                                            {UiElements.drawLine(Colors.violetColor,width/1.1,.5)}
                                                            </View>
                                                            );
                                                        }
                                                        return(transactionsArray);
                                                    }
                                                    
                                                    getRedeemVenues(){
                                                        alllines=[];
                                                        redeemDetails=this.props.navigation.state.params.redeem;
                                                        
                                                        if(redeemDetails.Venues_Vouchers!=undefined){
                                                            for(let t=0;t<redeemDetails.Venues_Vouchers.length;t++){
                                                                alllines.push(
                                                                    <View key={"v"+t}>     
                                                                    <RedeemVenue key={"R"+t} venueInfo={redeemDetails.Venues_Vouchers[t]} navigation={this.props.navigation} assignProfile={this.props.navigation.state.params.assignProfile} pagefrom={this.props.navigation.state.params.pagefrom} redeemPoint={this.props.navigation.state.params.redeemPoint}/>
                                                                    {UiElements.drawLine(Colors.whiteColor,250,1)}
                                                                    {UiElements.drawGap(5)}
                                                                    </View>
                                                                    )
                                                                }
                                                                return alllines;
                                                            }
                                                        }
                                                        
                                                        render() {
                                                            // buttonsInit = ['Redeem','Redeem History'];
                                                            // profile=this.props.navigation.getParam('profile');
                                                            // themeColor=(this.props.navigation.getParam('color'))
                                                            return (
                                                                <View style={styles.homeView}>
                                                                <ImageBackground source={this.props.navigation.state.params.pagefrom==='card'?homebg1:homebg2} style={styles.bgImage}/>
                                                                <HeaderLogo headerTitle={i18n.t('redeem')} border={true}/>
                                                                <NavigationEvents
                                                                onDidFocus={this.onNavigatorEvent}
                                                                />
                                                                {this.updateRedeemPage()}
                                                                
                                                                {(!this.state.showHistory)&&(
                                                                    <BackButton onpress={()=>{this.props.navigation.goBack();}}></BackButton>)}
                                                                    {(this.state.showHistory)&&(
                                                                        <BackButton onpress={()=>{this.setState({showHistory:false})
                                                                        global.selectedPage=0}}></BackButton>)}
                                                                        </View>
                                                                        )
                                                                    }
                                                                    updateRedeemPage(){
                                                                        if(!this.state.showHistory){
                                                                            return(<View style={styles.redeemView}>
                                                                                {UiElements.drawGap(5)}
                                                                                <StatusTracker selected={0}/>
                                                                                <View style={{marginLeft:10,marginRight:10}}>
                                                                                {UiElements.drawGap(15)}
                                                                                <Text allowFontScaling={false} style={[styles.RedeemTitle]}>{i18n.t('choosevenue')}</Text>
                                                                                <Text allowFontScaling={false} style={styles.RedeemPoint}>{i18n.t('wheretousevoucher')}</Text>
                                                                                <View
                                                                                style={{height:hp('40%')}}>
                                                                                <ScrollView 
                                                                                showsVerticalScrollIndicator = {false}
                                                                                ref='_scrollView'
                                                                                scrollEnabled={true}
                                                                                contentContainerStyle={styles.homeScrollView}
                                                                                // style={styles.scrollstyle}
                                                                                >
                                                                                <View style={styles.view1}>
                                                                                {this.getRedeemVenues()}
                                                                                </View>
                                                                                </ScrollView>
                                                                                </View>
                                                                                {UiElements.drawGap(10)}
                                                                                <TouchableOpacity onPress={()=>{this.setState({showHistory:true})
                                                                                global.selectedPage=1}}>
                                                                                <Image source ={historyB} style={styles.history}></Image>
                                                                                <Text  allowFontScaling={false} style={styles.historytxt}>{i18n.t('redeemhistory')}</Text>
                                                                                </TouchableOpacity>
                                                                                </View>
                                                                                </View>
                                                                                );
                                                                            }else{
                                                                                return(
                                                                                    <View style={{height:hp('60%')}} >
                                                                                    <ScrollView style={styles.view2}
                                                                                    showsVerticalScrollIndicator={false}
                                                                                    refreshControl={this.refreshControl()}>
                                                                                    {this.getTransfers()}
                                                                                    </ScrollView>
                                                                                    </View>
                                                                                    );
                                                                                }
                                                                            }
                                                                            
                                                                        }
                                                                        
                                                                        
                                                                        const styles = StyleSheet.create({
                                                                            history:{
                                                                                alignSelf:'center',
                                                                                width:35,
                                                                                height:35,
                                                                            },
                                                                            historytxt:{
                                                                                alignSelf:'center',
                                                                                color:Colors.whiteColor,
                                                                                fontFamily:'Cairo-Regular',
                                                                                fontSize: 18,
                                                                            },
                                                                            homeView:{
                                                                                flex:1,
                                                                                flexDirection:'column',
                                                                                height:height
                                                                            },
                                                                            redeemView:{
                                                                                flex:1,
                                                                                flexDirection:'column',
                                                                                height:height
                                                                                // transform:[{scaleX:1*AdaptiveHeight(810)},{scaleY:1*AdaptiveHeight(810)}],
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
                                                                            scrollstyle:{
                                                                                height:height/5,
                                                                                // minHeight:height/3,
                                                                            },
                                                                            homeScrollView: {
                                                                                justifyContent:'center',
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
                                                                            view1: {
                                                                                // width: width - 40,
                                                                                // height:height-500
                                                                                // borderRadius: 10,
                                                                                // borderWidth:2,
                                                                                flex:1,justifyContent:'center'
                                                                            },
                                                                            
                                                                            rowTView:{
                                                                                flex: 1, flexDirection: 'row',
                                                                            },  
                                                                            inputValue: {
                                                                                textAlign:'left',
                                                                                alignItems:'center',
                                                                                alignContent:'center',
                                                                                fontSize: 20,
                                                                                flex:1,
                                                                                height:50,
                                                                                fontWeight: 'bold',
                                                                                fontFamily:'Cairo-Bold'
                                                                                
                                                                            }, detailstitle:{
                                                                                width:150,
                                                                                fontSize: 20,
                                                                                fontWeight: 'bold',
                                                                                paddingTop:15,
                                                                                paddingBottom:15,
                                                                                textAlign:'left',
                                                                                fontFamily:'Cairo-Bold'
                                                                                
                                                                            },
                                                                            heading: {
                                                                                textAlign:'left',
                                                                                fontSize: 40,
                                                                                fontWeight: 'bold',
                                                                                fontFamily:'Cairo-Bold'
                                                                                
                                                                            },
                                                                            subheading: {
                                                                                flex:0.5,
                                                                                textAlign:'center',
                                                                                fontSize: 15,
                                                                                fontWeight: '200',
                                                                                color:Colors.violetColor,
                                                                                fontFamily:'Cairo-Regular'
                                                                            },
                                                                            pointtxt:{
                                                                                flex:0.5,
                                                                                textAlign:'center',
                                                                                fontSize: 15,
                                                                                fontWeight: '600',
                                                                                color:Colors.blueHardColor,
                                                                                
                                                                                fontFamily:'Cairo-Regular'
                                                                            },
                                                                            simplelabel: {
                                                                                textAlign:'center',
                                                                                fontSize: 18,
                                                                                fontWeight: '100',
                                                                                color:Colors.whiteColor,
                                                                                fontFamily:'Cairo-Regular'
                                                                            },container: {},
                                                                            tryagain:{
                                                                                margin:10,
                                                                                backgroundColor:Colors.backgroudColor,
                                                                                borderRadius:10,
                                                                                borderWidth:2,
                                                                                borderColor:Colors.whiteColor,
                                                                                height:60,
                                                                                justifyContent:'center',
                                                                                alignSelf:'center',
                                                                                alignContent:'center',
                                                                                width:width/1.15,
                                                                            },
                                                                            tryagaintext:{
                                                                                alignSelf:'center',
                                                                                color:'white',
                                                                                fontSize:20,
                                                                                fontWeight:'400',
                                                                                fontFamily:'Cairo-Regular'
                                                                            },claimButton:{
                                                                                margin:10,
                                                                                backgroundColor:'#1d78cb',
                                                                                borderRadius:10,
                                                                                height:60,
                                                                                justifyContent:'center',
                                                                                alignSelf:'center',
                                                                                alignContent:'center',
                                                                                width:width/1.15,
                                                                            },
                                                                            claimButtontext:{
                                                                                alignSelf:'center',
                                                                                color:'white',
                                                                                fontSize:20,
                                                                                fontWeight:'400',
                                                                                fontFamily:'Cairo-Bold'
                                                                            }
                                                                            
                                                                        });
                                                                        