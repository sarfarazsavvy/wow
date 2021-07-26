import React, { Component } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import { totalSize } from 'react-native-dimension';
const { width } = Dimensions.get('window')
import { TextInput, TouchableRipple, Card } from 'react-native-paper';
import MapView from 'react-native-maps';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import getDirections from 'react-native-google-maps-directions'

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];


const height = width * 100 / 90;
export default class halaldetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            phone: '',
            photos: [],
            IMGS: [
                { id: 1, Image: 'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png' },
                { id: 2, Image: 'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg' },
                { id: 3, Image: 'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg' },
            ],
            sliderindex: 0,
        };
    }

    onPressNext = () => {
        console.log('hello Working')
        const { sliderindex } = this.state
        this.setState(prev => ({ sliderindex: prev.sliderindex === this.state.photos.length - 1 ? 0 : prev.sliderindex +1 }),
            () => {
                this.flatListRef.scrollToIndex({ animated: true, index: sliderindex })
            });
    };


    componentDidMount = async () => {
        this.setState({
            title: this.props.navigation.getParam('TITLE'),
        });
        this.getData();
        this.timeout = setInterval(()=> this.onPressNext(), 3000)

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
            // fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${PHOTO}&key=AIzaSyCj0T6t0ushlK-njZF4DwHlcMIAiLK1Tsk`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.result.photos);
                // console.log(responseJson.result.photos[0].photo_reference);

                this.setState({
                    title: responseJson.result.name,
                    description: responseJson.result.formatted_address,
                    phone: responseJson.result.international_phone_number,
                    photos: responseJson.result.photos,
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
        return (
            <View>
                {/* <Image style={styles.ads} source={{uri: item.Image}} /> */}
                <Image style={styles.ads} source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=AIzaSyCj0T6t0ushlK-njZF4DwHlcMIAiLK1Tsk` }} />
            </View>
        )
    }

    render() {
        // console.log(this.state.photos)
        return (
            <View style={styles.container}>

                <View style={{ backgroundColor: '#D49C0F', height: '13.5%' }}>
                    <View style={{ marginTop: hp('6%'), marginHorizontal: wp('5%'), flex: 1, flexDirection: 'row' }}>
                        <View style={{ marginTop: wp('3%') }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color='white' size={25} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginLeft: wp('22%'), marginTop: -10 }}>HALAL DETAIL</Text>
                    </View>
                </View>

                <ScrollView>

                    <FlatList
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.photos}
                        renderItem={this.renderAds}
                        keyExtractor={item => item.id}
                        ref={ref => {
                            this.flatListRef = ref;
                        }}
                    />

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