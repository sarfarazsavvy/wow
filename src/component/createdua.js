import React from 'react';
import { StyleSheet, TextInput, Picker, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity,FlatList } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableRipple, Card } from 'react-native-paper';
import MapView  from 'react-native-maps';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class createdua extends React.Component {
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
                
                <View style={{ backgroundColor: '#D49C0F', height: '11%' }}>
                    <View style={{ marginTop: hp('6%'), marginHorizontal: wp('5%'), flex:1, flexDirection:'row' }}>
                    <View style={{ marginLeft: wp('0%') }}>
                        <TouchableOpacity onPress={()=> this.props.navigation.goBack(null)}>
                        <AntDesign name='arrowleft' color='white' size={25} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 20, color: 'white', alignSelf:'center',marginLeft:wp('22%'), marginTop:-10 }}>CREATE DUA</Text> 
                    </View>
                </View>

                <ScrollView>
                <TextInput
                    placeholder={'Dua Subject'}
                    placeholderTextColor="#B9B9B9"
                    style={styles.replytextinput}
                    multiline={true}
                    editable={false}
                />

                <TextInput
                    placeholder={'Dua Title'}
                    placeholderTextColor="#B9B9B9"
                    style={styles.textinput}
                    multiline={true}
                    editable={false}
                />

                <View style={{padding:20}}>
      
                <TouchableOpacity
                        style={{width:200, alignSelf:'center', height:35, backgroundColor:'#D49C0F', padding:5, borderRadius:2,marginTop:20}}
                        onPress={() => this.props.navigation.navigate('#')}>
                        <Text style={styles.buttonText}>Add Dua</Text>
                        </TouchableOpacity>

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

        fontSize: 18,
        color: '#fff',
        alignSelf:'center'
    },

    userList:{
        padding:8,
        backgroundColor: '#fff',
        borderBottomColor: '#B9B9B9',
        borderBottomWidth:1,
    },
    title: {
        fontSize: 16,
        marginTop:wp('2%'),
        color:'#000',
    },
    desc:{
        fontSize: 13,
        color:'#B9B9B9',
    },desc2:{
        fontSize: 13,
        color:'#B9B9B9',
    },
    image:{
        width: 60, 
        height: 60, 
        marginTop:wp('1%'),
        marginRight:wp('3%'), 
        borderRadius:10,
        marginLeft:wp('1%')
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
      card1:{
        backgroundColor:'white',
        padding:20, 
        margin:20,
        marginTop:-55,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      },
      card2:{
        backgroundColor:'white',
        padding:20, 
        margin:20,
        marginTop:0,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      },
      card3:{
        backgroundColor:'white',
        marginLeft:0,
        marginRight:0,
        marginTop:10,
      },
      replytextinput:{
        backgroundColor: '#fff',
        borderTopWidth:2,
        borderRightWidth:2,
        borderBottomWidth:2,
        borderLeftWidth:2,
        borderColor:'#D49C0F',
        borderRadius:3, 
        padding: 10, 
        height: 40, 
        width: wp('90%'),
        alignSelf:'center',
        marginTop:wp('5%')
      },
      textinput:{
        backgroundColor: '#fff',
        borderTopWidth:2,
        borderRightWidth:2,
        borderBottomWidth:2,
        borderLeftWidth:2,
        borderColor:'#D49C0F',
        borderRadius:3, 
        padding: 10, 
        height: 100, 
        width: wp('90%'),
        alignSelf:'center',
        marginTop:wp('5%')
      },
      donatetextinput:{
        backgroundColor: '#fff',
        borderTopWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderColor:'#898989',
        borderRadius:5, 
        padding: 10, 
        height: 35, 
        width: wp('45%'),
        marginLeft:0,
      }
});