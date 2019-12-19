import React, { Component } from 'react';
import {Linking, View,Modal,StyleSheet,Dimensions,Text,ImageBackground,ScrollView,TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import * as UIElements from './UIElements';
import * as Tools from './Tools';
import TabBarIcon from './TabBarIcon';
import * as SecureStore from 'expo-secure-store';

import homebg from'../../assets/bg/bg-01.jpg'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import i18n from 'i18n-js';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import CacheImage from './CacheImage';
// import { ScrollView } from 'react-native-gesture-handler';
import HeaderLogo from './HeaderLogo';
import { SafeAreaView } from 'react-navigation';

export default class AboutPark extends Component {
    
    constructor(props){
        super(props);
        this.state={
            showError:false,
            visible:true,
            language:'',
        }
    }
    componentDidMount(){
        Tools.updateRatePoints(1);
        SecureStore.getItemAsync('languageENAR').then(languagecheck=>{
            this.setState({language:languagecheck})
        });
        // console.info(this.props.parkCode.details);
    }
    reDirect(url){
        Linking.openURL(url);
    }
    
    render() {
        return (
            <Modal animationType = {"slide"} transparent = {true} visible={this.state.visible}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0)',height:'100%',width:'100%'}}>
            
            <ImageBackground source={homebg} style={styles.bgImage}/>
            {/* {UIElements.drawGap(40)} */}
            {/* <Image source={appLogo} style={styles.logoImg}/>
        <View style={styles.titleView}><Text style={styles.titleTxt}>Our Parks</Text></View> */}
        <HeaderLogo headerTitle={i18n.t('ourpark')} border={true} />
        <View style={styles.modalView}>
        {/* <View style={{backgroundColor:Colors.backgroundColor,borderWidth:2,borderColor:Colors.whiteColor,borderRadius:15,width:width*0.94,justifyContent:'center'}} > */}
        {/* {UIElements.drawGap(20)} */}
        {UIElements.drawGap(hp('2%'))}
        <View style={styles.view}>
        <ScrollView
        horizontal={false}
        // scrollEnabled={false}
        showsVerticalScrollIndicator = {false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.homeScrollView}
        style={styles.homeView}>
        <CacheImage
        bg={false}
        style={styles.imageIcon}
        uri={this.props.parkCode.logo}
        />
        <View style={styles.imageView} >
        <CacheImage
        bg={false}
        style={styles.image}
        uri={this.props.parkCode.banner}
        /></View>
        {UIElements.drawGap(55)}

        {!Tools.stringIsEmpty(this.props.parkCode.titleEn)&&<Text allowFontScaling={false} style={styles.titleTxt}>{Tools.stringIsContains(i18n.locale,'en')? this.props.parkCode.titleEn:this.props.parkCode.titleAr}</Text>}
        {/* {UIElements.drawGap(hp('2%'))} */}
        <Text allowFontScaling={false} style={styles.detailsTxt}>{Tools.stringIsContains(i18n.locale,'en')? this.props.parkCode.details.en:this.props.parkCode.details.ar}</Text>
        {UIElements.drawGap(hp('2%'))}

        <TouchableOpacity style={styles.readmorebut}  onPress={()=>{this.reDirect(this.props.parkCode.website)}}>
            <Text style={styles.readmore}>
                {i18n.t('readmore')}
            </Text>
        </TouchableOpacity>
        {UIElements.drawGap(hp('2%'))}
        </ScrollView>
        </View>
        
        {/* </View> */}
        </View>
        <SafeAreaView style={styles.backView}>
        <TouchableOpacity style={styles.backbut}  onPress={()=>{this.OnDone(false)}}>
        <TabBarIcon selectedColor={ Colors.whiteColor }
        style={{alignSelf:'center'}}
        width={30}
        height={30}
        focused={true}
        name={'close'}/>
        </TouchableOpacity></SafeAreaView>
        </View></Modal>
        )
    }
    
    OnDone(donestate){
        var isdone=this.props.onDone;
        isdone();
    }
}

const styles = StyleSheet.create({
    readmorebut:{
        alignSelf:'center',
        borderWidth:2,
        borderColor:Colors.whiteColor,
        justifyContent:'center',
        borderRadius:15,
        // marginStart:20,
    }, 
    readmore:{
        padding:5,
        color:Colors.whiteColor,
        alignSelf:'center',
        fontFamily:'Cairo-Regular',
        fontSize:15
    },
    backView:{
        position:'absolute',
        bottom:hp('5%'),
        alignSelf:'center',
        width:50,
        height:50,
    },
    backbut:{
        alignSelf:'center',
        width:50,
        height:50,
    },
    homeScrollView:{
        // flexGrow:1,
        flexDirection:'column',
        alignContent:'flex-start',
        alignItems:'flex-start'
    },
    homeView:{
        width:wp('95%'),
        height:hp('68%'),
        minHeight:hp('68%')
    },
    imageIcon:{
        alignSelf:'flex-start',
        width: hp('20%'),
        height: hp('10%'),
        resizeMode:'contain',
    },
    bgImage:{
        position:'absolute',
        alignSelf:'center',
        width:'100%',
        height:height,
        resizeMode:'contain'
    },
    
    
    modalView:{
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        // transform:[{scaleX:1*AdaptiveWidth(375)},{scaleY:1*AdaptiveWidth(375)}],
    },
    
    
    imageView:{
        width: wp('95%'),
        height:wp('15%'),
        maxHeight:wp('15%'),
    },
    image:{
        // flex:1,
        width: '95%',
        height:105,
        // height:heightPercentageToDP('10%'),
        // height:'100%',
        resizeMode:'cover',
        borderRadius: 10,
        alignSelf:'center',
    },
    titleTxt:{
        alignSelf:'flex-start',
        textAlign:'left',
        color:Colors.whiteColor,
        fontWeight:'bold',
        fontFamily:'Cairo-Bold',
        fontSize: hp('2.5%'),
        lineHeight: hp('2.5%')*1.4,
        // lineHeight:AdaptiveWidth(24),
        padding:10,
    },
    
    detailsTxt:{
        alignSelf:'flex-start',
        textAlign:'left',
        color:Colors.whiteColor,
        fontWeight:'100',
        fontFamily:'Cairo-Regular',
        fontSize: hp('2%'),
        lineHeight: hp('2%')*1.4,
        // lineHeight:AdaptiveWidth(24),
        padding:10,
    },
    view: {
        // margin: 5,
        // marginTop: 10,
        width: wp('95%'),
        borderRadius: 10,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderColor:Colors.whiteColor,
        borderRadius:15,
        backgroundColor:Colors.redTrans
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
