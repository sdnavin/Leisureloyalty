import React, { Component } from 'react'
import {StyleSheet,View,Text,Button,TouchableOpacity,Platform,Dimensions} from 'react-native'
import * as Tools from '../Components/Tools'
import * as UiElements from './UIElements'
import QuestionAnswer from './QuestionAnswer';
import i18n from 'i18n-js';
import Colors from '../constants/Colors';


const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class Help extends Component {
    
    
    static navigationOptions = ({navigation}) => {
        return{
            
            headerTitle: navigation.getParam('otherParam'),
            headerTintColor: Colors.darkfontColor,
            headerStyle: {
                backgroundColor: Colors.yellowColor
            },
            headerTitleStyle:{textAlign:'center',
            fontWeight: 'bold',flex:1,fontFamily:'Cairo-Bold'},
            
        };
    };

    componentDidMount(){
        Tools.updateRatePoints(2);
    }
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <View style={{flex:1}}>
            
            <View style={styles.homeView}>
            
            <Text allowFontScaling={false} style={styles.heading}>{i18n.t('faqs')}</Text>
            {UiElements.drawGap(10)}
            <QuestionAnswer/>
            </View></View>
            )
        }
    }
    
    const styles = StyleSheet.create({
        gradStyle:{
            position:'absolute',
            width:width,
            height:height,
            zIndex:-1,
        },
        homeView:{
            margin:20,
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
    