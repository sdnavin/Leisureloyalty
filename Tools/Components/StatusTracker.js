import React from 'react'
import {View,StyleSheet,Text,Dimensions} from 'react-native'
import Colors from '../constants/Colors';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import * as UiElements from './UIElements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class StatusTracker extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
    return (
        <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'center',width:wp('95%')}} >
        <View style={[styles.roundView,this.props.selected==0? {backgroundColor:Colors.whiteColor}:{backgroundColor:Colors.backgroudColor}] }>
           <Text allowFontScaling={false} style={[styles.stageNo,this.props.selected!=0? {color:Colors.whiteColor}:{color:Colors.inputfontColor}] } >1</Text>
        </View>
        {UiElements.drawLine(Colors.whiteColor,20,2)}
        <View style={[styles.roundView,this.props.selected==1? {backgroundColor:Colors.whiteColor}:{backgroundColor:Colors.backgroudColor}] }>
           <Text allowFontScaling={false}  style={[styles.stageNo,this.props.selected!=1? {color:Colors.whiteColor}:{color:Colors.inputfontColor}]} >2</Text>
        </View>
        {UiElements.drawLine(Colors.whiteColor,20,2)}
        <View style={[styles.roundView,this.props.selected==2? {backgroundColor:Colors.whiteColor}:{backgroundColor:Colors.backgroudColor}] }>
           <Text allowFontScaling={false}  style={[styles.stageNo,this.props.selected!=2? {color:Colors.whiteColor}:{color:Colors.inputfontColor}]} >3</Text>
        </View>
        {UiElements.drawLine(Colors.whiteColor,20,2)}
        <View style={[styles.roundView,this.props.selected==3? {backgroundColor:Colors.whiteColor}:{backgroundColor:Colors.backgroudColor}] }>
           <Text allowFontScaling={false}  style={[styles.stageNo,this.props.selected!=3? {color:Colors.whiteColor}:{color:Colors.inputfontColor}]} >4</Text>
        </View>
        </View>
    );
    }
}


const styles = StyleSheet.create({
    roundView:{
        borderColor:Colors.whiteColor,
        borderWidth:2,
        borderRadius:hp('3.2%'),
        width:hp('3.2%'),
        height:hp('3.2%'),
        justifyContent:'center'
    },
    stageNo:{
        fontFamily:'Cairo-Regular',
        fontSize:hp('2.1%'),
        lineHeight:hp('3.7%'),
        height:hp('3.7%'),
        textAlign:'center',
        alignSelf:'center'
    },
})

