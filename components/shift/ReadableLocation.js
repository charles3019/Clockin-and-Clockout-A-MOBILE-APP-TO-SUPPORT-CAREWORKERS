import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';

import Colors from '../../constants/Colors'
// import MapPreview from './MapPreview';


const ReadableLocation = props => {
  const [humanAddress, setHumanAddress] = useState();

  

  useEffect(() => {
    const getReadableLocation = async (locationToRead) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ locationToRead.lat },${locationToRead.lng}&key=${ENV.googleApiKey}`);
        
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
        
          const resData = await response.json();
          if (!resData.results) {
            throw new Error('Something went wrong!');
          }
        
          const address = resData.results[0].formatted_address;
          return address;
        }
  }, []);

  const { locationToRead } = props;
  const theAddress = await getReadableLocation(locationToRead);
  return (
    <View style={styles.locationPicker}>
      {/* <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview> */}
      <View style={styles.actions}>
       <Text>
           {theAddress}
       </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default ReadableLocation;