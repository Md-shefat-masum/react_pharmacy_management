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
                console.log(res.data);
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
        console.log(marker);
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const mark_on_map = (data) => {
        if (data.id === activeMarker) {
            return;
        }
        setActiveMarker(data.id);
    }
    
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
                            <button onClick={() => modal_handler(<AppoinmentForm doctor={selectedLocation} />, 'Take Appoinment')} className="btn btn-primary">Take Appoinment</button>
                        }
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <h6>Doctor's List</h6>
                                <div class="customer-review vertical-scroll" style={{ height: '60vh', width: '100%', overflowY:'scroll' }}>
                                    {
                                        locations?.map(loc => {
                                            const { id, user_name, doctor_info, contact_number, street } = loc;
                                            return <div class="d-flex mt-4" key={loc.id}>
                                                <img class="align-self-start rounded-circle img-90" alt="Universal-review" src={loc.photoURL} />
                                                <div>
                                                    <label class="cust-name">{loc.displayName}</label>
                                                    <label class="cust-des d-block">
                                                        {loc.designation?.map(d => <span key={d.id} className="m-1 badge badge-primary">{d.title}</span>)}
                                                    </label>
                                                    <p className="mb-1"> <b>Fee: </b> ${loc?.doctor_info?.doctor_charge} </p>
                                                    <p className="mb-1"> <b>Address: </b> {loc?.street} </p>
                                                    <p className="mb-1"> <b>Contact: </b> {loc?.contact_number} </p>
                                                    <button type="button" onClick={() => get_location({ id, user_name, street, contact_number, doctor_info })} className="btn btn-sm btn-info m-1">select</button>
                                                    <button type="button" onClick={() => mark_on_map(loc)} className="btn btn-sm btn-primary m-1">Mark on map</button>
                                                </div>
                                                <hr />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h6>Doctor's in map</h6>
                                <select onChange={(e) => specialist_handler(e)} className="form-control my-3">
                                    <option value="">select specialist</option>
                                    {
                                        specialities?.map(item => <option key={item.id} value={item.id}>{item.title}</option>)
                                    }
                                </select>
                                {Loaded &&
                                    <LoadScript
                                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}
                                    >
                                        <GoogleMap
                                            mapContainerStyle={{ height: '55vh', width: '100%' }}
                                            center={{
                                                lat: user.lat, lng: user.lng
                                            }}
                                            zoom={15}
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
                                                        icon={"/docicon.png"}
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
            </div>
        </div>
    )
}

export default HealthSearching
