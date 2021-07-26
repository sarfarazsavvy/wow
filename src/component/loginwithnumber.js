import React from 'react';
import { StyleSheet, Image, Text, View, BackHandler, KeyboardAvoidingView, Dimensions, TouchableOpacity, AsyncStorage, ActivityIndicator, Modal } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import SvgUri from "expo-svg-uri";
import Geocoder from 'react-native-geocoding';

export default class loginwithnumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            Phone: '',
            email: '',
            password: '',
            country: '',
            countrycode: '+92',
            loading: false,
            latitude: '',
            longitude: '',
            mode: '',
            dataSource: [],
            Code: '',
            modalvisible: false,
            forgotemail: ''
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


    Login = () => {

        const { Phone } = this.state;
        const { password } = this.state;

        if (this.state.Phone == '') {
            alert("Please Enter Your Phone Number");
            return;
        }
        else if (this.state.password == '') {
            alert("Please Enter Your Password");
            return;
        }
        else {
            this.setState({ loading: true })
            fetch('https://wow.itsolexperts.com/public/api/login_p', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    phonenumber: '+92'+Phone,
                    password: password,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({ loading: false })

                    if (responseJson.message == 'Incorrect login credentials') {
                        alert('Incorrect login credentials');
                        return;
                    }
                    if (responseJson.message == 'Incorrect password') {
                        alert('Incorrect Password');
                        return;
                    }

                    if (responseJson.message == 'You are successfully logged in') {

                        console.log(responseJson)

                        let USERID = `${responseJson.data[0].id}`;
                        AsyncStorage.setItem('ID', USERID);

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
                    console.log(error)
                });
        }
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
                    console.log(responseJson)
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
            <View style={{ marginTop: 10, marginBottom: 0 }}>
                <ActivityIndicator color="#F27126" size={'small'} animating={this.state.loading} />
            </View>
        )
    };

    navnext() {
        this.setState({ modalvisible: false });
        this.props.navigation.navigate('verify')
    }

    checkemail() {
        const { forgotemail } = this.state;

        if (this.state.forgotemail == '') {
            alert("Please Enter Your Email");
            return;
        }
        else {
            this.setState({ loading: true })
            fetch('https://wow.itsolexperts.com/public/api/check_email', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: forgotemail
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({ loading: false })

                    if (responseJson.profile == '') {
                        alert('Please Create Your Account');
                        return;
                    }

                    if (responseJson.profile != '') {
                        this.setState({modalvisible:false})
                        this.props.navigation.navigate('verifynumber', {PHONE: responseJson.profile[0].phonenumber, FORGOT:1, EMAIL:forgotemail })
                        return;
                    }

                })
                .catch((error) => {
                    alert(error);
                    console.log(error)
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>


                <ScrollView>
                    <View style={styles.responsiveBox}>
                        <Image style={{ alignSelf: 'center', marginTop: 50, width: 250, height: 280 }} source={require('../image/verify-number-page.png')} />
                        {/* <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', color: '#181718', marginTop: 10 }}>Enter Your Email & Password</Text> */}
                        {/* <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: '#c8c8c8', marginTop: 5 }}>Please enter your mobile number to</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: '#c8c8c8', marginTop: 0 }}>receive a verification code. Message and data</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: '#c8c8c8', marginTop: 0 }}>rates may apply.</Text> */}
                    </View>
                    <KeyboardAvoidingView behavior="padding">

                        <View style={{ marginTop: 30, flexDirection: 'row' }}>
                            <Image style={{ marginTop: 15, marginLeft: wp('12%'), marginRight: wp('2%'), width: 25, height: 25 }} source={require('./../image/phoneicon.png')} />
                            <TextInput
                                style={styles.input2}
                                theme={{
                                    colors: {
                                        primary: '#F7941D',
                                    }
                                }}
                                placeholder="Enter Your Phone Number"
                                placeholderTextColor={'#BFBFBF'}
                                value={this.state.Phone}
                                onChangeText={Phone => this.setState({ Phone })}
                            />

                        </View>

                        <View style={{ marginTop: 25, flexDirection: 'row' }}>
                            <Image style={{ marginTop: 15, marginLeft: wp('12%'), marginRight: wp('2%'), width: 25, height: 25 }} source={require('./../image/passicon.png')} />
                            <TextInput
                                style={styles.input2}
                                theme={{
                                    colors: {
                                        primary: '#F7941D',
                                    }
                                }}
                                placeholder="Enter Your Password"
                                placeholderTextColor={'#BFBFBF'}
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                            />

                        </View>

                    </KeyboardAvoidingView>



                    {this.renderButton()}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.Login()}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.setState({ modalvisible: true })} style={{ alignSelf: 'center', marginTop: 15 }}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>Forget Password?</Text>
                    </TouchableOpacity>

                </ScrollView>

                <Modal visible={this.state.modalvisible}>

                    <View style={{ height: '8%', backgroundColor: '#F27126' }}>
                        <View style={{ marginTop: 18, flexDirection: 'row' }}>

                            <View style={{ marginLeft: 20, width: '10%', alignItems: 'center' }}>
                                <AntDesign name='arrowleft' color='#fff' size={26}
                                    onPress={
                                        () => this.setState({ modalvisible: false })
                                    } />
                            </View>
                            <View style={{ marginTop: 0, width: '70%', alignSelf: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', alignSelf: 'center' }}>Forgot Password</Text>
                            </View>

                        </View>
                    </View>

                    <KeyboardAvoidingView behavior="padding">
                        <View style={{ marginTop: 60, flexDirection: 'row' }}>
                            <Image style={{ marginTop: 15, marginLeft: wp('12%'), marginRight: wp('2%'), width: 25, height: 25 }} source={require('./../image/emailicon.png')} />
                            <TextInput
                                style={styles.input2}
                                theme={{
                                    colors: {
                                        primary: '#F7941D',
                                    }
                                }}
                                placeholder="Enter Your Email"
                                placeholderTextColor={'#BFBFBF'}
                                value={this.state.forgotemail}
                                onChangeText={forgotemail => this.setState({ forgotemail })}
                            />

                        </View>
                    </KeyboardAvoidingView>

                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.checkemail()}>
                            <Text style={styles.buttonText}>Reset</Text>
                        </TouchableOpacity>
                    </View>


                </Modal>


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
    headerText: {
        marginTop: wp('40%'),
        fontSize: 60,
        color: 'white',
        alignSelf: 'center',
    },
    input: {
        marginTop: wp('5%'),
        marginLeft: 0,
        backgroundColor: 'transparent',
        height: 45,
        width: 70,
        alignSelf: 'flex-end'
    },
    input2: {
        // marginTop: wp('5%'),
        marginHorizontal: 0,
        backgroundColor: '#fff',
        height: 45,
        marginRight: 0,
        width: '70%',
        alignSelf: 'center',

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
    signupView: {
        alignItems: 'center',
        marginTop: hp('35%')
    },
    alresdy: {
        fontSize: hp('2.5%'),
        color: '#666666'
    },
    signupText: {
        fontSize: hp('2.5%'),
        marginTop: hp('1%'),
        color: '#00cb9c',
        fontWeight: 'bold'
    },
    responsiveBox: {
        width: wp('100%'),
        // height: hp('100%'),
    },
});