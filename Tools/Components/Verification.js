import React, { Component } from 'react';
import {Image, View,Modal,StyleSheet,Dimensions,Text,Platform,TextInput,TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import * as UIElements from './UIElements';
import * as Tools from './Tools';
import TabBarIcon from './TabBarIcon';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import {AdaptiveWidth,AdaptiveHeight} from '../Components/AdaptiveSize';
import i18n from 'i18n-js';

export default class Verfication extends Component {
    
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
    
    render() {
        return (
            <Modal animationType = {"slide"} transparent = {true} visible={this.state.visible}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.85)',height:'100%',width:'100%',justifyContent:'center'}}>
            <View style={styles.modalView}>
            <View style={{backgroundColor:Colors.popupDiag,borderWidth:2,borderColor:Colors.whiteColor,borderRadius:15,width:width*0.9,justifyContent:'center'}} >

            <Text style ={styles.title} allowFontScaling={false}>{this.props.title}</Text>
            {/* <Text style ={styles.duration} allowFontScaling={false}>{this.props.details}</Text> */}

            
            <View style={styles.inputView}> 
            <TextInput style={styles.inputNo}
            allowFontScaling={false}
            editable={true}
            value={this.state.val}
            onChangeText={(text) => {this.setState({val:text});
            this.changeHappened();  
        }}
            keyboardType='number-pad'
            returnKeyType='done'
            maxLength={4}
            placeholder={i18n.t('pleaseentertheotp')}/>
            </View>
            {this.checkInput()}
            {UIElements.drawGap(20)}


            <TouchableOpacity style={styles.Button} onPress={()=>{this.OnSubmit()}}>
            <Text style={styles.buttontext} >{i18n.t('verify')}</Text>
            </TouchableOpacity>
            {UIElements.drawGap(20)}
            <TouchableOpacity style={{alignSelf:'center'}}  onPress={()=>{this.OnDone(false)}}>
            <TabBarIcon selectedColor={ Colors.whiteColor }
                width={30}
                height={30}
                focused={true}
                name={'close'}/>
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
                <Text style={styles.warning}>{i18n.t('pleaseentertheotp')}</Text></View>
            );
            }
        }
        OnSubmit(){
            if(Tools.stringIsEmpty(this.state.val)){
                this.setState({showError:true});
                return;
            }
            //check OTP
            // this.setState({visible:false},this.OnDone(true));
            this.OnDone(true);
        }
        OnDone(donestate){
            otpcode=this.state.val;
            var isdone=this.props.onDone;
            isdone(otpcode,donestate);
        }
    }
    
    const styles = StyleSheet.create({
        inputView:{
            width:width*0.75,
            height:AdaptiveWidth(7.5),
            backgroundColor:Colors.inputboxColor,
            borderRadius:15,
            borderWidth:2,
            borderColor:Colors.whiteColor,
            justifyContent:'center',
            alignSelf:'center'
        },
        warning:{
            color:Colors.whiteColor,
            paddingTop:15,
            marginLeft:30,
            fontWeight:'500',
            fontFamily:'Cairo-Regular',
            fontSize: AdaptiveWidth(20),
        },
        modalView:{
            alignContent:'center',
            justifyContent:'center',
            alignItems:'center',
        },
        Button:{
            // flex:1,
            width:width/2,
            height:AdaptiveWidth(10),
            alignSelf:'center',
            alignItems:'center',
            backgroundColor:Colors.backgroudColor,
            borderRadius:10,
            borderColor:Colors.whiteColor,
            borderWidth:2,
            justifyContent:'center'
        },
        buttontext:{
            fontSize:20,
            color:'white',

            fontFamily:'Cairo-Regular',
            fontSize: AdaptiveWidth(18),
            lineHeight: AdaptiveWidth(18) * 1.6,
            height: AdaptiveWidth(18)* 1.3, 
        },
        inputNo:{
            alignSelf:'center',
            color:Colors.darkfontColor,
            width:60*4,
            height:60,
            fontSize:22,
            fontWeight:'100',
            fontFamily:'Cairo-Regular',
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
            fontSize:25,
            textAlign:'center',
            fontWeight:'bold',
            color:Colors.whiteColor,

            fontFamily:'Cairo-Bold',
            fontSize: AdaptiveWidth(15),
            // lineHeight: AdaptiveWidth(15) * 1.6,
            // height: AdaptiveWidth(15)* 1.3, 
        },
        duration:{
            marginLeft: 10,
            fontSize:20,
            textAlign:'center',
            color:Colors.whiteColor,
            fontWeight:'400',

            fontFamily:'Cairo-Regular',
            fontSize: AdaptiveWidth(18),
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
    