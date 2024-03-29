import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { UseCommonData } from '../../../Hooks/UseCommonData'
import DashCalender from '../Components/Calender/DashCalender'

export default function Dashboard() {
    const { dash_calender_date } = UseCommonData();
    const [appoinments, setAppoinments] = useState({})
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/appoinment/user-appoinments`)
            .then(res => {
                setAppoinments(res.data);
            })
    }, [])

    return (
        <section>
            <div className="row">
                <div className="col-12">
                    <h1>Dashboard</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6 col-xl-3 col-lg-6">
                    <div className="card o-hidden">
                        <div className="bg-info b-r-4 card-body">
                            <div className="d-flex static-top-widget">
                                <div className="align-self-center text-center">
                                    <i className="icon-money"></i>
                                </div>
                                <div>
                                    <span className="m-0">Purchased</span>
                                    <h4 className="counter">6659</h4>
                                    <i className="icofont icofont-chart-histogram-alt icon-bg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3 col-lg-6">
                    <div className="card o-hidden">
                        <div className="bg-primary b-r-4 card-body">
                            <div className="d-flex static-top-widget">
                                <div className="align-self-center text-center">
                                    <i className="icon-package"></i>
                                </div>
                                <div>
                                    <span className="m-0">Heart Rate</span>
                                    <h4 className="counter">12bpm</h4>
                                    <i className="icon-package icon-bg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3 col-lg-6">
                    <div className="card o-hidden">
                        <div className="bg-secondary b-r-4 card-body">
                            <div className="d-flex static-top-widget">
                                <div className="align-self-center text-center">
                                    <i className="icon-comments"></i>
                                </div>
                                <div>
                                    <span className="m-0">Body Temperature</span>
                                    <h4 className="counter">18 C</h4>
                                    <i className="icon-comments icon-bg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Todays Appoinment</h4>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center">
                            <div className="">
                                <div className="card-body">
                                    <DashCalender></DashCalender>
                                </div>
                            </div>
                            <div className="ps-5 pb-4">
                                <div className="cal-info text-center h-100 d-flex justify-content-center align-items-center flex-column">
                                    <h2>{dash_calender_date.date}</h2>
                                    <div className="d-inline-block mt-2">
                                        <span className="b-r-dark pe-3">{dash_calender_date.month_name}</span>
                                        <span className="ps-3">{dash_calender_date.year}</span>
                                    </div>
                                    <p className="mt-4 f-16 text-muted">
                                        There is no Appoinment Today
                                    </p>
                                    <button className="btn btn-info">
                                        Create Appoinment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Appoinments</h4>
                        </div>
                        <div className="card-body">
                            <div className="user-status table-responsive">
                                <table className="table table-bordernone">
                                    <thead>
                                        <tr>
                                            <th scope="col">Details</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            appoinments?.data?.map(item => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td> {item?.doctor?.user_name} </td>
                                                        <td className="digits">{new Date(item.date).toDateString()}</td>
                                                        <td className="font-secondary">{item.appoinment_status}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
