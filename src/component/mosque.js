import React, { Component, Fragment } from 'react';
import { StyleSheet, Modal, Text, View, TextInput, ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, ListView, AsyncStorage, Linking, Platform, Alert, Picker, BackHandler } from 'react-native';
import { MaterialIcons, Feather, Entypo, AntDesign, MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Search from './Search';
import Searchfrom from './Searchfrom';
import Directions from './Directions';
import Geocoder from 'react-native-geocoding';
// import getPixelSize from '../component/utils';
import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';
import Details from './Details';
import { TouchableRipple } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDistance, getPreciseDistance } from 'geolib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
Geocoder.init("AIzaSyAAuezMY2GrjCPMEnhsmHeghGwf-TtRZNc");
// Geocoder.init("AIzaSyDH1BI-BJUiOP69alhfisepNLSB3L6JuSI");


export default class mosque extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lod:true,
            region: null,
            lat: '',
            lon: '',
            plat: '',
            plon: '',
            coordinates: [],
            marginBottom: 1,
            STATUS: '',
            region: null,
            destination: null,
            duration: null,
            location: null,
            distance: null,
            fare: 30,
            totalfare: 0,
            fromlocation: '',
            toLocation: '',
            UID: '',
            DID: '7',
            OID: '',
            showMe: false,
            showMe2: false,
            chat: true,
            vmodal: 'Loading',
            vnumber: 'Loading',
            rating: 'Loading',
            dimage: '',
            dname: 'Loading',
            dphone: '',
            time: 0,
            mytotalfare: '',
            driversprofile: [],
            neardrivers: [],
            mylat: '',
            mylon: '',
            marginBottom: 1,
            STATUS: '',
            searchFocused: false,
            end: false,
            rep: false,
            Default_Rating: 1,
            Max_Rating: 5,

            Default_Rating1: 1,
            Max_Rating1: 5,

            Default_Rating2: 1,
            Max_Rating2: 5,

            review: '',
            reviewrep: '',
            cattype: [],
            reports: [],
            category: '',
        }
        this.Star = 'https://i.ibb.co/kxX9pQ1/star2.png';

        this.Star_With_Border = 'https://i.ibb.co/FqGYR6z/star.png';
    }


    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }

    UpdateRating1(key) {
        this.setState({ Default_Rating1: key });
    }

    UpdateRating2(key) {
        this.setState({ Default_Rating2: key });
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

    mycurrent() {
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));

                this.setState({
                    mylat: latitude,
                    mylon: longitude,
                    fromlocation: address,
                    location,
                    region:
                    {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                });
            },
            () => { },
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );
    }



    async componentDidMount() {
        console.log('test')
        this.setState({
            UID: this.props.navigation.getParam('uid'),
            STATUS: this.props.navigation.getParam('STATUS'),
        });
        this.categories();
        this.getReports();

        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));

                this.setState({
                    mylat: latitude,
                    mylon: longitude,
                    fromlocation: address,
                    location,
                    region:
                    {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    },
                    lod:false
                });
            },
            () => { },
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );

    }

    handleLocationSelectedfrom = (data, { description }) => {

        Geocoder.init("AIzaSyAAuezMY2GrjCPMEnhsmHeghGwf-TtRZNc");

        Geocoder.from(description)
            .then(json => {
                var locationlat = json.results[0].geometry.location;
                var locationlat2 = data.structured_formatting.main_text;

                this.setState({
                    region:
                    {
                        latitude: locationlat.lat,
                        longitude: locationlat.lng,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    },
                    fromlocation: locationlat2
                })
            })
            .catch(error => console.warn(error));

    }

    handleLocationSelected = (data, { description }) => {

        Geocoder.init("AIzaSyAAuezMY2GrjCPMEnhsmHeghGwf-TtRZNc");

        Geocoder.from(description)
            .then(json => {
                var locationlat = json.results[0].geometry.location;
                var locationlat2 = data.structured_formatting.main_text;

                this.setState({
                    toLocation: description,
                    destination: {
                        latitude: locationlat.lat,
                        longitude: locationlat.lng,
                        title: locationlat2,
                    },
                })
            })
            .catch(error => console.warn(error));

    }

    handleBack = () => {
        this.setState({
            destination: null,
        });
    }

    reviewPost = async () => {

        const { review } = this.state;
        const { Default_Rating } = this.state;
        const { Default_Rating1 } = this.state;
        const { Default_Rating2 } = this.state;
        const { fromlocation } = this.state;
        const { toLocation } = this.state;

        // console.log('Rating 1: '+ Default_Rating, 'Rating 2: '+ Default_Rating1, 'Rating 3: '+ Default_Rating2);
        // return;
        let UID = await AsyncStorage.getItem('ID');

        this.setState({ loading: true })

        fetch(`https://wow.itsolexperts.com/public/api/add_ride/${UID}`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                from: fromlocation,
                to: toLocation,
                comment: review,
                rating1: Default_Rating,
                rating2: Default_Rating1,
                rating3: Default_Rating2,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ loading: false })
                if (responseJson.message == 'Review Added Succesfuly') {
                    Alert.alert('Success', 'Your review has been submitted successfully.')
                    this.setState({ review: '', Default_Rating: 1, end: false, });
                    this.handleBack();
                    this.props.navigation.navigate('home2');
                }
            })
            .catch((error) => {
                Alert.alert('500 Error', 'No / Slow Response From Server');
            });
    }
    reviewReport = async () => {

        const { mylat } = this.state;
        const { mylon } = this.state;
        const { category } = this.state;
        const { reviewrep } = this.state;

        let UID = await AsyncStorage.getItem('ID');
        this.setState({ loading: true })

        if (category == '') {
            alert('Please Select Your Category');
            return;
        } else if (reviewrep == '') {
            alert('Please Write Your Report');
            return;
        } else {


            fetch(`https://wow.itsolexperts.com/public/api/report_insert/${UID}`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    lat: mylat,
                    lag: mylon,
                    category: category,
                    comment: reviewrep,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({ loading: false })
                    if (responseJson.message == 'Report Saved successfully') {
                        Alert.alert('Incident Recorded', 'Your incident has been recorded and will now be visible to all users of this route')
                        this.setState({ reviewrep: '', rep: false, });
                        // this.handleBack();
                        // this.props.navigation.navigate('home2');
                    }
                })
                .catch((error) => {
                    Alert.alert('500 Error', 'No / Slow Response From Server');
                });

        }
    }

    categories() {
        let url = 'https://wow.itsolexperts.com/public/api/categories';
        fetch(url)
            .then(r => r.json())
            .then(response => {
                this.setState({
                    cattype: response.data
                })
            })
            .catch(e => console.log(e))
    }
    getReports() {
        let url = 'https://wow.itsolexperts.com/public/api/reports';
        fetch(url)
            .then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({
                    reports: response.data
                })
            })
            .catch(e => console.log(e))
    }

    render() {

        const { region, destination, duration, location, distance, fromlocation, toLocation, searchFocused } = this.state;

        let React_Native_Rating_Bar = [];

        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }

        let React_Native_Rating_Bar1 = [];

        for (var i = 1; i <= this.state.Max_Rating1; i++) {
            React_Native_Rating_Bar1.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating1.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating1
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }

        let React_Native_Rating_Bar2 = [];

        for (var i = 1; i <= this.state.Max_Rating2; i++) {
            React_Native_Rating_Bar2.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating2.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating2
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }

        if (this.state.lod == true) {
            return (

                <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>
                    < ActivityIndicator color="#EB3007" size={'large'} animating={this.state.loading} />
                    <Text style={{textAlign:'center', marginTop:10}}>Please Wait...</Text>
                </View>
            )

        }
        else {

            return (

                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={region}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        loadingEnabled
                        onMapReady={() => this.setState({ marginBottom: 0 })}
                        ref={el => this.mapView = el}
                    >
                        {
                            this.state.reports.map(item => (
                                <MapView.Marker
                                    key={item.category}
                                    coordinate={{
                                        latitude: item.lat,
                                        longitude: item.lag
                                    }}
                                    title={item.category}
                                    description={item.comment}
                                    onPress={() => this.props.navigation.navigate('reportdetail', { RepID: item.id })}
                                >
                                    <Image
                                        source={require('../image/danger-icon.png')}
                                        style={{ width: 45, height: 45 }}
                                    />
    
                                </MapView.Marker>
                            ))
                        }
                        {destination && (
                            <Fragment>
                                <Directions
                                    origin={region}
                                    destination={destination}
                                    onMapReady={() => this.setState({ marginBottom: 0 })}
                                    onReady={result => {
                                        this.setState({ duration: Math.floor(result.duration), distance: result.distance });
                                        this.mapView.fitToCoordinates(result.coordinates, {
                                            edgePadding: {
                                                right: 50,
                                                left: 50,
                                                top: 50,
                                                bottom: 50,
                                            }
                                        });
                                    }}
                                />
                                <Marker coordinate={destination} anchor={{ x: 0, y: 0 }} image={markerImage}>
                                    <View style={styles.locationbox}>
                                        <View style={styles.locationtimebox}>
                                            <Text style={styles.locationtimetext}>{duration}</Text>
                                            <Text style={styles.locationtimetextsmall}>MIN</Text>
                                        </View>
                                        <Text style={styles.locationtitle}>{destination.title}</Text>
                                        <View style={styles.locationtimebox}>
                                            <Text style={styles.locationtimetext}>{distance}</Text>
                                            <Text style={styles.locationtimetextsmall}>KM</Text>
                                        </View>
                                    </View>
                                </Marker>
                            </Fragment>
                        )}
                    </MapView>
    
                    {destination ? (
                        <Fragment>
    
                            <TouchableOpacity style={styles.touch} onPress={this.handleBack}>
                                <Image source={backImage} />
                            </TouchableOpacity>
    
                            <View style={styles.modal}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.setState({ rep: true })} style={styles.PostAnAd}>
                                        <Text style={{ color: 'white', alignSelf: 'center' }}>REPORT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ end: true })} style={styles.PostAnAd}>
                                        <Text style={{ color: 'white', alignSelf: 'center' }}>END JOURNEY</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
    
                        </Fragment>
                    ) : (<Search onLocationSelected={this.handleLocationSelected} />
                        )}
                    {destination ? (
                        <Fragment>
    
                            <TouchableOpacity style={styles.touch} onPress={this.handleBack}>
                                <Image source={backImage} />
                            </TouchableOpacity>
    
                        </Fragment>
                    ) : (<Searchfrom onLocationSelected={this.handleLocationSelectedfrom} />
                        )}
    
                    {/* <TouchableOpacity onPress={() => this.mycurrent()}>
                        <Text>HELLLLOOOOOO</Text>
                    </TouchableOpacity> */}
    
    
                    <Modal transparent={true} visible={this.state.end}>
                        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                            <View style={{ backgroundColor: '#ffffff', marginTop: 10, marginLeft: 10, marginRight: 10, padding: 40, borderRadius: 5, }}>
    
                                <ScrollView>
                                    <View style={styles.MainContainer}>
                                        <Text style={styles.textStyle}>Rate your answers to the following statements with</Text>
                                        <Text style={styles.textStyleSmall}>1= Strongly Disagree and{"\n"}5= Strongly Agree</Text>
    
                                        <Text style={{ textAlign: 'center', color: '#ededed' }}>__________________________________</Text>
    
                                        <Text style={styles.textStyleSmall}>Security</Text>
                                        <Text style={{ color: "#D3D3D3", textAlign: 'center', fontSize: 12, padding: 10, fontStyle: 'italic' }}>Law enforcement personel were present along my route. </Text>
    
                                        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
    
                                        <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 12 }}>
    
                                            {this.state.Default_Rating} / {this.state.Max_Rating}
                                        </Text>
    
                                        <Text style={{ textAlign: 'center', color: '#ededed' }}>__________________________________</Text>
    
    
                                        <Text style={styles.textStyleSmall}>Harassment</Text>
                                        <Text style={{ color: "#D3D3D3", textAlign: 'center', fontSize: 12, padding: 10, fontStyle: 'italic' }}>I experienced no harassment of any kind along my route. </Text>
    
                                        <View style={styles.childView}>{React_Native_Rating_Bar1}</View>
    
                                        <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 12 }}>
    
                                            {this.state.Default_Rating1} / {this.state.Max_Rating1}
                                        </Text>
    
                                        <Text style={{ textAlign: 'center', color: '#ededed' }}>__________________________________</Text>
    
    
                                        <Text style={styles.textStyleSmall}>Safety</Text>
                                        <Text style={{ color: "#D3D3D3", textAlign: 'center', fontSize: 12, padding: 10, fontStyle: 'italic' }}>I would have felt comfortable going on this route alone.</Text>
    
                                        <View style={styles.childView}>{React_Native_Rating_Bar2}</View>
    
                                        <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 12 }}>
    
                                            {this.state.Default_Rating2} / {this.state.Max_Rating2}
                                        </Text>
    
                                        <Text style={{ textAlign: 'center', color: '#ededed' }}>__________________________________</Text>
    
                                    </View>
    
                                    <View style={{ marginTop: 20 }}>
                                        <View style={{ height: 100, borderRadius: 5, borderWidth: 1, borderColor: '#000' }}>
                                            <TextInput
                                                style={{ padding: 10 }}
                                                placeholder="Write Your Review"
                                                placeholderTextColor={'#000'}
                                                value={this.state.review}
                                                onChangeText={review => this.setState({ review })}
                                                multiline={true}
                                            />
                                        </View>
                                    </View>
    
                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                        <TouchableOpacity onPress={() => this.setState({ end: false })} style={styles.PostAnAd}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>CANCEL</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.reviewPost()} style={styles.PostAnAd}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>COMPLETE</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
    
                            </View>
                        </View>
                    </Modal>
    
                    <Modal transparent={true} visible={this.state.rep}>
                        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                            <View style={{ backgroundColor: '#ffffff', marginTop: 100, marginLeft: 10, marginRight: 10, padding: 40, borderRadius: 5, }}>
    
                                <ScrollView>
    
                                    <Text style={styles.textStyle}>Report Query</Text>
                                    {/* <Text style={styles.textStyleSmall}>Please Rate Us</Text> */}
    
                                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: 20, borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 5 }}>
                                        <Picker style={{ height: 30, color: 'black', width: '100%', height: 30, }}
                                            selectedValue={this.state.category}
                                            onValueChange={(category) => this.setState({ category })}>
                                                 <Picker.Item label='Select Category' value='' />
                                            {
                                                this.state.cattype.map((item) => {
                                                    return (
                                                        <Picker.Item label={item.name} value={item.name} key={item.id} />
                                                    );
                                                })
                                            }
                                        </Picker>
                                    </View>
    
                                    <View style={{ marginTop: 20 }}>
                                        <View style={{ height: 100, borderRadius: 5, borderWidth: 1, borderColor: '#000' }}>
                                            <TextInput
                                                style={{ padding: 10 }}
                                                placeholder="Write Your Query"
                                                placeholderTextColor={'#000'}
                                                value={this.state.reviewrep}
                                                onChangeText={reviewrep => this.setState({ reviewrep })}
                                                multiline={true}
                                            />
                                        </View>
                                    </View>
    
                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                        <TouchableOpacity onPress={() => this.reviewReport()} style={styles.PostAnAd}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>SUBMIT</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ rep: false })} style={styles.PostAnAd}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>CANCEL</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
    
                            </View>
                        </View>
                    </Modal>
    
                </View>
            );

        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30
    },
    PostAnAd: {
        backgroundColor: '#F27126',
        padding: 12,
        width: "50%",
        marginRight: 1
    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },
    locationbox: {
        backgroundColor: '#fff',
        elevation: 1,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 3,
        flexDirection: 'row',
        marginTop: 18,
    },
    locationtitle: {
        paddingTop: 8,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 12,
        color: '#000',
    },
    locationtimebox: {
        backgroundColor: '#F27126',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,

    },
    locationtimetext: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
    },
    locationtimetextsmall: {
        color: '#fff',
        fontSize: 10,
        textAlign: 'center',
    },
    touch: {
        position: 'absolute',
        top: 40,
        left: 20,
        marginTop: 12
    },




    modal: {
        backgroundColor: '#FFF',
        height: 80,
        width: '100%',
        position: "absolute",
        bottom: 0,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center',
        padding: 20
    },
    maintitletext: {
        fontSize: 20,
        color: '#222'
    },
    maintitledes: {
        fontSize: 14,
        color: '#666'
    },
    mainimg: {
        height: 80,
        width: 80,
        margin: 10
    },
    mainbutton: {
        backgroundColor: '#FFD014',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        alignSelf: 'stretch',
        marginTop: 10

    },
    mainbuttontext: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    },

    pickRid: {
        position: "absolute",
        marginTop: '142%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        height: 60,
        width: wp('100%'),
        alignItems: 'center',
    },
    pickRide: {
        position: "absolute",
        marginTop: '162%',
        backgroundColor: '#e8f021',
        zIndex: 1,
        height: 60,
        width: wp('100%'),
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#f4f4f8',
        marginTop: hp('0%'),
        height: 50,
        justifyContent: 'center',
        marginLeft: wp('5%'),
        width: wp('72%'),
        borderRadius: 30
    },
    chat: {
        flexDirection: 'row',

    },
    iconCall: {
        marginLeft: wp('4%'),
        padding: 5,
        borderRadius: 50,
        marginTop: hp('0%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f8',
        width: wp('14%'),
        height: 50,

    },
    loginButton: {
        borderRadius: 30,
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '3%',
    },
    price: {
        height: hp('18%'),
        backgroundColor: '#f4f4f8',
        marginBottom: hp('2%')
    },
    priceText: {
        marginTop: hp('10%'),
        marginRight: wp('5%')
    },
    profile: {
        flexDirection: 'column',
        marginTop: hp('3%'),
        marginRight: wp('5%')
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    rating: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 5
    },
    bikeNo: {
        fontSize: 15,
        fontWeight: 'bold',

    },
    iconStar: {
        flexDirection: 'row',
        marginLeft: wp('4%'),
        padding: 5,
        borderRadius: 30,
        marginTop: -10,
        backgroundColor: '#f4f4f8',
        width: wp('15%'),
        height: hp('5%')
    },






    MainContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#8ad24e',
    },
    StarImage: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        marginRight: 5
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
    },
    textStyleSmall: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        marginTop: 15,
    },

});