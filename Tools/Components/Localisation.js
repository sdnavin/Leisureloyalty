import React from 'react';
import {connect} from 'react-redux';
import {getLocale} from '../../src/js/actions/profileActions';
import i18n from 'i18n-js';
import {en,ar} from '../../assets/Localization/Localize'
import { Platform,StyleSheet} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { I18nManager } from 'react-native';

import { Provider } from 'react-redux';
import { store } from '../../src/ProfileStore';
import * as Localization from 'expo-localization';

import AppNavigation from '../Navigation/AppNavigation';
import * as tools from '../../Tools/Components/Tools.js';

i18n.translations = { en,ar };
i18n.fallbacks = true;

class Localisation extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            locale:'',
            check:false
        }
    }
    
    componentDidMount(){
        if(Platform.OS=='ios'){
            global.locale=Localization.locale;
            console.log("G L :"+ global.locale);
            this.localizeApp();
        }else{
            Localization.getLocalizationAsync().then(val=>{
                global.locale=val;
                this.localizeApp();
            });
        }
        // setTimeout(()=>this.localizeApp(),5000);
    }
    localized=false;
    
    
    localizeApp(){
        SecureStore.getItemAsync('languageENAR').then(languagecheck=>{
            reload=false;
            if(tools.stringIsEmpty(languagecheck)){
                i18n.locale=Localization.locale;
                this.setState({languageENAR:Localization.locale});
            }else{
                i18n.locale=languagecheck;
            }
            // console.log(languagecheck+'In'+i18n.locale);
            CheckRTL=(i18n.locale.indexOf("ar") > -1)?true:false;
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(CheckRTL);
            
            // console.log(i18n.locale+":"+I18nManager.isRTL);
            global.locale=i18n.locale;
            SecureStore.setItemAsync('languageENAR',i18n.locale);
            // console.log("Global :"+global.locale);
            this.props.getLocale(global.locale);
            this.setState({locale:i18n.locale,
                check:true})
                if(I18nManager.isRTL!=CheckRTL)
                {
                    // NativeModules.DevSettings.reload();
                    // Updates.reload();
                    this.forceUpdate();
                }else{
                    this.forceUpdate();
                }
                // this.localized=true;
            });
        }
        
        reloadApp(){
            Updates.reload();
        }
        
        getApp(){
            if(this.state.check)
            return (<AppNavigation reload={this.reloadApp}/>);
        }
        
        render(){
            return(
                <Provider store={store}>
                {this.getApp()}
                </Provider>
                );
            }
        }
        const styles = StyleSheet.create({
            title:{
                fontSize:20,
                fontWeight:'300',
            }
            
        })
        // const mapStateToProps = state=>{
        //     return {
        //         profile: state.profileReducer.profile,
        //     }                
        // };
        
        const mapDispatchToProps = (dispatch) => {
            return{
                getLocale: (pData) => dispatch(getLocale(pData))
            };
        }
        
        export default connect(
            null,
            mapDispatchToProps
            )(Localisation)
            
            
            
            
            
            