import * as React from 'react';
import {ScrollView,TextInput,Keyboard,TouchableWithoutFeedback,TouchableOpacity,StyleSheet,View,Text,ImageBackground,Image,KeyboardAvoidingView,Platform } from 'react-native'
// import { ScrollView, TextInput } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
// import DatePicker from 'react-native-datepicker';
import DatePicker from '../../Tools/Components/DatePicker'
// import RNPickerSelect from 'react-native-picker-select';
import countryList from '../../Data/Countrylist.json';
// import PickerModal from 'react-native-picker-modal-view';
import i18n from 'i18n-js';
import Colors from '../../Tools/constants/Colors.js';
import homebg from'../../assets/bg/bg-03.jpg'
// import appLogo from '../../assets/Icons/leisure_white.png'
// import proceedB from '../../assets/Icons/back.png'
import HeaderLogo from '../../Tools/Components/HeaderLogo';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import BackButton from '../../Tools/Components/BackButton';
import * as Tools from '../../Tools/Components/Tools.js'
import {Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');



export default class AccountEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            change:false,
            chosenDate:new Date(),
            gender:'',
            chosenCountry:{},
            email:'',
            mobile:'',
            landline:'',
            countryT:'',
            city:'',
            address:'',
            pobox:'',
            firstname:'',lastname:'',
            avatarSource:'',showDate:false
        };
        this.saveChanges=this.saveChanges.bind(this);
    }

    componentDidMount(){
        Tools.updateRatePoints(1);
    }
    
    selectPhotoTapped() {
        // ImagePicker.open({
        //     takePhoto: true,
        //     chooseFromLibrary: true
        // }).then(({ uri, width, height }) => {
        //     this.changeHappened();
        //     this.setState({avatarSource:uri});
        //     this.props.profile.urlImage=uri;
        //     // console.log('image asset', uri, width, height);
        // }, (error) => {
        //     // Typically, user cancel  
        //     // console.log('error', error);
        // });
    }
    
    changeCheck=false;
    

    
    // loadProfile(){
    //     if(this.props.profile!==null&&this.loaded===false&&this.countryList!==null){
    //         this.loaded=true;
    //         // this.setState({ chosenDate: this.props.profile.dob });
    //         // this.setState({ gender: this.props.profile.gender });
    //         this.setState({ email: this.props.profile.Email });
    //         this.setState({ mobile: this.props.profile.Mobile });
    //         // this.setState({ landline: this.props.profile.landline });
    //         // this.setState({ countryT: this.props.profile.country });
    //         // this.setState({ city: this.props.profile.city });
    //         // this.setState({ address: this.props.profile.address });
    //         // this.setState({ pobox: this.props.profile.pobox });
    //         // this.setState({ avatarSource: this.props.profile.urlImage });
            
    //         nationID= this.props.profile.nationality;
    //         this.setState({ chosenCountry:(this.getCountrywithCode(nationID))});
    //         this.setState({change:false});
    //         setTimeout(()=> {this.changeCheck=true},2000);
    //     }
    // }
    
    
    pickImage = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     allowsEditing: true,
        //     aspect: [4, 3],
        // });
        
        
        // if (!result.cancelled) {
        //     this.setState({ avatarSource: result.uri });
        //     this.props.profile.urlImage=result.uri;
        //     this.changeHappened();
        // }
    };
    
    getCountrywithCode(code){
        for(t=0;t<countryList.length;t++){
            if(countryList[t].Code===code){
                return countryList[t];
            }
        }
        return null;
    } 
    
    setChosenCountry(selectedItem){
        this.setState({ chosenCountry:selectedItem});
        this.props.profile.nationality=selectedItem.Code;
        this.changeHappened();
    }   
    onClosed() {
        console.log('close key pressed');
    }
    
    
    
    onBackButtonPressed() {
        console.log('back key pressed');
    }
    getImageSource(){
        if(this.state.avatarSource===''){
            return( require('../../assets/dp.png'));
        }else{
            return({uri:this.state.avatarSource,isStatic:true});
        }
    }
    render() {
        return (
            <View
            // behavior={Platform.OS === "ios" ? "padding" : "padding"}
            // keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 150}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex:1}}>
            <ImageBackground source={homebg} style={styles.bgImage}/>
            {/* {this.drawGap(40)} */}
            <HeaderLogo headerTitle={i18n.t('myaccount')} border={true}/>
            
            {/* <Image source={appLogo} style={styles.logoImg}/>
        <View style={styles.titleView}><Text style={styles.titleTxt}> {i18n.t('myaccount')}</Text></View> */}
        <ScrollView 
        showsVerticalScrollIndicator = {false}
        contentContainerStyle={styles.homeScrollView}
        style={styles.homeView}>
        
        
        {/* <View style={styles.dpView}>
        <Image 
        style={styles.dp}
        source={this.getImageSource()}
        />
        <Text style={styles.textButton}
        onPress={this.pickImage}>{i18n.t('changeprofilepic')}</Text>
    </View> */}
    {this.drawGap(10)}
    <View style={styles.inner}>
    {this.getProfile()}
    {this.getAddress()}
    </View>
    </ScrollView>
    <BackButton onpress={()=>this.props.navigation.goBack()}/>
    </View>
    </TouchableWithoutFeedback>
    </View>
    )
}



