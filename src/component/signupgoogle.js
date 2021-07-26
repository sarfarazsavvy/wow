import React from 'react';
import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView, Dimensions, TouchableOpacity, Picker, ActivityIndicator, AsyncStorage } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableRipple } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

var radio_props = [
  { value: 0, label: 'Male' },
  { value: 1, label: 'Female' },
];
export default class signupgoogle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      first: '',
      last: '',
      email: '',
      gimg:'',
      cnic: '',
      cnic2: '',
      cnic3: '',
      gender: '',
      phone: '',
      lat: '',
      lng: '',
      srcImg: '',
      uri: '',
      Image: '',
      loading: false,
      provide:''
    };
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          Image: result.uri,
          srcImg: { uri: result.uri },
          uri: result.uri,
        });
      }

    } catch (E) {
      console.log(E);
    }
  };

  componentDidMount = async () => {

    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);

        this.setState({ lat: latitude, lng: longitude });
      },
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,

      }
    );

    this.setState({
      uri: this.props.navigation.getParam('IMG'),
      provide: this.props.navigation.getParam('PROVIDE'),
      first: this.props.navigation.getParam('NAME'),
      last: this.props.navigation.getParam('NAME'),
      email: this.props.navigation.getParam('EMAIL'),
    })

  }

  uploaddata = () => {

    const { first } = this.state;
    const { last } = this.state;
    const { email } = this.state;
    const { cnic } = this.state;
    const { cnic2 } = this.state;
    const { cnic3 } = this.state;
    const { gender } = this.state;
    const { phone } = this.state;

    let CNIC = cnic + cnic2 + cnic3


    // console.log('first: '+ first, 'last: '+ last, 'email: '+ email, 'cnic: '+ cnic, 'gender: '+ gender, 'phone: '+ phone, 'lat: '+ this.state.lat, 'lng: '+ this.state.lng);
    // return;

    if (this.state.uri == '') {
      alert('Please Select Your Image')
      return;
    }
    else if (this.state.first === '') {
      alert('Please Enter Your First Name')
      return;
    }
    else if (this.state.last === '') {
      alert('Please Enter Your Last Name')
      return;
    }
    else if (this.state.email === '') {
      alert('Please Enter Your Email')
      return;
    }
    else if (this.state.cnic === '' || this.state.cnic2 === '' || this.state.cnic3 === '') {
      alert('Please Enter Your CNIC')
      return;
    }
    else if (this.state.gender === '') {
      alert('Please Select Your Gender')
      return;
    }
    else if (this.state.phone === '') {
      alert('Please Enter Your Phone Number')
      return;
    }
    else if (this.state.lat == '' || this.state.lng == '') {
      alert('Please Enable Your Location')
      return;
    }
    else {


      this.setState({ loading: true })

      console.log('PHOTO UPLOAD...');
      const data = new FormData();


      {
        this.state.uri != '' ?
          data.append('image', {
            uri: this.state.uri,
            type: 'image/jpg',
            name: this.state.uri,
          }) :
          this.setState({ checkfalse: false })
      }

      data.append('first_name', first);
      data.append('last_name', last);
      data.append('phonenumber', phone);
      data.append('email', email);
      data.append('phone', phone);
      data.append('gender', gender);
      data.append('cnic', CNIC);
      data.append('lat', this.state.lat);
      data.append('lag', this.state.lng);

      this.setState({ loading: true })
      const url = `https://wow.itsolexperts.com/public/api/register`;
      fetch(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'multipart/form-data'
        },
        body: data
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ loading: false })

          console.log(responseJson)

          if (responseJson.message == 'Account Successfully Created') {
            alert('Your account has been created successfully');


            let USERID = `${responseJson.data.id}`;
            this.askpermission(USERID);
            AsyncStorage.setItem('ID', USERID);

            let FIRST = `${responseJson.data.first_name}`;
            AsyncStorage.setItem('FIRST', FIRST);

            let LAST = `${responseJson.data.last_name}`;
            AsyncStorage.setItem('LAST', LAST);

            let IMG = `${responseJson.data.image}`;
            AsyncStorage.setItem('IMG', IMG);

            this.checkSession(USERID);
            this.props.navigation.navigate('home2')
            return;

          } else {
            Alert.alert('ERROR', 'Invalid Data')
            return;
          }

        }).catch((error) => {
          console.log(error)
          Alert.alert('500 Error', 'Network error / please check internet data.');
        });

    }

  }

  async askpermission(USERID) {
    // if (Constants.isDevice) {

    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    // const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    console.log(status)
    const token1 = await Notifications.getExpoPushTokenAsync();
    // alert(token1.data)

    try {
      fetch(`https://wow.itsolexperts.com/public/api/token_add/${USERID}`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          push_token: token1.data
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
        })
        .catch((error) => {
          Alert.alert('500 Error', 'No / Slow Response From Server');
        });
    } catch (E) {
      console.log(E);
    }
    // }

  }

  // async askpermission(USERID) {

  //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  //   const token1 = await Notifications.getExpoPushTokenAsync();

  //   try {
  //     fetch(`https://wow.itsolexperts.com/public/api/token_add/${USERID}`, {

  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         push_token: token1.data
  //       })
  //     }).then((response) => response.json())
  //       .then((responseJson) => {
  //         console.log(responseJson)
  //       })
  //       .catch((error) => {
  //         Alert.alert('500 Error', 'No / Slow Response From Server');
  //       });
  //   } catch (E) {
  //     console.log(E);
  //   }

  // }

  checkSession = async (USERID) => {

    if (USERID != '') {
      this.setState({ loading: true })
      fetch(`https://wow.itsolexperts.com/public/api/status_update/${USERID}`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          status: 1

        })
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({ loading: false })

        })
        .catch((error) => {
          this.setState({ label: true, labelText: 'Network error / please check internet data.' })
        });
    }
  }

  renderButton() {
    if (this.state.loading) {
      <View>
      </View>
    }
    return (
      <View style={{ marginTop: 0, marginBottom: 0 }}>
        <ActivityIndicator color="#F27126" size={'small'} animating={this.state.loading} />
      </View>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.responsiveBox}>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView>
              {this.state.uri == '' || this.state.uri == null ?
                <TouchableOpacity onPress={this._pickImage}>
                  {this.state.Image == '' || this.state.Image == null ?
                    <Image style={{ alignSelf: 'center', width: 120, height: 120, marginTop: wp('15%'), marginBottom: wp('5%') }} source={require('./../image/camera.png')} />
                    :
                    <Image style={{ alignSelf: 'center', width: 120, height: 120, marginTop: wp('15%'), marginBottom: wp('5%'), borderRadius: 150 }} source={{ uri: 'https://wow.itsolexperts.com/public/assets/images/' + this.state.Image }} />
                  }
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={this._pickImage}>
                  <Image style={{ alignSelf: 'center', width: 150, height: 150, marginTop: wp('15%'), marginBottom: wp('5%'), borderRadius: 150 }} source={{ uri: this.state.uri }} />
                </TouchableOpacity>
              }
              <View style={{ marginTop: wp('15%') }}></View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <FontAwesome name="user" size={24} style={{ color: '#BFBFBF', marginTop: 20, marginLeft: 20, marginRight: 5 }} />
                <TextInput
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: '#E0C800',
                    }
                  }}
                  placeholder="First Name"
                  placeholderTextColor={'#BFBFBF'}
                  value={this.state.first}
                  onChangeText={first => this.setState({ first })}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <FontAwesome name="user" size={24} style={{ color: '#BFBFBF', marginTop: 20, marginLeft: 20, marginRight: 5 }} />
                <TextInput
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: '#E0C800',
                    }
                  }}
                  placeholder="Last Name"
                  placeholderTextColor={'#BFBFBF'}
                  value={this.state.last}
                  onChangeText={last => this.setState({ last })}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <FontAwesome name="envelope" size={20} style={{ color: '#BFBFBF', marginTop: 23, marginLeft: 20, marginRight: 5 }} />
                <TextInput
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: '#E0C800',
                    }
                  }}
                  placeholder="Email"
                  placeholderTextColor={'#BFBFBF'}
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                  editable={this.state.provide == 'email' ? false : true}
                />
              </View>


              <View style={{ flex: 1, flexDirection: 'row' }}>
                <FontAwesome name="phone" size={20} style={{ color: '#BFBFBF', marginTop: 23, marginLeft: 20, marginRight: 5 }} />
                <TextInput
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: '#E0C800',
                    }
                  }}
                  placeholder="Phone"
                  placeholderTextColor={'#BFBFBF'}
                  value={this.state.phone}
                  onChangeText={phone => this.setState({ phone })}
                  keyboardType={'phone-pad'}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <FontAwesome name="id-card" size={22} style={{ color: '#BFBFBF', marginTop: 20, marginLeft: 20, marginRight: 5 }} />
                <TextInput
                  style={styles.inputCNIC}
                  theme={{
                    colors: {
                      primary: '#E0C800',
                    }
                  }}
                  placeholder="CNIC"
                  placeholderTextColor={'#BFBFBF'}
                  value={this.state.cnic}
                  onChangeText={cnic => this.setState({ cnic })}
                  secureTextEntry={true}
                  keyboardType={'phone-pad'}
                  maxLength={5}
                />

                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    width: '10%',
                    alignSelf: 'center',
                  }}
                  theme={{
                    colors: {
                      primary: '#E0C800',
                    }
                  }}
                  placeholder="-"
                  placeholderTextColor={'#BFBFBF'}
                  value={this.state.cnicd}
                  onChangeText={cnicd => this.setState({ cnicd })}
                  secureTextEntry={true}
                  keyboardType={'phone-pad'}
                  editable={false}
                />

                <TextInput
                  style={styles.inputCNIC2}
                  theme={{
                    colors: {
                      primary: '#E0C800',
                    }
                  }}
                  placeholder="0000000"
                  placeholderTextColor={'#BFBFBF'}
                  value={this.state.cnic2}
                  onChangeText={cnic2 => this.setState({ cnic2 })}
                  secureTextEntry={true}
                  keyboardType={'phone-pad'}
                  maxLength={7}
                />

                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    width: '10%',
                    alignSelf: 'center',
                  }}
                  theme={{
                    colors: {
                      primary: '#E0C800',
                    }
                  }}
                  placeholder="-"
                  placeholderTextColor={'#BFBFBF'}
                  value={this.state.cnicd}
                  onChangeText={cnicd => this.setState({ cnicd })}
                  secureTextEntry={true}
                  keyboardType={'phone-pad'}
                  editable={false}
                />

                <TextInput
                  style={styles.inputCNIC3}
                  theme={{
                    colors: {
                      primary: '#E0C800',
                    }
                  }}
                  placeholder="0"
                  placeholderTextColor={'#BFBFBF'}
                  value={this.state.cnic3}
                  onChangeText={cnic3 => this.setState({ cnic3 })}
                  secureTextEntry={true}
                  keyboardType={'phone-pad'}
                  maxLength={1}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'row', }}>
                <FontAwesome name="user" size={24} style={{ color: '#BFBFBF', marginTop: 20, marginLeft: 20, marginRight: 5 }} />

                <Picker style={{ backgroundColor: '#fff', width: '42%', alignSelf: 'center', color: '#BFBFBF', marginLeft: 5, marginTop: 8, }}
                  selectedValue={this.state.gender}
                  onValueChange={(itemValue) =>
                    this.setState({ gender: itemValue })}>
                  <Picker.Item label="Gender" value="" />
                  <Picker.Item value="Female" label="Female" />
                  <Picker.Item value="Transgender" label="Transgender" />

                </Picker>
              </View>

              {this.renderButton()}

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.uploaddata()}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

            </ScrollView>
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
  inputCNIC: {
    backgroundColor: '#fff',
    width: '19%',
    alignSelf: 'center',
  },
  inputCNIC2: {
    backgroundColor: '#fff',
    width: '25%',
    alignSelf: 'center',
  },
  inputCNIC3: {
    backgroundColor: '#fff',
    width: '15%',
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
  responsiveBox: {
    width: wp('100%'),
    height: hp('100%'),
  },


});