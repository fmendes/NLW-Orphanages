import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg
    , iconSize: [ 58, 68 ]
    , iconAnchor: [ 29, 68 ]
    , popupAnchor: [ 170, 2 ]
});

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Choose an orphanage in the map</h2>
                    <p>Many kids are waiting for your visit :)</p>
                </header>

                <footer>
                    <strong>Plano</strong>
                    <span>Texas</span>
                </footer>
            </aside>

            <Map center={[33.0653971,-96.7003683]}
                zoom={15}
                style={{ width: '100%', height: '100%'}} >
                    <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {/*<TileLayer 
                    url={`http://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />*/}
            
                <Marker position={[33.0653971,-96.7003683]}
                        icon={mapIcon} >
                    <Popup closeButton={false} 
                            minWidth={240} maxWidth={240}
                            className="map-popup" >
                        Mulgore Cubs
                        <Link to="/orphanages/1" >
                            <FiArrowRight size={20} color="#fff" />
                        </Link>
                    </Popup>
                </Marker>

            </Map>

            

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="fff" />
            </Link>
        </div>
    );
}
    
export default OrphanagesMap;