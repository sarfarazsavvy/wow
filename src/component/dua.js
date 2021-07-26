import React from 'react';
import { StyleSheet, Picker, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, Linking, Button, AsyncStorage } from 'react-native';
import { totalSize } from 'react-native-dimension';
const { width } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];

const height = width * 100 / 90;
export default class Dua extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                { img: require('./../image/home-page-slider2.jpg') },
                { img: require('./../image/home-page-slider1.jpg') },
            ],
            SIMG: [],
            active: 0,
            selectedIndex: 0,
            sliderindex: 0,
            token: ''
        };
    }

    // async askpermission() {

    //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    //     if (status == 'granted') {

    //         const token1 = await Notifications.getExpoPushTokenAsync();
    //         let UID = await AsyncStorage.getItem('ID');
    //         try {
    //             fetch(`https://wow.itsolexperts.com/public/api/token_add/${UID}`, {

    //                 method: 'POST',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     push_token: token1
    //                 })
    //             }).then((response) => response.json())
    //                 .then((responseJson) => {
    //                     console.log(responseJson)
    //                 })
    //                 .catch((error) => {
    //                     Alert.alert('500 Error', 'No / Slow Response From Server');
    //                 });
    //         } catch (E) {
    //             console.log(E);
    //         }
    //     }
    // }

    // sendpush() {

    //     try {
    //         let response = fetch('https://exp.host/--/api/v2/push/send', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 to: "ExponentPushToken[cNRui2DpQXswAOl0IZtUR9]",
    //                 sound: 'default',
    //                 title: "hello",
    //                 body: "world"
    //             })
    //         })

    //         console.log(response)

    //     } catch (E) {
    //         console.log(E);
    //     }
    // }

    timeout = 0;
    componentDidMount = async () => {
        this.timeout = setInterval(() => this.onPressNext(), 4000);
        this.checkIMG();
        // this.askpermission();
    }



    onPressNext = () => {
        const { sliderindex } = this.state
        this.setState(prev => ({ sliderindex: prev.sliderindex === this.state.images.length - 1 ? 0 : prev.sliderindex + 1 }),
            () => {
                this.flatListRef.scrollToIndex({ animated: true, index: sliderindex })
            });
    };

    


    checkIMG = async () => {
        fetch(`https://wow.itsolexperts.com/public/api/add_image`)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState({ SIMG: responsejson.status })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentWillMount() {
        clearInterval(this.timeout);
    }

    render() {
        const swipeSetting = {

            autoClose: true,
            onClose: (secId, rowId, direction) => {

            },
            onOpen: (secId, rowId, direction) => {

            },
            right: [
                {
                    onPress: () => {

                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index
        }
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

    renderAds = ({ item }) => {
        return (
            <View>
                <Image style={styles.ads} source={{ uri: `https://wow.itsolexperts.com/public/assets/images/${item.image}` }} />
            </View>
        )
    }

    change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.active) {
            this.setState({ active: slide })
        }
    }

    dialCall() {

        let phoneNumber = '115';


        if (Platform.OS === 'android') {
            phoneNumber = `tel:${'115'}`;
        }
        else {
            phoneNumber = `telprompt:${'115'}`;
        }

        Linking.openURL(phoneNumber);

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', height: '14%', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                    <View style={{ marginTop: hp('0%'), marginHorizontal: wp('5%'), }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '25%' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                    <Image style={{ width: 30, height: 20, marginTop: hp('8%') }} source={require('../image/sidebar-icon.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', marginTop: 53 }}>HOME</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.dialCall()} style={{ width: '25%' }}>
                                <Image style={{ width: 30, height: 30, marginTop: hp('7.5%'), alignSelf: 'flex-end' }} source={require('../image/sos.png')} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <FlatList
                    pagingEnabled
                    horizontal
                    onScroll={this.change}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.SIMG}
                    renderItem={this.renderAds}
                    keyExtractor={item => item.id}
                    ref={ref => {
                        this.flatListRef = ref;
                    }}
                />
                <View style={styles.pagging}>
                    {
                        this.state.SIMG.map((i, k) => (
                            <Text style={k == this.state.active ? styles.paggingActiveText : styles.paggingText}>⬤</Text>
                        ))
                    }
                </View>

                <ScrollView>

                    <View style={{ flexDirection: 'row', marginTop: -40 }}>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('mosque', { STATUS: '1' })} style={{ backgroundColor: '#F27126', borderRadius: 10, marginTop: 50, height: 130, width: 130, margin: 10, alignSelf: 'center' }}>
                                <Image style={{ alignSelf: 'center', width: 50, height: 50, marginTop: 25, marginBottom: -20 }} source={require('./../image/decision.png')} />
                                <Text style={{ color: 'white', padding: 30, textAlign: 'center', fontSize: 14 }}>Start Journey</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('reviews', { STATUS: '1' })} style={{ backgroundColor: '#F27126', borderRadius: 10, marginTop: 50, height: 130, width: 130, margin: 10, alignSelf: 'center' }}>
                                <Image style={{ alignSelf: 'center', width: 50, height: 50, marginTop: 25, marginBottom: -20 }} source={require('./../image/2352341.png')} />
                                <Text style={{ color: 'white', padding: 30, textAlign: 'center', fontSize: 14 }}>Rated Routes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: -40 }}>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('eventdetail')} style={{ backgroundColor: '#F27126', borderRadius: 10, marginTop: 50, height: 130, width: 130, margin: 10, alignSelf: 'center' }}>
                                <Image style={{ alignSelf: 'center', width: 50, height: 50, marginTop: 25, marginBottom: -20 }} source={require('./../image/cctv.png')} />
                                <Text style={{ color: 'white', padding: 30, textAlign: 'center', fontSize: 14 }}>Helpline</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('menualmenu')} style={{ backgroundColor: '#F27126', borderRadius: 10, marginTop: 50, height: 130, width: 130, margin: 10, alignSelf: 'center' }}>
                                <Image style={{ alignSelf: 'center', width: 50, height: 50, marginTop: 25, marginBottom: -20 }} source={require('./../image/manual.png')} />
                                <Text style={{ color: 'white', padding: 30, textAlign: 'center', fontSize: 14 }}>WOW Manual</Text>
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
        width: 60,
        height: 60,
    },
    ads: {
        width: width,
        height: 245,
        alignSelf: 'center',
    },
    pagging: {
        flexDirection: 'row', alignSelf: 'center'
    },
    paggingText: {
        color: '#888', marginTop: -35, margin: 3
    },
    paggingActiveText: {
        color: '#fff', marginTop: -35, margin: 3
    },
});