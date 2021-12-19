import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormError from '../../Components/Shared/FormError';

function PlaceSchedule() {
    const [start_time, setStart_time] = useState(0);
    const [end_time, setEnd_time] = useState(0);
    const [totalMinute, setTotalMinute] = useState(0);
    const [todayDoctorSchedule, setTodayDoctorSchedule] = useState({})

    const [appoinmentDetails, setAppoinmentDetails] = useState({});
    const [appoinments, setAppoinment] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [slotMarkers, setSlotMarkers] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        getAppoinment();
    }, []);

    useEffect(() => {
        make_slot_markers();
    }, [appoinments]);

    const getAppoinment = () => {
        axios.get(`${process.env.REACT_APP_API_LINK}/appoinment/get-doctor-appoinment/${id}`)
            .then(res => {
                console.log(res.data);
                setAppoinmentDetails(res.data)
                LoadData(res.data?.date);
            })
    }

    const LoadData = (date) => {
        let params = {
            date: date,
        };

        axios.get(`${process.env.REACT_APP_API_LINK}/user/doctor-shedule-info-by-date?date=${date}`)
            .then(res => {
                console.log(res.data);
                let start_time = res.data?.time_diff_from_doctor_start_time?.converted_start_time;
                let end_time = res.data?.time_diff_from_doctor_start_time?.converted_end_time;
                let time_slots = res.data.time_diff_from_doctor_start_time.time_slots;
                setStart_time(start_time);
                setEnd_time(end_time);
                setTimeSlots(time_slots);
                setTotalMinute((parseInt(end_time) - parseInt(start_time)) * 60);
                setTodayDoctorSchedule(res.data?.time_diff_from_doctor_start_time);
            });

        axios.post(`${process.env.REACT_APP_API_LINK}/appoinment/doctor-all-appoinments-by-date`, params)
            .then(res => {
                console.log(res.data);
                setAppoinment(res.data);
            });
    }

    const time_slot_headings = () => {
        let slot_html = [];
        timeSlots?.map((item, index) => slot_html.push(<div className={`slot`} id={`slot_${item.replace(' ', '_').replace(':', '_')}`} key={index}>{item}</div>));
        return slot_html;
    }

    const patient_slots = () => {
        let patient_slot_html = [];
        appoinments.map(i => {
            return (
                (i.start_time && i.end_time) ?
                    patient_slot_html.push(<div key={Math.random()} className="single_patient">
                        {i?.consumer?.displayName} <br />
                        {(i.start_time && i.end_time) && i?.time_range}
                    </div>)
                    : 0
            );
        });
        return patient_slot_html;
    }

    const make_slot_markers = () => {
        let patient_slot_marker_html = [];
        appoinments?.map(i => {
            if (i.start_time && i.end_time) {
                let slot_info = document.getElementById('slot_' + i.time_slot.replace(' ', '_').replace(':', '_'));
                if (slot_info) {
                    let left = slot_info.offsetLeft;
                    let width = slot_info.clientWidth;
                    let marker_width = width * i.total_time / 60;
                    let rest_minute = width * (+ i.start_time?.split(':')[1]) / 60;
                    let total_time = i.total_time;

                    // console.log({ marker_width, width, time: i.total_time, range: i?.time_range, rest_minute, start_time: i.start_time });

                    return patient_slot_marker_html.push(
                        <div className="time_slot_block" key={Math.random()}>
                            <div title={i?.time_range} className="time_slot_marker" style={{ left: left + rest_minute, width: marker_width }}></div>
                        </div>
                    )
                }
            }
            return 0;
        });
        setSlotMarkers(patient_slot_marker_html);
    }

    const updateHandler = (e) => {
        e.preventDefault();
        let form_data = new FormData(e.target);
        form_data.append('id', id);
        form_data.append('date', appoinmentDetails.date);
        form_data.append('doctor_schedule_start', todayDoctorSchedule?.start_time);
        form_data.append('doctor_schedule_end', todayDoctorSchedule?.end_time);

        axios.post(`${process.env.REACT_APP_API_LINK}/appoinment/set-shedule-for-consumer`, form_data)
            .then(res => {
                console.log(res.data);
                getAppoinment();
                window.show_alert('shedule updated.', 'text-light', 4000);
            })
            .catch((error) => {
                let message = error?.response?.data?.err_message;
                window.show_alert(message || 'something is wrong try again..', 'text-warning', 4000);
            })
    }


    return (
        <div className="card">
            <div className="card-body">
                <div className="schedule_body">
                    <div className="left">
                        <h6>Patients</h6>
                        <div className="schedule_patient_body">
                            {patient_slots()}
                        </div>
                    </div>
                    <div className="right">
                        <h6 className="pb-1">Time slots of:  {appoinmentDetails?.formatted_date}</h6>
                        <h6 className="pt-1">{todayDoctorSchedule?.start_time} - {todayDoctorSchedule?.end_time}</h6>
                        <div className="time_slot_body">
                            {time_slot_headings()}
                        </div>
                        {
                            slotMarkers
                        }
                        {/* <div className="time_slot_block">
                            <div className="time_slot_marker"></div>
                        </div>*/}
                    </div>
                </div>
            </div>

            <div className="card-body">
                <h4>Time schedule for {appoinmentDetails?.consumer?.displayName}</h4>
                <form onSubmit={(e) => updateHandler(e)}>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-lg-2 col-form-label">Date</label>
                        <div className="col-lg-6">
                            <input type="date" defaultValue={appoinmentDetails.date} readOnly className="form-control" />
                            <FormError field_name="name"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-lg-2 col-form-label">Start Time</label>
                        <div className="col-lg-6">
                            <input type="time" name="start_time" defaultValue={appoinmentDetails.start_time} className="form-control" />
                            <FormError field_name="start_time"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-lg-2 col-form-label">End Time</label>
                        <div className="col-lg-6">
                            <input type="time" name="end_time" defaultValue={appoinmentDetails.end_time} className="form-control" />
                            <FormError field_name="end_time"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-lg-2 col-form-label">Appoinment Link</label>
                        <div className="col-lg-6">
                            <input type="text" name="appoinment_link" defaultValue={appoinmentDetails.appoinment_link} className="form-control" placeholder="google meet link" />
                            <a href="http://hangouts.google.com/start" target="_blank" className="badge badge-danger mt-1" rel="noopener noreferrer">click to generate link and copy url</a>
                            <FormError field_name="appoinment_link"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-lg-2 col-form-label"></label>
                        <div className="col-lg-6">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PlaceSchedule
