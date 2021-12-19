import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-laravel-paginex'
import { Link } from 'react-router-dom';

function Prescriptions() {
    const [prescription, setPrescription] = useState({});
    useEffect(() => {
        LoadData({ page: 1 });
    }, [])

    const LoadData = (data) => {
        axios.get(`${process.env.REACT_APP_API_LINK}/prescription/get-doctor-prescriptions?page=${data.page}`)
            .then(res => {
                console.log(res.data);
                setPrescription(res.data);
            })
    }

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h4>Prescriptions</h4>
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: 150 }}>Date</th>
                                <th scope="col">Name</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                prescription?.data?.map(item => {
                                    return <tr key={item.id}>
                                        <td>
                                            {new Date(item.created_at).toDateString()}
                                            {new Date(item.created_at).toLocaleTimeString()}
                                        </td>
                                        <td> {item?.consumer?.user_name} </td>
                                        <td style={{ width: 250 }}>
                                            <div className="d-flex flex-wrap justify-content-end">
                                                <Link to={`/physician/edit-prescription/${item.consumer_id}/${item.id}`} className="btn m-2 btn-air-secondary">Edit</Link>
                                                <Link to={`/physician/prescription-details/${item.id}`} className="btn m-2 btn-air-secondary">Details</Link>
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
                        prescription?.data?.length > 0 &&
                        <Pagination changePage={LoadData} numbersCountForShow={6} data={prescription} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Prescriptions
