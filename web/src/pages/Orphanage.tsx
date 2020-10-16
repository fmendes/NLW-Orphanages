import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import mapIcon from "../utils/mapIcon";

import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    description: string;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: Array<{
      id: string;
      url: string;
    }>;
    // images: {
      // path: string;
    // }[];
}
interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  //const { id } = params;

  // define orphanage as a state so that the fields
  // are re-rendered when it is changed
  const [ orphanage, setOrphanage ] = useState<Orphanage>();

  const [ activeImageIndex, setActiveImageIndex ] = useState( 0 );

  // will execute the function whenever the variables in the array change
  useEffect( () => {
      api.get( `orphanages/${params.id}` ).then( response => {
          console.log( response.data );
          setOrphanage( response.data );
      } );
  }, [ params.id ] );

  if( ! orphanage ) {
    return ( <p>Loading...</p> );
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={'http://localhost:3333' + orphanage.images[ activeImageIndex ]?.url} alt={orphanage.name} />

          <div className="images">
            { orphanage.images.map( ( image, index ) => {
              return (
                <button key={ image.id } 
                        className={ activeImageIndex === index ? 'active' : '' } 
                        onClick={ () => setActiveImageIndex( index ) }
                        type="button">
                  <img src={'http://localhost:3333' + image.url} alt={orphanage.name} />
                </button>
              );
              })
            }
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[ orphanage.latitude, orphanage.longitude ]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                 {/* https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN} */}
                <Marker interactive={false} icon={mapIcon} position={[ orphanage.latitude, orphanage.longitude ]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer"
                href={`http://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`} >See routes in Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instructions for visitation</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>
              <div className={ orphanage.open_on_weekends ? 'open-on-weekends' : 'closed-on-weekends' }>
                <FiInfo size={32} color={ orphanage.open_on_weekends ? '#39CC83' : '#ff669d' } />
                { orphanage.open_on_weekends ? 'Open on weekends' : 'Closed on weekends' }
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Contact orphanage
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}