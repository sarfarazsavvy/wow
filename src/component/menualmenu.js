import React from 'react';
import { StyleSheet, TextInput, Text, View, Image, BackHandler, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, FontAwesome, Feather, FontAwesome5, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { Avatar, Card, IconButton, List, Button, TouchableRipple, } from 'react-native-paper';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const numColumns = 2
export default class menualmenu extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            profileData: [],
            dataWeather: [],
            message: "Press Profile",
            message2: "Press Send Request",
            text: '',
            all: true,
            send: false,
            accept: false,
            reject: false,
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

    renderDayRow = ({ item }) => {
        return (
            <TouchableOpacity style={styles.userList} onPress={() => this.props.navigation.navigate('menualdetails', { ID: item.id })}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: '20%' }}>
                        <Image style={{width:30, height:30}} source={require('./../image/wow.png')} />
                    </View>
                    <View style={{ width: '70%' }}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={{ width: '10%' }}>
                    <FontAwesome name="angle-right" size={30} style={{ textAlign: 'center', marginTop: -1 }} />
                    </View>

                    

                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.setState({ loading: true })
        fetch(`https://wow.itsolexperts.com/public/api/legal_manual`)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState({
                    loading: false,
                    article: responsejson.data,

                });
            })
            .catch((error) => {
                Alert.alert(error)
            })
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
                                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', marginTop: 53 }}>WOW MANUAL</Text>
                            </View>
                            <View style={{ width: '25%' }}>
                                {/* <Image style={{ width: 30, height: 30, marginTop: hp('7.5%'), alignSelf: 'flex-end' }} source={require('../image/sos.png')} /> */}
                            </View>

                        </View>
                    </View>
                </View>


                <ScrollView>
                    <View style={{ marginTop: 10 }}></View>
                    <FlatList
                        pagingEnabled
                        data={this.state.article}
                        renderItem={this.renderDayRow}
                        keyExtractor={item => item.id}
                    />
                    <View style={{ marginBottom: 10 }}></View>
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
    header: {
        backgroundColor: '#7C0003',
        paddingLeft: 25,
        paddingTop: 15,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    headerText: {
        color: 'white',
        alignSelf: 'center',
        marginLeft: wp('1%'),
    },
    userList: {
        padding: 8,
        backgroundColor: '#fff',
        borderBottomColor: '#B9B9B9',
        borderBottomWidth: 1,
    },
    image: {
        width: 30,
        height: 30,
        marginTop: wp('1%'),
        marginRight: wp('8%'),
        marginLeft: wp('1%')
    },
    title: {
        fontSize: 18,
        color: '#F27126',
        marginTop: 0,
        textAlign: 'left'
    },


});