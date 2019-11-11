import React from 'react';
import * as SecureStore from 'expo-secure-store';
import Rate, { AndroidMarket } from 'react-native-rate';

module.exports={
    stringIsEmpty(value){
        return (value===undefined|| value === null || (value.length === 0));
    },
    stringIsContains(inputValue,checkValue){
        if(!this.stringIsEmpty(inputValue))
        return (inputValue.toLowerCase().indexOf(checkValue) > -1);
    },
    updateRatePoints(count){
        // SecureStore.setItemAsync('appRated','false');
        SecureStore.getItemAsync('ratePoints').then(val=>{
            // console.log("Count :"+val);
            if(this.stringIsEmpty(val)){
                val='0';
            }
            currentVal=parseInt(val)+count;
            SecureStore.setItemAsync('ratePoints',''+currentVal)
            // console.log("Count :"+currentVal);
            if(currentVal>100){
                this.rateApp(true);
            }
        });
    },
    
    rateApp(checkapp){
        const options = {
            AppleAppID:"1483032774",
            GooglePackageName:"com.leisureloyalty",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp:true,
            openAppStoreIfInAppFails:false,
            // fallbackPlatformURL:"http://www.leisure.qa/app/",
        }
        if(checkapp){
            SecureStore.getItemAsync('appRated').then(val=>{
                console.log("Count :"+val);
                if(!this.stringIsContains(val,'true')){
                    Rate.rate(options, success=>{
                        // console.log("Rate Succ :"+success);
                        if (success) {
                            SecureStore.setItemAsync('appRated','true');
                        }else{
                            SecureStore.setItemAsync('ratePoints',''+0);
                        }
                    })
                }
            })
        }else{
            Rate.rate(options, success=>{
                // console.log("Rate Succ :"+success);
                if (success) {
                    SecureStore.setItemAsync('appRated','true');
                }else{
                    SecureStore.setItemAsync('ratePoints',''+0);
                }
            })
        }
    }
}