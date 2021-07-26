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
export default class halal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const swipeSetting = {

            autoClose: true,
            onClose: (secId, rowId, direction) => {

            },
            onOpen: (secId, rowId, direction) => {

            },
            right: [
                {
                    onPress: () => {

                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index
        }
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
                <View style={{ backgroundColor: '#fff', height: '14%', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                    <View style={{ marginTop: hp('0%'), marginHorizontal: wp('5%'), }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '25%' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                    <Image style={{ width: 30, height: 20, marginTop: hp('8%') }} source={require('../image/sidebar-icon.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', marginTop: 53 }}>MORE</Text>
                            </View>
                            <TouchableOpacity onPress={()=> this.dialCall()} style={{ width: '25%' }}>
                                <Image style={{ width: 30, height: 30, marginTop: hp('7.5%'), alignSelf: 'flex-end' }} source={require('../image/sos.png')} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <ScrollView >
                    <TouchableOpacity style={styles.userList} onPress={() => this.props.navigation.navigate('helpline')}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>

                            <Image style={styles.image} source={require('./../image/more-page-icon.png')} />

                            <View style={{justifyContent:'center',}}>
                                <Text style={styles.title}>Help Line</Text>
                                <FontAwesome name="angle-right" size={30} style={{ textAlign: 'right', marginLeft: wp('70%'), marginTop: -25 }} />
                            </View>

                        </View>

                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.userList} onPress={() => this.props.navigation.navigate('gallery')}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>

                            <Image style={styles.image} source={require('./../image/more-page-gallery.png')} />

                            <View style={{justifyContent:'center',}}>
                                <Text style={styles.title}>Gallery</Text>
                                <FontAwesome name="angle-right" size={30} style={{ textAlign: 'right', marginLeft: wp('70%'), marginTop: -25 }} />
                            </View>

                        </View>

                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.userList} onPress={() => this.props.navigation.navigate('myprofile')}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>

                            <Image style={styles.image} source={require('./../image/user-icon-more-page.png')} />

                            <View style={{justifyContent:'center',}}>
                                <Text style={styles.title}>User Setting</Text>
                                <FontAwesome name="angle-right" size={30} style={{ textAlign: 'right', marginLeft: wp('70%'), marginTop: -25 }} />
                            </View>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userList} onPress={() => this.props.navigation.navigate('extranumber')}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>

                            <Image style={styles.image} source={require('./../image/phone.png')} />

                            <View style={{justifyContent:'center',}}>
                                <Text style={styles.title}>Extra Number</Text>
                                <FontAwesome name="angle-right" size={30} style={{ textAlign: 'right', marginLeft: wp('70%'), marginTop: -25 }} />
                            </View>

                        </View>

                    </TouchableOpacity>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
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
        backgroundColor: '#fff',
        borderBottomColor: '#B9B9B9',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 18,
        color: '#F27126',
        marginTop:5
    },
    desc: {
        fontSize: 13,
        color: '#B9B9B9',
    }, desc2: {
        fontSize: 13,
        color: '#B9B9B9',
    },
    image: {
        width: 30,
        height: 30,
        marginTop: wp('1%'),
        marginRight: wp('8%'),
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
        width: 60,
        height: 60,
    },
});