import React from 'react';
import { StyleSheet, Picker, Text, View, Image, BackHandler, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, TextInput, Linking } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableRipple, Card } from 'react-native-paper';
import MapView from 'react-native-maps';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class eventdetail extends React.Component {
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

    dialCallMADADGAR() {

        let phoneNumber = '03345556667';
    
    
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${'03345556667'}`;
        }
        else {
          phoneNumber = `telprompt:${'03345556667'}`;
        }
    
        Linking.openURL(phoneNumber);
    
      };

      dialCallCPLC() {

        let phoneNumber = '1102';
    
    
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${'1102'}`;
        }
        else {
          phoneNumber = `telprompt:${'1102'}`;
        }
    
        Linking.openURL(phoneNumber);
    
      };

      dialCallEDHI() {

        let phoneNumber = '115';
    
    
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
                                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', marginTop: 53 }}>HELPLINE</Text>
                            </View>
                            <View style={{ width: '25%' }}>
                                {/* <Image style={{ width: 30, height: 30, marginTop: hp('7.5%'), alignSelf: 'flex-end' }} source={require('../image/sos.png')} /> */}
                            </View>

                        </View>
                    </View>
                </View>

                <ScrollView>
                    <Image style={{ height: 245, width: '100%' }} source={require('./../image/helpline.jpg')} />
                    <View style={{marginTop:-110, padding:13}}>
                        {/* <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Punjab Safe Cities Authority</Text> */}
                        {/* <Text style={{color:'white', fontSize:15,}}>Your Safety Our Priority</Text> */}
                    </View>
                    <TouchableOpacity onPress={()=> this.dialCallMADADGAR()} style={{marginTop:10}}>
                        <View style={styles.card1}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ backgroundColor: '#F27126', borderRadius: 0, height: 80, width: 80, justifyContent: 'center' }}>
                                    <Image style={{ alignSelf: 'center', width: 45, height: 45 }} source={require('./../image/2352341.png')} />
                                </View>
                                <Text style={{ paddingLeft: 20, paddingTop:20, fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>MADADGAR Helpline{"\n"}</Text>(0334-5556667)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.dialCallCPLC()}>
                        <View style={styles.card2}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ backgroundColor: '#F27126', borderRadius: 0, height: 80, width: 80, justifyContent: 'center' }}>
                                    <Image style={{ alignSelf: 'center', width: 45, height: 45 }} source={require('./../image/2352341.png')} />
                                </View>
                                <Text style={{ paddingTop: 20, paddingLeft:20, fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>CPLC Helpline{"\n"}</Text>(1102)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.dialCallEDHI()}>
                        <View style={styles.card3}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ backgroundColor: '#F27126', borderRadius: 0, height: 80, width: 80, justifyContent: 'center' }}>
                                    <Image style={{ alignSelf: 'center', width: 45, height: 45 }} source={require('./../image/2352341.png')} />
                                </View>
                                <Text style={{ paddingTop: 20, paddingLeft:20, fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>EDHI Helpline{"\n"}</Text>(115)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

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
        backgroundColor: '#fff',
        borderBottomColor: '#B9B9B9',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 16,
        marginTop: wp('2%'),
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
        borderRadius: 10,
        marginLeft: wp('1%')
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
        width: 50,
        height: 50,
    },
    card1: {
        backgroundColor: 'white',
        padding: 5,
        margin: 10,
        marginTop: -10,
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    card2: {
        backgroundColor: 'white',
        padding: 5,
        margin: 10,
        marginTop: 0,
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    card3: {
        backgroundColor: 'white',
        padding: 5,
        margin: 10,
        marginTop: 0,
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    input: {
        backgroundColor: '#fff',
        backgroundColor: '#EBEBEB',
        borderRadius: 5,
        padding: 10,
        height: 50,
        width: wp('70%'),
        marginLeft: 10,
    },
    replyinput: {
        backgroundColor: '#fff',
        backgroundColor: '#EBEBEB',
        borderRadius: 5,
        padding: 10,
        height: 35,
        width: wp('65%'),
        marginLeft: 10,
    },
    replytextinput: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#898989',
        borderRadius: 5,
        padding: 10,
        height: 35,
        width: wp('65%'),
        marginLeft: 10,
    },
});