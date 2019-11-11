import React, { Component } from 'react'
import  { ScrollView,View,Text,StyleSheet,TouchableOpacity,Dimensions,Image } from 'react-native'
import i18n from 'i18n-js';
import Colors from '../constants/Colors';

// import cardbg from '../../assets/cardbg.png';
// import cardbg1 from '../../assets/cardbg1.png';
import nextbut from '../../assets/Icons/back.png';
import prevbut from '../../assets/Icons/front.png';


import {connect} from 'react-redux';


import CacheImage from './CacheImage';
import AboutPark from './AboutPark';
import * as Tools from './Tools';

// import ProfileData from './ProfileData';
import WebServices from '../../Tools/constants/WebServices';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';

class OurPark extends Component {
    loaded=0;
    
    constructor(props){
        super(props);
        this.state={
            locale:'',
            showModal:false,
            parkCode:{},
            data:undefined,loading:true,loadData:false,
            
        }
        this.OnVerifyDone=this.OnVerifyDone.bind(this);
        this.showParkDetails=this.showParkDetails.bind(this);
        this._renderItem=this._renderItem.bind(this);
    }
    
    componentDidMount(){
        this.getParkData();
    }
    
    static getDerivedStateFromProps(props, cstate) {
        if(props.isConnected===true){
            // console.log("In - "+props.isConnected);
            return{
                loadData:props.isConnected}
            }
            return null;
        }
        getParkData(){
            this.loaded=1;
            return fetch(WebServices.parkData+"?rand="+ Math.floor(Math.random() * 100000) + 1,)
            .then(response  => response.text())
            .then((findresponse)=>{
                // console.log("OP"+findresponse);
                var json = JSON.parse(findresponse);
                this.setState({
                    data:JSON.parse(findresponse),loading:false
                })
                this.loaded=0;
            }).catch(function(error) {
                this.loaded=2;
                // console.warn(this.loaded+' Request Failed: ', error);
                this.setState({
                    data:undefined,loading:false
                });
            });
        }
        
        drawGap=(valueGap)=>{
            return(
                <View
                style={{paddingTop:valueGap}}/>
                );
            }
            
            
            _renderItem ({item, index}) {
                return (
                    <TouchableOpacity style={styles.buttonB}
                    onPress={()=>{
                        this.showParkDetails(item);
                    }}>
                    <CacheImage
                    bg={false}
                    style={styles.image}
                    uri={item.ad}/>
                    </TouchableOpacity>
                    );
                }
                
                showallvenues(){
                    alllines=[];
                    if(this.state.data!==undefined){
                        alllines.push(<Carousel key={'car'}

                        activeAnimationType={'spring'}
                        // enableMomentum={true}
                        activeSlideAlignment={'center'}
                        containerCustomStyle={{ flex: 1 }}
                        slideStyle={{ flex: 1,}}
                        loop={true}
                        firstItem={1}
                        useScrollView={true}
                        loopClonesPerSide={24}
                        shouldOptimizeUpdates={false}
                        ref={'carousel'}
                        data={this.state.data.venues}
                        renderItem={this._renderItem}
                        sliderWidth={width-55}
                        itemWidth={(width-55)/3.1}>
                        {this.slides}
                        </Carousel>);
                    }
                    // if(this.state.data!==undefined){
                    //     for(let t=0;t<this.state.data.venues.length;t++){
                    //         alllines.push(
                    //             <TouchableOpacity key={t+"B"} style={styles.buttonB}
                    //             onPress={()=>{this.showParkDetails(this.state.data.venues[t])}}>
                    //             <CacheImage
                    //             bg={false}
                    //             style={styles.image}
                    //             uri={this.state.data.venues[t].ad}/>
                    //             </TouchableOpacity>
                    //             );
                    //             alllines.push(<View key={"g"+t}>
                    //             {(t!==(this.state.data.venues.length-1))&&<View style={{ marginEnd:8,}}/>}</View>
                    //             );
                    //         }
                    //     }
                    return alllines;
                }
                
