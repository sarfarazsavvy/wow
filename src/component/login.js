import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, BackHandler, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            Phone: '',
        };
    }

    disableBackButton = () => {
        // this.props.navigation.goBack(null);
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

        if (this.state.Phone == '') {
            alert("Please Enter Your Phone Number");
            return;
        }
        else {

            fetch('http://aajo.in/public/api/retailer_login', {

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

                    if (responseJson.success == '0') {
                        alert('Invalid Phone Number');
                        return;
                    }
                    if (responseJson.success == '1') {

                        // this.props.navigation.navigate('otp', {COUNTRYCODE:responseJson.user.country_code, PHONE:responseJson.user.phonenumber});
                        AsyncStorage.setItem("UID", responseJson.user.id);
                        this.props.navigation.navigate('home2', { uid: responseJson.user.id });
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }

    signInWithGoogleAsync = async () => {
        return;
        console.log('hi')
        try {
            this.setState({ loading: true })
            const result = await Google.logInAsync({

                behavior: 'web',
                androidClientId: '495434177049-rdpsclntlu01mojhsotl5gi8h9157ea5.apps.googleusercontent.com',
                iosClientId: '215378135748-okiioivg54hp6266khujvkh0m4i9o3ck.apps.googleusercontent.com',
                iosStandaloneAppClientId: '215378135748-4q7gnj4lb0g8l3516maqlo516vq0m5kd.apps.googleusercontent.com',
                androidStandaloneAppClientId: '215378135748-5t4qg8379se5jddps0vfipaetir2i9ku.apps.googleusercontent.com',
                webClientId: "215378135748-90t614revljugf8nq91uhdn5m9afg33l.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
                redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`

            });

            if (result.type === 'success') {
                let socialdata = result.user
                // console.log(result)
                this.setState({ loading: false })
                this.registerwithgoogle(socialdata);
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    registerwithgoogle = (user) => {

        const sid = user.id;
        const sname = user.givenName;
        const semail = user.email;
        const sprovider = 'Google'
        const image = user.photoUrl
        console.log()

        // console.log('ID: '+ sid, 'Name: '+ sname, 'Email: '+ semail, 'Provider: '+ sprovider);
        // return;

        this.setState({ loading: true })
        fetch('https://wow.itsolexperts.com/public/api/email_check', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: semail,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                console.log(responseJson)
                if (responseJson.message == 'User Not Found') {
                    this.props.navigation.navigate('signupgoogle', { EMAIL: semail, IMG: image, NAME: sname, PROVIDE: 'email' })
                    return;
                }
                if (responseJson.message == 'Login Succssfully') {

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
                console.log(error);
            });

    }

    async FbLogin() {
        return;
        let appID = '760644291379761' // <- you'll need to add your own appID here

        try {
            await Facebook.initializeAsync('760644291379761');
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email', 'user_friends'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }

        // try {
        //     const {
        //         type,
        //         token, // <- this is your access token
        //         expires,
        //         permissions,
        //         declinedPermissions,
        //     } = await Facebook.logInWithReadPermissionsAsync(appID, { permissions: ['public_profile', 'email'], });

        //     if (type === 'success') {
        //         // Get the user's name using Facebook's Graph API
        //         const response = await fetch(`https://graph.facebook.com/me/?fields=id,name&access_token=${token}`); //<- use the token you got in your request
        //         const userInfo = await response.json();
        //         alert(userInfo);

        //         // you could now save the token in AsyncStorage, Redux or leave it in state
        //         await AsyncStorage.setItem('token', token); // <- save the token in AsyncStorage for later use
        //     } else {
        //         // type === 'cancel'
        //     }

        // } catch ({ message }) {
        //     console.log(message);
        // }

    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./../image/loginbg.gif')} style={{ width: '100%', height: '100%', marginTop: hp('0%') }} >
                    <ScrollView>

                        <View style={{ marginTop: wp('20%') }}>

                            <View style={{ flexDirection: 'row', marginTop: 60 }}>
                                <View style={{ width: '90%' }}>
                                    <Image style={{ width: 75, height: 45, marginRight: 70, marginTop: -50, alignSelf: 'flex-end', }} source={require('./../image/Flag-Japan.jpg')} />
                                    <Image style={{ width: 45, height: 85, marginTop: -75, alignSelf: 'flex-end', }} source={require('./../image/logoundp.png')} />
                                </View>
                                <View style={{ width: '30%' }}></View>
                            </View>

                            <Text style={styles.headerText}>Women's Safety Application</Text>

                            <View style={{ marginTop: wp('30%'), alignContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('loginwithnumber')} style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', padding: 1, margin: 10, borderRadius: 50, width: '75%', height: 50 }}>
                                    <Image style={{ width: 25, height: 25, marginLeft: 20, marginTop: 10 }} source={require('./../image/phone.png')} />
                                    <Button style={{ marginTop: 5 }}><Text style={{ color: '#000' }}>Login With Number</Text></Button>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('loginwithemail')} style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', padding: 1, margin: 10, borderRadius: 50, width: '75%', height: 50 }}>
                                    <Image style={{ width: 25, height: 25, marginLeft: 20, marginTop: 10 }} source={require('./../image/mail.png')} />
                                    <Button style={{ marginTop: 5 }}><Text style={{ color: '#000' }}>Login With Email</Text></Button>
                                </TouchableOpacity>

                                {/* <View>
                                    <Text style={{ alignSelf: 'center', color: '#c9c9c9', marginTop: 10, marginBottom: 10 }}> ____________________ OR ____________________</Text>
                                </View>

                                <TouchableOpacity onPress={() => this.signInWithGoogleAsync()} style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', padding: 1, margin: 10, borderRadius: 50, width: '75%', height: 50 }}>
                                    <Image style={{ width: 25, height: 25, marginLeft: 20, marginTop: 10 }} source={require('./../image/gmail.png')} />
                                    <Button style={{ marginTop: 5 }}><Text style={{ color: '#000' }}>Login With Gmail</Text></Button>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.FbLogin()} style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', padding: 1, margin: 10, borderRadius: 50, width: '75%', height: 50 }}>
                                    <Image style={{ width: 25, height: 25, marginLeft: 20, marginTop: 10 }} source={require('./../image/facebook.png')} />
                                    <Button style={{ marginTop: 5 }}><Text style={{ color: '#000' }}>Login With Facebook</Text></Button>
                                </TouchableOpacity> */}

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('signup')} style={{ alignSelf: 'center', marginTop: 15 }}>
                                    <Text style={{color:'white', fontSize:15}}>New here? <Text  style={{ textDecorationLine: 'underline', fontSize: 15, color:'white', fontWeight:'bold' }}>Create an account</Text> </Text>
                                </TouchableOpacity>

                            </View>


                            <Text style={{ color: 'white', fontSize: 17, textAlign: 'center', marginTop: 70 }}>Implementing Partner</Text>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ width: '50%', marginRight: 15 }}>
                                    <Image style={{ width: 65, height: 65, alignSelf: 'flex-end' }} source={require('./../image/logo.png')} />
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Image style={{ width: 90, height: 90, marginTop: -20, marginLeft: -15 }} source={require('./../image/ss.png')} />
                                    <Text style={{ color: 'white', fontSize: 12, textAlign: 'left', marginTop: -25 }}>Foundation</Text>
                                </View>

                            </View>

                        </View>
                    </ScrollView>
                </ImageBackground>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    headerText: {
        marginTop: wp('5%'),
        fontSize: 25,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    },
    input: {
        marginTop: wp('5%'),
        marginHorizontal: wp('10%'),
        backgroundColor: '#fff',
        height: 45
    },
    button: {
        marginTop: hp('3%'),
        alignItems: 'center',
        backgroundColor: '#E0C800',
        borderRadius: wp('2%'),
        height: 40,
        marginHorizontal: wp('13%'),
    },
    buttonText: {

        fontSize: 20,
        color: '#000',
        marginTop: hp('1%'),
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
    }
});