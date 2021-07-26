import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, TouchableOpacity, View, Image, AsyncStorage } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { TextInput, ScrollView, ImageBackground } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default class sideMenuDesign extends Component {

  constructor(props) {
    super(props);
    this.state = {
      UID: '',
      FIRST: '',
      LAST: '',
      IMG: '',
    }
  }
  componentDidMount = async () => {
    this.setState({
      UID: await AsyncStorage.getItem('ID'),
      FIRST: await AsyncStorage.getItem('FIRST'),
      LAST: await AsyncStorage.getItem('LAST'),
      IMG: await AsyncStorage.getItem('IMG'),
    });

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.getsetid();
    });
  }

  getsetid = async () => {
    this.setState({
      UID: await AsyncStorage.getItem('ID'),
      FIRST: await AsyncStorage.getItem('FIRST'),
      LAST: await AsyncStorage.getItem('LAST'),
      IMG: await AsyncStorage.getItem('IMG'),
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  logout = async () => {

    this.setSession();
  }

  setSession = async () => {
    let ID = await AsyncStorage.getItem('ID');
    console.log("MY ID ID: " + ID)
    if (ID != '') {
      this.setState({ loading: true })
      fetch(`https://liftich.com/wow/public/api/status_update/${ID}`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          status: 0

        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({ loading: false })
          console.log(responseJson)
          if (responseJson.message == 'Status Update!') {
            let USERID = '0';
            AsyncStorage.setItem('ID', USERID);

            let FIRST = '';
            AsyncStorage.setItem('FIRST', FIRST);

            let LAST = '';
            AsyncStorage.setItem('LAST', LAST);

            let IMG = '';
            AsyncStorage.setItem('IMG', IMG);

            this.props.navigation.navigate('login')
          }
        })
        .catch((error) => {
          this.setState({ label: true, labelText: 'Network error / please check internet data.' })
        });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F27126' }}>
        <View style={{ backgroundColor: '#fff', padding: 10, borderBottomColor: '#ffc000', borderBottomWidth: 1 }}>
          {this.state.IMG == '' || this.state.IMG == null || this.state.IMG == 'null' ?
            <Image style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 35, marginBottom: 20, borderRadius: 50 }} source={require('../image/photo-camera.png')} />
            :
            <Image style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 35, marginBottom: 20, borderRadius: 50 }} source={{ uri: 'https://liftich.com/wow/public/assets/images/' + this.state.IMG }} />
          }
          <Text style={{ alignSelf: 'center', fontSize: 18, color: 'black', marginBottom: 10 }}>{this.state.FIRST} {this.state.LAST}</Text>
        </View>
        <ScrollView style={{ marginTop: 0 }}>

          <View style={{ borderBottomColor: '#fff', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('myprofile') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>MY PROFILE</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#fff', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('about') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>ABOUT WOW</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#fff', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('mission') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>OUR MISSION</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#fff', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('vision') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>OUR VISION</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#fff', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.logout() }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>LOGOUT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }
}


