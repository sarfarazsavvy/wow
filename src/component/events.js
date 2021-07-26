import React from 'react';
import { StyleSheet, Picker, Text, View, Image, Linking, Modal, Dimensions, TouchableOpacity, FlatList, Alert, AsyncStorage, BackHandler } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, FontAwesome5, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            num: [],
            con: false,
            add: false,
            UMOBILE: '',
            newnumber: '',
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

    dialCall1() {

        let phoneNumber = '115';
    
    
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${'115'}`;
        }
        else {
          phoneNumber = `telprompt:${'115'}`;
        }
    
        Linking.openURL(phoneNumber);
    
      };

    dialCall(MNUM) {

        let phoneNumber = '';


        if (Platform.OS === 'android') {
            phoneNumber = `tel:${MNUM}`;
        }
        else {
            phoneNumber = `telprompt:${MNUM}`;
        }

        Linking.openURL(phoneNumber);

    };

    componentDidMount() {
        this.getData();
    }

    contacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();


        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers]
            });

            this.setState({ list: data, con: true })
            if (data.length > 0) {
                const contact = data;
            }
        }
    }

    addContact = async (number) => {
        
        let UID = await AsyncStorage.getItem('ID');

        this.setState({ loading: true })

        fetch(`https://wow.itsolexperts.com/public/api/add_number/${UID}`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                number: number,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ loading: false })
                if (responseJson.success == '1') {
                    this.setState({ con: false });
                    this.getData();
                }
            })
            .catch((error) => {
                Alert.alert('500 Error', 'No / Slow Response From Server');
            });
    }

    addContactPOP = async () => {
        const { newnumber } = this.state;
        let UID = await AsyncStorage.getItem('ID');
        
        this.setState({ loading: true })

        fetch(`https://wow.itsolexperts.com/public/api/add_number/${UID}`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                number: newnumber,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ loading: false })
                if (responseJson.success == '1') {
                    this.setState({ add: false });
                    this.getData();
                }
            })
            .catch((error) => {
                Alert.alert('500 Error', 'No / Slow Response From Server');
            });
    }

    getData = async () => {
        // const { UID } = this.state;
        let UID = await AsyncStorage.getItem('ID');
        this.setState({ loading: true })
        fetch(`https://wow.itsolexperts.com/public/api/view_numbers/${UID}`)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState({
                    loading: false,
                    num: responsejson.data

                });
            })
            .catch((error) => {
                Alert.alert(error)
            })
    }

    renderDayRow = ({ item }) => {
        if (item.phoneNumbers) {
            return (
                <TouchableOpacity style={styles.userList} onPress={() => this.addContact(item.phoneNumbers[0].number)}>

                    <View style={{ flex: 1, flexDirection: 'row', }}>

                        <Image style={styles.image} source={require('./../image/user.png')} />

                        <View>

                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.desc}>{item.phoneNumbers[0].number}</Text>

                        </View>

                    </View>

                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.userList} onPress={() => this.props.navigation.navigate('#')}>

                    <View style={{ flex: 1, flexDirection: 'row', }}>

                        <Image style={styles.image} source={require('./../image/user.png')} />

                        <View>

                            <Text style={styles.title}>{item.name}</Text>

                        </View>

                    </View>

                </TouchableOpacity>
            )

        }

    }

    renderNumber = ({ item }) => {

        return (
            <TouchableOpacity style={styles.userList} onPress={() => this.dialCall(item.number)}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={{ width: '50%', padding: 10 }}>
                        <Text style={{ fontSize: 16, paddingTop: 5 }}>{item.number}</Text>
                    </View>
                    <View style={{ width: '50%', padding: 10 }}>
                        <Image style={{ width: 30, height: 30, alignSelf: 'flex-end' }} source={require('../image/phone.png')} />
                    </View>
                </View>
            </TouchableOpacity>
        )


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
                                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', marginTop: 53 }}>Contacts</Text>
                            </View>
                            <TouchableOpacity onPress={()=> this.dialCall1()} style={{ width: '25%' }}>
                                <Image style={{ width: 30, height: 30, marginTop: hp('7.5%'), alignSelf: 'flex-end' }} source={require('../image/sos.png')} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                {/* <Text style={{ fontSize: 25, textAlign: 'center' }} onPress={() => this.contacts()}>hi</Text> */}
                <ScrollView >


                    <FlatList
                        pagingEnabled
                        data={this.state.num}
                        renderItem={this.renderNumber}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>

                <Modal transparent={true} visible={this.state.add}>
                    <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                        <View style={{ backgroundColor: '#ffffff', marginTop: 200, marginLeft: 10, marginRight: 10, padding: 40, borderRadius: 5, }}>

                            <View>
                                <TextInput
                                    style={styles.input}
                                    theme={{
                                        colors: {
                                            primary: '#E0C800',
                                        }
                                    }}
                                    placeholder="TYPE NUMBER"
                                    placeholderTextColor={'#BFBFBF'}
                                    value={this.state.newnumber}
                                    onChangeText={newnumber => this.setState({ newnumber })}
                                    keyboardType={'phone-pad'}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => this.addContactPOP()} style={styles.PostAnAd}>
                                    <Text style={{ color: 'white', alignSelf: 'center' }}>+ ADD NEW</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ add: false })} style={styles.PostAnAd}>
                                    <Text style={{ color: 'white', alignSelf: 'center' }}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.contacts()} style={styles.PostAnAd}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>ADD FROM CONTACTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ add: true })} style={styles.PostAnAd}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>+ ADD NEW</Text>
                    </TouchableOpacity>
                </View>

                <Modal visible={this.state.con}>
                    <View>
                        <ScrollView style={{ backgroundColor: '#e9e9e9' }}>
                            <View style={{ height: 50, backgroundColor: 'white' }}>
                                <View style={{ marginLeft: wp('5%'), marginTop: 17, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.setState({ con: false })} style={{ width: '10%' }}>
                                        <FontAwesome5 name='window-close' color='#000' size={20} />
                                    </TouchableOpacity>
                                    <View style={{ width: '90%' }}>

                                    </View>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10, backgroundColor: '#e9e9e9' }}>
                                <FlatList
                                    pagingEnabled
                                    data={this.state.list}
                                    renderItem={this.renderDayRow}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </ScrollView>

                    </View>
                </Modal>

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
    input: {
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
    },
    PostAnAd: {
        backgroundColor: '#F27126',
        padding: 12,
        width: "50%",
        marginRight: 1
    },
    PostAnAd2: {
        backgroundColor: '#F27126',
        padding: 12,
        width: "50%"
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
        width: 60,
        height: 60,
    },
});