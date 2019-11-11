import React, { Component } from 'react'
import {View,ScrollView,StyleSheet,Text,Slider,Object} from 'react-native';
import PropTypes from 'prop-types';
// import Loader from 'react-native-easy-content-loader';
// import ProgressCircle from 'react-native-progress-circle';
import i18n from 'i18n-js';


import {Dimensions } from "react-native";
const window = Dimensions.get('window');

export default class BenifitsHandle extends Component {
    
    
    loaded=false;
    _myScroll=ScrollView;
    
    constructor(props){
        super(props);
        this.state={
            loading:true,
        }
    }
    
    drawGap=(valueGap)=>{
        return(
            <View
            style={{paddingTop:valueGap}}/>
            );
        }
        
        drawLine=(colorstr)=>{
            return(
                <View
                style={{
                    borderBottomColor: colorstr,
                    borderBottomWidth: 0.5,
                }}/>
                );
            }
            
            
            
            setLoadingState(stateP){
                this.setState({loading:stateP});
            }
            
            performActionWithTime(callback,params,timeTaken){
                setTimeout(() => {callback(params)},timeTaken);
            }
            
            
            
            getLoading(){
                return(
                    <View>
                    {/* <Loader active pRows={3} pWidth={["100%", 200, "25%", 45]} /> */}
                    {this.drawGap(10)}
                    {/* <Loader active pRows={2} pWidth={["100%", 200, "25%", 45]} /> */}
                    </View>
                    )
                }
                getContent(){
                    if(this.state.loading){
                        return(
                            <View>
                            {this.getLoading()}
                            </View>
                            )
                        }else{
                            return(
                                <View>
                                {this.getPointBox()}
                                {this.drawGap(20)}
                                {this.getTransfers()}
                                </View>
                                )
                            }
                        }
                        
                        
                        
                        render() {
                            return (
                                <View style={{
                                    flex:1,
                                    backgroundColor:'#cce6ff'
                                }}>
                                <ScrollView 
                                contentContainerStyle={styles.homeScrollView}
                                scrollEventThrottle={32}
                                ref="scrollview"
                                // onScroll={this._contentViewScroll}
                                // onScroll={() => this.checkScroll()}
                                showsVerticalScrollIndicator = {false}
                                style={styles.homeView}>
                                <Text style={styles.heading}>{i18n.t('enjoybenifits')}</Text>
                                {this.drawGap(10)}
                                <Text style={styles.generalTxt}>{i18n.t('benifitsreward')} {this.props.profile.cardData.targetName}{i18n.t('memberdot')}</Text>
                                {this.drawGap(25)}
                                <View 
                                style={styles.circle}>
                                {/* <ProgressCircle
                                percent={this.props.profile.cardData.value/this.props.profile.cardData.targetValue}
                                radius={120}
                                borderWidth={15}
                                color="#3399FF"
                                shadowColor="#999"
                                containerStyle={styles.progressContainer}
                                outerCircleStyle={styles.progressOuter}
                                bgColor="#cce6ff"> */}
                                <Text style ={styles.inheading}>{i18n.t('yourqar')} </Text>
                                <Text style ={styles.inheadingValue}>{this.props.profile.cardData.targetValue-this.props.profile.cardData.value} </Text>
                                <Text style ={styles.inheading}>{i18n.t('awayfrom')} {this.props.profile.cardData.targetName}!</Text>
                                {/* </ProgressCircle> */}
                                </View>
                                {this.drawGap(25)}
                                </ScrollView>
                                </View>
                                )
                            }
                            
                        }
                        
                        
                        const styles = StyleSheet.create({
                            progressOuter:{
                                padding:15,
                                alignSelf:'center',
                                flex: 1, flexDirection: 'row-reverse',
                            },
                            progressContainer:{
                               
                                alignSelf:'center',
                            },
                            homeScrollView:{
                                padding:15,
                            },
                            circle:{
                                // flex:1,
                                width:window.width,
                                justifyContent:'center',
                                alignSelf:'center',
                                alignItems:'center'
                            },
                            inheading:{
                                textAlign:'center',
                                fontSize:20,
                                fontWeight:'200'
                            },
                            inheadingValue:{
                                textAlign:'center',
                                fontSize:30,
                                fontWeight:'bold'
                            },
                            slider:{
                                height:20,
                            },
                            pointheading:{
                                padding:10,
                                flex:1,
                                fontSize:15,
                                fontWeight:'200'
                            },
                            pointtxt:{
                                textAlign:'left',
                                fontSize:15,
                                fontWeight:'400'
                            },
                            pointValue:{
                                textAlign:'right',
                                fontSize:15,
                                fontWeight:'bold'
                            },
                            pointValuetxt:{
                                textAlign:'right',
                                fontSize:12,
                                fontWeight:'200'
                            },
                            pointBox:{
                                padding:10,
                                borderWidth:0.5,
                                borderRadius:10,
                                flex:1,
                            },
                            inner: {
                                flex: 1,
                                justifyContent: "flex-end",
                            },
                            rowView:{
                                flex: 1, flexDirection: 'row'
                            },   
                            homeView: {
                                flex: 1,
                                backgroundColor:'#cce6ff',
                                // direction:'ltr'
                                // paddingLeft:15,
                                // paddingRight:15,
                            }, heading: {
                                textAlign:'left',
                                fontSize: 45,
                                fontWeight: 'bold',
                            },
                            generalTxt:{
                                flex:1,
                                textAlign:'left',
                                fontSize: 20,
                            },
                            subheading: {
                                flex:0.5,
                                textAlign:'left',
                                fontSize: 20,
                                fontWeight: 'bold',
                            },
                            
                        });
                        