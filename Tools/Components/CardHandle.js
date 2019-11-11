import { Text } from 'react-native';
import { RefreshControl,ScrollView,Image,Dimensions,TouchableOpacity } from 'react-native';
import React from 'react';
import {CardInfo} from './CardInfo';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Barcode from 'react-native-barcode-builder';
// import { NavigationEvents } from 'react-navigation';

// import { Barcode, Formats } from 'react-native-1d-barcodes';
import GetStarted from './GetStarted';
import {AdaptiveHeight,AdaptiveWidth,AdaptiveOffsetHeight,AdaptiveOffsetWidth,} from './AdaptiveSize'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import i18n from 'i18n-js';
import Colors from '../constants/Colors';

// import {en,ar} from '../../assets/Localization/Localize';
import appLogo from '../../assets/Icons/leisure_white.png'


import claimb from '../../assets/Icons/rewards.png'
import redeemb from '../../assets/Icons/redeem.png'

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
i18n.fallbacks = true;

import * as UIElements from '../Components/UIElements'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderLogo from './HeaderLogo';
import rulesIcon from '../../assets/Icons/rules.png'
import * as Tools from '../Components/Tools';

// i18n.translations = { en,ar };

export class CardHandle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }
    componentDidMount(){
        Tools.updateRatePoints(1);
    }

    // componentDidMount(){
    //         // this.setState({refreshing: false});
    //         // updateprofile= this.props.assignProfile;
    //         // updateprofile("user","","");
    // }
    
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
        addCardDetails(){
            if(this.props.profile.FirstName!=null){
                if(this.props.profile.CardNo!=null){
                    return(
                        <View>
                        {/* {UIElements.drawGap(hp('1%'))} */}
                        {/* <Text >Value, {this.props.profile.cardData.pointEarned}</Text> */}
                        <CardInfo cardData={this.props.profile} pagefrom='card'/>
                        {UIElements.drawGap(hp('2%'))}
                        <View style={styles.container}>
                        {UIElements.drawGap(5)}
                       
                        <Barcode value={this.props.profile.CardNo} 
                        width={wp('.6%')} height={hp('7%')}
                        format="CODE128" />
                        <Text style ={styles.barCodeValue}>{this.props.profile.CardNo}</Text>
                        </View>
                        {UIElements.drawGap(25)}
                        {/* {this.drawLine('grey')} */}
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('Claims',{
                                otherParam: i18n.t('claimpoints'),backParam: i18n.t('mycard'),pagefrom:'card'
                            })}>
                            <Image source={claimb} style={styles.claimBut}/>
                            <Text style={styles.detailstitle} allowFontScaling ={false}>{i18n.t('claimpoint')}</Text></TouchableOpacity>
                            {/* {this.drawLine('grey')} */}
                            <TouchableOpacity onPress={() => 
                                {
                                    var redeemprofile=this.props.redeemProfile;
                                    redeemprofile();
                                this.props.navigation.navigate('Redeem',{assignProfile:this.props.assignProfile,isLoading:this.props.isLoading,
                                    otherParam: 'Redeem Points',backParam: i18n.t('mycard') ,pagefrom:'card',profile:this.props.profile,redeem:this.props.redeem,redeemPoint:this.props.redeemPoint,redeemProfile:this.props.redeemProfile
                                })
                            }
                                }>
                                <Image source={redeemb} style={styles.claimBut}/>
                                <Text style={styles.detailstitle} allowFontScaling ={false}>{i18n.t('redeemvouchers')}</Text></TouchableOpacity>

                                <TouchableOpacity style={styles.buttonB}
                onPress={()=>this.props.navigation.navigate('rules',{
                    navigation:this.props.navigation,pagefrom:this.props.pagefrom
                })}>
                <Image source={rulesIcon} style={styles.claimBut} ></Image>
                
                <Text style={styles.detailstitle} allowFontScaling ={false}>{i18n.t('programrules')}</Text>
                </TouchableOpacity>
                                </View>
                                {/* {this.drawLine('grey')} */}
                                {/* <Text style={styles.detailstitle}
                                onPress={() =>
                                    this.props.navigation.navigate('Receipts',{
                                        otherParam: i18n.t('receiptsandtransactions'),backParam: i18n.t('mycard')
                                    })}>{i18n.t('receiptsandtransactions')}</Text>
                                {this.drawLine('grey')} */}
                                </View>
                                );
                            }
                        }else{
                            return(
                                <View>
                                <View style={{paddingBottom:25}}/>
                                <GetStarted  navigation={this.props.navigation} assignProfile={this.props.assignProfile} pagefrom='card'/>
                                </View>
                                );
                            }
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
                                    <View style={styles.titleView}><Text style={styles.titleTxt}> {i18n.t('mycard')}</Text></View> */}
                                    <HeaderLogo headerTitle={i18n.t('mycard')} border={true}/>
                                    {/* <NavigationEvents
                                                                                        onDidFocus={this.onNavigatorEvent}
                                                                                        /> */}
                                    {UIElements.drawGap(hp('2%'))}

                                    {this.addCardDetails()}

                                    {UIElements.drawGap(hp('5%'))}
                                    </ScrollView></View>
                                    );
                                }
                            }
                            
                            const styles = StyleSheet.create({
                                titleView:{
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
                                    fontSize: AdaptiveWidth(15),
                                    paddingLeft:10,
                                    paddingRight:100,
                                },
                                logoImg:{
                                    alignSelf:'flex-start',
                                    // marginLeft:20,
                                    width:70.2*(AdaptiveWidth(280)),
                                    height:65.3*AdaptiveWidth(280),
                                    // maxWidth:220,
                                },
                                container: {
                                    width:wp('95%'),
                                    backgroundColor: 'white',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    
                                    marginTop:15,
                                    marginBottom:15,

                                    justifyContent:'center',
                                    alignSelf:'center',
                                    borderWidth:2,
                                    borderRadius:15,
                                    borderColor:Colors.whiteColor,
                                    // transform:[{scaleX:1*AdaptiveHeight(810)},{scaleY:1*AdaptiveHeight(810)}],
                                },
                                barCodeValue:{
                                    textAlign:'center',
                                    fontWeight:'bold',
                                    fontSize:12,
                                    
                                    fontFamily:'Cairo-Bold',
                                    fontSize:22,
                                    lineHeight:22* 1.6,
                                    // height: AdaptiveWidth(22)* 1.3,
                                },homeScrollView: {
                                    // padding:15,
                                    // backgroundColor:'#fff',
                                },
                                homeView: {
                                    flex: 1,
                                    // backgroundColor:'#fff',
                                },
                                detailstitle:{
                                    textAlign:'center',
                                    fontWeight: '200',
                                    // marginTop:15,
                                    marginBottom:15,
                                    color:Colors.blueHardColor,
                                    width:130,
                                    fontFamily:'Cairo-Regular',
                                    fontSize:16,
                                    // lineHeight: AdaptiveWidth(18) * 1.6,
                                    // height: AdaptiveWidth(18)* 1.3,
                                },
                                claimBut:{
                                    alignSelf:'center',
                                    width:70,
                                    height:70
                                }
                                
                            });
                            
                            // PropTypes
                            CardHandle.propTypes = {
                                profile: PropTypes.object,
                                navigation:PropTypes.object.isRequired
                            }