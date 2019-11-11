import React, { PureComponent } from 'react';
import { SafeAreaView, Text, Dimensions, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const { width } = Dimensions.get('window');
import i18n from 'i18n-js';
import {connect} from 'react-redux';
import {updateNetwork} from '../../src/js/actions/profileActions';

function MiniOfflineSign() {
  return (
    <SafeAreaView style={styles.offlineContainer}>
      <Text style={styles.offlineText}>{i18n.t('nointernet')}</Text>
    </SafeAreaView>
  );
}

class OfflineNotice extends PureComponent {

  
  state = {
    isConnected: true,
    canshow:false
  };

  componentDidMount() {
    // this.props.updateNetwork(true);
    setTimeout(()=>{
     this.setState({canshow:true});
    },500)
     NetInfo.addEventListener(state => {
        this.handleConnectivityChange(state.isInternetReachable);
    });
  }

  handleConnectivityChange = isConnected => {
      // this.setState({ isConnected });
      this.props.updateNetwork(isConnected);
  };

  render() {
    if (!this.props.isConnected&&this.state.canshow) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    bottom: 0,
    zIndex:10,
  },
  offlineText: { color: '#fff',fontFamily:'Cairo-Regular'}
});

const mapStateToProps = state=>{
    return {
      isConnected:state.profileReducer.isConnected,
    }                
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
      updateNetwork:(nData)=> dispatch(updateNetwork(nData)),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(OfflineNotice)

// export default OfflineNotice;