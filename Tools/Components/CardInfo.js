import React from 'react';
import { StyleSheet, View,Text,Image,Platform,Animated} from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import cardbg from '../../assets/card.png';
// import cardbg1 from '../../assets/card.png';
import { Magnetometer } from 'expo-sensors';
import { Accelerometer } from 'expo-sensors';

import { NavigationEvents } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as UIElements from './UIElements'
import Colors from '../constants/Colors';
import glar from '../../assets/glar.png';


export class CardInfo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state={
            glarx:new Animated.Value(0),
            canuseGlar:false
            // accelerometerData: {},
        };
        this.onNavigatorEvent=this.onNavigatorEvent.bind(this);
    };

    onNavigatorEvent() {
        this.Accelero();
    }

    Accelero(){
        if(Accelerometer._listenerCount>0)
        Accelerometer.removeAllListeners();
        this._subscription = null;
        // if(this._subscription===null||this._subscription===undefined){
        // console.log('load');
        Accelerometer.setUpdateInterval(200);
        Accelerometer.isAvailableAsync().then(useglar=>this.setState({canuseGlar:useglar}));
        this._subscription = Accelerometer.addListener(accelerometerData => {
            // this.setState({glarx:(2500*accelerometerData.x.toFixed(1))-350})
            Animated.timing(this.state.glarx, {
                toValue: (2000*( accelerometerData.x.toFixed(2)))-350,
                duration: 200,
            }).start();
        });
    }
    
    componentDidMount() {
        this.Accelero();
        // }
    }
    
    
    
    // componentWillUnmount() {
    //     console.log('unload');
    //     Accelerometer.removeAllListeners();
    //     this._subscription = null;
    //     // Animated.timing(this.state.glarx, {
    //     //     toValue: (2500*( accelerometerData.x)),
    //     //     duration: 250,
    //     // }).stop();
    // }
    
    cardFormatting(cardNo){
        cardFormatNo='';
        let n=0;
        for(let t=0;t<cardNo.length;t++){
            if(n==4){
                cardFormatNo+='  ';
                n=0;
            }
            cardFormatNo+=cardNo[t];
            n=n+1;
        }
        return cardFormatNo;
    }
    
    render(){
        return (
            <View style={styles.totalView}>
            <NavigationEvents onDidFocus={this.onNavigatorEvent}/>
            <Image source={cardbg} style={styles.bgcard}/>
            {/* {this.state.canuseGlar&& */}
            <View style={styles.bgglarcardview}>
            <Animated.Image source={glar} style={[styles.bgglarcard,{transform:[{scaleX:wp('.05%')},{scaleY:wp('.05%')},{translateX:(this.state.glarx!==null?this.state.glarx:0)}]}]}/>
            </View>
            {/* }  */}
            <View style={styles.container}>
            {UIElements.drawGap(hp('1.5%'))}
            {/* {UIElements.drawGap(AdaptiveHeight(80))} */}
            <Text style ={styles.heading} allowFontScaling ={false}>{i18n.t('yourbalance')}</Text>
            {/* {UIElements.drawGap(hp('1%'))} */}
            <Text style ={[styles.points,Platform.OS === 'ios'?{lineHeight: hp('7.5%')*1.4,
            height:hp('7.5%')*1.3}:{}]} allowFontScaling ={false}>{this.props.cardData.Points}</Text>
            {/* {UIElements.drawGap(AdaptiveHeight(30))} */}
            {UIElements.drawGap(hp('1.5%'))}
            <Text style ={styles.value} allowFontScaling ={false}>{i18n.t('membership')} </Text>
            {UIElements.drawGap(hp('1.5%'))}
            {/* <Text style ={styles.value} allowFontScaling ={false}>{i18n.t('value')} {this.props.cardData.Amount} {i18n.t('qar')}</Text> */}
            <Text style ={styles.cardNo} allowFontScaling ={false}>{this.cardFormatting(this.props.cardData.CardNo)} </Text>
            </View>
            {/* {UIElements.drawGap(AdaptiveHeight(45))} */}
            </View>
            );
            
        }
        
    }
    
    
    // PropTypes
    CardInfo.propTypes = {
        cardData: PropTypes.object.isRequired
    }
    
    const styles = StyleSheet.create({
        totalView:{
            // marginTop:10,
            // marginBottom:10,
            // flex:1,
            aspectRatio:1417/895,
            alignSelf:'center',
            justifyContent:'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 2,
                height: 4,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            // borderWidth:1,
            elevation: 15,
            height:hp('28.9%'),
            // width:wp('99%'),
        },
        bgglarcardview:{
            flex:1,
            aspectRatio:1417/895,
            borderRadius:15,
            resizeMode:'contain',
            position:'absolute',
            alignSelf:'center',
            justifyContent:'center',
            // width:wp('99%'),//1017*
            // left:0,
            // top:0,
            // width:wp('92%'),
            // left:0,
            // top:0,
            // height:hp('28%'),
            // marginTop:6,
            // height:hp('28.4%'),
            height:hp('27.6%'),
            overflow:'hidden',
            // transform:[{scaleY:hp('0.238%')}]
            // borderWidth:2,
            // zIndex:-10,
            
        },
        bgglarcard:{
            alignSelf:'center',
            aspectRatio:1417/895,
            // resizeMode:'cover',
            position:'absolute',
            // borderWidth:1,
            // margin:wp('5%'),
            // position:'absolute',
            // resizeMode:'contain',
            // width:wp('99%'),
            // height:hp('18%'),
        },
        bgcard:{
            position:'absolute',
            resizeMode:'contain',
            alignSelf:'center',
            // aspectRatio:1417/895,
            // width:wp('99%'),
            width:wp('99%'),
            // left:0,
            // top:0,
            height:hp('28.9%'),
        },
        container: {
            padding:10,
            marginStart:10,
            // borderWidth:1,
            width:hp('42%'),
        },
        heading: {
            fontFamily:'Cairo-Regular',
            fontSize:hp('3.5%'),
            lineHeight: hp('3.5%')*1.5,
            textAlign:'left',
            color:Colors.whiteColor,
        },
        points: {
            fontWeight:'bold',
            textAlign:'left',
            color:Colors.whiteColor,
            fontFamily:'Cairo-Bold',
            // borderWidth:1,
            // textAlignVertical:'center',
            // fontSize: AdaptiveWidth(6),
            // lineHeight: AdaptiveWidth(6) * 1.6,
            // height: AdaptiveWidth(6)* 1.2,
            fontSize: hp('7.5%'),
            lineHeight: hp('7.5%')*1.1,
            height:hp('7.5%')*1.2
        },
        value: {
            fontFamily:'Cairo-Regular',
            textAlign:'left',
            color:Colors.whiteColor,
            // fontSize:AdaptiveWidth(25),
            // lineHeight: AdaptiveWidth(25) * 1.6,
            // height: AdaptiveWidth(25)* 1.2,
            fontSize: hp('2.5%'),
            lineHeight:  hp('2.5%')*1.5,
            
        },
        cardNo: {
            fontFamily:'Cairo-Regular',
            // fontSize:AdaptiveWidth(11.8),
            fontSize: hp('3.5%'),
            lineHeight:  hp('3.5%')*1.35,
            textAlign:'center',
            // borderWidth:1,
            color:Colors.whiteColor,
            // lineHeight: AdaptiveWidth(12) * 1.6,
            // height: AdaptiveWidth(12)* 1.2,
        }
    });
    
    