import React, { useState, useEffect, useCallback } from 'react';
import {Text, StyleSheet, TouchableOpacity,Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../../constants/Colors';
const MapScreen = props => {
const initialLocation = props.route.params.initialLocation;
const readonly = props.route.params.readonly;
const id = props.route.params ? props.route.params.productId : null;
const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 53.37797788442427,
    longitude: initialLocation ? initialLocation.lng : -1.4704763330532893,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      //Will do that later if I get the chance.
      return;
    }
    if(id){
      props.navigation.navigate('EditShift', { mpickedLocation: selectedLocation, productId: id })
    }else{
      
      props.navigation.navigate('EditShift', { mpickedLocation: selectedLocation });
    }
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Shift Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};


export const screenOptions = navData => {
    
    const saveFn = navData.route.params ? navData.route.params.saveLocation : null;
    const readonly = navData.route.params.readonly;
    if (readonly) {
      return {};
    }
    return {
      headerRight: () =>(
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      )
    };
  };


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;