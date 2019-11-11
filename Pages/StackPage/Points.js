import React, { Component } from 'react'
import {Button} from 'react-native'
import  ProfileData  from '../../Tools/Components/ProfileData';
import i18n from 'i18n-js';

export default class Points extends Component {
    
    
    static navigationOptions = ({navigation}) => {
        return{
            title: navigation.getParam('otherParam'),
            headerTintColor: '#rgba(1,0,0,1)',
            headerTitleStyle:{textAlign:'center',
            fontWeight: '200',flex:1},
            headerLeft: null,
            headerRight:(
                <Button
                onPress={()=>{
                    navigation.goBack()
                }
            }
            title={i18n.t('close')}
            color='#0079d4'
            />
            )
        };
    };
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <ProfileData pagetogo="points"/>
            )
        }
    }
    