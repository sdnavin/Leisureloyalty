import React, { Component } from 'react';
import {Image, View,Modal,StyleSheet,Dimensions,Text,Platform,TextInput,TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import * as UIElements from './UIElements';
import * as Tools from './Tools';
import TabBarIcon from './TabBarIcon';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import {AdaptiveWidth,AdaptiveHeight} from './AdaptiveSize';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default class PopUpVoucher extends Component {
    
    constructor(props){
        super(props);
        this.OnSubmit = this.OnSubmit.bind(this);
        this.state={
            voucherValue:'AB-123-1234',
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
            <Text style ={styles.title} allowFontScaling={false}>{this.props.content.Title}</Text>
            <Text style ={styles.duration} allowFontScaling={false}>{this.props.content.SubHeading}</Text>
            {UIElements.drawGap(20)}
            <View style={styles.inputView}> 
            <Text  allowFontScaling ={false}
            style={styles.inputValue}>{this.props.content.ContentCode}</Text></View>
            {UIElements.drawGap(20)}
            <TouchableOpacity style={styles.Button} onPress={()=>{this.OnSubmit()}}>
            <Text style={styles.buttontext} >Done</Text>
            </TouchableOpacity>
            {UIElements.drawGap(20)}
            </View>
            </View></View></Modal>
            )
        }
            OnSubmit(){
                this.setState({visible:false},this.OnDone(true));
            }
            OnDone(donestate){
                var isdone=this.props.onDone;
                isdone(donestate);
            }
        }
        
        const styles = StyleSheet.create({
            inputValue: {
                fontSize: 20,
                textAlign:'left',
                fontWeight:'200',
                // height:AdaptiveWidth(7.5),
                color: Colors.inputfontColor,
                padding:10,
                fontFamily:'Cairo-Regular',
                alignSelf:'center'
            },
            inputView:{
                width:250,
                height:60,
                backgroundColor:Colors.inputboxColor,
                borderRadius:15,
                borderWidth:2,
                borderColor:Colors.whiteColor,
                justifyContent:'center',
                alignSelf:'center'
            },
            warning:{
                color:'#ed4f3b',
                paddingTop:15,
                // paddingBottom:15,
                fontWeight:'500',
                
                fontFamily:'Cairo-Regular',
                fontSize:20,
            },
            modalView:{
                alignContent:'center',
                justifyContent:'center',
                alignItems:'center',
            },
            Button:{
                // flex:1,
                width:200,
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
                width: 350,
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
                fontSize: AdaptiveWidth(12),
                // lineHeight: AdaptiveWidth(15) * 1.6,
                // height: AdaptiveWidth(15)* 1.3*3, 
            },
            duration:{
                marginLeft: 10,
                fontSize:20,
                textAlign:'center',
                color:Colors.whiteColor,
                fontWeight:'100',
                
                fontFamily:'Cairo-Regular',
            },
        });
        