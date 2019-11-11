import 'react-native-gesture-handler';

import { createSwitchNavigator,createStackNavigator } from 'react-navigation';

// Auth screens.
import {MainTabNavigator} from './MainTabNavigator';
import OpenFullScreen from '../Components/OpenFullScreen';


// Create switch navigator.
const AuthNavigator= createStackNavigator(
    
    {
      Main: {
        screen: createSwitchNavigator(
            {
              Main: MainTabNavigator
            }
          ),
      },
      FullScreen: {
        screen: OpenFullScreen,
      },
    }
    ,
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: 'Main'
    }
  );
  export default AuthNavigator;