import React,{Component} from 'react';
import { Text,StyleSheet,} from 'react-native';
import {
  createBottomTabNavigator,TabBarBottom
} from 'react-navigation';

// import {
//   createReduxContainer,
//   createReactNavigationReduxMiddleware,
// } from 'react-navigation-redux-helpers';
// import {connect} from 'react-redux';
import {AdaptiveWidth,AdaptiveHeight,AdaptiveOffsetHeight} from '../Components/AdaptiveSize';


import TabBarIcon from '../Components/TabBarIcon';
// import HomeScreen from '../../Pages/HomeScreen';
// import CardScreen from '../../Pages/CardScreen';
// import OfferScreen from '../../Pages/OfferScreen';
// import AccountScreen from '../../Pages/AccountScreen';
import AccountNavigation from '../../Tools/Navigation/Stack/AccountStackNavigator.js';
import CardDetailsStackNavigator from './Stack/CardDetailsStackNavigator.js';
import HomeStackNavigator from './Stack/HomeStackNavigator.js';
// import OfferStackNavigator from './Stack/OfferStackNavigator';

// import {en,ar} from '../../assets/Localization/Localize'
import i18n from 'i18n-js';
// import { getTimeFieldValues } from 'uuid-js';
import Colors from '../constants/Colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

// i18n.translations = { en,ar };
i18n.locale=global.locale;

// import homeIcon from '../../assets/Icons'
// const TabBarComponent = (props) => (<TabBarBottom {...props} />);

const MainTabNavigator= createBottomTabNavigator({

  
  Homescreen:{
    screen: HomeStackNavigator,
    navigationOptions :()=> 
    {
      i18n.locale=global.locale;
      return{
        header:null,
        // tabBarLabel: (i18n.t('home')),
        tabBarLabel:({focused})=>(
          <Text allowFontScaling={false}  style={[styles.tabtext,focused?{color:Colors.yellowColor}:{color:Colors.tabIconDefault}]} >{i18n.t('home')}</Text>
        ),

        tabBarIcon: ({ focused }) => (
          <TabBarIcon
          focused={focused}
          selectedColor={Colors.yellowColor}
          name='home'
          width={widthPercentageToDP('8%')}
          height={widthPercentageToDP('8%')}
          style={styles.tabIcon}
          
          />
          ), 
          tabBarOptions: {activeBackgroundColor :Colors.tabBarbg, activeTintColor:Colors.yellowColor,inactiveTintColor: 'gray',inactiveBackgroundColor:Colors.tabBarbg,
          style:[styles.tabbarstyle,{borderColor:Colors.yellowColor}]
        },
      }
    }
  },
  Cardscreen:{
    screen: CardDetailsStackNavigator,
    navigationOptions : ()=>
    {
      i18n.locale=global.locale;
      return{
        
        tabBarOptions: { activeTintColor:Colors.whiteColor,inactiveTintColor: 'gray',inactiveBackgroundColor:Colors.tabBarbg,activeBackgroundColor :Colors.tabBarbg,
        style: [styles.tabbarstyle,{borderColor:'#e74464'}] },
        header:null,
        tabBarLabel:({focused})=>(
          <Text allowFontScaling={false}  style={[styles.tabtext,focused?{color:'#e74464'}:{color:Colors.tabIconDefault}]} >{i18n.t('card')}</Text>
        ),

        tabBarIcon: ({ focused }) => (
          <TabBarIcon
          width={25*widthPercentageToDP('.28%')}
          height={18.75*widthPercentageToDP('.28%')}
          selectedColor={ '#e74464' }
          focused={focused}
          name='card'
          style={styles.tabIcon}

          />
          )};
        }
      },
   
      Accountscreen:{
        screen: AccountNavigation,
        navigationOptions : ()=>
        {
          
          i18n.locale=global.locale;
          return{
            header:null,
            tabBarLabel:({focused})=>(
              <Text allowFontScaling={false} style={[styles.tabtext,focused?{color:'#c633de'}:{color:Colors.tabIconDefault}]} >{i18n.t('myaccount')}</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
              width={widthPercentageToDP('6.6%')}
              height={widthPercentageToDP('6.6%')}
              selectedColor={'#c633de'}
              focused={focused}
              name='profile'
              style={styles.tabIcon}
              />
              ), tabBarOptions: { activeBackgroundColor :Colors.tabBarbg,activeTintColor:Colors.whiteColor,inactiveTintColor: 'gray',inactiveBackgroundColor:Colors.tabBarbg,
              style:[styles.tabbarstyle,{borderColor:'#c633de'}]}};
            }
          }
        },
        
        );
        
        const styles=StyleSheet.create({
          tabbarstyle:{
            backgroundColor: 'black',
            color:'black',
            // position: 'absolute',
            // bottom: -1*AdaptiveWidth(8),
            // left: 0,
            // width: '100%',
            height:widthPercentageToDP('14.5%'),// AdaptiveHeight(16),
            justifyContent:'center',
            // borderWidth:1,
          },
          tabtext:{
            fontFamily:'Cairo-Regular',
            position:'absolute',
            // transform:[{translateY: AdaptiveOffsetHeight(.43,150)}],
            // transform:[{translateY: widthPercentageToDP('.65%')}],
            fontSize:widthPercentageToDP('3%'),
            alignSelf:'center',
            textAlign:'center',
            // paddingBottom:AdaptiveWidth(10),
          },
          tabIcon:{
            position:'absolute',
            transform:[{translateY: -1*heightPercentageToDP('1%')}],

            // transform:[{translateY: -1*AdaptiveOffsetHeight(3,100)}],
          }
        }
        )
        export {MainTabNavigator};
        