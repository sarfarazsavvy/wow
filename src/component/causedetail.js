import React from 'react';
import { StyleSheet, TextInput, Picker, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableRipple, Card, ProgressBar, Colors } from 'react-native-paper';
import MapView from 'react-native-maps';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class causedetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                <View style={{ backgroundColor: '#D49C0F', height: '11%' }}>
                    <View style={{ marginTop: hp('6%'), marginHorizontal: wp('5%'), flex: 1, flexDirection: 'row' }}>
                        <View style={{ marginTop: wp('3%') }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color='white' size={25} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginLeft: wp('16%'), marginTop: -10 }}>CAUSE DETAIL PAGE</Text>
                    </View>
                </View>


                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 26, color: '#D49C0F' }}>Subject on the Cause</Text>
                    <Text style={{ fontSize: 18 }}>Description simply dummy text of the printing and typesetting industey. Lorem</Text>
                    <Text style={{ fontSize: 17, marginTop: wp('3%') }}>Target: <Text style={{ color: '#D49C0F' }}>$444</Text></Text>
                    <Text style={{ fontSize: 17 }}>Goal Acheived: <Text style={{ color: '#D49C0F' }}>$222</Text></Text>
                    <ProgressBar style={{ marginTop: 10, height: 10, width: 280 }} progress={0.4} color={'#D49C0F'} />
                    <Text style={{ textAlign: 'right', color: '#009c16', fontWeight: 'bold', fontSize: 15, marginTop: -15 }}>50%</Text>


                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: wp('4%') }}>
                        <TextInput
                            placeholder={'Enter Amount'}
                            placeholderTextColor="#898989"
                            style={styles.donatetextinput}
                            multiline={true}
                        />

                        <TouchableOpacity
                            style={{ width: 130, height: 35, backgroundColor: '#D49C0F', padding: 5, borderRadius: 5, marginLeft: 10 }}
                            onPress={() => this.props.navigation.navigate('#')}>
                            <Text style={styles.buttonText}>Donate</Text>
                        </TouchableOpacity>

                    </View>


                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: wp('5%'), }}>

                            <TouchableOpacity
                                style={{ width: 130, height: 45, flex: 1, flexDirection: 'row', padding: 10, borderRadius: 5, marginLeft: wp('60%'), marginBottom: wp('5%') }}
                                onPress={() => this.props.navigation.navigate('#')}>
                                <Entypo name='share' color='green' size={26}
                                    onPress={
                                        () => this.props.navigation.navigate('#')
                                    } />
                                <Text style={{ fontSize: 18, marginLeft: wp('3%') }}>Share</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

                <View style={{borderTopColor:'#BBBBBB', borderTopWidth:1, marginTop:-20}}></View>

                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 24, color: '#000' }}>Comments</Text>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: wp('5%') }}>
                            <Image style={{ width: 50, height: 50 }} source={require('./../image/user.png')} />

                            <View style={{ backgroundColor: '#EBEBEB', borderRadius: 5, marginLeft: wp('3%'), height: 90 }}>
                                <TextInput
                                    placeholder={'Ask Person Name question:'}
                                    placeholderTextColor="#D49C0F"
                                    style={styles.input}
                                    multiline={true}
                                />

                                <TouchableOpacity
                                    style={{ width: 80, height: 40, flex: 1, flexDirection: 'row', padding: 10, borderRadius: 5, marginBottom: wp('0%'), marginLeft: wp('48%') }}
                                    onPress={() => this.props.navigation.navigate('#')}>
                                    <Text style={{ fontSize: 15, color: '#00D628', marginLeft: wp('3%'), marginRight: wp('1%') }}>Send</Text>
                                    <FontAwesome name='paper-plane' color='#00D628' size={20}
                                        onPress={
                                            () => this.props.navigation.navigate('#')
                                        } />
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: wp('5%') }}>
                            <Image style={{ width: 50, height: 50, marginLeft: wp('5%') }} source={require('./../image/user.png')} />

                            <View style={{ borderRadius: 5, marginLeft: wp('2%'), height: 90 }}>
                                <Text style={{ color: '#D49C0F', marginLeft: wp('3%'), fontSize: 16, marginBottom: wp('2%') }}>Person Name</Text>
                                <TextInput
                                    placeholder={'Ameen'}
                                    placeholderTextColor="#000"
                                    style={styles.replyinput}
                                    multiline={true}
                                    editable={false}
                                />
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 15, color: '#00D628', marginLeft: wp('3%'), marginRight: wp('1%'), textAlign: 'right', marginTop: wp('2%') }}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: wp('5%') }}>
                            <Image style={{ width: 50, height: 50, marginLeft: wp('5%') }} source={require('./../image/user.png')} />

                            <View style={{ borderRadius: 5, marginLeft: wp('2%'), height: 90 }}>
                                <Text style={{ color: '#D49C0F', marginLeft: wp('3%'), fontSize: 16, marginBottom: wp('2%') }}>Person Name</Text>
                                <TextInput
                                    placeholder={'Ameen'}
                                    placeholderTextColor="#000"
                                    style={styles.replyinput}
                                    multiline={true}
                                    editable={false}
                                />
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 15, color: '#00D628', marginLeft: wp('3%'), marginRight: wp('1%'), textAlign: 'right', marginTop: wp('2%') }}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: wp('5%') }}>
                            <Image style={{ width: 50, height: 50, marginLeft: wp('5%') }} source={require('./../image/user.png')} />

                            <View style={{ borderRadius: 5, marginLeft: wp('2%'), height: 90 }}>
                                <Text style={{ color: '#D49C0F', marginLeft: wp('3%'), fontSize: 16, marginBottom: wp('2%') }}>Person Name</Text>
                                <TextInput
                                    placeholder={'Reply To Person Name'}
                                    placeholderTextColor="#898989"
                                    style={styles.replytextinput}
                                    multiline={true}
                                />
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 15, color: '#00D628', marginLeft: wp('3%'), marginRight: wp('1%'), textAlign: 'right', marginTop: wp('2%') }}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        marginTop: hp('3%'),
        alignItems: 'center',
        backgroundColor: '#E0C800',
        borderRadius: wp('2%'),
        height: 40,
        marginHorizontal: wp('13%'),
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        // marginTop: hp('1%'),
        alignSelf: 'center'
    },

    userList: {
        padding: 8,
        backgroundColor: '#fff',
        borderBottomColor: '#B9B9B9',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 16,
        marginTop: wp('2%'),
        color: '#000',
    },
    desc: {
        fontSize: 13,
        color: '#B9B9B9',
    }, desc2: {
        fontSize: 13,
        color: '#B9B9B9',
    },
    image: {
        width: 60,
        height: 60,
        marginTop: wp('1%'),
        marginRight: wp('3%'),
        borderRadius: 10,
        marginLeft: wp('1%')
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
        width: 50,
        height: 50,
    },
    card1: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        marginTop: -55,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    card2: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        marginTop: 0,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    card3: {
        backgroundColor: 'white',
        margin: 20,
        marginTop: 0,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    input: {
        backgroundColor: '#fff',
        backgroundColor: '#EBEBEB',
        borderRadius: 5,
        padding: 10,
        height: 50,
        width: wp('70%'),
        marginLeft: 10,
    },
    replyinput: {
        backgroundColor: '#fff',
        backgroundColor: '#EBEBEB',
        borderRadius: 5,
        padding: 10,
        height: 35,
        width: wp('65%'),
        marginLeft: 10,
    },
    replytextinput: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#898989',
        borderRadius: 5,
        padding: 10,
        height: 35,
        width: wp('65%'),
        marginLeft: 10,
    },
    donatetextinput: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#898989',
        borderRadius: 5,
        padding: 10,
        height: 35,
        width: wp('45%'),
        marginLeft: 0,
    }
});