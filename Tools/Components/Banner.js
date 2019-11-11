import React, { Component } from 'react';
import {Image, View,Modal,StyleSheet,Dimensions,Linking,TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import * as Tools from './Tools';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import CacheImage from './CacheImage';
// import { ScrollView } from 'react-native-gesture-handler';
import WebServices from '../constants/WebServices';
import TabBarIcon from './TabBarIcon';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class AboutPark extends Component {
    
    constructor(props){
        super(props);
        this.state={
            showError:false,
            visible:false,
            language:'',data:{}
        }
    }
    componentDidMount(){
        this.checkAdVisible();
    }

    closeBanner(){
        this.setState({visible:false});
        global.AdVisible=false;
    }
    loaded=0;
    getBannerData(){
        this.loaded=1;
        return fetch(WebServices.bannerData+"?rand="+ Math.floor(Math.random() * 100000) + 1)
        .then(response  => response.text())
        .then((findresponse)=>{
            var json = JSON.parse(findresponse);
            // console.log("B I "+json.bannerImg);
            this.setState({
                data:JSON.parse(findresponse),loading:false
            });

            if(!Tools.stringIsEmpty(json.bannerImg)){
                this.setState({visible:true});
            }
            this.loaded=0;
        }).catch(function(error) {
            this.loaded=2;
            console.warn(this.loaded+' Request Failed: ', error);
            this.setState({
                data:undefined,loading:false
            });
        });
    }

    checkAdVisible(){
        if(global.AdVisible===undefined){
            this.getBannerData();
            global.AdVisible=true;
        }
    }
    
    reDirect(url){
        Linking.openURL(url);
    }
    render() {
        if(this.state.visible){
        return (
            <Modal animationType = {"none"} transparent = {true} visible={this.state.visible}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)',height:'100%',width:'100%',flexDirection:'column'}}>
        <TouchableOpacity activeOpacity={1} onPress={()=>this.reDirect(this.state.data.url)}
        style={{flex:1}} >
        <CacheImage
        bg={false}
        style={styles.imageIcon}
        uri={this.state.data.bannerImg}
        />
        {this.state.data.canclose&&<View style={styles.backView}>
        <TouchableOpacity onPress={()=>this.closeBanner()}
        style={styles.closeIcon}>
             <TabBarIcon selectedColor={ Colors.whiteColor }
        style={{alignSelf:'center'}}
        width={30}
        height={30}
        focused={true}
        name={'close'}/>
        </TouchableOpacity></View>}
        </TouchableOpacity>
        </View></Modal>
        )
        }else{
            return(<View></View>)
        }
    }
    
    OnDone(donestate){
        var isdone=this.props.onDone;
        isdone();
    }
}

const styles = StyleSheet.create({
    closeIcon:{
        alignSelf:'center',
        width:50,
        height:50,
    },
    backView:{
        position:'absolute',
        bottom:hp('0%'),
        alignSelf:'center',
        justifyContent:'center',
        width:50,
        height:50,
        // borderWidth:1,
    },
  
 
    imageIcon:{
        flex:1,
        alignSelf:'center',
        width: wp('90%'),
        height: hp('90%'),
        resizeMode:'contain',
        // borderWidth:2,
    },
    

});
