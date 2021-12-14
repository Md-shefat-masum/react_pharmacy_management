import axios from 'axios';
import React, { useState, useEffect } from 'react'

function PlaceSchedule() {
    const [start_time, setStart_time] = useState(0);
    const [end_time, setEnd_time] = useState(0);
    const [patients, setPatients] = useState([]);
    const [totalMinute, setTotalMinute] = useState(0);
    const [appoinments, setAppoinment] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [slotMarkers, setSlotMarkers] = useState([]);

    useEffect(() => {
        LoadData('2021-12-05');
    }, []);

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
                console.log(parseInt(end_time) - parseInt(start_time));
            });

        axios.post(`${process.env.REACT_APP_API_LINK}/appoinment/doctor-all-appoinments-by-date`, params)
            .then(res => {
                console.log(res.data);
                setAppoinment(res.data);
            });
    }

    useEffect(() => {
        make_slot_markers();
        console.log(appoinments.length);
    }, [appoinments]);

    useEffect(() => {
        setPatients([
            { displayName: 'patient1', converted_start_time: 15.10, converted_end_time: 15.30 },
            { displayName: 'patient2', converted_start_time: 15.40, converted_end_time: 16.00 },
            { displayName: 'patient3', converted_start_time: 16.15, converted_end_time: 16.40 },
        ])
    }, []);

    const time_slot_headings = () => {
        let slot_html = [];
        timeSlots?.map((item, index) => slot_html.push(<div className={`slot`} id={`slot_${item.replace(' ', '_').replace(':', '_')}`} key={index}>{item}</div>));
        return slot_html;
    }

    const patient_slots = () => {
        let patient_slot_html = [];
        patients.map(i => {
            return patient_slot_html.push(<div key={Math.random()} className="single_patient">{i.displayName}</div>)
        });
        return patient_slot_html;
    }

    const make_slot_markers = () => {
        let patient_slot_marker_html = [];
        // let left = 0;
        appoinments?.map(i => {
            let left = document.getElementById('slot_' + i.time_slot.replace(' ', '_').replace(':', '_')).offsetLeft;
            let width = document.getElementById('slot_' + i.time_slot.replace(' ', '_').replace(':', '_')).clientWidth;
            let marker_width = width * i.total_time / 60;
            let rest_minute = width * ( + i.start_time.split(':')[1]) / 60;
            let total_time = i.total_time;

            console.log({ marker_width, width, time: i.total_time, range: i?.time_range, rest_minute, start_time: i.start_time });

            return patient_slot_marker_html.push(
                <div className="time_slot_block" key={Math.random()}>
                    <div title={i?.time_range} className="time_slot_marker" style={{ left: left+rest_minute, width: marker_width }}></div>
                </div>
            )
        });
        setSlotMarkers(patient_slot_marker_html);
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
                        <h6>Time slots</h6>
                        <div className="time_slot_body">
                            {time_slot_headings()}
                        </div>
                        {
                            slotMarkers
                        }
                        {/* <div className="time_slot_block">
                            <div className="time_slot_marker"></div>
                        </div>
                        <div className="time_slot_block">
                            <div className="time_slot_marker" style={{ left: "30%" }}></div>
                        </div>
                        <div className="time_slot_block">
                            <div className="time_slot_marker" style={{ left: "50%" }}></div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceSchedule
