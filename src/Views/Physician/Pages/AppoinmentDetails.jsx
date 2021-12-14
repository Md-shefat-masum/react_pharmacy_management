import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

function AppoinmentDetails() {
    let { id } = useParams();
    const [appoinment, setAppoinment] = useState({})
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/appoinment/get-doctor-appoinment/${id}`)
            .then(res => {
                console.log(res.data);
                setAppoinment(res.data)
            })
    }, [])

    return (
        <div className="card">
            <div className="card-header">
                <h4>Appoinment Details</h4>
            </div>
            <div className="card-body">
                <div className="row mb-2">
                    <div className="col-auto">
                        <img className="img-70 rounded-circle" alt="" src={appoinment?.consumer?.photoURL} />
                    </div>
                    <div className="col">
                        <h3 className="mb-1 ">{appoinment?.consumer?.displayName}</h3>
                        
                        <p className="my-2 ">
                            <b>Email: </b>{appoinment?.consumer?.email}
                        </p>
                        <p className="my-2 ">
                            <b>Contact: </b>{appoinment?.consumer?.contact_number}
                        </p>
                    </div>
                    <div className="col-12 my-3">
                        <Link to={"/physician/place-schedule/"+id} className="btn btn-sm btn-success">Place schedule</Link>
                    </div>
                </div>
                
                <h6 className="mt-4">Appoinment info</h6>
                <table className="table table-bordered table-striped mt-2">
                    <tbody>

                        <tr>
                            <td style={{ width: 200, }}>Appoinment Date</td>
                            <td style={{ width: 3, }}>:</td>
                            <td>{appoinment.date}</td>
                        </tr>
                        <tr>
                            <td>Start Time</td>
                            <td>:</td>
                            <td>{appoinment.start_time}</td>
                        </tr>
                        <tr>
                            <td>End Time</td>
                            <td>:</td>
                            <td>{appoinment.end_time}</td>
                        </tr>
                        <tr>
                            <td>Transaction id</td>
                            <td>:</td>
                            <td>
                                <span className="badge badge-secondary">
                                    {appoinment.transaction_id}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Appoinment Status</td>
                            <td>:</td>
                            <td>
                                <span className="badge badge-primary">
                                    {appoinment.appoinment_status}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Appoinment Meeting Link</td>
                            <td>:</td>
                            <td>
                                <span className="badge badge-primary">
                                    {
                                        (appoinment?.appoinment_status !== 'pending' &&
                                            appoinment?.appoinment_link?.length > 0)
                                            ?

                                            <a href={appoinment.appoinment_link} className="btn btn-warning">Click here and start meeting</a>

                                            :
                                            'not generated yet'
                                    }
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppoinmentDetails
