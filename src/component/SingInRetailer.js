import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, AsyncStorage} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class SignInRetailer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            Phone:'',
        };
    }

    Login = () =>{
       
        const {Phone} = this.state;
     
        if(this.state.Phone ==''){
            alert("Please Enter Your Phone Number");
            return;
          }
          else{

        fetch('http://aajo.in/public/api/retailer_login', {

            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                phonenumber: Phone,
            })
        }).then((response) => response.json())
        .then((responseJson) =>{
            console.log(responseJson);
            
            if(responseJson.success == '0')
            {
                alert('Invalid Phone Number');
                return;
            }
            if(responseJson.success == '1')
            {
             
                // this.props.navigation.navigate('otp', {COUNTRYCODE:responseJson.user.country_code, PHONE:responseJson.user.phonenumber});
                AsyncStorage.setItem("UID", responseJson.user.id);
                this.props.navigation.navigate('home2', {uid:responseJson.user.id});
            }
        })
        .catch((error) => {
            alert(error);
        });
    }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#000', height: '4%' }}></View>
                <ScrollView>
                    <Text style={styles.headerText}>Login to your{'\n'}Retailer account</Text>
                        <TextInput
                            style={styles.input}
                            mode='outlined'
                            theme={{
                                colors: {
                                    primary: '#00cb9c',
                                }
                            }}
                            label='Phone Number'
                            placeholder="Enter Registered Moblie Number"
                            placeholderTextColor = {'#666666'}
                            value={this.state.Phone}
                            onChangeText={Phone => this.setState({Phone})}
                        />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.Login()}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <View style={styles.signupView}>
                        <Text style={styles.alresdy}>Dont have an account?</Text>
                        <Text onPress={() => this.props.navigation.navigate('SignUpRetailer')}
                            style={styles.signupText}>Sign Up</Text>
                    </View>
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
        marginLeft: wp('5%'),
        marginTop: wp('10%'),
        fontSize: hp('5%'),
        fontWeight: 'bold',
        color: '#5f5d70'
    },
    input: {
        marginTop: wp('12%'),
        marginHorizontal: wp('5%'),
        backgroundColor: '#fff'
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