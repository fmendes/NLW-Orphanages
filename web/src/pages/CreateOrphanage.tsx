import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

export default function CreateOrphanage() {
  const history = useHistory();

  const[ position, setPosition ] = useState( { latitude: 0, longitude: 0 } );

  const[ name, setName ] = useState( '' );
  const[ about, setAbout ] = useState( '' );
  const[ instructions, setInstructions ] = useState( '' );
  const[ openingHours, setOpeningHours ] = useState( '' );
  const[ openOnWeekends, setOpenOnWeekends ] = useState( false );
  const[ images, setImages ] = useState<File[]>( [] );
  const[ previewImages, setPreviewImages ] = useState<string[]>( [] );

  function handleMapClick( event: LeafletMouseEvent ) {
    console.log( event );
    // latlng: LatLng {lat: -27.208293428655015, lng: -49.63586568832398}
    setPosition( { latitude: event.latlng.lat, longitude: event.latlng.lng } );
  }

  async function handleSubmit( event: FormEvent ) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    data.append( 'name', name );
    data.append( 'latitude', String( latitude ) );
    data.append( 'longitude', String( longitude ) );
    data.append( 'about', about );
    data.append( 'instructions', instructions );
    data.append( 'opening_hours', openingHours );
    data.append( 'open_on_weekends', String( openOnWeekends ) );
    images.forEach( image => {
      data.append( 'images', image );
    } );

    try{ 
      const apiResponse = await api.post( 'orphanages', data );
      console.log( apiResponse );
      if( apiResponse.statusText === "Created" ) {
        history.push( '/app' );
        return;
      }
    } catch( e ) {
      alert( 'Error while creating an orphanage. ' + ( e as Error ).message );
    }


    
  }

  function handleSelectImages( event: ChangeEvent<HTMLInputElement> ) {
    console.log( event );
    console.log( event.target.files );
    if( ! event.target.files ) {
      return;
    }

    const selectedImages = Array.from( event.target.files ); 
    setImages( selectedImages );

    const selectedImagesPreview = selectedImages.map( image => {
      return URL.createObjectURL( image );
    } );

    setPreviewImages( selectedImagesPreview );
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>{ name ? name : 'New Orphanage' }</legend>

            <Map 
              center={ position.latitude !== 0 ? [ position.latitude, position.longitude ] : [33.0653971,-96.7003683] }
              // {[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={ handleMapClick } >
              <TileLayer 
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                
              />
              {/* {`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}

              { position.latitude !== 0 && ( 
                  <Marker interactive={false} 
                          icon={mapIcon} 
                          position={ [ position.latitude, position.longitude ] } />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Name</label>
              <input id="name" 
                    value={name} 
                    onChange={ event => setName( event.target.value ) } />
            </div>

            <div className="input-block">
              <label htmlFor="about">About <span>Maximum 300 characters</span></label>
              <textarea id="about" maxLength={300}
                    value={about} 
                    onChange={ event => setAbout( event.target.value ) }  />
            </div>

            <div className="input-block">
              <label htmlFor="images">Photos</label>

              <div className="images-container">
                {
                  previewImages.map( image => {
                    return (
                      <img key={image} src={image} alt={name} />
                    );
                  } )
                }

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                
                <input type="file" id="image[]" multiple onChange={handleSelectImages} />

              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visits</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instructions</label>
              <textarea id="instructions"
                    value={instructions} 
                    onChange={ event => setInstructions( event.target.value ) } />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Opening Hours</label>
              <input id="opening_hours"
                    value={openingHours} 
                    onChange={ event => setOpeningHours( event.target.value ) } />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Open on Weekends</label>

              <div className="button-select">
                <button type="button" 
                        onClick={ event => setOpenOnWeekends( true ) }
                        className={ openOnWeekends ? 'active' : '' } >Yes</button>
                <button type="button"
                        onClick={ event => setOpenOnWeekends( false ) }
                        className={ openOnWeekends ? '' : 'not-active' } >No</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirm
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
