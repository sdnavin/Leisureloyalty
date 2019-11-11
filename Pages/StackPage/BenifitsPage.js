import React, { Component } from 'react'
import { HeaderBackButton } from 'react-navigation';
import  ProfileData  from '../../Tools/Components/ProfileData';

export default class BenifitsPage extends Component {
    
    

    static navigationOptions = ({navigation}) => {
        return{
            title: navigation.getParam('otherParam'),
            headerTintColor: '#rgba(1,0,0,1)',
            headerStyle: {
                backgroundColor: '#cce6ff'
              },
            headerTitleStyle:{textAlign:'center',
            fontWeight: '200',flex:1},
            // header:null,
            headerLeft:(
                <HeaderBackButton 
                titleStyle={{fontWeight:'bold',
            fontSize:15}}
                title={navigation.getParam('backParam')}
                backTitleVisible={true}
                onPress={() => navigation.goBack()} />
                )
            };
        };
        constructor(props){
            super(props);
        }
        
        render() {
            return (
                <ProfileData pagetogo="benifits"/>
                )
            }
        }
        