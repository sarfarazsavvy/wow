import React from 'react';
import { StyleSheet, Picker, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, Linking, BackHandler } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome5, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class reviewDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: [
                { id: 1, title: 'Jullie Farnandish', image: require('./../image/userprofile.jpg') },
            ],
            reviews: [],
            STATUS: '',
        };
    }



    renderDayRow = ({ item }) => {
        return (



            <View>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ width: '16%' }}>
                        <FontAwesome5 style={{ marginLeft: 25, marginRight: 10 }} name='map-marker-alt' color='#000' size={26} />
                    </View>
                    <View style={{ width: '80%' }}>
                        <Text style={{ fontSize: 14, color: '#000' }}><Text style={{ fontWeight: 'bold', color: '#000' }}>From:</Text> {item.to}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ width: '16%' }}>
                        <FontAwesome5 style={{ marginLeft: 25, marginRight: 10 }} name='map-marker-alt' color='#000' size={26} />
                    </View>
                    <View style={{ width: '80%' }}>
                        <Text style={{ fontSize: 14, color: '#000' }}><Text style={{ fontWeight: 'bold', color: '#000' }}>To:</Text> {item.from}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ width: '60%' }}>
                        <Text style={{ textAlign: 'right' }}> <Text style={{ fontWeight: 'bold' }}>Overall Rating:</Text> {item.Average}</Text>
                    </View>
                    <View style={{ width: '40%' }}>
                        <Image style={{ width: 15, height: 15, marginTop: 2, marginLeft: 5 }} source={require('./../image/starblack.png')} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', padding: 20 }}>
                    <View style={{ width: '20%' }}>
                        {item.image == null || item.image == 'null' ?
                            <Image style={styles.imager} source={require('./../image/pic.png')} />
                            :
                            <Image style={styles.imager} source={{ uri: `https://wow.itsolexperts.com/public/assets/images/${item.image}` }} />
                        }
                        {/* <Image style={styles.imager} source={{ uri: `https://wow.itsolexperts.com/public/assets/images/${item.image}` }} /> */}
                    </View>
                    <View style={{ width: '70%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5, color: '#000', marginTop: 15, marginLeft: 10 }}>{item.first_name} {item.last_name}</Text>
                    </View>
                </View>

                <View style={{ padding: 20, marginTop: -10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Route Comments</Text>
                    <Text style={{ fontSize: 13, marginLeft: 20, marginTop: 5 }}>{item.comment}</Text>

                </View>

                <View style={{ padding: 10, backgroundColor: '#F27126' }}>

                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff', marginRight: 10 }}>Security</Text>

                    <View style={{ flexDirection: 'row', marginTop: -5 }}>
                        <View style={{ width: '32%' }}></View>
                        <View style={{ width: '40%', flexDirection: 'row' }}>
                            {item.rating1 == '1' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating1 == '2' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating1 == '3' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating1 == '4' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating1 == '5' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                </View>
                                :
                                null
                            }
                        </View>
                        <View style={{ width: '30%' }}></View>
                    </View>

                </View>

                <View style={{ padding: 10, backgroundColor: '#F27126', marginTop: 1 }}>

                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff', marginRight: 10 }}>Harassment</Text>

                    <View style={{ flexDirection: 'row', marginTop: -5 }}>
                        <View style={{ width: '32%' }}></View>
                        <View style={{ width: '40%', flexDirection: 'row' }}>
                            {item.rating2 == '1' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating2 == '2' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating2 == '3' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating2 == '4' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating2 == '5' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                </View>
                                :
                                null
                            }
                        </View>
                        <View style={{ width: '30%' }}></View>
                    </View>

                </View>

                <View style={{ padding: 10, backgroundColor: '#F27126', marginTop: 1 }}>

                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff', marginRight: 10 }}>Safety</Text>

                    <View style={{ flexDirection: 'row', marginTop: -5 }}>
                        <View style={{ width: '32%' }}></View>
                        <View style={{ width: '40%', flexDirection: 'row' }}>
                            {item.rating3 == '1' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating3 == '2' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating3 == '3' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating3 == '4' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/staroutline.png')} />
                                </View>
                                :
                                null
                            }
                            {item.rating3 == '5' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                    <Image style={{ width: 15, height: 15, marginTop: 13, marginLeft: 5 }} source={require('./../image/star.png')} />
                                </View>
                                :
                                null
                            }
                        </View>
                        <View style={{ width: '30%' }}></View>
                    </View>

                </View>

            </View>

        )
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

    componentDidMount() {
        this.setState({
            STATUS: this.props.navigation.getParam('STATUS')
        });
        this.getData();
    }

    getData = async () => {
        this.setState({ loading: true })
        let ID = this.props.navigation.getParam('RID');

        fetch(`https://wow.itsolexperts.com/public/api/show/${ID}`)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState({
                    loading: false,
                    reviews: responsejson.data,
                });
            })
            .catch((error) => {
                console.log(error)
                // Alert.alert(error)
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
                                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                    <AntDesign style={{ marginTop: hp('7.5%') }} name='arrowleft' color='#5f5d70' size={26} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center', textAlign: 'center', marginTop: 55 }}>DETAILS</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.dialCall()} style={{ width: '25%' }}>
                                <Image style={{ width: 30, height: 30, marginTop: hp('7.5%'), alignSelf: 'flex-end' }} source={require('../image/sos.png')} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <ScrollView >
                    <FlatList
                        pagingEnabled
                        data={this.state.reviews}
                        renderItem={this.renderDayRow}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        alignSelf: 'center',
        textAlign: 'center'
    },
    desc: {
        fontSize: 13,
        color: '#B9B9B9',
    }, desc2: {
        fontSize: 13,
        color: '#B9B9B9',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 300,
        borderWidth: 2,
        borderColor: 'white'
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
    imager: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#F27126'
    },
});