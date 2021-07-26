import React from 'react';
import { StyleSheet, TextInput, Text, View, Image, BackHandler, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, AsyncStorage, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons, SimpleLineIcons, FontAwesome, Feather, FontAwesome5, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { Avatar, Card, IconButton, List, Button, TouchableRipple, } from 'react-native-paper';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class Chat extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            message: '',
            loading: false,
            chat: [],
            MYID: '',
            USERID: '',
            first: '',
            last: '',
            image: '',
            showaccept: false,
            pending: false,
            pushtoken: '',
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

    componentDidMount = async () => {

        this.setState({
            MYID: await AsyncStorage.getItem('ID'),
            USERID: this.props.navigation.getParam('USERID'),
            first: this.props.navigation.getParam('FIRST'),
            last: this.props.navigation.getParam('LAST'),
            image: this.props.navigation.getParam('IMAGE'),
        });

        this.timeout = setInterval(() => this.getData(), 6000)

        this.getStatus();
        this.getPushKey();

    }

    getPushKey = async () => {
        console.log('PUSH START')
        this.setState({ loading: true });

        let myID = await AsyncStorage.getItem('ID');
        let USERID = this.props.navigation.getParam('USERID');

        fetch(`https://wow.itsolexperts.com/public/api/token_view/${USERID}`)
            .then((response) => response.json())
            .then((responsejson) => {
                this.setState({ pushtoken: responsejson.data })
            })
            .catch((error) => {
                Alert.alert(error)
            })
    }

    getStatus = async () => {
        console.log('on hai abhi bhe...')
        this.setState({ loading: true });

        let myID = await AsyncStorage.getItem('ID');
        let USERID = this.props.navigation.getParam('USERID');

        // console.log('MYID :'+ myID);
        // console.log('USERID :'+ USERID);
        // return;

        // me 2 zouariz khan
        // me 4 my demo test khan

        fetch(`https://wow.itsolexperts.com/public/api/chat_check/${myID}`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                reciever_id: USERID
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                console.log(responseJson)

                if (responseJson.sender == myID) {

                    if (responseJson.message == ' Not Chat Available') {
                        null
                        return;
                    }
                    if (responseJson.message == 'Request Pending To Aprrove') {
                        this.setState({ pending: true })
                        return;
                    }
                    if (responseJson.message == ' Request Already Accepted') {
                        this.getData();
                        return;
                    }

                } else {
                    if (responseJson.message == ' Not Chat Available') {
                        null
                        return;
                    }
                    if (responseJson.message == 'Request Pending To Aprrove') {
                        this.setState({ showaccept: true })
                        return;
                    }
                    if (responseJson.message == ' Request Already Accepted') {
                        this.getData();
                        return;
                    }
                    if (responseJson.message == ' Request Accepted') {
                        this.getData();
                        return;
                    }
                }
            })
            .catch((error) => {
                alert(error)
                // Alert.alert('500 Error', 'No / Slow Response From Server');
            });
    }

    getData = async () => {
        console.log('on hai abhi bhe...')
        this.setState({ loading: true });

        let myID = await AsyncStorage.getItem('ID');
        let USERID = this.props.navigation.getParam('USERID');

        // console.log('MYID :'+ myID);
        // console.log('USERID :'+ USERID);
        // return;

        fetch(`https://wow.itsolexperts.com/public/api/chats/${myID}`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                reciever_id: USERID
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ loading: false, chat: responseJson.data })
            })
            .catch((error) => {
                Alert.alert('500 Error', 'No / Slow Response From Server');
            });
    }

    timeout = 0;
    Back() {
        clearInterval(this.timeout);
        this.props.navigation.goBack(null)
    }

    clear() {
        clearInterval(this.timeout);
    }

    register = async () => {

        let myID = await AsyncStorage.getItem('ID');
        let FIRST = await AsyncStorage.getItem('FIRST');
        let USERID = this.props.navigation.getParam('USERID');
        const { message } = this.state;
        const { pushtoken } = this.state;

        // console.log('MYID :'+ myID);
        // console.log('USERID :'+ USERID);
        // console.log('Message :'+ message);
        // return;

        if (this.state.message === '') {
            alert("Please Type Your Message");
            return;
        }
        else {
            this.setState({ loading: true })

            fetch(`https://wow.itsolexperts.com/public/api/insert_msg/${myID}`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    reciever_id: USERID,
                    body: message,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({ loading: false })

                    if (responseJson.message == 'msg sent successfully And Request Pending') {
                        this.setState({ message: '' });
                        this.getStatus();
                        let response = fetch('https://exp.host/--/api/v2/push/send', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                to: `${pushtoken}`,
                                sound: 'default',
                                title: `${FIRST}`,
                                body: `Send you request`
                            })
                        })
                        console.log(response)
                        return;
                    }
                    if (responseJson.message == 'msg sent successfully') {
                        let response = fetch('https://exp.host/--/api/v2/push/send', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                to: `${pushtoken}`,
                                sound: 'default',
                                title: `${FIRST}`,
                                body: `${message}`
                            })
                        })
                        console.log(response)
                        this.setState({ message: '' });
                        this.getStatus();
                        return;
                    }
                })
                .catch((error) => {
                    Alert.alert('500 Error', 'No / Slow Response From Server');
                });


        }
    }
    accept = async () => {

        let myID = await AsyncStorage.getItem('ID');
        let USERID = this.props.navigation.getParam('USERID');

        this.setState({ loading: true })

        fetch(`https://wow.itsolexperts.com/public/api/chat_accept/${USERID}`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                sender_id: myID,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ loading: false });
                if (responseJson.success == '1') {
                    this.setState({ showaccept: false })
                    this.getStatus();
                    this.notaccept();

                }
            })
            .catch((error) => {
                alert(error);
                return;
                Alert.alert('500 Error', 'No / Slow Response From Server');
            });

    }

    notaccept = async () => {
        const { pushtoken } = this.state;
        let FIRST = await AsyncStorage.getItem('FIRST');
        let response = fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: `${pushtoken}`,
                sound: 'default',
                title: `${FIRST}`,
                body: `is accept your request`
            })
        });
        console.log(response)
    }

    notreject = async () => {
        const { pushtoken } = this.state;
        let FIRST = await AsyncStorage.getItem('FIRST');
        let response = fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: `${pushtoken}`,
                sound: 'default',
                title: `${FIRST}`,
                body: `is reject your request`
            })
        });
        console.log(response)
    }

    reject = async () => {

        let myID = await AsyncStorage.getItem('ID');
        let USERID = this.props.navigation.getParam('USERID');


        this.setState({ loading: true })

        fetch(`https://wow.itsolexperts.com/public/api/chat_reject/${USERID}`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                sender_id: myID,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ loading: false });
                if (responseJson.success == '1') {
                    this.setState({ showaccept: false });
                    this.notreject()
                }
            })
            .catch((error) => {
                Alert.alert('500 Error', 'No / Slow Response From Server');
            });

    }

    renderButton() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <ActivityIndicator style={{ marginLeft: '85%' }} color="#000000" size={'small'} animating={this.state.loading} />
        )
    };

    userchat() {

    }

    renderDayRow = ({ item }) => {
        console.log(item.body)
        if (item.sender_id == this.state.USERID) {
            return (
                <View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: '70%', padding: 10 }}>
                            <Text style={{
                                backgroundColor: '#fff', shadowColor: "#000",
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,

                                elevation: 3,

                                padding: 10,
                                borderBottomRightRadius: 10,
                                borderTopRightRadius: 10,
                                borderBottomLeftRadius: 10
                            }}>
                                {item.body}
                            </Text>
                        </View>
                    </View>


                </View>
            )
        }
        else {
            return (
                <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: '30%' }}></View>
                        <View style={{ width: '70%', padding: 10 }}>
                            <Text style={{ color: 'white', backgroundColor: '#EB3007', padding: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>
                                {item.body}
                            </Text>
                        </View>
                    </View>
                </View>
            )

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.responsiveBox}>
                    <View style={{ backgroundColor: '#fff', height: '14%', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                        <View style={{ marginTop: hp('0%'), marginHorizontal: wp('5%'), }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '15%' }}>
                                    <TouchableOpacity style={{ marginTop: 53 }} onPress={() => this.Back()}>
                                        <AntDesign name='arrowleft' color='#5f5d70' size={26} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '70%', flexDirection: 'row' }}>
                                    <Image style={{ width: 45, height: 45, marginTop: 45, borderRadius: 50 }} source={{ uri: 'https://wow.itsolexperts.com/public/assets/images/' + this.state.image }} />
                                    <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center', marginTop: 45, marginLeft: 10 }}>{this.state.first} {this.state.last}</Text>
                                </View>
                                <View style={{ width: '15%' }}>
                                    <Image style={{ width: 30, height: 30, marginTop: hp('7%'), alignSelf: 'flex-end' }} source={require('../image/chat-info.png')} />
                                </View>

                            </View>
                        </View>
                    </View>
                    {this.state.showaccept == true ?
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity onPress={() => this.accept()} style={{ backgroundColor: '#73B51A', shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10, }}>
                                        <Text style={{ color: 'white', padding: 20, textAlign: 'center' }}>ACCEPT</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity onPress={() => this.reject()} style={{ backgroundColor: '#F85050', shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10, }}>
                                        <Text style={{ color: 'white', padding: 20, textAlign: 'center' }}>REJECT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ padding: 20 }}>
                                <Text style={{ textAlign: 'center', color: '#b1b1b1' }}>"{this.state.first} {this.state.last} sent you a chat request. You can choose to 'Accept' or 'Reject'. </Text>
                            </View>
                        </View>
                        :
                        null
                    }

                    {this.state.pending == true ?
                        <View style={{ padding: 20 }}>
                            <Text style={{ textAlign: 'center', color: '#b1b1b1' }}>"{this.state.first} {this.state.last} has not accepted your request yet. You will be able to chat once they do so. </Text>
                        </View>
                        :
                        null
                    }

                    <ScrollView>
                        <FlatList
                            pagingEnabled
                            data={this.state.chat}
                            renderItem={this.renderDayRow}
                            keyExtractor={item => item.id}
                        />
                    </ScrollView>
                    <KeyboardAvoidingView behavior='padding'>
                        <View style={{ flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: wp('0%'), height: hp('9%'), marginBottom: hp('1%'), padding: 7 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <TextInput
                                        placeholder={'Write Your Message...'}
                                        style={{ backgroundColor: '#fff', borderRadius: 50, padding: 15, height: hp('7%'), width: wp('72%'), borderWidth: 1, borderColor: '#828282' }}
                                        onChangeText={message => this.setState({ message })}
                                        multiline={true}
                                        value={this.state.message}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: wp('3.5%') }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <TouchableOpacity style={{ backgroundColor: 'orange', padding: 15, borderRadius: 50 }} onPress={() => this.register()}>
                                            <FontAwesome
                                                name='paper-plane'
                                                type='font-awesome'
                                                color='#fff'
                                                size={22}
                                                containerStyle={{ width: width(10) }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
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
    header: {
        backgroundColor: '#7C0003',
        padding: 20,
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row'
    },
    headerText: {
        color: 'white'
    },
    userList: {
        padding: 8,
        backgroundColor: 'white',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5
    },
    country: {
        fontSize: 14
    },
    login: {
        fontSize: 11,
        color: 'gray'
    },
    profile: {
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 12,
        color: '#7c0003'
    },
    image: {
        width: 55,
        height: 55,
        marginRight: 15,
        borderRadius: 50,
        marginTop: -5
    },
    flag: {
        fontWeight: 'bold',
        width: 23,
        height: 23,
        color: 'white',
        backgroundColor: '#7C0003',
        borderRadius: 50,
        paddingLeft: 7,
        paddingTop: 1,
        marginLeft: wp('30%'),
        marginTop: wp('3%')
    },
    input: {
        marginHorizontal: wp('1%'),
        backgroundColor: '#fff',
        padding: 10,
        width: '80%',
        height: 40,
        borderRadius: 5
    },
    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
    },

});