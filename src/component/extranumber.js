import React from 'react';
import { StyleSheet, Picker, Text, View, Image, BackHandler, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
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
export default class extranumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first:'',
        };
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

    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', height: '14%', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                    <View style={{ marginTop: hp('0%'), marginHorizontal: wp('5%'), }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '25%' }}>
                                <TouchableOpacity style={{ marginTop: 53 }} onPress={() => this.props.navigation.goBack(null)}>
                                    <AntDesign name='arrowleft' color='#5f5d70' size={26} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', marginTop: 53 }}>EXTRA NUMBER</Text>
                            </View>
                            <View style={{ width: '25%' }}>
                                {/* <Image style={{ width: 30, height: 30, marginTop: hp('7.5%'), alignSelf: 'flex-end' }} source={require('../image/sos.png')} /> */}
                            </View>

                        </View>
                    </View>
                </View>
                
                    <ScrollView>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop:50 }}>
                            <FontAwesome name="phone" size={24} style={{ color: '#BFBFBF', marginTop: 20, marginLeft: 20, marginRight: 5 }} />
                            <TextInput
                                style={styles.input}
                                theme={{
                                    colors: {
                                        primary: '#E0C800',
                                    }
                                }}
                                placeholder="Phone Number"
                                placeholderTextColor={'#BFBFBF'}
                                value={this.state.first}
                                onChangeText={first => this.setState({ first })}
                                keyboardType={'phone-pad'}
                            />
                        </View>


                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('home2')}>
                            <Text style={styles.buttonText}>ADD</Text>
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

});