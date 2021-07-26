import React from 'react';
import { StyleSheet, Image, Text, View, BackHandler, KeyboardAvoidingView, Dimensions, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SvgUri from "expo-svg-uri";
import Geocoder from 'react-native-geocoding';

export default class forgot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            Phone: '',
            email: this.props.navigation.getParam('EMAIL'),
            password: '',
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
        
        const { password } = this.state;
        const { email } = this.state;

        if (this.state.email == '') {
            alert("Please Enter Your Email");
            return;
        }
        else if (this.state.password == '') {
            alert("Please Enter Your Password");
            return;
        }
        else {
            this.setState({ loading: true })
            fetch('https://wow.itsolexperts.com/public/api/updatepassword', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({ loading: false })

                    if (responseJson.message == 'Password Updated!') {
                        alert('Your password is successfully updated');
                        this.props.navigation.navigate("login")
                        return;
                    }
                    
                })
                .catch((error) => {
                    alert(error);
                    console.log(error)
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
                        {/* <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', color: '#181718', marginTop: 10 }}>Enter Your Email & Password</Text> */}
                        {/* <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: '#c8c8c8', marginTop: 5 }}>Please enter your mobile number to</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: '#c8c8c8', marginTop: 0 }}>receive a verification code. Message and data</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold', color: '#c8c8c8', marginTop: 0 }}>rates may apply.</Text> */}
                    </View>
                    <KeyboardAvoidingView behavior="padding">


                        <View style={{ marginTop: 25, flexDirection:'row' }}>
                        <Image style={{ marginTop: 15, marginLeft: wp('12%'), marginRight:wp('2%'), width: 25, height: 25 }} source={require('./../image/passicon.png')} />
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
                        <Text style={styles.buttonText}>Reset</Text>
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