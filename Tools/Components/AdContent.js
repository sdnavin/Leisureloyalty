import React, { Component } from 'react';
import  { View,Text,StyleSheet,Dimensions,TextInput, TouchableOpacity,Linking,Image,ScrollView } from 'react-native';
import * as UiElements from './UIElements';
import { HeaderBackButton } from 'react-navigation';
import defaultbanner from '../../assets/banner.jpg'
import defaultLogo from '../../assets/adlogo.png'
import i18n from 'i18n-js';
import CacheImage from './CacheImage';
// import Gradient from 'react-native-css-gradient';
import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class AdContent extends Component {
    
    static navigationOptions = ({navigation}) => {
        return{
             header:null,
            };
        };
    constructor(props){
        super(props);
        this.state={
            isloading:true,
            Bheight:300,imagesin:0,
        }
    }
    Bwidth='100%';
    Bheight=300;
    onloadEnd(){

    }
    checkLoading(elements){
        return(<View style={{flex:1}} >
          {elements}
          <OverlayLoad size='small' color={Colors.whiteColor} isopen={this.state.isLoading} onDismiss={this.onloadEnd} />
          </View>);
    }

    onImageIn=()=>{
        console.log("In");
        this.setState({imagesin:(this.state.imagesin+1)},()=>{
            if(this.state.imagesin>=2){
                this.setState({isloading:false});
                
            }
        });
    }

    render() {
        return (
           this.checkLoading(
            <View>
            <TouchableOpacity style={styles.controlBar}
            onPress={()=>{this.closeStack()}}><Text style={styles.cancelB}>{i18n.t('close')}</Text></TouchableOpacity>
            <CacheImage uri={this.props.navigation.getParam("parkInfo").banner} bg={true} onDone={this.onImageIn} style={[styles.banner,{width:this.Bwidth,height:this.state.Bheight}]}></CacheImage>
            <ScrollView
            onScroll={event => { 
                this.Bheight=260+ (-1*event.nativeEvent.contentOffset.y);
                this.setState({Bheight:this.Bheight});
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator = {false}>
            {UiElements.drawGap(240)}
            <View style={styles.roundedView}>
            {/* <Gradient gradient={Colors.gradient} style={styles.gradStyle}/> */}

            <CacheImage uri={this.props.navigation.getParam("parkInfo").logo} bg={false} style={styles.logo}></CacheImage>
                {/* <Text style={styles.heading}>{this.props.navigation.getParam("parkInfo").title}</Text> */}
            {UiElements.drawGap(15)}

                {/* <Text style={styles.duration}>{i18n.t('adduration')}</Text> */}
            {/* {UiElements.drawGap(15)} */}

                {UiElements.drawLine('gray')}
            {UiElements.drawGap(15)}
                <Text style={styles.details}>{this.props.navigation.getParam("parkInfo").details}</Text>

                {UiElements.drawGap(15)}
                <TouchableOpacity style={styles.buttonSign}
                onPress={()=>{this.reDirect(this.props.navigation.getParam("parkInfo").website)}}>
                    {/* <Gradient gradient={Colors.gradientBut} style={styles.buttonSign}> */}
                    <Text style={styles.buttontext}>
                        More details
                    </Text>
                    {/* </Gradient> */}
                </TouchableOpacity>
                {/* {UiElements.drawGap(height/2)} */}

            </View>
            </ScrollView>
            
            </View>)
            )
        }

        reDirect(url){
            Linking.openURL(url);
        }
        
        closeStack = () =>{
            {
                this.props.navigation.goBack();
            }
        }
    }
    
    
    
    const styles = StyleSheet.create({
        buttonSign:{
            // flex:1,
            width:width/1.25,
            height:60,
            alignSelf:'center',
            alignItems:'center',
            backgroundColor:'grey',
            borderRadius:10,
            justifyContent:'center'
        },
        buttontext:{
            fontSize:20,
            color:'white'
        },
        gradStyle:{
            position:'absolute',
            width:width,
            height:height,
            zIndex:-1,
            borderRadius:15,
        },
        logo:{
            alignSelf:'center',
           width:300,
           height:100,
           resizeMode:'contain'
        },
        banner: {
            alignSelf:'center',
            position:'absolute',
        },heading:{
            fontWeight:'bold',
            fontSize:30,
            textAlign:'left'
        },duration:{
            fontSize:20,
            fontWeight:'600',
            textAlign:'left'
        },details:{
            fontSize:20,
            fontWeight:'300',
            textAlign:'justify',
            color:Colors.darkfontColor
        },
        roundedView:{
            padding:15,
            borderRadius:10,
            width:'100%',
            // height:'100%',
        },
        rowView:{
            paddingLeft:width/2.5,
            flexDirection:'row',
            alignContent:'center',
            alignItems:'center',
        },
        homeView: {
            flex:1,
            // alignItems:'center',
        },
        controlBar:{
            paddingTop:40,
            position:'absolute',
            zIndex:1,
            width:width,
        },cancelB:{
            padding:10,
            color:'white',
            fontSize:20,
            fontWeight:'300',
            alignSelf:'flex-end'
        }
    });