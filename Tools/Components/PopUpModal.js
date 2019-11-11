import React, { Component } from 'react';
import {Image, View,Modal,StyleSheet,Dimensions,Text,Platform,TextInput,TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import * as UIElements from './UIElements';
import * as Tools from './Tools';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import {AdaptiveWidth,AdaptiveHeight} from './AdaptiveSize';
import i18n from 'i18n-js';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default class PopUpModal extends Component {
    
    constructor(props){
        super(props);
        this.OnSubmit = this.OnSubmit.bind(this);
        this.state={
            val:'',
            showError:false,
            visible:true
        }
    }
    changeHappened(){

    }

    componentDidMount(){
        Tools.updateRatePoints(1);
    }
    
    render() {
        return (
            <Modal animationType = {"slide"} transparent = {true} visible={this.state.visible}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.85)',height:'100%',width:'100%',justifyContent:'center'}}>
            <View style={styles.modalView}>
            <View style={{backgroundColor:Colors.popupDiag,borderWidth:2,borderColor:Colors.whiteColor,borderRadius:15,width:widthPercentageToDP('90%')}} >
                {/* <Image source= ></Image> */}
            <Text style ={styles.title} allowFontScaling={false}>{this.props.title}</Text>
            {UIElements.drawGap(10)}
            <TouchableOpacity style={styles.Button} onPress={()=>{this.OnSubmit()}}>
            <Text style={styles.buttontext} >{i18n.t('yes')}</Text>
            </TouchableOpacity>
            {UIElements.drawGap(15)}
            <TouchableOpacity style={styles.Button} onPress={()=>{this.OnDone(false)}}>
            <Text style={styles.buttontext} >{i18n.t('no')}</Text>
            </TouchableOpacity>
            {UIElements.drawGap(20)}
            </View>
            </View></View></Modal>
            )
        }
        checkInput(){
            if(this.state.showError){
            return(
                <View>
                <Text style={styles.warning}>Please enter the OTP</Text></View>
            );
            }
        }
        OnSubmit(){
            // if(Tools.stringIsEmpty(this.state.val)){
            // this.setState({showError:true});
            // return;
            // }
            //check OTP
            this.setState({visible:false},this.OnDone(true));
            
        }
        OnDone(donestate){
            otpcode=this.state.val;
            var isdone=this.props.onDone;
            isdone(otpcode,donestate);
        }
    }
    
    const styles = StyleSheet.create({
        warning:{
            color:'#ed4f3b',
            paddingTop:15,
            // paddingBottom:15,
            fontWeight:'500',

            fontFamily:'Cairo-Regular',
            fontSize: AdaptiveWidth(20),
            lineHeight: AdaptiveWidth(20) * 1.6,
            height: AdaptiveWidth(20)* 1.3, 
        },
        modalView:{
            alignContent:'center',
            justifyContent:'center',
            alignItems:'center',
            // transform:[{scaleX:1*AdaptiveHeight(810)},{scaleY:1*AdaptiveHeight(810)}],
        },
        Button:{
            // flex:1,
            width:200,
            // height:35,
            alignSelf:'center',
            alignItems:'center',
            backgroundColor:Colors.backgroudColor,
            borderRadius:10,borderWidth:2,borderColor:Colors.whiteColor,
            justifyContent:'center'
        },
        buttontext:{
            fontSize:20,
            // lineHeight:24,
            // height:25,
            color:'white',
            fontFamily:'Cairo-Regular',
            alignSelf:'center'
            // lineHeight: AdaptiveWidth(18) * 1.6,
            // height: AdaptiveWidth(18)* 1.3, 
        },
        inputNo:{
            alignSelf:'center',
            backgroundColor:Colors.inputboxColor,
            color:Colors.darkfontColor,
            width:60*4,
            height:60,
            fontSize:22,
            fontWeight:'bold',
            justifyContent:'center',
            alignItems:'center',textAlign:'center'
        },
        image:{
            flex:1,
            width: width -40,
            height: height/4,
            resizeMode:'contain',
            borderRadius: 10,
            // position:'absolute'
            // transform:[{translateY:-width/4.8}]
        },
        title:{
            padding:15,
            textAlign:'center',
            fontWeight:'100',
            color:Colors.whiteColor,

            fontFamily:'Cairo-Regular',
            fontSize: 23,
            lineHeight:30,
            // lineHeight: AdaptiveWidth(15) * 1.6,
            // height: AdaptiveWidth(15)* 1.3*3, 
        },
        duration:{
            marginLeft: 10,
            fontSize:20,
            textAlign:'center',
            color:Colors.whiteColor,
            fontWeight:'400',

            fontFamily:'Cairo-Regular',
            fontSize: AdaptiveWidth(18),
            lineHeight: AdaptiveWidth(18) * 1.6,
            height: AdaptiveWidth(18)* 1.3, 
        },
        view: {
            // margin: 5,
            // marginTop: 10,
            backgroundColor: 'lightblue',
            width: width -40,
            height: height/4,
            borderRadius: 10,
            alignSelf:'center',
            alignItems:'center',
            justifyContent:'center',
            flex:1,
            // borderWidth:2,
        },
        rowView:{
            // flex:1,
            flexDirection:'row',
            width:'100%',
            height:60,
            // borderWidth:2,
            justifyContent:'space-around'
        }
    });
    