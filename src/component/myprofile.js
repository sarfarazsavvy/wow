import React from 'react';
import { StyleSheet, Text, View, Image, BackHandler, KeyboardAvoidingView, Dimensions, TouchableOpacity, Picker, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class myprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            first: '',
            last: '',
            email: '',
            cnic: '',
            gender: '',
            srcImg: '',
            uri: '',
            Image: '',
            loading: false
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

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [3, 4],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({
                    Image: result.uri,
                    srcImg: { uri: result.uri },
                    uri: result.uri,
                });
            }

        } catch (E) {
            console.log(E);
        }
    };

    componentDidMount() {
        this.getProfile();
    }

    getProfile = async () => {
        let myID = await AsyncStorage.getItem('ID');
        let url = `https://wow.itsolexperts.com/public/api/getuserprofile/${myID}`;
        fetch(url)
            .then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({
                    first: response.user.first_name,
                    last: response.user.last_name,
                    email: response.user.email,
                    cnic: response.user.cnic,
                    gender: response.user.gender,
                    Image: response.user.image,
                })
            })
            .catch(e => console.log(e))
    }

    uploaddata = async () => {

        let UID = await AsyncStorage.getItem('ID');
        const { first } = this.state;
        const { last } = this.state;
        const { email } = this.state;
        const { cnic } = this.state;
        const { gender } = this.state;
        const { uri } = this.state;


        console.log('start')

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
        data.append('email', email);
        data.append('cnic', cnic);
        data.append('gender', gender);

        this.setState({ loading: true })
        const url = `https://wow.itsolexperts.com/public/api/updateuserprofile/${UID}`;
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
                console.log(responseJson);
                if (responseJson.message == ' select image') {
                    alert('Please Select Your Image');
                }
                if (responseJson.message == 'updates  successfully') {
                    alert('Your Profile Updated Successfully');
                }

            }).catch((error) => {
                Alert.alert('500 Error', 'Network error / please check internet data.');
            });
    }

    renderButton() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <View style={{ marginTop: 0, marginBottom: 0 }}>
                <ActivityIndicator color="#F27126" size={'small'} animating={this.state.loading} />
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.responsiveBox}>
                   
                        <View style={{ backgroundColor: '#fff', height: '14%', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                            <View style={{ marginTop: hp('0%'), marginHorizontal: wp('5%'), }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '15%' }}>
                                        <TouchableOpacity style={{ marginTop: 53 }} onPress={() => this.props.navigation.goBack(null)}>
                                            <AntDesign name='arrowleft' color='#5f5d70' size={26} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '75%' }}>
                                        <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center', marginTop: 53 }}>MY PROFILE</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <KeyboardAvoidingView behavior='padding'>
                        <ScrollView>

                            {this.state.uri == '' || this.state.uri == null ?
                                <TouchableOpacity onPress={this._pickImage}>
                                    {this.state.Image == '' || this.state.Image == null ?
                                        <Image style={{ alignSelf: 'center', width: 120, height: 120, marginTop: wp('15%'), marginBottom: wp('5%') }} source={require('./../image/camera.png')} />
                                        :
                                        <Image style={{ alignSelf: 'center', width: 120, height: 120, marginTop: wp('15%'), marginBottom: wp('5%'), borderRadius: 150 }} source={{ uri: 'https://liftich.com/wow/public/assets/images/' + this.state.Image }} />
                                    }
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={this._pickImage}>
                                    <Image style={{ alignSelf: 'center', width: 150, height: 150, marginTop: wp('15%'), marginBottom: wp('5%'), borderRadius: 150 }} source={{ uri: this.state.uri }} />
                                </TouchableOpacity>
                            }
                            {/* <Image style={{ alignSelf: 'center', width: 120, height: 120, marginTop: wp('15%'), marginBottom: wp('5%') }} source={require('./../image/camera.png')} /> */}

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 25 }}>
                                <FontAwesome name="user" size={24} style={{ color: '#BFBFBF', marginTop: 20, marginLeft: 20, marginRight: 5 }} />
                                <TextInput
                                    style={styles.input}
                                    theme={{
                                        colors: {
                                            primary: '#E0C800',
                                        }
                                    }}
                                    placeholder="First Name"
                                    placeholderTextColor={'#BFBFBF'}
                                    value={this.state.first}
                                    onChangeText={first => this.setState({ first })}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <FontAwesome name="user" size={24} style={{ color: '#BFBFBF', marginTop: 20, marginLeft: 20, marginRight: 5 }} />
                                <TextInput
                                    style={styles.input}
                                    theme={{
                                        colors: {
                                            primary: '#E0C800',
                                        }
                                    }}
                                    placeholder="Last Name"
                                    placeholderTextColor={'#BFBFBF'}
                                    value={this.state.last}
                                    onChangeText={last => this.setState({ last })}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <FontAwesome name="envelope" size={20} style={{ color: '#BFBFBF', marginTop: 23, marginLeft: 20, marginRight: 5 }} />
                                <TextInput
                                    style={styles.input}
                                    theme={{
                                        colors: {
                                            primary: '#E0C800',
                                        }
                                    }}
                                    placeholder="Email"
                                    placeholderTextColor={'#BFBFBF'}
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email })}
                                />
                            </View>


                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <FontAwesome name="id-card" size={22} style={{ color: '#BFBFBF', marginTop: 20, marginLeft: 20, marginRight: 5 }} />
                                <TextInput
                                    style={styles.input}
                                    theme={{
                                        colors: {
                                            primary: '#E0C800',
                                        }
                                    }}
                                    placeholder="CNIC"
                                    placeholderTextColor={'#BFBFBF'}
                                    value={this.state.cnic}
                                    onChangeText={cnic => this.setState({ cnic })}
                                    secureTextEntry={true}
                                    keyboardType={'phone-pad'}
                                    editable={false}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <FontAwesome name="user" size={24} style={{ color: '#BFBFBF', marginTop: 20, marginLeft: 20, marginRight: 5 }} />

                                <Picker style={{ backgroundColor: '#fff', width: '82%', alignSelf: 'center', color: '#BFBFBF', marginLeft: 5, marginTop: 8, }}
                                    selectedValue={this.state.gender}
                                    onValueChange={(itemValue) =>
                                        this.setState({ gender: itemValue })}>
                                    <Picker.Item label="Gender" value="" />
                                    <Picker.Item value="Female" label="Female" />
                                    <Picker.Item value="Transgender" label="Transgender" />

                                </Picker>
                            </View>

                            {this.renderButton()}

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.uploaddata()}>
                                <Text style={styles.buttonText}>UPDATE</Text>
                            </TouchableOpacity>

                        </ScrollView>
                        <View style={{ marginBottom: 10 }}></View>
                    </KeyboardAvoidingView>
                </View>
            </View>
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
        backgroundColor: '#fff',
        width: '82%',
        alignSelf: 'center',
    },
    input1: {
        marginTop: wp('4%'),
        marginHorizontal: wp('5%'),
        backgroundColor: '#fff'
    },
    button: {
        marginTop: hp('3%'),
        alignItems: 'center',
        backgroundColor: '#F27126',
        borderRadius: wp('1%'),
        height: 40,
        marginHorizontal: wp('20%')
    },
    buttonText: {

        fontSize: 20,
        color: '#fff',
        marginTop: hp('1%')
    },
    signupView: {
        alignItems: 'center',
        marginTop: hp('5%'),
        marginBottom: hp('5%')
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
    location: {
        position: 'absolute',
        marginLeft: wp('80%'),
        marginTop: hp('77.5%')
    },
    radioButton: {
        marginRight: 30,
        marginTop: 10
    },
    mainRadioView: {
        marginLeft: wp('5%'),
        marginTop: hp('3%')
    },
    choose: {
        fontSize: 15,
        color: '#666666'
    },
    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
    },


});