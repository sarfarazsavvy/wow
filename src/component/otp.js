import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    Image,
    ActivityIndicator,
    AsyncStorage,
    KeyboardAvoidingView,
    Button,
    Keyboard,
    BackHandler
} from 'react-native';
import { Ionicons, FontAwesome, AntDesign, } from '@expo/vector-icons';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import OTPTextView from 'react-native-otp-textinput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native';

export default class otp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Phone: this.props.navigation.getParam('PHONE'),
            Phone1: this.props.navigation.getParam('PHONE1'),
            Countrycode: this.props.navigation.getParam('CODE'),
            Otp: '',
            UserId: this.props.navigation.getParam('uid'),
            loading: false,
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            pin5: "",
            pin6: "",
            otpInput: '',
            inputText: '',
        };
    }

    uploaddata = () => {

        const { first } = this.state;
        const { last } = this.state;
        const { email } = this.state;
        const { cnic } = this.state;
        const { cnic2 } = this.state;
        const { cnic3 } = this.state;
        const { gender } = this.state;
        const { phone } = this.state;

        let CNIC = cnic + cnic2 + cnic3


        // console.log('first: '+ first, 'last: '+ last, 'email: '+ email, 'cnic: '+ cnic, 'gender: '+ gender, 'phone: '+ phone, 'lat: '+ this.state.lat, 'lng: '+ this.state.lng);
        // return;

        if (this.state.uri == '') {
            alert('Please Select Your Image')
            return;
        }
        else if (this.state.first === '') {
            alert('Please Enter Your First Name')
            return;
        }
        else if (this.state.last === '') {
            alert('Please Enter Your Last Name')
            return;
        }
        else if (this.state.email === '') {
            alert('Please Enter Your Email')
            return;
        }
        else if (this.state.cnic === '' || this.state.cnic2 === '' || this.state.cnic3 === '') {
            alert('Please Enter Your CNIC')
            return;
        }
        else if (this.state.gender === '') {
            alert('Please Select Your Gender')
            return;
        }
        else if (this.state.phone === '') {
            alert('Please Enter Your Phone Number')
            return;
        }
        else if (this.state.password === '') {
            alert('Please Enter Your Phone Number')
            return;
        }
        else if (this.state.lat == '' || this.state.lng == '') {
            alert('Please Enable Your Location')
            return;
        }
        else {


            this.setState({ loading: true })

            console.log('PHOTO UPLOAD...');
            const data = new FormData();


            {
                this.state.uri != '' ?
                    data.append('image', {
                        uri: this.state.uri,
                        type: 'image/jpg',
                        name: this.state.uri,
                    }) :
                    this.setState({ checkfalse: false })
            }

            data.append('first_name', first);
            data.append('last_name', last);
            data.append('phonenumber', phone);
            data.append('email', email);
            data.append('phone', phone);
            data.append('password', password);
            data.append('gender', gender);
            data.append('cnic', CNIC);
            data.append('lat', this.state.lat);
            data.append('lag', this.state.lng);

            this.setState({ loading: true })
            const url = `https://wow.itsolexperts.com/public/api/register`;
            fetch(url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'multipart/form-data'
                },
                body: data
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loading: false })

                    console.log(responseJson)

                    if (responseJson.message == 'Account Successfully Created') {
                        alert('Your account has been created successfully');


                        let USERID = `${responseJson.data.id}`;
                        this.askpermission(USERID);
                        AsyncStorage.setItem('ID', USERID);

                        let FIRST = `${responseJson.data.first_name}`;
                        AsyncStorage.setItem('FIRST', FIRST);

                        let LAST = `${responseJson.data.last_name}`;
                        AsyncStorage.setItem('LAST', LAST);

                        let IMG = `${responseJson.data.image}`;
                        AsyncStorage.setItem('IMG', IMG);

                        this.checkSession(USERID);
                        this.props.navigation.navigate('home2')
                        return;

                    } else {
                        Alert.alert('ERROR', 'Invalid Data')
                        return;
                    }

                }).catch((error) => {
                    console.log(error)
                    Alert.alert('500 Error', 'Network error / please check internet data.');
                });

        }

    }


    register = () => {

        const { Phone } = this.state;
        const { Countrycode } = this.state;
        const { otpInput } = this.state;
        let forgot = this.props.navigation.getParam("FORGOT");
        let myemail = this.props.navigation.getParam("EMAIL");


        let pho = Countrycode + Phone

        if (this.state.Phone == '') {
            alert("Please Enter Phone Number");
            return;
        }
        else if (this.state.Countrycode == '') {
            alert("Please Enter Your Country Code");
            return;
        }
        else {
            this.setState({ loading: true })
            fetch('https://wow.itsolexperts.com/public/api/verifyauth', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    phonenumber: Phone,
                    verification_code: otpInput,
                })
            }).then((response) => response.json())
                .then((responseJson) => {

                    console.log(responseJson);
                    this.setState({ loading: false })

                    if (responseJson.message == 'Invalid verification code entered!') {
                        alert('Invalid verification code entered!')
                        return;
                    }
                    if (responseJson.message == 'Phone number not found') {
                        alert('Please Create Your Account')
                        // this.props.navigation.navigate('signup', { PHONE: pho })
                        return;
                    }
                    if (responseJson.message == 'Login Succssfully') {
                        if(forgot == '1')
                        {
                            this.props.navigation.navigate('forgot', {EMAIL:myemail});
                            return
                        }
                        console.log(responseJson)

                        let USERID = `${responseJson.data[0].id}`;
                        AsyncStorage.setItem('ID', USERID);

                        this.askpermission(USERID);

                        let FIRST = `${responseJson.data[0].first_name}`;
                        AsyncStorage.setItem('FIRST', FIRST);

                        let LAST = `${responseJson.data[0].last_name}`;
                        AsyncStorage.setItem('LAST', LAST);

                        let IMG = `${responseJson.data[0].image}`;
                        AsyncStorage.setItem('IMG', IMG);

                        this.checkSession(USERID);

                        this.props.navigation.navigate('home2')
                        return;
                    }

                })
                .catch((error) => {
                    alert(error);
                });
        }

    }


    async askpermission(USERID) {
        // if (Constants.isDevice) {

        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        // const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        console.log(status)
        const token1 = await Notifications.getExpoPushTokenAsync();
        // alert(token1.data)

        try {
            fetch(`https://wow.itsolexperts.com/public/api/token_add/${USERID}`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    push_token: token1.data
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                })
                .catch((error) => {
                    Alert.alert('500 Error', 'No / Slow Response From Server');
                });
        } catch (E) {
            console.log(E);
        }
        // }

    }

    checkSession = async (USERID) => {

        if (USERID != '') {
            this.setState({ loading: true })
            fetch(`https://wow.itsolexperts.com/public/api/status_update/${USERID}`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    status: 1

                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loading: false })

                })
                .catch((error) => {
                    this.setState({ label: true, labelText: 'Network error / please check internet data.' })
                });
        }
    }

    renderButton() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <View style={{ marginTop: 20, marginBottom: 0 }}>
                <ActivityIndicator color="#F27126" size={'small'} animating={this.state.loading} />
            </View>
        )
    };

    p1(pin1) {
        this.setState({ pin1: pin1 })
        if (pin1 !== "") {
            this.refs.pin2ref.focus()
        }
    }

    p2(pin2) {
        this.setState({ pin2: pin2 })
        if (pin2 !== "") {
            this.refs.pin3ref.focus()
        }
    }

    p3(pin3) {
        this.setState({ pin3: pin3 })
        if (pin3 !== "") {
            this.refs.pin4ref.focus()
        }
    }

    p4(pin4) {
        this.setState({ pin4: pin4 })
        if (pin4 !== "") {
            this.refs.pin5ref.focus()
        }
    }

    p5(pin5) {
        this.setState({ pin5: pin5 })
        if (pin5 !== "") {
            this.refs.pin6ref.focus()
        }
    }

    p6(pin6) {
        this.setState({ pin6: pin6 })
        if (pin6 !== "") {
            this.register(pin6)
        }
    }




    render() {
        const { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state
        return (
            <View style={styles.safeArea}>
                <View style={styles.container}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        {/* <View style={styles.responsiveBox}> */}
                        <Image style={{ alignSelf: 'center', marginTop: 30, width: 250, height: 290 }} source={require('../image/otp-page-icon.png')} />
                        <Text style={[styles.txtCreateAccount]}>Enter the code sent to <Text style={{ color: '#F27126' }}>{this.state.Phone1}</Text></Text>

                        <KeyboardAvoidingView enabled behavior="padding">
                            <View style={{ marginTop: 0 }}>

                                <OTPTextView

                                    handleTextChange={(text) => this.setState({ otpInput: text })}
                                    inputCount={6}
                                    keyboardType="numeric"
                                    tintColor={'#F27126'}
                                    textInputStyle={styles.inputmy}


                                />


                                {this.renderButton()}


                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.register()}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </TouchableOpacity>

                            </View>
                        </KeyboardAvoidingView>

                        {/* </View> */}
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: 'white' }}>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputmy: {
        width: 40,
        marginLeft: 0
    },
    safeArea: {
        flex: 1,
    },
    box1: {
        backgroundColor: '#f5f4f2',
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 10,
        fontSize: 20,
        textAlign: 'center',
        height: 55,
        width: '13%',
        borderRadius: 5,
        borderColor: '#f3f3f3',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //justifyContent: 'flex-start',
        flexDirection: 'column',
        //alignItems: 'stretch',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    containContent: {
        flex: 2.4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: hp('0%')
    },
    headerText: {
        marginLeft: wp('0%'),
        marginTop: wp('8%'),
        fontSize: hp('5%'),
        fontWeight: 'bold',
        color: '#666666'
    },
    location: {
        marginLeft: wp('0%'),
        marginTop: hp('3%')
    },
    button: {
        marginTop: hp('2%'),
        alignItems: 'center',
        backgroundColor: '#F27126',
        borderRadius: 5,
        height: 40,
        marginHorizontal: wp('20%'),
    },
    buttonText: {

        fontSize: 20,
        color: '#fff',
        marginTop: hp('1%')
    },
    txtCreateAccount: {
        marginTop: hp('5%'),
        fontSize: 15,
        color: '#c8c8c8',
        alignSelf: 'center',
        marginBottom: 50
    },
    inputOtp: {
        width: wp('85%'),
        height: hp('15%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    underlineStyleBase: {
        width: wp('12%'),
        height: hp('8%'),
        borderWidth: 0,
        fontSize: 20,
        borderBottomWidth: 3,
        color: '#000'
    },
    underlineStyleHighLighted: {
        borderColor: "#F7941D",
    },
    resend: {
        alignSelf: 'flex-start',
        marginBottom: hp('0%'),
        color: '#666666'
    },
    time: {
        alignSelf: 'flex-start',
        marginBottom: hp('3%'),
        color: '#F27126'
    },
    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
    },
});
