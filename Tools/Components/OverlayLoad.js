import React, { Component } from 'react'
import { StyleSheet,Modal, View,ActivityIndicator,Dimensions,Image} from 'react-native';



const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const loadImages = [
    require('../../assets/load/1.png'),
    require('../../assets/load/2.png'),
    require('../../assets/load/3.png'),
    require('../../assets/load/4.png'),
    require('../../assets/load/5.png'),
    require('../../assets/load/6.png'),
    require('../../assets/load/7.png'),
    require('../../assets/load/8.png'),

  ];

export default class OverlayLoad extends Component {
    constructor (props){
        super(props);
        
        this.state={
            index:0,
            canclose:0,
            isVisible:this.props.isopen
        }
    }

    componentDidMount(){
        this.next();
    }
    componentWillUnmount(){
        clearTimeout();
    }
    
    static getDerivedStateFromProps(props, state) {
        // console.log(props.isopen+"--"+state.isVisible);
        if (props.isopen !== state.isVisible) {
            return {
                isVisible: props.isopen
            };
        }
        return null;
    }
    
    closed=0;

    next() {
        setTimeout(() => {
            this.setState({index: (this.state.index+1)%8});
            this.next();
        }, 100);
    }
    
    render() {
        if(this.state.isVisible){
            if(this.closed==1){
                this.closed=0;
            }
            return (
                <View style={styles.loading} >
                <Image source={loadImages[this.state.index]} style={{width:80,height:80}}/>
                {/* <ActivityIndicator size={this.props.size} color={this.props.color} /> */}
                </View>
                )
            }else{
                if(this.closed==0){
                    this.closed=1;
                    var ondis=this.props.onDismiss;
                    ondis();
                }
                return <View></View>;
            }
        }
    }
    const styles = StyleSheet.create({
        
        loading: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#19191999',
            zIndex:10,
        }
    });