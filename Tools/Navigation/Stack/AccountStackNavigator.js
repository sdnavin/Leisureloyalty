import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';
import AccountHome from '../../../Pages/AccountScreen';
import AccountEdit from '../../../Pages/StackPage/ProfileEditor';
import Recipts from '../../../Pages/StackPage/Recipts';
import Claims from '../../../Pages/StackPage/Claims';
import Redeems from '../../../Pages/StackPage/Redeems';

import Password from '../../../Pages/StackPage/Password';
import Contact from '../../../Pages/StackPage/Contact';
import BenifitsPage from '../../../Pages/StackPage/BenifitsPage';
import Help from '../../Components/Help';
import Points from '../../../Pages/StackPage/Points';
// import RedeemHandle from '../../../Pages/StackPage/RedeemHandle';
// import Colors from '../../constants/Colors';
import AdContent from '../../Components/AdContent';
import RedeemVoucherPage from '../../../Pages/StackPage/RedeemVoucherPage';
import RedeemVenuPage from '../../../Pages/StackPage/RedeemVenuPage';
import Settings from '../../../Pages/StackPage/Settings';


const AccountStackNavigator = createStackNavigator({
  Home: { 
    screen: AccountHome,
    navigationOptions: {
      header: null,
    }},
    AccountEdit: { 
      screen: AccountEdit,
    },
    Receipts: { 
      screen: Recipts,
    },
    Benifits: { 
      screen: BenifitsPage,
    },
    Claims: { 
      screen: Claims,
    },
    Points: { 
      screen: Points,
    },
    Password: { 
      screen: Password,
    },Settings: { 
      screen: Settings,
    },
    Contact: { 
      screen: Contact,
    },Help:{
      screen:Help,
    },
    Redeem: { 
      screen: Redeems,
      // navigationOptions:()=> {
      //   return{
      //     header:null,
      //     headerVisible:false
      //   }
      // }
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
      // navigationOptions: {
      //   header:null,
      //   headerVisible: false,
      // }
    }

  });
  export default AccountStackNavigator;

