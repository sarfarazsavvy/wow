import React from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

export default class index extends React.Component {
  state = {
    searchFocused: false,
    fromlocation:'',
  }

  async componentDidMount() {

    navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
            const response = await Geocoder.from({ latitude, longitude });
            const address = response.results[0].formatted_address;
            const location = address.substring(0, address.indexOf(','));

            this.setState({
                fromlocation: address,
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

  render() {
    const { searchFocused } = this.state;
    const { fromlocation } = this.state;
    const { onLocationSelected } = this.props;
    return (

      
      <GooglePlacesAutocomplete
        placeholder={fromlocation}
        placeholderTextColor={'black'}
        onPress={onLocationSelected}
        query={{
          key: 'AIzaSyAAuezMY2GrjCPMEnhsmHeghGwf-TtRZNc',
          language: 'en'
        }}
        textInputProps={{
          onFocus: () => { this.setState({ searchFocused: true }) },
          onBlur: () => { this.setState({ searchFocused: false }) },
          autoCapitalize: "None",
          autoCorrect: false
        }}
        listViewDisplayed={searchFocused}
        fetchDetail={true}
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: 'absolute',
            top: Platform.select({ ios: 60, android: 40 }),
            width: '100%'
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            height: 54,
            marginHorizontal: 10,
            borderTopWidth: 0,
            borderBottomWidth: 0
          },
          textInput: {
            height: 64,
            margin: 0,
            borderRadius: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: -20,
            marginLeft: 0,
            marginRight: 0,
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0, },
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: '#DDD',
            fontSize: 15

          },
          listView: {
            borderWidth: 1,
            borderColor: '#DDD',
            backgroundColor: '#FFF',
            marginHorizontal: 10,
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0, },
            shadowRadius: 15,
            marginTop: -25

          },
          description: {
            fontSize: 16,
          },
          row: {
            padding: 20,
            height: 58
          },
        }}

      />
    );
  }
}
