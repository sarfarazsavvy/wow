import React from 'react';
import { StyleSheet, Picker, Text, View, Image, BackHandler, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, Linking } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class menualdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            body:'',
            image:'',
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

    componentDidMount(){
        this.getData();
    }

    getData = async () => {
        this.setState({ loading: true })
        let ID = this.props.navigation.getParam('ID');
        console.log('ID: '+ ID);
        fetch(`https://wow.itsolexperts.com/public/api/manual/${ID}`)
          .then((response) => response.json())
          .then((responsejson) => {
              console.log(responsejson.data[0])
            this.setState({
              loading: false,
              title: responsejson.data[0].title,
              body: responsejson.data[0].body,
              image: responsejson.data[0].image,
    
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
                            <View style={{ width: '15%' }}>
                                <TouchableOpacity style={{ marginTop: 53 }} onPress={() => this.props.navigation.goBack(null)}>
                                    <AntDesign name='arrowleft' color='#5f5d70' size={26} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '75%'}}>
                                {/* <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center', marginTop: 53 }}>Wow Training Manual</Text> */}
                            </View>

                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        {/* <Image style={{width:'100%', height:300}} source={{uri: this.state.image}} /> */}
                        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20, padding:15, marginTop:20}}>{this.state.title}</Text>
                        <Text style={{textAlign:'left', fontSize:15, padding:10}}>{this.state.body}</Text>
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
        marginTop: 2,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 16,
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
        borderRadius: 50,
        marginLeft: wp('1%'),
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