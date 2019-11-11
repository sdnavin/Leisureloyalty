import React, { Component } from 'react';
import {Image, View,ScrollView,StyleSheet,Dimensions,Text,Platform,Alert,TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';
import CacheImage from './CacheImage';
import Colors from '../constants/Colors';
import * as UIElements from './UIElements'
import Verfication from './Verification';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const smallerWidth = width * .9346;
import * as Tools from '../Components/Tools';
import lockIcon from '../../assets/Icons/lock-2.png';
import PopUpModal from './PopUpModal';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default class Voucher extends Component {
    
    constructor(props){
        super(props);
        this.state={
            otpModal:false
        }
        this.OnPressAd = this.OnPressAd.bind(this);
        this.OnVerifyDone=this.OnVerifyDone.bind(this);
    }
    
    
    render() {
        return (
            <View>
            <TouchableOpacity disabled={(!this.props.voucherInfo.MemberCanRedeem)} onPress={()=>{this.OnPressAd()}}>
            <View style={styles.view}>
            {/* <CacheImage
            bg={true}
            style={styles.image}
            uri={this.props.parkInfo.banner}
            /> */}
            <Text allowFontScaling={false} style={styles.title} >{Tools.stringIsContains(i18n.locale,'en')?this.props.voucherInfo.TitleEn:this.props.voucherInfo.TitleAr}</Text>
            <Text allowFontScaling={false} style={styles.points} >{this.props.voucherInfo.Points} {i18n.t('points')}</Text>
            {!this.props.voucherInfo.MemberCanRedeem&&(
            <Image source={lockIcon} style={styles.lockit}/>)}
            </View>
            {/* <Text style={styles.title} >{this.props.voucherInfo.title}</Text> */}
            {/* <Text style={styles.duration}>{i18n.t('adduration')}</Text> */}
            </TouchableOpacity>
            {UIElements.drawGap(10)}
            {this.state.otpModal&&(<PopUpModal title={i18n.t('areyousuretoredeem')+(Tools.stringIsContains(i18n.locale,'en')?this.props.voucherInfo.TitleEn:this.props.voucherInfo.TitleAr)+
            (i18n.t('questionmark'))} onDone={this.OnVerifyDone}/>)}
            </View>
            )
        }
        OnVerifyDone(otpvalue,Vstate){
            console.log(otpvalue+"V :"+Vstate);

            this.setState({otpModal:false});
            if(Vstate){
                this.props.navigation.navigate('cashier',{pagefrom:this.props.pagefrom,redeemPoint:this.props.redeemPoint,selectedVoucher:this.props.voucherInfo, assignProfile:this.props.assignProfile});
            }
        }
        OnPressAd(){
            this.OnRedeemYes();
                // Alert.alert('Are you sure to Redeem '+this.props.voucherInfo.title+"?",
                // "",
                // [
                //     {text: 'Yes',onPress: () => {this.OnRedeemYes()}},
                //     {text: 'No', onPress: () => console.log('No Pressed')},
                // ],
                // {cancelable: false},
                // );
        }
        OnRedeemYes(){
            console.log('Yes Pressed');
            this.setState({otpModal:true});
        }
    }
    
    const styles = StyleSheet.create({
        lockit:{
            alignSelf:'flex-end',
            position:'absolute',
            width:40,height:40,
            marginTop:5,
            marginEnd:10,
        },
        image:{
            flex:1,
            width: width -20,
            height: height/5,
            resizeMode:'contain',
            borderRadius: 10,
            // position:'absolute'
            // transform:[{translateY:-width/4.8}]
        },
        title:{
            paddingTop:20,
            paddingStart:15,
            fontSize:28,
            lineHeight:28,
            // height:28*1.4,
            // borderWidth:1,
            textAlign:'left',
            fontWeight:'200',color:Colors.whiteColor,fontFamily:'Cairo-Regular'
        }, points:{
            padding:15,
            paddingTop:20,
            fontSize:20,
            lineHeight:20,
            // height:20*1.1,
            textAlign:'left',
            fontWeight:'100',color:Colors.orangeTrans,fontFamily:'Cairo-Regular'
        },
        duration:{
            marginLeft: 10,
            fontSize:15,
            textAlign:'left',
            fontWeight:'400'
        },
        view: {
            // margin: 5,
            // marginTop: 10,
            marginLeft:15,
            marginRight:15,
            backgroundColor: Colors.redTrans,
            borderColor:Colors.whiteColor,
            borderWidth:2,
            width: widthPercentageToDP('90%'),
            height: 93,
            borderRadius: 15,
            alignSelf:'center',
            justifyContent:'flex-start',
            flex:1,
            // borderWidth:2,
        }
    });
    