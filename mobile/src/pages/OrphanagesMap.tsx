
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/orphanIcon.png';
import { RectButton } from 'react-native-gesture-handler';

import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
    const navigation = useNavigation();

    const [ orphanages, setOrphanages ] = useState<Orphanage[]>( [] );
    useFocusEffect( () => {
      api.get( '/orphanages' ).then( response => { 
        setOrphanages( response.data );
      } );
    } );
    // useEffect( () => {
    //   api.get( '/orphanages' ).then( response => { 
    //     setOrphanages( response.data );
    //   } );
    // }, [] );

    function handleNavigationToOrphanageDetails( id: number ) {
      navigation.navigate( 'OrphanageDetails', { id } );
    }
    function handleNavigationToCreateOrphanage() {
      navigation.navigate( 'SelectMapPosition' );
    }

  return (
    <View style={styles.container} >
      <MapView style={styles.map} 
              provider={PROVIDER_GOOGLE}
              initialRegion={ {
                latitude: 33.0722363
                , longitude: -96.7536081
                , latitudeDelta: 0.016
                , longitudeDelta: 0.016
              } } >

          { orphanages.map( orphanage => { 
            return (
              <Marker key={ orphanage.id }
                      icon={mapMarker} 
                      calloutAnchor={ { x: 2.3, y: 0.7 } }
                      coordinate={ { latitude: orphanage.latitude, longitude: orphanage.longitude } }
              >
                <Callout tooltip
                          onPress={ () => handleNavigationToOrphanageDetails( orphanage.id ) } >
                  <View style={ styles.calloutContainer } >
                    <Text style={ styles.calloutText } >{ orphanage.name }</Text>
                  </View>
                </Callout>
              </Marker>

            );
          } ) }
        </MapView>

      <View style={styles.footer} >
        <Text style={ styles.footerText } >{orphanages.length} orphanages found</Text>
        <RectButton style={ styles.createOrphanageButton }
                    onPress={ () => {
                      handleNavigationToCreateOrphanage();
                    } } >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } 
  , map: {
    width: Dimensions.get( 'window' ).width
    , height: Dimensions.get( 'window' ).height
  } 
  , calloutContainer: {
    width: 160
    , height: 46
    , paddingHorizontal: 16
    , backgroundColor: 'rgba( 255, 255, 255, 0.8 )'
    , borderRadius: 16
    , justifyContent: 'center'
    , elevation: 3
  }
  , calloutText: {
    fontFamily: 'Nunito_700Bold'
    , color: '#0089a5'
    , fontSize: 14
  }
  , footer: {
    position: 'absolute'
    , left: 24
    , right: 24
    , bottom: 32
    , backgroundColor: '#FFF'
    , borderRadius: 20
    , height: 56
    , paddingLeft: 24
    , flexDirection: 'row'
    , justifyContent: 'space-between'
    , alignItems: 'center'
    , elevation: 3
    , shadowColor: 'gray'
    , shadowOffset: { width: 3, height: 3 }
    , shadowOpacity: 0.8
    , shadowRadius: 5
  }
  , footerText: {
    fontFamily: 'Nunito_700Bold'
    , color: '#8fa7b3'
  }
  , createOrphanageButton: {
    width: 56
    , height: 56
    , backgroundColor: '#15d6c3'
    , borderRadius: 20
    , justifyContent: 'center'
    , alignItems: 'center'
  }
});