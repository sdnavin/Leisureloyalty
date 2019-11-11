import React, { Component } from 'react'
// import  { View,Text } from 'react-native'
import LoginHandle from './LoginHandle';
import MobileCode from './MobileCode';
import RegisterUser from './RegisterUser';

// import SigninStackNavigator from '../Navigation/Stack/SigninStackNavigator'
import { createStackNavigator, Header } from 'react-navigation';
import AdContent from './AdContent';


// Create switch navigator.
const OpenFullScreen= createStackNavigator(
    {
        Main: {
            screen: props=><LoginHandle {...props}/>,
            navigationOptions: {
                
              header:null,
              headerVisible: false,
            }
        },
        Mobilecode: {
            screen: MobileCode,
        },
        Register: {
            screen: RegisterUser,
        },
    },{
      initialRouteName: 'Main'
    }
    );
    export default OpenFullScreen;
    
    /*
    export default class OpenFullScreen extends Component {
        
        
        constructor(props){
            super(props);
            this.state={
                toGo:''
            };
        }
        render() {
            const { navigation } = this.props;
            const pagetogo = navigation.getParam('pagetogo', 'NO-ID');
            return (
                <View>
                {this.GotoPage(pagetogo)}
                </View>
                );
            }
            
            GotoPage(toGo){
                const { navigation } = this.props;
                console.log(toGo);
                loadlines=[];
                if(toGo==='signin'){
                    loadlines.push(<SigninStackNavigator key='0'/>);
                    // loadlines.push( <LoginHandle key={0} navigation={this.props.navigation} assignProfile={navigation.getParam('assignProfile')}/>);
                    // }else if (toGo==='mobilecode'){
                    // loadlines.push( <MobileCode key={1} navigation={this.props.navigation} assignProfile={navigation.getParam('assignProfile')}/>);
                }
                return loadlines;
            }
        }
        */