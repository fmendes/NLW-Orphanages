import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet
    , Switch, Text, TextInput
    , Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  description: string;
  instructions: string;
  open_on_weekends: boolean;
  opening_hours: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function OrphanageData() {
  const navigation = useNavigation();
  
  const [ name, setName ] = useState<string>( '' );
  const [ about, setAbout ] = useState<string>( '' );
  const [ instructions, setInstructions ] = useState<string>( '' );
  const [ latitude, setLatitude ] = useState<number>( 0 );
  const [ longitude, setLongitude ] = useState<number>( 0 );
  const [ openingHours, setOpeningHours ] = useState<string>( '' );
  const [ openOnWeekends, setOpenOnWeekends ] = useState<boolean>( false );
  const [ images, setImages ] = useState<string[]>( [] );

  const route = useRoute();
  console.log( route.params ); // { id: 12345 }
  const { position } = route.params as OrphanageDataRouteParams;

  const [ orphanage, setOrphanage ] = useState<Orphanage>();
  useEffect( () => {
  }, [ ] );

  async function handleCreateOrphanage() {
    const { latitude, longitude } = position;

    const data = new FormData();
    data.append( 'name', name );
    data.append( 'latitude', String( latitude ) );
    data.append( 'longitude', String( longitude ) );
    data.append( 'about', about );
    data.append( 'instructions', instructions );
    data.append( 'opening_hours', openingHours );
    data.append( 'open_on_weekends', String( openOnWeekends ) );
    images.forEach( ( image, index ) => {
      data.append( 'images', {
        type: 'image/jpg'
        , uri: image
        , name: `image${index}.jpg`
      } as any );
    } );

    try{ 
      const apiResponse = await api.post( 'orphanages', data );
      console.log( apiResponse );
      if( apiResponse.status === 201 ) {
        navigation.navigate( 'OrphanagesMap' );
        return;
      }
    } catch( e ) {
      alert( 'Error while creating an orphanage. ' + ( e as Error ).message );
    }

  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if( status !== 'granted' ) {
      alert( 'This app requires access to the device\'s photos.' );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync( {
      allowsEditing: true
      , quality: 1
      , mediaTypes: ImagePicker.MediaTypeOptions.Images
    } );

    if( result.cancelled ) {
      return;
    }

    // destructure result into uri and rename uri to image
    const{ uri: image } = result;

    // recreate array of images with the new uri appended to it
    setImages( [ ... images, image ] );
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Orphanage Data</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={ name }
                onChangeText={ value => setName( value ) }
      />

      <Text style={styles.label}>About</Text>
      <TextInput style={[styles.input, { height: 110 }]}
        multiline value={ about }
        onChangeText={ setAbout }
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input}
      />

      <Text style={styles.label}>Photos</Text>

      <View style={ styles.uploadedImagesContainer } >
        { images.map( image => { 
          return (
            <Image key={image}
                  source={ { uri: image } } 
                  style={ styles.uploadedImage } />
          );
        } )}
      </View>

      <TouchableOpacity style={styles.imagesInput} 
                        onPress={ handleSelectImages }>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitation</Text>

      <Text style={styles.label}>Instructions</Text>
      <TextInput style={[styles.input, { height: 110 }]}
        multiline value={ instructions }
        onChangeText={ setInstructions }
      />

      <Text style={styles.label}>Open Hours</Text>
      <TextInput style={styles.input} value={ openingHours }
        onChangeText={ setOpeningHours }
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Open on Weekends?</Text>
        <Switch value={ openOnWeekends } 
                onValueChange={ setOpenOnWeekends }
                thumbColor="#fff" 
                trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <RectButton style={styles.nextButton} 
                onPress={ handleCreateOrphanage } >
        <Text style={styles.nextButtonText}>Save</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row'
  },

  uploadedImage: {
    width: 64
    , height: 64
    , borderRadius: 20
    , marginBottom: 32
    , marginRight: 8 
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})