                checkLoading(){
                    if(this.state.loadData&&this.loaded!==0){
                        this.getParkData();
                    }
                    
                    if(!this.state.loading){
                        
                        return(
                            <View style={{flexDirection:'row',justifyContent:'center'}} >
                            <TouchableOpacity
                            onPress={()=>{this.refs.carousel.snapToNext();}}>
                            <Image style={[styles.nextprev,
                                Tools.stringIsContains(global.locale,'en')?{transform:[{rotateZ:'0deg'}] }:{transform:[{rotateZ:'180deg'}]}]}
                                source={nextbut}>
                                </Image>
                                </TouchableOpacity>
                                {this.showallvenues()}
                                <TouchableOpacity
                                onPress={()=>{this.refs.carousel.snapToPrev();}}
                                >
                                <Image style={[styles.nextprev,
                                    Tools.stringIsContains(global.locale,'en')?{transform:[{rotateZ:'0deg'}] }:{transform:[{rotateZ:'180deg'}]}]}source={prevbut}>
                                    </Image>
                                    </TouchableOpacity>
                                    </View>
                                    )
                                }else
                                {
                                    return(
                                        <ScrollView 
                                        style={styles.scrollView}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.rowView}>
                                        {this.showallvenues()}
                                        </ScrollView>)
                                    }
                                }
                                
                                render() {
                                    return (
                                        <View style={styles.totalView}>
                                        {/* <Image source={this.props.pagefrom=='card'?cardbg1:cardbg} style={styles.bgcard}/> */}
                                        
                                        <Text style={styles.heading} allowFontScaling ={false}>{i18n.t('ourpark')}</Text>
                                        {this.drawGap(hp('1.5%'))}
                                        
                                        {this.checkLoading()}
                                        
                                        {this.drawGap(hp('2%'))}
                                        
                                        {this.state.showModal&&(<AboutPark parkCode={this.state.parkCode} onDone={this.OnVerifyDone}/>)}
                                        </View>
                                        )
                                    }
                                    OnVerifyDone(){
                                        this.setState({showModal:false});
                                    }
                                    showParkDetails(pData){
                                        // console.info(pData);
                                        this.setState({parkCode:pData, showModal:true});
                                    }
                                    
                                }
                                const mapStateToProps = state=>{
                                    return {
                                        isConnected:state.profileReducer.isConnected,
                                    }                
                                };
                                
                                const mapDispatchToProps = (dispatch) => {
                                    return{
                                    };
                                }
                                
                                export default connect(
                                    mapStateToProps,
                                    mapDispatchToProps
                                    )(OurPark)
                                    
                                    const styles = StyleSheet.create({
                                        nextprev:{
                                            margin:5,
                                            width:20,height:20,marginTop:(hp('19%')/2)-15,justifyContent:'center',
                                        },
                                        image:{
                                            width: wp('30%'),
                                            height: hp('19%'),
                                            resizeMode:'contain',
                                            // borderRadius: 10,
                                        },
                                        
                                        rowView:{
                                            // flex: 1, 
                                            flexDirection: 'row',
                                            // width:hp('40%'),
                                            // justifyContent:'space-between',
                                        },
                                        scrollView:{
                                            flex:1
                                            // width:hp('43%'),
                                        },
                                        bgcard:{
                                            position:'absolute',
                                            resizeMode:'contain',
                                            width:wp('95%'),
                                            left:0,
                                            top:0,
                                            height:hp('28%'),
                                            // transform:[{translateY:-AdaptiveWidth(4.8)}]
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
                                            // width:wp('99%'),
                                            
                                            // transform:[{scaleX:1*AdaptiveWidth(375)},{scaleY:1*AdaptiveWidth(375)}]
                                        },
                                        heading:{
                                            fontSize:hp('4%'),
                                            fontWeight:'300',
                                            // paddingBottom:AdaptiveWidth(40),
                                            color:Colors.darkfontColor,
                                            fontFamily:'Cairo-Regular',
                                            
                                            // fontSize: AdaptiveWidth(12),
                                            // lineHeight: AdaptiveWidth(12)*1.4,
                                            // fontSize: AdaptiveWidth(12)*1.1,
                                            
                                        }
                                        ,buttonB:{
                                            // borderWidth:2,
                                            height: hp('19%'),
                                            alignItems:'center',
                                            // backgroundColor:'rgba(231,64,32,0.5)',
                                            justifyContent:'center'
                                        }
                                    });
                                    