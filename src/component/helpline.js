import React from 'react';
import { StyleSheet, Picker, Text, View, Image, BackHandler, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, Linking } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class Helpline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    disableBackButton = () => {
        this.props.navigation.goBack(null);
        return true;
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    dialCall(){
        
        let phoneNumber = '';
      
     
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${'115'}`;
        }
        else {
          phoneNumber = `telprompt:${'115'}`;
        }
     
        Linking.openURL(phoneNumber);
          
        };

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <AntDesign
                name='home'
                type='font-awesome'
                size={24}
                style={{ color: tintColor }}
                containerStyle={{ width: width(10) }}
            />
        )
    }

    Whatsapp(){

    var msg = 'hi';
    Linking.openURL(`whatsapp://send?text=${msg}&phone=${'12345678'}`);
}

    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', height: '14%', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                    <View style={{ marginTop: hp('0%'), marginHorizontal: wp('5%'), }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '25%' }}>
                                <TouchableOpacity style={{ marginTop: 53 }} onPress={() => this.props.navigation.goBack(null)}>
                                    <AntDesign name='arrowleft' color='#5f5d70' size={26} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', marginTop: 53 }}>HELP LINES</Text>
                            </View>
                            <TouchableOpacity onPress={()=> this.dialCall()} style={{ width: '25%' }}>
                                <Image style={{ width: 30, height: 30, marginTop: hp('7.5%'), alignSelf: 'flex-end' }} source={require('../image/sos.png')} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <ScrollView >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={()=> this.dialCall()} style={{backgroundColor:'#F27126', borderRadius:10,marginTop:50, height:130, width:130, margin:10, alignSelf:'center'}}>
                                <Image style={{alignSelf:'center', width:50, height:50, marginTop:32, marginBottom:-20}} source={require('./../image/call-answer.png')} />
                                <Text style={{color:'white', padding:30,textAlign:'center', fontSize:16}}>Dail 115</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={()=> this.Whatsapp()} style={{backgroundColor:'#F27126', borderRadius:10,marginTop:50, height:130, width:130, margin:10, alignSelf:'center'}}>
                            <Image style={{alignSelf:'center', width:50, height:50, marginTop:32, marginBottom:-20}} source={require('./../image/whatsapp.png')} />
                                <Text style={{color:'white', padding:30,textAlign:'center', fontSize:15}}>Whatsapp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    Picker: {
        width: wp('30%'),
        marginLeft: wp('40%'),

    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        marginTop: wp('2%'),
        marginBottom: wp('5%'),

    },
    text: {
        fontSize: 18,
        marginTop: wp('5%'),
        fontWeight: 'bold'
    },
    mainBox: {
        flexDirection: 'row',
        marginHorizontal: wp('6%'),

    },
    box: {
        backgroundColor: '#fff',
        width: wp('40%'),
        height: hp('20%'),
        marginRight: wp('7%'),
        marginBottom: wp('7%'),
    },
    offer: {
        marginHorizontal: wp('5%'),
        marginVertical: hp('3%'),
        color: '#666666',
        fontSize: 12
    },
    number: {
        marginHorizontal: wp('5%'),
        color: '#5f5d70',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        marginTop: hp('5%'),
        alignItems: 'center',
        backgroundColor: '#00cb9c',
        borderRadius: wp('10%'),
        height: 50,
        marginHorizontal: wp('10%')
    },
    buttonText: {

        fontSize: 22,
        color: '#fff',
        marginTop: hp('1.5%')
    },

    userList: {
        padding: 8,
        marginTop: 2,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    desc: {
        fontSize: 13,
        color: '#B9B9B9',
    }, desc2: {
        fontSize: 13,
        color: '#B9B9B9',
    },
    image: {
        width: 60,
        height: 60,
        marginTop: wp('1%'),
        marginRight: wp('3%'),
        borderRadius: 50,
        marginLeft: wp('1%'),
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 55,
        bottom: 10,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
    },
});