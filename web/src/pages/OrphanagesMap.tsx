import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    // define orphanage list as a state so that the map markers 
    // are rerendered when list is changed
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>( [] );

    useEffect( () => {
        api.get( 'orphanages' ).then( response => {
            console.log( response.data );
            setOrphanages( response.data );
        } );
    }, [] );

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
            
                { 
                    orphanages.map( orphanage => {
                        return (
                            <Marker key={orphanage.id}
                                    position={[orphanage.latitude, orphanage.longitude]}
                                    icon={mapIcon} >
                                <Popup closeButton={false} 
                                        minWidth={240} maxWidth={240}
                                        className="map-popup" >
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`} >
                                        <FiArrowRight size={20} color="#fff" />
                                    </Link>
                                </Popup>
                            </Marker>
                        );
                    })
                }

            </Map>

            

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="fff" />
            </Link>
        </div>
    );
}
    
export default OrphanagesMap;