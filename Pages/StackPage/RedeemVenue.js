import React, { Component } from 'react';
import {Image, View,ScrollView,StyleSheet,Dimensions,Text,Platform,Alert,TouchableOpacity} from 'react-native';
import CacheImage from '../../Tools/Components/CacheImage';
import Colors from '../../Tools/constants/Colors';
import * as UIElements from '../../Tools/Components/UIElements'
import Verfication from '../../Tools/Components/Verification';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import * as Tools from '../../Tools/Components/Tools.js'

export default class RedeemVenue extends Component {
    
    constructor(props){
        super(props);
        this.state={
            otpModal:false
        }
        this.OnPressAd = this.OnPressAd.bind(this);
        this.OnVerifyDone=this.OnVerifyDone.bind(this);
    }

    componentDidMount(){
        Tools.updateRatePoints(1);
    }
    
    
    render() {
        return (
            <View style={{flex:1,}}>
            <TouchableOpacity onPress={()=>{this.OnPressAd()}}>
            <View style={styles.view}>
            <CacheImage
            bg={true}
            style={styles.image}
            uri={this.props.venueInfo.Image}
            />
            {/* <Gradient gradient={Colors.gradientVoucher} style={styles.view}> */}
            {/* <Text style={styles.title} >{this.props.venueInfo.title}</Text> */}
            {/* </Gradient> */}
            </View>
            {/* <Text style={styles.title} >{this.props.venueInfo.title}</Text> */}
            {/* <Text style={styles.duration}>{i18n.t('adduration')}</Text> */}
            </TouchableOpacity>
            {UIElements.drawGap(5)}
            {this.state.otpModal&&(<Verfication title='OTP Verify' details={'Redeem the '+this.props.venueInfo.Title} onDone={this.OnVerifyDone}/>)}
            </View>
            )
        }
        OnVerifyDone(otpvalue,Vstate){
            console.log("V :"+Vstate);
            this.setState({otpModal:false});
            if(Vstate){
                setTimeout(()=>{
                Alert.alert('Successfully Redeemed '+this.props.venueInfo.Title,
                "",
                [
                    {text: 'Ok',onPress: () => {}},
                    // {text: 'No', onPress: () => console.log('No Pressed')},
                ],
                {cancelable: false},
                );
            },1000);
            }
        }
        OnPressAd(){
            this.props.navigation.navigate('voucher',{voucherInfo: this.props.venueInfo,pagefrom:this.props.pagefrom,redeemPoint:this.props.redeemPoint, assignProfile:this.props.assignProfile});
                // Alert.alert('Are you sure to Redeem '+this.props.venueInfo.title+"?",
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
        image:{
            alignSelf:'center',
            width: widthPercentageToDP('40%'),
            // marginLeft:'15%',
            height: heightPercentageToDP('11%'),
            resizeMode:'contain',
            // borderWidth:1
            // borderRadius: 10,
            // position:'absolute'
            // transform:[{translateY:-width/4.8}]
        },
        title:{
            padding:15,
            fontSize:25,
            textAlign:'left',
            fontWeight:'bold',color:Colors.whiteColor
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
            // backgroundColor: 'lightblue',
            width: width -20,
            height: height/8,
            borderRadius: 10,
            alignSelf:'center',
            alignItems:'center',
            justifyContent:'center',
            flex:1,
            // borderWidth:1
            // borderWidth:1,
        }
    });
    