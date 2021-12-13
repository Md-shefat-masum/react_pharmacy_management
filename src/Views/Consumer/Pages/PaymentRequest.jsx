import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Pagination } from 'react-laravel-paginex'
import { Link } from 'react-router-dom'

function PaymentRequest() {
    const [orders, setOrders] = useState({})
    useEffect(() => {
        LoadData({ page: 1 });
    }, [])

    const LoadData = (data) => {
        axios.get(`${process.env.REACT_APP_API_LINK}/order/customer-orders?page=${data.page}&payment_status=0`)
            .then(res => {
                setOrders(res.data);
            })
    }

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h4>Payment Requests</h4>
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Date</th>
                                <th scope="col">Payment Status</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">Amount</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.data?.map(item => {
                                    return <tr key={item.id}>
                                        <td>
                                            #GG-{item.order_no}
                                        </td>
                                        <td className="digits">
                                            {item.formatted_date}
                                        </td>
                                        <td className="font-danger text-center">
                                            {item.payment_status?<span class="badge badge-success bg-success">paid</span>:<span class="badge badge-danger bg-danger">pending</span>}
                                        </td>
                                        <td className="font-secondary">
                                            {item.order_status}
                                        </td>
                                        <td className="font-info">
                                            $ {item.order_total}
                                        </td>
                                        <td style={{ width: 351 }}>
                                            <div className="d-flex flex-wrap justify-content-end">
                                                <Link to={`/consumer/invoice/${item.id}`} className="btn m-2 btn-air-secondary">Details</Link>
                                                <Link to={`/consumer/payment/${item.id}`} className="btn m-2 btn-air-success">Pay</Link>
                                                <a href="#/" className="btn m-2 btn-air-danger">Cancel</a>
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
                        orders?.data?.length > 0 &&
                        <Pagination changePage={LoadData} numbersCountForShow={6} data={orders} />
                    }
                </div>
            </div>
        </div>
    )
}

export default PaymentRequest
