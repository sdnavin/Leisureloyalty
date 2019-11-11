import React, { Component } from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity,Dimensions,Animated,Easing,ScrollView} from 'react-native'
import * as UiElements from './UIElements'
import Colors from '../constants/Colors';
// import { ScrollView } from 'react-native-gesture-handler';
import proceedB from '../../assets/Icons/back.png'

import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import * as Tools from './Tools';
import { heightPercentageToDP } from 'react-native-responsive-screen';


let scaleValue = new Animated.Value(0); // declare an animated value


export default class QuestionAnswer extends Component {
    
    
    constructor(props){
        super(props);
        this.state={
            showAnswer:0,
            language:'',
            isloading:true,
            
        }
        scaleValue.setValue(0);
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 150,
            easing: Easing.linear,
        }).start();
    }
    datatoDisplay=[];
    componentDidMount(){
        SecureStore.getItemAsync('languageENAR').then(languagecheck=>{
            // console.info(this.props.data)
            this.datatoDisplay=(Tools.stringIsContains(languagecheck,'en')? this.props.data.en.Questions:this.props.data.ar.Questions);
            this.setState({language:languagecheck,isloading:false});
        });
    }
    
    showAnswer(idshow){
        
        this.setState({showAnswer:idshow},()=>{
            scaleValue.setValue(0);
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 150,
                easing: Easing.linear,
            }).start();
        });
    }
    checkAnswer(currentAns){
        
        const cardScale = scaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1,1]
        });
        let transformStyle = {transform:[{scaleY:((this.state.showAnswer===currentAns)?(cardScale):1)}]  ,borderWidth:(this.state.showAnswer===currentAns)?2:0,backgroundColor:(this.state.showAnswer===currentAns)?Colors.redTrans:Colors.backgroundColor,borderColor:Colors.whiteColor,borderRadius:15,padding:10};
        return(
            <Animated.View key={'T'+currentAns} style={ transformStyle}>
            {UiElements.drawGap(10)}
            <TouchableOpacity style={styles.rowView} key={'TO'+currentAns} onPress={()=>this.showAnswer(currentAns)} >
            <Text key={currentAns} allowFontScaling={false} style={styles.subheading} >{this.datatoDisplay[currentAns].question}</Text>
            {(this.state.showAnswer!=currentAns)&&(<Image source={proceedB} style={styles.proceedstyle}></Image>)}
            </TouchableOpacity>
            {(this.state.showAnswer===currentAns)&&(<Text allowFontScaling={false} style={styles.answers}>{this.datatoDisplay[currentAns].answer}</Text>)}
            {(this.state.showAnswer!=currentAns)&&(UiElements.drawLine(Colors.whiteColor,width/1.1,1))}
            
            </Animated.View>
            );
        }
        
        
        AddQuestion(){
            alllines=[];
            console.log('Q :'+this.datatoDisplay.length);
            for(let t=0;t<this.datatoDisplay.length;t++){
                alllines.push(this.checkAnswer(t))
            }
            return alllines;
        }
        render() {
            return (
                <View >
                    {!this.state.isloading&&(
                <ScrollView
                showsVerticalScrollIndicator = {false}
                scrollEnabled={true}
                contentContainerStyle={styles.homeScrollView}
                style={styles.homeView}>
                {this.AddQuestion()}
                </ScrollView>)}
                </View>
                )
            }
            
        }
        
        const styles = StyleSheet.create({
            rowView:{
                flexDirection:'row'
            },
            proceedstyle:{
                alignSelf:'center',
                transform:[{rotateZ:'-90deg'}],
                width:18,
                height:18
            },
            homeScrollView:{
                
                flexDirection:'column',
                alignContent:'center',
            },
            homeView:{
                height:heightPercentageToDP('62%'),
                // minHeight:heightPercentageToDP('40%'),
            },
            subheading: {
                fontSize: 20,
                lineHeight:26,
                // height:25,
                fontWeight: '200',
                paddingBottom:5,
                width:'90%',
                textAlign:'left',
                color:Colors.darkfontColor,fontFamily:'Cairo-Regular'
            },
            answers: {
                textAlign:'left',
                fontSize: 16,
                lineHeight:22,
                fontWeight: '100',
                paddingBottom:5,
                color:Colors.blueHardColor,fontFamily:'Cairo-Regular'
            }
        });
        