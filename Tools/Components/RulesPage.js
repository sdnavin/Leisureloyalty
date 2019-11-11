import React, { Component } from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity,ImageBackground,Dimensions} from 'react-native'
import * as UiElements from './UIElements'
import QuestionAnswer from './QuestionAnswer';
import i18n from 'i18n-js';
import Colors from '../constants/Colors';

import WebServices from '../../Tools/constants/WebServices'

import appLogo from '../../assets/Icons/leisure_white.png'
import homebg from'../../assets/bg/bg-01.jpg'
import homebg1 from'../../assets/bg/bg-02.jpg'

import backIcon from'../../assets/Icons/back.png'
import HeaderLogo from './HeaderLogo';
import OverlayLoad from './OverlayLoad';
import BackButton from './BackButton';
import * as Tools from './Tools'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class RulesPage extends Component {
    
    static navigationOptions = ({navigation}) => {
        return{
            header:null,
            headerVisible:false,
           
        };
    };
    constructor(props){
        super(props);
        this.state={
            data:{},
            loading:true
        }
    }

    componentDidMount(){
        this.getRulesData();
            Tools.updateRatePoints(1);
    }
    
    getRulesData(){
        return fetch(WebServices.faq+"?rand="+ Math.floor(Math.random() * 100000) + 1 )
        .then((response) => response.text())
        .then((findresponse)=>{
            // console.log('fi'+findresponse);
            var json = JSON.parse(findresponse);
            this.setState({
                data:JSON.parse(findresponse),loading:false
            })
        }).catch(function(error) {
            console.warn('Request Failed: ', error);
          });
    }

    checkLoading(){
        if(!this.state.loading){
            return(
                <QuestionAnswer data={this.state.data}/>
            )
        }else{
            <OverlayLoad size='large' color='gray'/>
        }
    }
    
    render() {
        return (
            <View style={{flex:1}}>
            <ImageBackground source={this.props.navigation.state.params.pagefrom==='home'?homebg:homebg1} style={styles.bgImage}/>
            {/* {UiElements.drawGap(40)} */}
            {/* <Image source={appLogo} style={styles.logoImg}/>
            <View style={styles.titleView}><Text allowFontScaling={false} style={styles.titleTxt}>Rules</Text></View> */}
            <HeaderLogo headerTitle={i18n.t('programrules')} border={true}/>
            <View style={styles.homeView}>
            {UiElements.drawGap(10)}
            {this.checkLoading()}
            {UiElements.drawGap(10)}
            {/* <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}><Image source={backIcon} style={styles.backIcon}/></TouchableOpacity> */}
            </View>
            <BackButton onpress={()=>{this.props.navigation.goBack()}}/>
            </View>
            )
        }
    }
    
    const styles = StyleSheet.create({
      
        backIcon:{
            alignSelf:'center',
            marginTop:20,
            width:40,
            height:40
        },
       
        bgImage:{
            position:'absolute',
            alignSelf:'center',
            width:'100%',
            height:height,
        },
        homeView:{
            margin:10,
        },
        heading: {
            fontSize: 40,
            fontWeight: 'bold',
            paddingBottom:5,
            color:Colors.darkfontColor,
            fontFamily:'Cairo-Bold'
            
        },
        subheading: {
            fontSize: 22,
            fontWeight: 'bold',
            paddingBottom:5,
            color:Colors.darkfontColor,
            fontFamily:'Cairo-Bold'
        },
        answers: {
            fontSize: 20,
            fontWeight: '700',
            paddingBottom:5,
            color:Colors.blueHardColor,
            fontFamily:'Cairo-Regular'
        }
        
    });
    