import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { UseAuth } from '../../../Hooks/UseAuth'
import { Link } from 'react-router-dom';

const markers = [
    {
        id: 1,
        name: "Dr.Shirin",
        position: { lat: 23.710121, lng: 90.434302 },
        location: "Jatrabari",
    },
    {
        id: 2,
        name: "Dr.Jabbar",
        position: { lat: 23.712046, lng: 90.429584 },
        location: 'Dhania'
    },
    {
        id: 3,
        name: "Dr.Sheikh",
        position: { lat: 23.707842, lng: 90.439409 },
        location: 'Dolaipar'
    },
    {
        id: 4,
        name: "Dr.Shamsu",
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

function HealthSearching() {
    const [Loaded, setLoaded] = useState(false)
    const { user } = UseAuth();
    useEffect(() => {
        setLoaded(true);
    }, [])
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        // const bounds = new google.maps.LatLngBounds();
        // markers.forEach(({ position }) => bounds.extend(position));
        // map.fitBounds(bounds);
        console.log(map);
    };
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Doctor's in 1.5 km nearby you.</h4>
                    </div>
                    <div className="card-body">
                        {Loaded &&
                            <LoadScript
                                googleMapsApiKey="AIzaSyCXfyI7osFNUJSHyOUZU6nTK8hUSe4Z0mY"
                            >
                                <GoogleMap
                                    mapContainerStyle={{ height: '60vh', width: '100%' }}
                                    center={{
                                        lat: 23.708981, lng: 90.436921
                                    }}
                                    zoom={18}
                                >
                                    <Marker
                                        position={{ lat: 23.708981, lng: 90.436921 }}
                                        // icon= {user.photoURL}
                                        // icon = {"/marker.png"}
                                        animation="BOUNCE"
                                        title={user.displayName}
                                    >
                                        <InfoWindow position={{ lat: 23.708981, lng: 90.436921 }} anchor={{ lat: 23.708981, lng: 90.436921 }}>
                                            <img src={user.photoURL} style={{ width: 40, borderRadius: 25 }} alt="" />
                                        </InfoWindow>

                                        <Circle
                                            // required
                                            center={{ lat: 23.708981, lng: 90.436921 }}
                                            // required
                                            options={options}
                                        />
                                    </Marker>

                                    {markers.map(({ id, name, position }) => (
                                        <Marker
                                            key={id}
                                            position={position}
                                            onClick={() => handleActiveMarker(id)}
                                            icon={"/marker2.png"}
                                            title={name}

                                        >
                                            {activeMarker === id ? (
                                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                                    <div>
                                                        <div className="product-box">
                                                            <div className="product-img text-center">
                                                                <img style={{ width: '120px' }} src="https://phpscriptpoint.com/cc/yourdoctor/assets/uploads/doctor-7.jpg" className="img-fluid" alt="" />
                                                            </div>
                                                            <div className="product-details">
                                                                <h6>{name}</h6>
                                                                <span>Cardiolist</span>
                                                                <div className="product-price">
                                                                    Visit : ${parseInt(Math.random() * 100)}.00
                                                                </div>
                                                                <Link to="/consumer/create-appoinment" className="btn btn-info mt-4">Take Appoinment</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </InfoWindow>
                                            ) : null}
                                        </Marker>
                                    ))}

                                </GoogleMap>
                                {/* <GoogleMap
                            onLoad={handleOnLoad}
                            onClick={() => setActiveMarker(null)}
                            mapContainerStyle={{ width: "100vw", height: "100vh" }}
                        >
                            {markers.map(({ id, name, position }) => (
                                <Marker
                                    key={id}
                                    position={position}
                                    onClick={() => handleActiveMarker(id)}
                                >
                                    {activeMarker === id ? (
                                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                            <div>
                                                {name}
                                            </div>
                                        </InfoWindow>
                                    ) : null}
                                </Marker>
                            ))}
                        </GoogleMap> */}
                            </LoadScript>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthSearching
