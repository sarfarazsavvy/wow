import React from 'react';
import { StyleSheet, Picker, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { totalSize } from 'react-native-dimension';
const { width } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple, Card } from 'react-native-paper';
import MapView from 'react-native-maps';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import getDirections from 'react-native-google-maps-directions';
import AutoScrollFlatList from "react-native-autoscroll-flatlist";

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
const height = width * 100 / 90;

// const images = [
//     "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
//     "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//     "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
// ];

export default class mosquedetail extends React.Component {
    scrollRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            phone: '',
            Fajar: '',
            Zuhur: '',
            Asr: '',
            Magrib: '',
            mosphotos: [],
            mosnonphotos: false,
            Isha: '',
            nopic: false,
            selectedIndex: 0,
            sliderindex: 0,
           
        };
    }

    onPressNext = () => {
        console.log('hello Working')
        const { sliderindex } = this.state
        this.setState(prev => ({ sliderindex: prev.sliderindex === this.state.mosphotos.length - 1 ? 0 : prev.sliderindex +1 }),
            () => {
                this.flatListRef.scrollToIndex({ animated: true, index: sliderindex })
            });
    };


    timeout = 0;
    componentDidMount = async () => {
        this.getData();
        this.timeout = setInterval(()=> this.onPressNext(), 2000)
    }
    componentWillMount(){
        clearInterval(this.timeout);
    }
    timeout = 0;
    Back() {
        clearInterval(this.timeout);
        this.props.navigation.goBack(null)
    }

    handleGetDirections = () => {
        let MYLAT = this.props.navigation.getParam('MYLAT');
        let MYLON = this.props.navigation.getParam('MYLON');
        let PLAT = this.props.navigation.getParam('PLACELAT');
        let PLON = this.props.navigation.getParam('PLACELON');

        const data = {
            source: {
                latitude: MYLAT,
                longitude: MYLON
            },
            destination: {
                latitude: PLAT,
                longitude: PLON
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"
                },
                {
                    key: "dir_action",
                    value: "navigate"
                }
            ],

        }

        getDirections(data)
    }


    getData = async (latitude, longitude) => {
        let PLACEID = this.props.navigation.getParam('PLACEID');
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACEID}&key=AIzaSyCj0T6t0ushlK-njZF4DwHlcMIAiLK1Tsk`)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.result.photos)
                if (!responseJson.result.photos) {
                    let photo1 = [{ noImage: 'https://maps.gstatic.com/tactile/pane/default_geocode-1x.png' }];
                    this.setState({
                        title: responseJson.result.name,
                        description: responseJson.result.formatted_address,
                        phone: responseJson.result.international_phone_number,
                        mosphotos: photo1
                    });
                    let CITY = responseJson.result.address_components[4].long_name;
                    let COUNTRY = responseJson.result.address_components[5].long_name;
                    this.getData2(CITY, COUNTRY)
                } else {
                    this.setState({
                        title: responseJson.result.name,
                        description: responseJson.result.formatted_address,
                        phone: responseJson.result.international_phone_number,
                        mosphotos: responseJson.result.photos,
                    });
                    let CITY = responseJson.result.address_components[4].long_name;
                    let COUNTRY = responseJson.result.address_components[5].long_name;
                    this.getData2(CITY, COUNTRY)
                }

            }).catch((error) => {
                console.log(error)
            })
    }

    getData2 = async (CITY, COUNTRY) => {

        fetch(`http://api.aladhan.com/v1/timingsByCity?city=${CITY}&country=${COUNTRY}&method=8`)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    Fajar: responseJson.data.timings.Fajr,
                    Zuhur: responseJson.data.timings.Dhuhr,
                    Asr: responseJson.data.timings.Asr,
                    Magrib: responseJson.data.timings.Maghrib,
                    Isha: responseJson.data.timings.Isha,

                });

            }).catch((error) => {
                console.log(error)
            })
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
        // console.log(item)
        if (item.noImage) {
            return (
                <View>
                    <Image style={styles.ads} source={{ uri: item.noImage }} />
                </View>
            )
        } else {
            return (
                <View>
                    <Image style={styles.ads} source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=AIzaSyCj0T6t0ushlK-njZF4DwHlcMIAiLK1Tsk` }} />
                </View>
            )
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ backgroundColor: '#D49C0F', height: '13.5%' }}>
                    <View style={{ marginTop: hp('6%'), marginHorizontal: wp('5%'), flex: 1, flexDirection: 'row' }}>
                        <View style={{ marginTop: wp('3%') }}>
                            <TouchableOpacity  onPress={() => this.Back()}>
                                <AntDesign name='arrowleft' color='white' size={25} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginLeft: wp('22%'), marginTop: -10 }}>MOSQUE DETAIL</Text>
                    </View>
                </View>

                <ScrollView>

                    <FlatList
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.mosphotos}
                        renderItem={this.renderAds}
                        keyExtractor={item => item.id}
                        ref={ref => {
                            this.flatListRef = ref;
                        }}
                    />
                    {/* <Image style={styles.ads} source={{uri: 'https://maps.gstatic.com/tactile/pane/default_geocode-1x.png'}} /> */}

                    <View style={styles.card1}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: '#D49C0F', fontSize: 15 }}>Title:</Text>
                            <Text style={{ paddingLeft: 5, }}>{this.state.title}</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: '#D49C0F', fontSize: 15 }}>Address: <Text style={{ color: 'black', fontWeight: '100' }}>{this.state.description}</Text></Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: '#D49C0F', fontSize: 15 }}>Phone:</Text>
                            <Text style={{ paddingLeft: 5 }}>{this.state.phone}</Text>
                        </View>

                        <TouchableOpacity onPress={this.handleGetDirections}>
                            <Image style={{ width: 50, height: 50, alignSelf: 'center', marginLeft: wp('60%') }} source={require('./../image/direction.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card3}>
                        <View style={{ padding: 10, backgroundColor: '#D49C0F', borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>
                            <Text style={{ alignSelf: 'center', fontSize: 17, color: 'white' }}>Prayer Timings</Text>
                        </View>
                        <View style={{ padding: 15 }}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, width: '25%', textAlign: 'left' }}>Fajar:</Text>
                                <Text style={{ color: 'black', fontSize: 15, width: '50%', textAlign: 'right' }}>{this.state.Fajar}  AM</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: wp('3%') }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, width: '25%', textAlign: 'left' }}>Zuhur:</Text>
                                <Text style={{ color: 'black', fontSize: 15, width: '50%', textAlign: 'right' }}>{this.state.Zuhur}  PM</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: wp('3%') }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, width: '25%', textAlign: 'left' }}>Asr:</Text>
                                <Text style={{ color: 'black', fontSize: 15, width: '50%', textAlign: 'right' }}>{this.state.Asr}  PM</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: wp('3%') }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, width: '25%', textAlign: 'left' }}>Magrib:</Text>
                                <Text style={{ color: 'black', fontSize: 15, width: '50%', textAlign: 'right' }}>{this.state.Magrib}  PM</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: wp('3%') }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, width: '25%', textAlign: 'left' }}>Isha:</Text>
                                <Text style={{ color: 'black', fontSize: 15, width: '50%', textAlign: 'right' }}>{this.state.Isha}  PM</Text>
                            </View>

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
        width: 50,
        height: 50,
    },
    card1: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        marginTop: -55,
        borderRadius: 10,
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
        padding: 20,
        margin: 20,
        marginTop: 0,
        borderRadius: 10,
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
        margin: 20,
        marginTop: 0,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    ads: {
        width: width,
        height: 245,
        alignSelf: 'center',
    }
});