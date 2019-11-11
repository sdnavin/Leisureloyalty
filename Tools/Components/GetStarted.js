import React, { Component } from 'react'
import  { View,Text,StyleSheet,TouchableOpacity,Dimensions,Image } from 'react-native'
import i18n from 'i18n-js';
import Colors from '../constants/Colors';
import {AdaptiveWidth,AdaptiveHeight} from '../Components/AdaptiveSize';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import cardbg from '../../assets/cardbg.png';
import cardbg1 from '../../assets/cardbg1.png';


import loginIcon from '../../assets/Icons/login.png'
import registerIcon from '../../assets/Icons/register0.png'
import rulesIcon from '../../assets/Icons/rules.png'
import ProfileData from './ProfileData';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class GetStarted extends Component {
    
    constructor(props){
        super(props);
        this.state={
            locale:'',showLogin:false
        }
    }
    
    
    drawGap=(valueGap)=>{
        return(
            <View
            style={{paddingTop:valueGap}}/>
            );
        }
        
        render() {
            return (
                <View style={styles.totalView}>
                <Image source={this.props.pagefrom==='card'?cardbg1:cardbg} style={styles.bgcard}/>
                {/* {this.getLocale()} */}
                {/* {this.drawGap(10)} */}
                <Text style={styles.heading} allowFontScaling ={false}>{i18n.t('cardtitle')}</Text>
                <View style={styles.rowView}>
                <TouchableOpacity style={styles.buttonB}
                onPress={()=>this.props.navigation.navigate('rules',{
                    navigation:this.props.navigation,pagefrom:this.props.pagefrom
                })}>
                <Image source={rulesIcon} style={styles.ImgIcon} ></Image>
                
                <Text style={styles.buttontxt} allowFontScaling ={false}>{i18n.t('programrules')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonB}
                onPress={()=>
                    this.setState({showRegister:true})
                    // this.props.navigation.navigate('Register',{
                    // pagefrom:'getstart',
                    // navigation:this.props.navigation,
                    // assignProfile:this.props.assignProfile,
                    // sendOTP:this.props.sendOTP,
                    // verifyOTP:this.props.verifyOTP})
                    
                    }>
                
                        <Image source={registerIcon} style={styles.ImgIcon} ></Image>
                        <Text style={styles.buttontxt} allowFontScaling ={false}>{i18n.t('register')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonB}
                        onPress={()=>{ this.setState({showLogin:true});
                            // this.props.navigation.navigate('FullScreen',{
                            //     navigation:this.props.navigation,
                            //     assignProfile:this.props.assignProfile,
                            //     sendOTP:this.props.sendOTP,
                            //     verifyOTP:this.props.verifyOTP})
                                }}>
                                <Image source={loginIcon} style={styles.ImgIcon} ></Image>
                                <Text style={styles.buttontxt} allowFontScaling ={false}>{i18n.t('login')}</Text>
                                </TouchableOpacity>
                              

                                </View>
                                {this.drawGap(AdaptiveWidth(50))}
                                {this.state.showLogin&&(<ProfileData pagetogo='login' navigation={this.props.navigation} onDismiss={()=>this.setState({showLogin:false})} />)}
                                {this.state.showRegister&&(<ProfileData pagetogo='register' pagefrom='getstart' navigation={this.props.navigation} onDismiss={()=>this.setState({showRegister:false})} />)}
                                </View>
                                )
                            }
                            
                        }
                        
                        const styles = StyleSheet.create({
                            
                            ImgIcon:{
                                // width:AdaptiveWidth(5),height:AdaptiveWidth(5)
                                width:hp('10%'),height:hp('10%'),resizeMode:'contain'
                                
                            },
                            rowView:{
                                flex: 1, 
                                flexDirection: 'row',
                                // width:'100%',
                                width:hp('40%'),
                                justifyContent:'space-evenly'
                            },
                            bgcard:{
                                position:'absolute',
                                resizeMode:'contain',
                                width:wp('95%'),
                                left:0,
                                top:0,
                                height:hp('28%'),
                            },
                            totalView:{
                                marginTop:10,
                                marginBottom:10,
                                // flex:1,
                                alignSelf:'center',
                                alignItems:'center',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                // borderWidth:1,
                                elevation: 5,
                                height:hp('28%'),
                                width:wp('95%'),
                            },
                            heading:{
                                fontSize:hp('4%'),
                                fontWeight:'300',
                                // paddingBottom:AdaptiveWidth(40),
                                color:Colors.darkfontColor,
                                fontFamily:'Cairo-Regular',
                            },
                            subheading:{
                                fontSize:20,
                                fontWeight:'400',
                                paddingBottom:20,
                                color:Colors.blueHardColor,
                                
                                fontFamily:'Cairo-Regular',
                                fontSize: AdaptiveWidth(20),
                                // lineHeight: AdaptiveWidth(20) * 1.4,
                                // height: AdaptiveWidth(20)* 1.2,
                                
                            },buttonB:{
                                // flex:.25,
                                // borderWidth:1,
                                width: hp('12%'),
                                height: hp('18%'),
                                alignItems:'center',
                                backgroundColor:'rgba(231,64,32,0.5)',
                                // borderRadius:10,
                                justifyContent:'center'
                            },buttontxt:{
                                alignSelf:'center',
                                textAlign:'center',
                                color:'white',
                                fontSize:hp('1.75%'),
                                paddingTop:15,
                                fontWeight:'400',
                                
                                fontFamily:'Cairo-Regular',
                                // fontSize: AdaptiveWidth(28),
                                lineHeight: 18 
                                // height: AdaptiveWidth(18)* 1.5,
                            }
                        });
                        