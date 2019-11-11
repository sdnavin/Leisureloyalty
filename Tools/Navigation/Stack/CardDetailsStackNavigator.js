import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';
import Recipts from '../../../Pages/StackPage/Recipts';
import CardScreen from '../../../Pages/CardScreen';
import Claims from '../../../Pages/StackPage/Claims';
import Redeems from '../../../Pages/StackPage/Redeems';

// import RedeemHandle from '../../../Pages/StackPage/RedeemHandle';
// import Colors from '../../constants/Colors';
import AdContent from '../../Components/AdContent';
import RedeemVoucherPage from '../../../Pages/StackPage/RedeemVoucherPage';
import RedeemVenuPage from '../../../Pages/StackPage/RedeemVenuPage';
import RulesPage from '../../Components/RulesPage';

const CardDetailsStackNavigator = createStackNavigator({
  Home:{
    screen:CardScreen,
    navigationOptions: {
      header: null,
      headerVisible:false
    }
  },
  Receipts: { 
    screen: Recipts,
  },rules:{
    screen:RulesPage,
  },
  Claims: { 
    screen: Claims,
  },
  Redeem: { 
    screen: Redeems,
  },venue:{
    screen:AdContent,
    navigationOptions: {
      header:null,
      headerVisible: false,
    }
  },
  voucher:{
    screen:RedeemVoucherPage,
  },
  cashier:{
    screen:RedeemVenuPage,
  }
}
);
export default CardDetailsStackNavigator;
