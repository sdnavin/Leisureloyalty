import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';
import AdContent from '../../Components/AdContent';
import OfferScreen from '../../../Pages/OfferScreen';


const OfferStackNavigator = createStackNavigator({
    OfferHome:{
      screen:OfferScreen,
      navigationOptions: {
        header: null,
      }
    },
    Adpage:{
      screen:AdContent,
    }

});
export default OfferStackNavigator;
