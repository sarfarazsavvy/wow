import React from 'react';
import { AppRegistry, StyleSheet, Picker, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Dua from './../component/dua';
import Events from './../component/events';
import Mosque from './../component/mosque';
import Causes from './../component/cause';
import Halal from './../component/halal';
import Reviews from './../component/reviews';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class home2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: [
                { id: 1, title: 'Muhammad Tariq', subject: 'Subject', comments: '2 comments', image: require('./../image/duaicon.png') },
                { id: 2, title: 'Ali Ahsan', subject: 'Subject', comments: '8 comments', image: require('./../image/duaicon.png') },
                { id: 3, title: 'Hamza Ali', subject: 'Subject', comments: '25 comments', image: require('./../image/duaicon.png') },
                { id: 4, title: 'Muhammad Tariq', subject: 'Subject', comments: '500 comments', image: require('./../image/duaicon.png') },
                { id: 5, title: 'Hamza Ali', subject: 'Subject', comments: '15 comments', image: require('./../image/duaicon.png') },
                { id: 6, title: 'Muhammad Tariq', subject: 'Subject', comments: '75 comments', image: require('./../image/duaicon.png') },
                { id: 7, title: 'Ali Ahsan', subject: 'Subject', comments: '200 comments', image: require('./../image/duaicon.png') },
                { id: 8, title: 'Muhammad Tariq', subject: 'Subject', comments: '475 comments', image: require('./../image/duaicon.png') },
                { id: 9, title: 'Hamza Ali', subject: 'Subject', comments: '175 comments', image: require('./../image/duaicon.png') },
            ],
            dua: true,
            events: false,
            mosque: false,
            causes: false,
            halal: false,
        };
    }

    return() {
        return;
      }
    
      EXIT() {
        BackHandler.exitApp()
      }
    
      disableBackButton = () => {
        this.myexit()
        return true;
      }
    
      componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
      }
    
      myexit() {
        Alert.alert(
          'Are you sure you want to exit?',
          '',
          [
            { text: 'NO', onPress: () => this.return(), style: 'cancel' },
            { text: 'YES', onPress: () => this.EXIT() },
          ]
        );
      }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Ionicons
                name='ios-time'
                type='font-awesome'
                size={24}
                style={{ color: tintColor }}
                containerStyle={{ width: width(10) }}
            />
        )
    }
    ScreenView() {
        if (this.state.events) {
            return (
                <Events navigation={this.props.navigation} />
            )
        }
        else if (this.state.mosque) {
            return (
                <Reviews navigation={this.props.navigation} />
            )
        }
        else if (this.state.dua) {
            return (
                <Dua navigation={this.props.navigation} />
            )
        }
        else if (this.state.causes) {
            return (
                <Causes navigation={this.props.navigation} />
            )
        }
        else {
            return (
                <Halal navigation={this.props.navigation} />
            )
        }
    }

    renderDayRow = ({ item }) => {
        return (

            <TouchableOpacity style={styles.userList} onPress={() => this.props.navigation.navigate('duadetail')}>
                <View style={{ flex: 1, flexDirection: 'row', }}>

                    <Image style={styles.image} source={item.image} />

                    <View>

                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.desc}>{item.subject}</Text>
                        <FontAwesome name="angle-right" size={25} style={{ textAlign: 'right', marginLeft: wp('65%'), marginTop: -25 }} />
                        <Text style={styles.desc2}>{item.comments}</Text>

                    </View>

                </View>

            </TouchableOpacity>

        )
    }

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


                {this.ScreenView()}

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('0%'), backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#b9b9b9', height:60 }}>


                    {/* <TouchableOpacity
                        onPress={() => this.setState({ dua: false, events: true, mosque: false, causes: false, halal: false })}
                        style={{
                            padding: 10,
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            width: wp('21%'),

                        }}>
                            <Image style={{
                            width:23,
                            height:19,
                        }}
                            source={this.state.events ? require('../image/contacts-hover.png') : require('../image/contacts.png')} />
                        <Text style={{
                            color: this.state.events ? '#F27126' : '#828282',
                            fontSize: 12
                        }}>Contacts</Text>
                        
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        onPress={() => this.setState({ dua: false, events: true, mosque: false, causes: false, halal: false })}
                        style={{
                            padding: 13,
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            width: wp('20%'),
                            marginTop:2.8,

                        }}>
                            <Image style={{
                           width:23,
                           height:19,
                        }}
                        source={this.state.events ? require('../image/contacts-hover.png') : require('../image/contacts.png')} />
                        <Text style={{
                            color: this.state.events ? '#F27126' : '#828282',
                            fontSize: 11
                        }}>Contacts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.setState({ dua: false, events: false, mosque: true, causes: false, halal: false })}
                        style={{
                            padding: 13,
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            width: wp('20%'),
                            marginTop:1,

                        }}>
                            <Image style={{
                           width:22,
                           height:21,
                        }}
                        source={this.state.mosque ? require('../image/wow.png') : require('../image/wow1.png')} />
                        <Text style={{
                            color: this.state.mosque ? '#F27126' : '#828282',
                            fontSize: 11
                        }}>Wow</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.setState({ dua: true, events: false, mosque: false, causes: false, halal: false })}
                        style={{
                            padding: 15,
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            width: wp('20%'),

                        }}>
                            <Image style={{
                            width: this.state.dua ? 80 : 80,
                            height: this.state.dua ? 74 : 74,
                            marginTop:-30
                        }}
                            source={require('../image/home-button.png')} />
                        {/* <Text style={{
                            color: this.state.dua ? '#556EA4' : '#556EA4',
                            fontSize: 12
                        }}></Text> */}

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.setState({ dua: false, events: false, mosque: false, causes: true, halal: false })}
                        style={{
                            padding: 13,
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            width: wp('20%'),
                            marginTop:1,

                        }}>
                            <Image style={{
                           width:23,
                           height:19,
                        }}
                        source={this.state.causes ? require('../image/messages-hover.png') : require('../image/messages.png')} />
                        <Text style={{
                            color: this.state.causes ? '#F27126' : '#828282',
                            fontSize: 10
                        }}>Messages</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.setState({ dua: false, events: false, mosque: false, causes: false, halal: true })}
                        style={{
                            padding: 13,
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            width: wp('20%'),
                        }}>
                            <Image style={{
                            width:20,
                            height:20,
                        }}
                        source={this.state.halal ? require('../image/more-hover.png') : require('../image/more.png')} />
                        <Text style={{
                            color: this.state.halal ? '#F27126' : '#828282',
                            fontSize: 11
                        }}>More</Text>
                    </TouchableOpacity>

                </View>

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
});