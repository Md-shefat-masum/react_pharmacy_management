import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { UseAuth } from '../../../../Hooks/UseAuth';
import axios from 'axios';

const markers = [
    {
        id: 1,
        name: "Laj pharma",
        position: { lat: 23.710121, lng: 90.434302 },
        location: "Jatrabari",
    },
    {
        id: 2,
        name: "Lab aid",
        position: { lat: 23.712046, lng: 90.429584 },
        location: 'Dhania'
    },
    {
        id: 3,
        name: "Best buy",
        position: { lat: 23.707842, lng: 90.439409 },
        location: 'Dolaipar'
    },
    {
        id: 4,
        name: "Haque pharma",
        position: { lat: 23.702655, lng: 90.435249 },
        location: 'Doyagonj'
    }
];

const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#ff00001c',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 1000,
    zIndex: 1
}

function PharmacySearch(props) {
    const [Loaded, setLoaded] = useState(false)
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState({})
    const { user } = UseAuth();

    useEffect(() => {
        user.lat = parseFloat(user.lat);
        user.lng = parseFloat(user.lng);
        // console.log(user);

        axios.get(`${process.env.REACT_APP_API_LINK}/user/pharmacy-location`)
            .then(res => {
                setLocations(res.data);
                setTimeout(() => {
                    setLoaded(true);
                }, 1000);
            })
    }, []);

    const get_location = (data) => {
        props.setSeletedPharmacy(data);
        setSelectedLocation(data);
    }
    
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    // const handleOnLoad = (map) => {
    //     // const bounds = new google.maps.LatLngBounds();
    //     // markers.forEach(({ position }) => bounds.extend(position));
    //     // map.fitBounds(bounds);
    //     console.log(map);
    // };
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Pharmacy's in 1.5 km nearby you.</h4>
                        <span className="text-dark">
                            slected pharmacy <br />
                            name: {selectedLocation.user_name}  <br />
                            street: {selectedLocation?.street} <br />
                            contact: {selectedLocation?.contact_number} <br />
                        </span>
                    </div>
                    <div className="card-body">
                        {Loaded &&
                            <LoadScript
                                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}
                            >
                                <GoogleMap
                                    mapContainerStyle={{ height: '40vh', width: '100%' }}
                                    center={{
                                        lat: user.lat, lng: user.lng
                                    }}
                                    zoom={18}
                                >
                                    <Marker
                                        position={{ lat: user.lat, lng: user.lng }}
                                        // icon= {user.photoURL}
                                        icon={"/user_loc.png"}
                                        animation="BOUNCE"
                                        title={user.displayName}
                                    >
                                        <InfoWindow position={{ lat: user.lat, lng: user.lng }} anchor={{ lat: user.lat, lng: user.lng }}>
                                            <div style={{ backgroundImage: 'url("/user_loc.png")', height: 50, width: 50, backgroundSize: '100%', textAlign: 'center' }}>
                                                <img src={user.photoURL} style={{ width: 28, borderRadius: 25, background: 'transparent' }} alt="" />
                                            </div>
                                        </InfoWindow>

                                        <Circle
                                            // required
                                            center={{ lat: user.lat, lng: user.lng }}
                                            // required
                                            options={options}
                                        />
                                    </Marker>

                                    {locations.map(({ id, user_name, first_name, contact_number,photoURL, street, last_name, lat, lng }) => {
                                        // console.log(id, user_name, parseFloat(lat), parseFloat(lng));
                                        return (
                                            <Marker
                                                key={id}
                                                position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                                                // position={{ lat: 23.710121, lng: 90.434302 }}
                                                onClick={() => handleActiveMarker(id)}
                                                icon={"/pi_40.png"}
                                                title={user_name}

                                            >
                                                {activeMarker === id ? (
                                                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                                        <div>
                                                            <div className="product-box">
                                                                <div className="product-img text-center">
                                                                    <img style={{ width: '40px' }} src={photoURL} className="img-fluid" alt="" />
                                                                </div>
                                                                <div className="product-details">
                                                                    <h6>{user_name}</h6>
                                                                    <span>{contact_number}</span>
                                                                    <br />
                                                                    <span>{street}</span>
                                                                    <div className="product-price">
                                                                        {/* Visit : ${parseInt(Math.random() * 100)}.00 */}
                                                                    </div>
                                                                    <button type="button" onClick={() => get_location({ id, user_name, street, contact_number })} className="btn btn-info mt-4">select</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </InfoWindow>
                                                ) : null}
                                            </Marker>
                                        )
                                    }
                                    )}

                                </GoogleMap>
                            </LoadScript>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PharmacySearch