getCountry(){
    // return(
    
    //     <PickerModal 
    //     style={{flexDirection:'row-reverse',
    //     flex:1,}}
    //     renderSelectView={(disabled, selected, showModal) =>
    //         <TouchableOpacity  
    //         style={{
    //             alignItems:'center',
    //             flexDirection:'row-reverse',
    //             flex:1,
    //             borderWidth:0,
    //         }}
    //         disabled={disabled}
    //         onPress={showModal}>
    //         <Text allowFontScaling={false}  style={styles.inputValue} >{this.state.chosenCountry.Name}</Text>
    //         </TouchableOpacity >
    //     }
    //     onSelected={this.setChosenCountry.bind(this)}
    //     onClosed={this.onClosed.bind(this)}
    //     onBackButtonPressed={this.onBackButtonPressed.bind(this)}
    //     items={countryList}
    //     sortingLanguage={'en'}
    //     showToTopButton={true}
    //     selected={this.state.chosenCountry}
    //     showAlphabeticalIndex={true}
    //     autoGenerateAlphabeticalIndex={true}
    //     selectPlaceholderText={'Choose one..'}
    //     onEndReached={() => console.log('List ended.')}
    //     searchPlaceholderText={'Search ..'}
    //     requireSelection={false}
    //     autoSort={false}
    //     />
    //     );
}
getDate(){
    return(
        <View style={[styles.inputView,{flexDirection:'row'}]}>
        <Text allowFontScaling={false}  style={{flex:1,color:(this.state.showDate?'grey':Colors.blueHardColor),alignSelf:'center',width:'100%',height:'50%'}} onPress={()=>{this.setState({showDate:true})}}>{this.props.profile.dob}</Text></View>
        )
    }
    
    getDateView(){
        return(
            <DatePicker showDate={this.state.showDate} backgroundColor={Colors.yellowColor}
            textColor={Colors.whiteColor}
            onDone={()=>{this.setState({showDate:false})}}
            onDateChange={(date) => {
                this.props.profile.dob=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
                this.changeHappened();
                this.setState({chosenDate:date});
            }} />
            );
        }
        
        getGender(){
            const placeholder = {
                label: 'Select gender',
                value: null,
                color: '#9EA0A4',
            };
            const genders = [
                {
                    label: 'Male',
                    value: 'm',
                },
                {
                    label: 'Female',
                    value: 'f',
                }
            ];
            
            return(
                <View style={styles.genderview}>
                {/* <RNPickerSelect
                    placeholder={placeholder}
                    items={genders}
                    onValueChange={value => {
                        this.changeHappened();
                        this.setState({gender:value});
                        this.props.profile.gender=value;
                    }}
                    style={{...styles}}
                    value={this.state.gender}
                /> */}
                </View>);
            }
            
            
            getProfile(){
                return(
                    <View>
                    {/* <Text allowFontScaling={false}  style={styles.detailshead}>{i18n.t('profilecaps')}</Text>
                {this.drawLine('black')} */}
                
                <View style={styles.rowView}>
                {/* <Text  allowFontScaling={false} style={styles.detailstitle}>First Name</Text>  */}
                <View style ={styles.inputView}>
                <TextInput allowFontScaling={false}  style ={styles.inputValue}
                editable={true}
                placeholder='First Name'
                onChangeText={(text) => {this.setState({firstname:{text}});
                this.props.profile.FirstName=text;
                this.changeHappened();}}
                value={this.props.profile.FirstName}></TextInput></View>
                </View>
                
                
                <View style={styles.rowView}>
                {/* <Text allowFontScaling={false}  style={styles.detailstitle}>Last Name</Text>  */}
                <View style ={styles.inputView}><TextInput allowFontScaling={false}  style ={styles.inputValue}
                editable={true}
                placeholder='Last Name'
                onChangeText={(text) => {this.setState({lastname:{text}});
                this.props.profile.LastName=text;
                this.changeHappened();}}
                value={this.props.profile.LastName}></TextInput></View>
                </View>
                
                
                {/* <View style={styles.rowView}>
                <Text style={styles.detailstitle}>{i18n.t('dob')}</Text>
                {this.getDate()}
                </View>
                {this.getDateView()}
                
                {this.drawLine('grey')}
                
                <View style={styles.rowView}>
                <Text style={styles.detailstitle}>{i18n.t('gender')}</Text>
                {this.getGender()}
                </View>
                
                {this.drawLine('grey')}
                <View style={styles.rowView}>
                <Text style={styles.detailstitle}>{i18n.t('nationality')}</Text>
                {this.getCountry()}
                </View>
                
            {this.drawLine('grey')} */}
            
            <View style={styles.rowView}>
            {/* <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('email')}</Text> */}
            <View style ={styles.inputView}><TextInput allowFontScaling={false}  style ={styles.inputValue}
            editable={true}
            value={this.props.profile.Email}
            onChangeText={(text) => {this.setState({email:text});
            this.props.profile.Email=text;
            this.changeHappened();}}
            keyboardType='email-address'
            returnKeyType='done'
            placeholder=''></TextInput></View>
            </View>
            
            
            <View style={styles.rowView}>
            {/* <Text  allowFontScaling={false} style={styles.detailstitle}>{i18n.t('mobile')}</Text> */}
            {/* <Text allowFontScaling={false} style={styles.inputConst}>{'+ 974'}</Text> */}
                
            {Tools.stringIsContains(i18n.locale,'en')&&(<View style={[styles.mobileView,{marginRight:10,}]}>
            <Text allowFontScaling={false} style={styles.inputConst}>{'+974'}</Text> 
            </View>)}
            <View style ={styles.inputView}> 
            <TextInput allowFontScaling={false} style ={styles.inputValue}
            editable={true}
            maxLength={8}
            value={this.props.profile.Mobile.replace('+974','')}
            onChangeText={(text) => {this.setState({mobile:text});
            this.props.profile.Mobile=text;
            this.changeHappened();}}
            keyboardType='phone-pad'
            returnKeyType='done'
            placeholder=''></TextInput></View>
             {!Tools.stringIsContains(i18n.locale,'en')&&(<View style={[styles.mobileView,{marginLeft:10,}]}>
            <Text allowFontScaling={false} style={styles.inputConst}>{'+974'}</Text> 
            </View>)}
            </View>
            
            {/* <View style={styles.rowView}>
            <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('landline')}</Text>
            <View style ={styles.inputView}><TextInput style ={styles.inputValue}
            keyboardType='phone-pad'
            returnKeyType='done'
            value={this.state.landline}
            onChangeText={(text) => {this.setState({landline:text});
            this.props.profile.landline=text;
            this.changeHappened();}}
        placeholder='Your Landline'></TextInput></View></View> */}
        </View>
        );
    }
    changeHappened(){

        this.setState({change:true});

        // if(this.changeCheck){
        //     this.setState({change:true});
        //     var saveUpdate  =   this.props.saveChange;
        //     saveUpdate(true);
        // }
        
    }
    saveChanges(){
        this.setState({change:false});
        var handleToUpdate  =   this.props.handler;
        handleToUpdate(this.props.profile);
    }
    getAddress(){
        return(
            <View>
            {/* <Text allowFontScaling={false}  style={styles.detailshead}>{i18n.t('addresscaps')}</Text>
            {this.drawLine('black')}
            
            <View style={styles.rowView}>
            <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('country')}</Text>
            <View style ={styles.inputView}><TextInput style ={styles.inputValue}
            // textContentType='countryName'
            keyboardType='default'
            editable={false}
            returnKeyType='done'
            value={this.state.countryT}
            onChangeText={(text) => {this.setState({countryT:{text}});
            this.props.profile.country=text;
            this.changeHappened();}}
            placeholder='Your Country'></TextInput></View>
            </View>
            
            {this.drawLine('grey')}
            <View style={styles.rowView}>
            <Text  allowFontScaling={false} style={styles.detailstitle}>{i18n.t('city')}</Text>
            <View style ={styles.inputView}><TextInput style ={styles.inputValue}
            textContentType='addressCity'
            keyboardType='default'
            returnKeyType='done'
            value={this.state.city}
            onChangeText={(text) => {this.setState({city:{text}});
            this.props.profile.city=text;
            this.changeHappened();}}
            placeholder='Your City'></TextInput></View>
            </View>
            
            {this.drawLine('grey')}
            <View style={styles.rowView}>
            <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('address')}</Text>
            <View style ={styles.inputView}><TextInput style ={styles.inputValue}
            textContentType='addressCityAndState'
            keyboardType='default'
            returnKeyType='done'
            // multiline={true}
            value={this.state.address}
            onChangeText={(text) =>{ this.setState({address:{text}});
            this.props.profile.address=text;
            this.changeHappened();}}
            placeholder='Your Address'></TextInput></View>
            </View>
            
            {this.drawLine('grey')}
            <View style={styles.rowView} behavior="padding" enabled>
            <Text allowFontScaling={false}  style={styles.detailstitle}>{i18n.t('pobox')}</Text>
            <View style ={styles.inputView}><TextInput style ={styles.inputValue}
            textContentType='postalCode'
            returnKeyType='done'
            keyboardType='number-pad'
            value={this.state.pobox}
            onChangeText={(text) => {this.setState({pobox:{text}});
            this.props.profile.pobox=text;
            this.changeHappened();}}
            placeholder='Your PO Box'></TextInput></View>
        </View> */}
        {this.drawGap(15)}
        <TouchableOpacity
        onPress={()=>this.saveChanges()}
        style={styles.buttonSign}
        disabled={this.state.change===false?true:false}>
        {this.state.change&&(
            <Text  allowFontScaling={false} style={styles.buttontext}>{i18n.t('savechange')}</Text>   
            )} 
            {!this.state.change&&(<Text style={styles.buttontext}>{i18n.t('savechange')}</Text>)} 
            </TouchableOpacity>
            {this.drawGap(25)}
            
            </View>
            );
        }
        
        drawGap=(valueGap)=>{
            return(
                <View
                style={{paddingTop:valueGap}}/>
                );
            }
        }
        
        
        
        const styles = StyleSheet.create({
            backbut:{
                position:'absolute',
                bottom:heightPercentageToDP('5%'),
                alignSelf:'center',
                width:50,
                height:50,
            },
            logoImg:{
                alignSelf:'flex-start',
                marginLeft:15,
                width:70.2*(width/280),
                height:65.3*(width/280),
                // maxWidth:220,
            }, titleView:{
                position:'absolute',
                borderWidth:2,
                borderRadius:10,
                alignSelf:'flex-end',
                transform:[{translateX:width/4.5},{translateY:50}],
                borderColor:Colors.whiteColor,
            },
            titleTxt:{
                color:Colors.whiteColor,
                fontFamily:'Cairo-Regular',
                fontSize: (width/15),
                paddingLeft:10,
                paddingRight:100,
            },
            bgImage:{
                position:'absolute',
                alignSelf:'center',
                width:'100%',
                height:height,
                resizeMode:'contain'
            },
            dateValue:{
                fontSize: 16,
                fontWeight:'bold',
                width:'100%',
                alignSelf:'flex-start',
                borderWidth:2,
                color:Colors.blueHardColor,
                fontFamily:'Cairo-Bold'
                
            },
            inputViewDate:{
                flex:2,
                borderWidth:1,
                width:'100%',
                height:50,
                
            },
            gradStyle:{
                position:'absolute',
                width:width,
                height:height,
                zIndex:-1,
            },
            buttonSign:{
                // flex:1,
                width:width/2,
                height:50,
                alignSelf:'center',
                alignItems:'center',
                borderRadius:15,
                borderWidth:2,
                borderColor:Colors.whiteColor,
                justifyContent:'center'
            },
            buttontext:{
                fontSize:20,
                color:'white',
                fontFamily:'Cairo-Regular'
                
            },
            inner: {
                flex: 1,
                justifyContent: "flex-end",
            },
            genderview: {
                flexDirection:'column',
                flex:1,
                // borderWidth:2,
                alignContent:'center',
                justifyContent:'center',
            },
            inputIOS: {
                fontSize: 16,
                alignSelf:'flex-start',
                // textAlign:'left',
                fontWeight:'bold',
                color: Colors.darkfontColor,
                fontFamily:'Cairo-Bold'
                
            },
            inputAndroid: {
                fontSize: 16,
                alignSelf:'flex-start',
                // textAlign:'left',
                fontWeight:'bold',
                color: Colors.darkfontColor,
                fontFamily:'Cairo-Bold'
                
            },
            
            rowView:{
                flex: 1,
                flexDirection:'row'
            },               
            dpView:{
                paddingTop:15,
                alignItems:'center',
            },
            dp:{
                width: 150,
                height: 150,
                borderRadius: 150/ 2,
            },
            heading: {
                textAlign:'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.darkfontColor,
                fontFamily:'Cairo-Bold'
                
            },mobileView:{
                flex:.25,
                height:50,
                // borderWidth:2,
                // flexDirection:'column',
                // alignItems:'flex-start',
                // alignContent:'flex-start',
                justifyContent:'center',
                borderWidth:2,
                borderColor:Colors.whiteColor,
                backgroundColor:Colors.inputboxColor,
                borderRadius:10,
                // marginBottom:20,
            },inputView:{
                flex:1,
                // borderWidth:2,
                flexDirection:'column',
                alignItems:'flex-start',
                alignContent:'flex-start',
                borderWidth:2,
                borderColor:Colors.whiteColor,
                backgroundColor:Colors.inputboxColor,
                borderRadius:10,
                // marginRight:10,
                marginBottom:20,
                height:50,
            },
            inputConst: {
                // alignSelf:'center',
                textAlign:'left',
                justifyContent:'center',
                // paddingStart:10,
                fontSize: 20,
                // lineHeight:45,
                flex:1,
                // textAlign:'left',
                fontWeight: '200',
                color:Colors.inputfontColor,
                // width:'100%',
                // height:50,
                fontFamily:'Cairo-Regular',
                // borderRadius:10,
                // textAlign:'left',
                // borderWidth:2,
                // marginEnd:10,
                marginStart:10,
                marginTop:5,
                // margin:10,
            },
            inputValue: {
                // alignSelf:'flex-start',
                paddingStart:10,
                fontSize: 18,
                // lineHeight:40,
                flex:1,
                textAlign:'left',
                fontWeight: '200',
                color:Colors.inputfontColor,
                width:'97%',
                // height:40,
                fontFamily:'Cairo-Regular',
                // paddingStart:10,
                // borderRadius:5,
                // margin:10,
                // borderWidth:1,
            },
            textButton: {
                paddingTop:15,
                textAlign:'center',
                fontSize: 15,
                fontWeight: 'bold',
                color:'#0079d4'
            },
            pId: {
                textAlign:"center",
                fontSize: 20,
                fontWeight: '200',
                fontFamily:'Cairo-Regular'
                
            },detailshead:{
                fontSize: 20,
                fontWeight: 'bold',
                paddingBottom:15,
                textAlign:'left',
                color: Colors.darkfontColor,
                fontFamily:'Cairo-Bold'
                
                
                // borderWidth:2,
            },
            detailstitle:{
                // borderWidth:2,
                // width:150,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign:'left',
                paddingTop:15,
                paddingBottom:15,
                flex:0.5,
                color: Colors.blueHardColor,
                fontFamily:'Cairo-Bold'
                
                
            },
            homeScrollView: {
                // backgroundColor:'#fff',
                padding:15,
                
            },homeView: {
                flex:1,
            },
            accountView: {
                paddingTop:25,
            }
            
        });
        
        // AccountEditor.propTypes = {
        //     profile: PropTypes.object.isRequired,
        //     handler:PropTypes.func.isRequired
        // }
        
        