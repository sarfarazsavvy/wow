import React from 'react';
import { StyleSheet, Picker, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, Linking, BackHandler } from 'react-native';
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
export default class reviews extends React.Component {
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

            <TouchableOpacity onPress={() => this.props.navigation.navigate('reviewDetail', { RID: item.id })} style={{ borderWidth: 1, backgroundColor: '#F27126', borderColor: '#F27126', margin: 10, borderRadius: 10, flexDirection: 'row', paddingBottom: 10 }}>
                <View style={{ width: '30%', padding: 10, justifyContent: 'center' }}>
                    {item.image == null || item.image == 'null' ?
                        <Image style={styles.image} source={require('./../image/pic.png')} />
                        :
                        <Image style={styles.image} source={{ uri: `https://wow.itsolexperts.com/public/assets/images/${item.image}` }} />
                        }
                </View>
                <View style={{ width: '70%', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5, color: 'white' }}>{item.first_name} {item.last_name}</Text>
                        </View>
                        <View style={{ width: '25%', flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ alignSelf: 'center', marginRight: 5, textAlign: 'right', color: 'white', fontWeight: 'bold' }}>{item.ratings}</Text>
                            <Image style={{ width: 15, height: 15, alignSelf: 'center' }} source={require('./../image/star.png')} />
                        </View>
                    </View>



                    <Text style={{ fontSize: 14, color: 'white' }}><Text style={{ fontWeight: 'bold', color: 'white' }}>From:</Text> {item.from}</Text>
                    <Text style={{ fontSize: 14, color: 'white' }}><Text style={{ fontWeight: 'bold', color: 'white' }}>To:</Text> {item.to}</Text>
                    <Text style={{ fontSize: 14, color: 'white' }}><Text style={{ fontWeight: 'bold', color: 'white' }}>Comment:</Text> {item.comment}</Text>
                </View>
            </TouchableOpacity>

        )
    }

    disableBackButton = () => {
        let status = this.props.navigation.getParam('STATUS');
        if (status == '1') {
            this.props.navigation.goBack(null);
            return true;
        } else {
            console.log('hello');
            return true;
        }
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
        fetch(`https://wow.itsolexperts.com/public/api/show_rides`)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState({
                    loading: false,
                    reviews: responsejson.data,
                });
            })
            .catch((error) => {
                Alert.alert(error)
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
                                {this.state.STATUS == '1' ?
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                        <AntDesign style={{ marginTop: hp('7.5%') }} name='arrowleft' color='#5f5d70' size={26} />
                                    </TouchableOpacity>
                                    :
                                    null
                                }
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center', textAlign: 'center', marginTop: 55 }}>RATED ROUTES</Text>
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
        width: 80,
        height: 80,
        borderRadius: 50,
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
});