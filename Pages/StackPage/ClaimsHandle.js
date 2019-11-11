import React, { Component } from 'react'
import {View,ScrollView,StyleSheet,Text,Platform,TextInput,TouchableOpacity,RefreshControl,Image,ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
// import RNPickerSelect from 'react-native-picker-select';
import moment from'moment'
// import Loader from 'react-native-easy-content-loader';
// import ButtonGroup from '../../Tools/Components/ButtonGroup';
import * as UiElements from '../../Tools/Components/UIElements'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import DatePicker from 'react-native-datepicker';
// import DatePicker from '../../Tools/Components/DatePicker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import i18n from 'i18n-js';
import Colors from '../../Tools/constants/Colors';
// import TabBarIcon from '../../Tools/Components/TabBarIcon';
import BarcodeScan from '../../Tools/Components/BarcodeScan';
// import ModifiedScrollView from '../../Tools/Components/ModifiedScrollView';

import * as Tools  from '../../Tools/Components/Tools';
// import appLogo from '../../assets/Icons/leisure_white.png'
import cardbg1 from '../../assets/bg/bg-02.jpg'
import cardbg2 from '../../assets/bg/bg-03.jpg'

import scanbarB from '../../assets/Icons/barcode.png'
import proceedB from '../../assets/Icons/back.png'
import historyB from '../../assets/Icons/history.png'
import HeaderLogo from '../../Tools/Components/HeaderLogo';
import BackButton from '../../Tools/Components/BackButton';

import {Dimensions } from "react-native";
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { NavigationEvents } from 'react-navigation';


export default class ClaimsHandle extends Component {
    
    
    _myScroll=ScrollView;
    
    constructor(props){
        super(props);
        this.ScrollRefs=React.createRef();
        
        this.state={
            loading:true,
            selectedPage:0,
            chosenDate:new Date(),
            cameraView:false,
            claimNo:'',
            showDate:false,
            refreshing:false,
            showHistory:false,
        }
        
        this.handler = this.handler.bind(this);
        this.updateInvoice = this.updateInvoice.bind(this);
        this.onNavigatorEvent=this.onNavigatorEvent.bind(this);
        
    }
    
    onNavigatorEvent() {
        console.info(this.props.profile.FirstName);
        if(this.props.profile===undefined||this.props.profile.FirstName===undefined){
            this.props.navigation.navigate('Home');
        }
    }
    componentDidMount(){
        if(global.selectedPage===undefined)
        global.selectedPage=0;
        this.setState({selectedPage: global.selectedPage,showHistory:(global.selectedPage!=0?true:false)});
        Tools.updateRatePoints(1);

        // setTimeout(()=>{this.refs.scrollview.scrollTo({x: selectedPage*(width-20), y: 0, animated: false})},1000);
    }
    
    
  
    handler(someValue) {
        // console.log(this.ScrollRefs);
        this.setState({selectedPage: someValue});
        global.selectedPage=someValue;
        this.ScrollRefs.current.scrollTo({x: someValue*(width-20), y: 0, animated: true});
    }
    
    _contentViewScroll = (e) => {
        const scrolled =(e.nativeEvent.contentOffset.x);
        const position = (scrolled > 0) ? scrolled / width : 0;
        this.setState({selectedPage:Math.round(position)});
        global.selectedPage=Math.round(position);
        
    }
    
    setLoadingState(stateP){
        this.setState({loading:stateP});
    }
    
    performActionWithTime(callback,params,timeTaken){
        setTimeout(() => {callback(params)},timeTaken);
    }
    
    getDate(){
        return(
            <View>
            <View style={[styles.inputView,{flexDirection:'column',justifyContent:'center'}]}>
            <Text allowFontScaling={false} style={[styles.dateValue,{color:(this.state.showDate?'grey':'black')}]} onPress={()=>{this.setState({showDate:true})}}>{this.state.chosenDate.getDate()}/{this.state.chosenDate.getMonth()+1}/{this.state.chosenDate.getFullYear()}</Text></View>
            </View>
            )
        }
        
        updateInvoice(value){
            this.setState({claimNo:value,cameraView:false});
        }
        
        
        checkCamera(){
            if(this.state.cameraView){
                return(
                    <BarcodeScan navigation={this.props.navigation} onScanDone={this.updateInvoice}/>
                    );
                }else{
                    return(
                        <View style={{marginLeft:15,marginRight:15}}>
                        {UiElements.drawGap(15)} 
                        {this.updateClaimPage()}
                        </View>
                        )
                    }
                }
                
                updateClaimPage(){
                    if(!this.state.showHistory){
                        return(<View>
                            <View style={styles.view2}>
                            <View style={styles.rowView}>
                            <View style={{borderColor:Colors.whiteColor,backgroundColor:Colors.inputboxColor,borderRadius:15,borderWidth:2,justifyContent:'flex-start',width:'100%',}}>
                            <TextInput allowFontScaling={false} style ={[styles.inputValue,Tools.stringIsContains(global.locale,'en')?{textAlign:'left' }:{textAlign:'right'}]}
                            editable={true}
                            value={this.state.claimNo}
                            onChangeText={(text) => {this.setState({claimNo:text})}}
                            keyboardType='default'
                            returnKeyType='done'
                            placeholder={i18n.t('invoiceno')}>
                            </TextInput></View>
                            <TouchableOpacity style={styles.proceedTouch}
                             onPress={()=>{this.ClaimPoints()}}> 
                            <Image source={proceedB} style={[styles.proceed,Tools.stringIsContains(global.locale,'en')?{transform:[{rotateZ:'180deg'}] }:{transform:[{rotateZ:'0deg'}],}]}></Image>
                            </TouchableOpacity>
                            </View>
                            {UiElements.drawGap(10)} 
                            <Text  allowFontScaling={false} style={styles.simplelabel}>{i18n.t('or')}</Text>
                            {UiElements.drawGap(10)} 
                            <TouchableOpacity style={{flexDirection:'row',justifyContent:'center', borderColor:Colors.whiteColor,borderRadius:15,borderWidth:2}} onPress={()=>{this.setState({cameraView:!this.state.cameraView})}} >
                            <Image source={scanbarB} style={styles.scanbarB} />
                            <Text  allowFontScaling={false} style={styles.buttontxt}>{i18n.t('scanbarcode')}</Text>
                            </TouchableOpacity>
                            {UiElements.drawGap(50)}
                            <TouchableOpacity onPress={()=>{this.setState({showHistory:true})
                            global.selectedPage=1}}>
                            <Image source ={historyB} style={styles.history}></Image>
                            <Text  allowFontScaling={false} style={styles.historytxt}>{i18n.t('claimshistory')}</Text>
                            </TouchableOpacity>
                            </View>
                            {/* <TouchableOpacity onPressIn={()=>{this.props.navigation.goBack();}}>
                            <Image source={proceedB} style={styles.backbut} ></Image>
                        </TouchableOpacity> */}
                        
                        </View>
                        );
                    }else{
                        return(
                            <View>
                            <ScrollView style={styles.view2}
                            showsVerticalScrollIndicator={false}
                            refreshControl={this.refreshControl()}
                            >
                            {this.getTransfers()}
                            
                            </ScrollView>
                            {/* <TouchableOpacity onPressIn={()=>{this.setState({showHistory:false})
                            global.selectedPage=0}}>
                            <Image source={proceedB} style={styles.backbut} ></Image>
                        </TouchableOpacity> */}
                        </View>
                        );
                    }
                }
                
                ClaimPoints(){
                    var claimReq=this.props.claimpoint;
                    claimReq(this.state.claimNo);
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
                        var claimUpdate=this.props.claimprofile;
                        claimUpdate();
                        
                        setTimeout(()=>{
                            this.setState({refreshing: false});
                            this.setState({selectedPage:1})
                        },500);
                    }
                    
                    getTransfers(){
                        if(this.props.profile==undefined||(this.props.profile!=undefined&&(this.props.claims.length==0||this.props.claims==undefined))){
                            return(
                                <View>
                                {UiElements.drawGap(10)}
                                <Text allowFontScaling={false} style={styles.simplelabel} >
                                {i18n.t('noclaim')}
                                </Text>
                                <TouchableOpacity style={styles.tryagain} onPress={()=>{this.refreshListView()}}>
                                {/* <Gradient gradient={Colors.gradientBut} style={styles.tryagain}> */}
                                <Text allowFontScaling={false} style={styles.tryagaintext}>{i18n.t('tryagain')}</Text>
                                {/* </Gradient> */}
                                </TouchableOpacity></View>);
                            }else{
                                return(
                                    <View >
                                    <View style={styles.rowTView}>
                                    <Text allowFontScaling={false} style={[styles.subheading,
                                        {flex:.3,}]}>
                                        {i18n.t('date')}
                                        </Text>
                                        <Text allowFontScaling={false} style={[styles.subheading,
                                            {flex:0.4,}]}>
                                            {i18n.t('voucherno')}
                                            </Text>
                                            <Text allowFontScaling={false} style={[styles.subheading,
                                                {flex:0.4}]}>
                                                {i18n.t('vouchervalue')}
                                                </Text>
                                                </View>
                                                {UiElements.drawGap(10)}
                                                {UiElements.drawLine(Colors.darkfontColor,width/1.1,.85)}
                                                {this.getRedeems()}
                                                </View>
                                                );
                                            }
                                        }
                                        getRedeems(){
                                            transactionsArray=[];
                                            if(this.props.claims!==undefined&&this.props.claims.length>0){
                                            claimTransaction=(this.props.claims.length>1)?(this.props.claims.sort((a,b)=>((new Date(b.InvoiceDate)-new Date(a.InvoiceDate))))):this.props.claims;
                                            for(let t=0;t<claimTransaction.length;t++){
                                                transactionsArray.push(
                                                    <View key ={t}>
                                                    {UiElements.drawGap(15)}
                                                    <View style={styles.rowTView}>
                                                    <Text allowFontScaling={false} style={[styles.pointtxt,
                                                        {flex:.3}]}>{moment(claimTransaction[t].InvoiceDate).format('DD/MM/YYYY')}</Text>
                                                        <Text allowFontScaling={false} style={[styles.pointtxt,
                                                            {flex:0.4}]}>{claimTransaction[t].InvoiceNumber}</Text>
                                                            <Text allowFontScaling={false} style={[styles.pointtxt,
                                                                {flex:0.4}]}>{claimTransaction[t].Points}</Text>
                                                                </View>
                                                                {UiElements.drawGap(15)}
                                                                {UiElements.drawLine(Colors.violetColor,width/1.1,.5)}
                                                                </View>
                                                                );
                                                            }
                                                            return(transactionsArray);
                                                        }
                                                        }
                                                        
                                                        getLoading(){
                                                            return(
                                                                <View>
                                                                {/* <Loader active pRows={3} pWidth={["100%", 200, "25%", 45]} /> */}
                                                                {UiElements.drawGap(10)}
                                                                {/* <Loader active pRows={2} pWidth={["100%", 200, "25%", 45]} /> */}
                                                                </View>
                                                                )
                                                            }
                                                            
                                                            render() {
                                                                buttonsInit = [i18n.t('submitclaim'),i18n.t('claimshistory')];
                                                                return (
                                                                    <View style={{flex:1}}>
                                                                    {/* {UiElements.drawGap(40)} */}
                                                                    <ImageBackground source={this.props.pagefrom==='card'?cardbg1:cardbg2} style={styles.bgImage}/>
                                                                    <HeaderLogo headerTitle={i18n.t('claimpoint')} border={true}/>
                                                                    <NavigationEvents
                                                                    onDidFocus={this.onNavigatorEvent}
                                                                    />
                                                                    {/* <Gradient gradient={Colors.gradient} style={styles.gradStyle}/> */}
                                                                    {/* <Image source={appLogo} style={styles.logoImg}/>
                                                                <View style={styles.titleView}><Text allowFontScaling={false} style={styles.titleTxt}> {i18n.t('claimpoints')}</Text></View> */}
                                                                {this.checkCamera()}
                                                                
                                                                
                                                                {(!this.state.showHistory&&!this.state.cameraView)&&(
                                                                    <BackButton onpress={()=>{this.props.navigation.goBack();}}></BackButton>)}
                                                                    {(this.state.showHistory&&!this.state.cameraView)&&(
                                                                        <BackButton onpress={()=>{this.setState({showHistory:false})
                                                                        global.selectedPage=0}}></BackButton>)}
                                                                        
                                                                        </View>
                                                                        )
                                                                    }
                                                                    
                                                                    
                                                                    
                                                                }
                                                                
                                                                
                                                                const styles = StyleSheet.create({
                                                                    proceedTouch:{
                                                                        position:'absolute',
                                                                        right:0,
                                                                        top:0,
                                                                        // borderWidth:2,
                                                                        // marginLeft:'85%',
                                                                        // alignSelf:'flex-end',
                                                                        // borderWidth:1,
                                                                        justifyContent:'center',
                                                                        height:60,
                                                                        width:60,
                                                                        flexDirection:'column'
                                                                    },
                                                                    backbut:{
                                                                        position:'absolute',
                                                                        alignSelf:'flex-end',
                                                                        alignSelf:'center',
                                                                        width:30,
                                                                        height:30,
                                                                        bottom:hp('25%'),zIndex:-10,
                                                                    },
                                                                    proceed:{
                                                                        alignSelf:'center',
                                                                        width:30,
                                                                        height:30,
                                                                    },
                                                                    scanbarB:{
                                                                        alignSelf:'flex-start',
                                                                        // marginLeft:40,
                                                                        marginRight:10,
                                                                        width:60,
                                                                        height:60,
                                                                    },
                                                                    history:{
                                                                        alignSelf:'center',
                                                                        width:40,
                                                                        height:40,
                                                                    },
                                                                    historytxt:{
                                                                        alignSelf:'center',
                                                                        color:Colors.whiteColor,
                                                                        fontFamily:'Cairo-Regular',
                                                                        fontSize: 18,
                                                                    },
                                                                    dateValue:{
                                                                        fontSize: 16,
                                                                        fontWeight:'bold',
                                                                        width:'100%',
                                                                        
                                                                        // borderWidth:2,
                                                                    },
                                                                    inputView:{
                                                                        flex:1,
                                                                        // borderWidth:1,
                                                                        flexDirection:'column',
                                                                        alignItems:'flex-start',
                                                                        alignContent:'flex-start',
                                                                    },
                                                                    gradStyle:{
                                                                        position:'absolute',
                                                                        width:width,
                                                                        height:height,
                                                                        zIndex:-1,
                                                                        // borderRadius:15,
                                                                    },
                                                                    tabItem:{
                                                                        flex:1,
                                                                        height:45,zIndex:3
                                                                    },
                                                                    rowView:{
                                                                        flexDirection: 'row',zIndex:2,elevation:5
                                                                    },   
                                                                    rowTView:{
                                                                        flex: 1, flexDirection: 'row',
                                                                    },
                                                                    pointtxt:{
                                                                        flex:0.5,
                                                                        textAlign:'center',
                                                                        fontSize: 15,
                                                                        fontWeight: '600',
                                                                        color:Colors.blueHardColor,
                                                                        fontFamily:'Cairo-Regular'
                                                                    },
                                                                    inputValue: {
                                                                        alignSelf:'flex-start',
                                                                        textAlign:'left',
                                                                        fontWeight:'200',
                                                                        // height:AdaptiveWidth(7.5),
                                                                        color: Colors.inputfontColor,
                                                                        width:'100%',
                                                                        padding:10,
                                                                        fontFamily:'Cairo-Regular',
                                                                        fontSize:20,
                                                                        height:60,
                                                                        // fontSize: AdaptiveWidth(15),
                                                                    },
                                                                    homeView: {
                                                                        // borderWidth:2
                                                                    }, detailstitle:{
                                                                        width:100,
                                                                        fontSize: 20,
                                                                        fontWeight: 'bold',
                                                                        paddingTop:15,
                                                                        paddingBottom:15,
                                                                        textAlign:'left',
                                                                        fontFamily:'Cairo-Bold',
                                                                        // lineHeight:20*1.6,
                                                                        // height:20*2.2,
                                                                        // borderWidth:2
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
                                                                    simplelabel: {
                                                                        textAlign:'center',
                                                                        fontSize: 18,
                                                                        fontWeight: '100',
                                                                        color:Colors.whiteColor,
                                                                        fontFamily:'Cairo-Regular'
                                                                    }, buttontxt: {
                                                                        alignSelf:'center',
                                                                        textAlignVertical:'center',
                                                                        textAlign:'right',
                                                                        fontSize: wp('5%'),
                                                                        fontWeight: '500',
                                                                        color:Colors.whiteColor,
                                                                        fontFamily:'Cairo-Regular'
                                                                    },container: {
                                                                        // flex:1,
                                                                        // borderWidth:2
                                                                    },
                                                                    view1: {
                                                                        margin: 10,
                                                                        width: width - 40,
                                                                        height: height-250,
                                                                        borderRadius: 10,
                                                                        // borderWidth:1
                                                                    },
                                                                    view2: {
                                                                        // margin: 10,
                                                                        width: '100%',
                                                                        height: height,
                                                                        borderRadius: 10,
                                                                        // borderWidth:1
                                                                    },tryagain:{
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
                                                                        fontFamily:'Cairo-Regular'
                                                                    },bgImage:{
                                                                        position:'absolute',
                                                                        alignSelf:'center',
                                                                        width:'100%',
                                                                        height:height,
                                                                        resizeMode:'contain'
                                                                    },
                                                                    
                                                                });
                                                                ClaimsHandle.propTypes = {
                                                                    profile: PropTypes.object.isRequired,
                                                                }