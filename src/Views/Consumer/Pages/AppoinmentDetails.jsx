import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function AppoinmentDetails() {
    let { id } = useParams();
    const [appoinment, setAppoinment] = useState({})
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/appoinment/get-user-appoinment/${id}`)
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
                        <img className="img-70 rounded-circle" alt="" src={appoinment?.doctor?.photoURL} />
                    </div>
                    <div className="col">
                        <h3 className="mb-1 ">{appoinment?.doctor?.displayName}</h3>
                        <p className="my-2 ">
                            {
                                appoinment?.doctor?.designation?.map(i => <span className="badge badge-info m-1" key={i.id}>{i.title}</span>)
                            }
                        </p>
                        <p className="my-2 ">
                            <b>Email: </b>{appoinment?.doctor?.email}
                        </p>
                        <p className="my-2 ">
                            <b>Contact: </b>{appoinment?.doctor?.contact_number}
                        </p>
                    </div>
                </div>

                <h6>Contact with assistance</h6>
                <table className="table table-bordered table-striped mt-4">
                    <tbody>
                        {
                            appoinment?.doctor?.doctor_assistance?.map(item => {
                                return <tr key={item.id}>
                                    <td style={{ width: 200, }}> {item.name} </td>
                                    <td style={{ width: 3, }}>:</td>
                                    <td>{item.mobile_number}, &nbsp; {item.telephone_number}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                
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
                            <td>{appoinment.formatted_start_time}</td>
                        </tr>
                        <tr>
                            <td>End Time</td>
                            <td>:</td>
                            <td>{appoinment.formatted_end_time}</td>
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
