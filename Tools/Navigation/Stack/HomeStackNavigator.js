import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../../../Pages/HomeScreen';
import BenifitsPage from '../../../Pages/StackPage/BenifitsPage';
import AdContent from '../../Components/AdContent';
import RulesPage from '../../Components/RulesPage';


const HomeStackNavigator = createStackNavigator({
    CardHome:{
      screen:HomeScreen,
      navigationOptions: {
        header: null,
      }
    },
    Benifits: { 
      screen: BenifitsPage,
    },
    Adpage:{
      screen:AdContent,
    },rules:{
      screen:RulesPage,
    }

});
export default HomeStackNavigator;
