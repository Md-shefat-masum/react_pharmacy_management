import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TodayAppointments from './ScheduleCalender/TodayAppointments';

function Dashboard() {

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
                                    <span className="m-0">Total Patient</span>
                                    <h4 className="counter">23</h4>
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
                                    <span className="m-0">Today Patient</span>
                                    <h4 className="counter">34</h4>
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
                                    <span className="m-0">Appoinments</span>
                                    <h4 className="counter">893</h4>
                                    <i className="icon-comments icon-bg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-5">
                    <TodayAppointments></TodayAppointments>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;