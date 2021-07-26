import React from 'react';
import { StyleSheet, Image, Text, View, Picker, KeyboardAvoidingView, Dimensions, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SvgUri from "expo-svg-uri";
import Geocoder from 'react-native-geocoding';

export default class verifynumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            Phone: this.props.navigation.getParam('PHONE'),
            country: '',
            countrycode: '+92',
            loading: false,
            latitude: '',
            longitude: '',
            mode: '',
            dataSource: [],
            Code: '',
        };
    }


    Login = () => {

        const { Phone } = this.state;
        const { countrycode } = this.state;
        let forgot = this.props.navigation.getParam("FORGOT")
        let myemail = this.props.navigation.getParam("EMAIL")

        let cphone = countrycode + Phone

        if (this.state.countrycode == '') {
            alert("Please Select Your Country Code");
            return;
        }
        else if (this.state.Phone == '') {
            alert("Please Enter Your Phone Number");
            return;
        }
        else {
            this.setState({ loading: true })
            fetch('https://wow.itsolexperts.com/public/api/send_otp', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    phonenumber: Phone,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({ loading: false })

                    if (responseJson.success == 1) {

                        // this.props.navigation.navigate('otp', {COUNTRYCODE:responseJson.user.country_code, PHONE:responseJson.user.phonenumber});
                        // AsyncStorage.setItem("UID", responseJson.user.id);
                        this.props.navigation.navigate('otp', { PHONE: this.state.Phone, CODE: this.state.countrycode, FORGOT:forgot, EMAIL: myemail })
                    }
                })
                .catch((error) => {
                    alert(error);
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

    render() {
        return (
            <View style={styles.container}>


                <ScrollView>
                    <View style={styles.responsiveBox}>
                        <Image style={{ alignSelf: 'center', marginTop: 50, width: 250, height: 280 }} source={require('../image/verify-number-page.png')} />
                        <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', color: '#181718', marginTop: 10 }}>Verify Your Number</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: '#c8c8c8', marginTop: 5 }}>Please enter your mobile number to</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: '#c8c8c8', marginTop: 0 }}>receive a verification code. Message and data</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: '#c8c8c8', marginTop: 0 }}>rates may apply.</Text>
                    </View>
                    <KeyboardAvoidingView behavior="padding">
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 30, alignSelf:'center' }}>

                            <View style={{ flexDirection: 'row', alignSelf:'center' }}>
                                {/* <Image style={{ marginTop: 30, marginLeft: wp('12%'), width: 70, height: 20 }} source={require('./../image/pak.jpg')} /> */}
                                {/* <SvgUri width="25" height="25" style={{ marginTop: 25, marginLeft: wp('13%') }}
                                    source={{ uri: this.state.flag }}
                                /> */}
                                {/* <TextInput
                                    style={styles.input}
                                    theme={{
                                        colors: {
                                            primary: '#F7941D',
                                        }
                                    }}
                                    placeholder="+00"
                                    placeholderTextColor={'#BFBFBF'}
                                    value={this.state.countrycode}
                                    onChangeText={countrycode => this.setState({ countrycode })}
                                    editable={false}
                                /> */}
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf:'center' }}>
                                <TextInput
                                    style={styles.input2}
                                    theme={{
                                        colors: {
                                            primary: '#F7941D',
                                        }
                                    }}
                                    placeholder="Enter Your Number"
                                    placeholderTextColor={'#BFBFBF'}
                                    keyboardType={'phone-pad'}
                                    value={this.state.Phone}
                                    editable={false}
                                    onChangeText={Phone => this.setState({ Phone })}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>


                    {this.renderButton()}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.Login()}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>

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
        marginTop: wp('5%'),
        marginHorizontal: -0,
        backgroundColor: '#fff',
        height: 45,
        marginLeft: 80,
        alignSelf:'center',
        width:'55%'

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