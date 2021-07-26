import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, AsyncStorage, Dimensions, ActivityIndicator, } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
export default class splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    componentDidMount() {
        this.checkSession()
    }

    checkSession = async () => {
        let ID = await AsyncStorage.getItem('ID');
        console.log('ID: ' + ID)
        console.log('start')
        if (ID != '') {
            this.setState({ loading: true })

            fetch(`https://wow.itsolexperts.com/public/api/status_check/${ID}`)
                .then((response) => response.json())
                .then((responsejson) => {
                    console.log(responsejson)
                    // alert(responsejson)

                    if (responsejson.status == '0' || responsejson.status < 1 || responsejson.status == null || responsejson.status == 'null') {
                        this.setState({ loading: false })
                        this.props.navigation.navigate('slider')
                        null
                        return;
                    }
                    if (responsejson.status == '1') {

                        this.setState({ loading: false })
                        this.props.navigation.navigate('home2')
                        return;
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <ImageBackground source={require('./../image/splash.png')} style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator style={{ marginTop: 380 }} color="#fff" size={'large'} animating={this.state.loading} />
                </ImageBackground>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});