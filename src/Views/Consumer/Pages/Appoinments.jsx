import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Pagination } from 'react-laravel-paginex'
import { Link } from 'react-router-dom'

function Appoinments() {

    const [appoinments, setAppoinment] = useState({})
    useEffect(() => {
        LoadData({ page: 1 });
    }, [])

    const LoadData = (data) => {
        axios.get(`${process.env.REACT_APP_API_LINK}/appoinment/user-appoinments?page=${data.page}`)
            .then(res => {
                setAppoinment(res.data);
            })
    }

    return (
        <div className="card">
            <div className="card-header">
                <h4>Appoinments</h4>
            </div>
            <div className="card-body table-responsive">
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">Doctor</th>
                            <th scope="col">Date</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Status</th>
                            <th scope="col" className="text-end pe-5">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appoinments?.data?.map(item => {
                                return <tr key={item.id}>
                                    <td>
                                        {item?.doctor?.user_name}
                                    </td>
                                    <td className="digits">
                                        {item.date}
                                    </td>
                                    <td className="digits">
                                        {item.start_time}
                                    </td>
                                    <td className="digits">
                                        {item.end_time}
                                    </td>
                                    <td>
                                        {item.appoinment_status ==='approved' ? <span className="badge badge-success bg-success">approved</span> : <span className="badge badge-danger bg-danger">pending</span>}
                                    </td>
                                    <td style={{ width: 250 }}>
                                        <div className="d-flex flex-wrap justify-content-end">
                                            <Link to={`/consumer/appoinment/${item.id}`} className="btn m-1 btn-air-secondary">Details</Link>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                {
                    appoinments?.data?.length > 0 &&
                    <Pagination changePage={LoadData} numbersCountForShow={6} data={appoinments} />
                }
            </div>
        </div>
    )
}

export default Appoinments
