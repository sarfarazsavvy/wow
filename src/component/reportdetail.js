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
export default class reportdetail extends React.Component {
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
                <View style={{ width: '100%', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={styles.image} source={{ uri: `https://wow.itsolexperts.com/public/assets/images/${item.image}` }} />
                </View>

                <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>{item.first_name} {item.last_name}</Text>


                <View style={{ padding: 10, backgroundColor: '#F27126', marginTop: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff',textAlign:'center', fontSize:15, marginTop:5, marginBottom:5 }}>Category</Text>
                    <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}> {item.category}</Text>
                </View>
                
                <View style={{ padding: 10, backgroundColor: '#F27126', marginTop: 1 }}>
                <Text style={{ fontWeight: 'bold', color: '#fff',textAlign:'center', fontSize:15, marginTop:5, marginBottom:5 }}>Comment</Text>
                    <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}> {item.comment}</Text>
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
        let ID = this.props.navigation.getParam('RepID');

        fetch(`https://wow.itsolexperts.com/public/api/report_details/${ID}`)
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
});