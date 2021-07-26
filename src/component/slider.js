/*This is an example of React Native App Intro Slider */
import React, { Component } from 'react';
//import react in project
import { Dimensions, StyleSheet, ImageBackground, View, Text, Image, ActivityIndicator, AsyncStorage, } from 'react-native';
//import all the required component
import AppIntroSlider from 'react-native-app-intro-slider';
import { Button } from 'react-native-paper';

//import AppIntroSlider to use it

import Login from '../component/login';


export default class slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      loading: false
      //To show the main page of the app
    };
  }



  _renderNextButton = () => {
    return (
      <View>
        <Button style={{ backgroundColor: '#F27126', width: 100, marginTop: 0, borderRadius: 25 }}>
          <Text style={{ color: 'white' }}>Next</Text>
        </Button>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View>

        <Button style={{ backgroundColor: '#F27126', width: 200, marginRight: 60, marginTop: 0, borderRadius: 25 }}>
          <Text style={{ color: 'white' }}>Get Started</Text>
        </Button>


      </View>
    );
  };
  _renderPreviousButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text
          style={styles.text}
          color="rgba(255, 255, 255, .9)"
        >Previous</Text>
      </View>
    );
  };
  _onDone = () => {
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    this.setState({ showRealApp: false });
  };
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 50
        }}>
        <Image style={styles.image} source={item.image} />
      </View>
    );
  };


  render() {
  
      const { navigation } = this.props;


      //If false show the Intro Slides
      if (this.state.showRealApp) {
        //Real Application
        return (
          <Login navigation={navigation}></Login>
        )
      } else {
        //Intro slides

        return (

          <AppIntroSlider
            data={slides}
            renderItem={this._renderItem}
            onDone={this._onDone}
            activeDotStyle={{ backgroundColor: '#222222', width: 10, height: 10, marginBottom: 120 }}
            dotStyle={{ backgroundColor: '#222222', width: 8, height: 8, marginBottom: 120 }}
            showSkipButton={false}
            showPrevButton={false}
            renderPrevButton={this._renderPreviousButton}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            onSkip={this._onSkip}
          />

        );
      }
    

  }
}
const dimension = Dimensions.get('window')

const styles = StyleSheet.create({

  image: {
    resizeMode: "contain",
    width: dimension.width,
    height: 700,
    paddingHorizontal: 10,
    // marginTop: 200
  },
  text: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginTop: 10
  },
  title: {
    fontSize: 25,
    color: '#FE9900',
    textAlign: 'center',
  },
  buttonCircle: {
    backgroundColor: 'orange',
    borderRadius: 25,
  }
});

const slides = [
  {
    key: 's1',
    title: 'Rocket guy',
    image: require('./../image/slide1.jpg'),
    backgroundColor: '#fff',
  },
  {
    key: 's2',
    image: require('./../image/slide2.jpg'),
    backgroundColor: '#fff',
  },
  {
    key: 's3',
    image: require('./../image/slide3.jpg'),
    backgroundColor: '#fff',
  },
  // {
  //   key: 's4',
  //   image: require('./../image/slide4.jpg'),
  //   backgroundColor: '#fff',
  // },
  // {
  //   key: 's5',
  //   image: require('./../image/slide5.jpg'),
  //   backgroundColor: '#fff',
  // },
  {
    key: 's6',
    image: require('./../image/slide6.jpg'),
    backgroundColor: '#fff',
  },

];