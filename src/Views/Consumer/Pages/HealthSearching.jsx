import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { UseAuth } from '../../../Hooks/UseAuth'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UseCommonData } from '../../../Hooks/UseCommonData';
import AppoinmentForm from './AppoinmentForm';

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
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState({})
    const [specialities, setSpecialities] = useState([])
    const { user } = UseAuth();
    const { control_modal, setModalContent } = UseCommonData();

    useEffect(() => {
        user.lat = parseFloat(user.lat);
        user.lng = parseFloat(user.lng);
        get_loacations();
        get_specialist();
    }, [])

    const get_loacations = () => {
        axios.get(`${process.env.REACT_APP_API_LINK}/user/doctor-location`)
            .then(res => {
                setLocations(res.data);
                setTimeout(() => {
                    setLoaded(true);
                }, 1000);
            })
    }

    const get_specialist = () => {
        axios.get(`${process.env.REACT_APP_API_LINK}/user/doctor-speciality`)
            .then(res => {
                setSpecialities(res.data);
            })
    }

    const get_location = (data) => {
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
    const specialist_handler = (e) => {
        let id = e.target.value;
        axios.get(`${process.env.REACT_APP_API_LINK}/user/specialist-doctors/${id}`)
            .then(res => {
                setLocations(res.data.doctors);
            })
    }

    const modal_handler = (modal_content, header_text) => {
        const control_value = {
            trigger: true,
            header_text: header_text,
            size: 'xl',
        };
        setModalContent(modal_content);
        control_modal(control_value);
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Doctor's in 1.5 km nearby you.</h4>
                        <span className="text-dark">
                            slected Doctor <br />
                            name: {selectedLocation.user_name}  <br />
                            street: {selectedLocation?.street} <br />
                            contact: {selectedLocation?.contact_number} <br />
                        </span> <br />
                        {
                            selectedLocation?.user_name?.length > 0 &&
                            <button onClick={() => modal_handler(<AppoinmentForm doctor={selectedLocation}/>, 'Take Appoinment')} className="btn btn-primary">Take Appoinment</button>
                        }

                        <select onChange={(e) => specialist_handler(e)} className="form-control mt-4">
                            <option value="">select specialist</option>
                            {
                                specialities?.map(item => <option key={item.id} value={item.id}>{item.title}</option>)
                            }
                        </select>
                    </div>
                    <div className="card-body">
                        {Loaded &&
                            <LoadScript
                                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}
                            >
                                <GoogleMap
                                    mapContainerStyle={{ height: '55vh', width: '100%' }}
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

                                    {locations?.map((item) => {
                                        // console.log(id, user_name, designation, doctor_info, parseFloat(lat), parseFloat(lng));
                                        const { id, user_name, doctor_info, first_name, designation,
                                            contact_number, street, photoURL, last_name, lat, lng } = item;
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
                                                                    <h6>Fee: $ {doctor_info?.doctor_charge}</h6>
                                                                    <span>{designation?.map(d => d.title + ", ")}</span>
                                                                    <br />
                                                                    <span>{contact_number}</span>
                                                                    <br />
                                                                    <span>{street}</span>

                                                                    <br />
                                                                    <br />
                                                                    <span>
                                                                        <b>Shcedules:</b> <br /><br />
                                                                        {
                                                                            doctor_info?.schedule &&
                                                                            JSON.parse(doctor_info?.schedule)?.map((sch, index) => {
                                                                                return <span key={index}>
                                                                                    {sch?.day}: &nbsp;
                                                                                    {new Date(`7/10/2013 ${sch?.start_time}:00`).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}&nbsp; To &nbsp;
                                                                                    {new Date(`7/10/2013 ${sch?.end_time}:00`).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")} <br />
                                                                                </span>
                                                                            })
                                                                        }
                                                                    </span>

                                                                    <div className="product-price">
                                                                        {/* Visit : ${parseInt(Math.random() * 100)}.00 */}
                                                                    </div>
                                                                    <button type="button" onClick={() => get_location({ id, user_name, street, contact_number, doctor_info })} className="btn btn-info mt-4">select</button>
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

export default HealthSearching
