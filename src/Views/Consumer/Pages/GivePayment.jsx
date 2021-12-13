import React, { useState, useEffect } from 'react'
import Payment from '../Components/Billing/Payment'
import { useParams } from 'react-router';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function GivePayment() {
    let { id } = useParams();
    const [paymentInfo, setPaymentInfo] = useState({
        card_number: '',
        month: '',
        year: '',
        cvc: '',
    });
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/order/details/${id}`)
            .then(res => {
                console.log(res.data);
                setOrder(res.data)
            })
    }, [])

    const payment_handler = () => {
        let card_info = { ...paymentInfo };
        card_info.order_id = id;
        axios.post(`${process.env.REACT_APP_API_LINK}/order/customer-order-payment`, card_info)
            .then(res => {
                setErrorMessage('')
                console.log(res.data);
                if (res.data == 'success') {
                    navigate(`/consumer/invoice/${id}`);
                }
            })
            .catch(err => {
                let errm = err?.response?.data;
                console.log(errm);
                setErrorMessage(errm)
            })
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card">
                        <div className="card-body">


                            <form action="">
                                <div className="text-center mb-4">
                                    <img src="https://epaymaker.com/images/logo/1591645593.logo_F.png" style={{ width: 300 }} alt="" />
                                    <br />
                                    <br />

                                    <Link to={`/consumer/invoice/${id}`} className="btn btn-primary m-1">Show Order Details</Link>
                                </div>
                                {
                                    order.payment_status === 0 ?
                                        <div>
                                            <Payment setPaymentInfo={setPaymentInfo} paymentInfo={paymentInfo}></Payment>
                                            <div className="row justify-content-center">
                                                <div className="col-md-6">
                                                    <div className="mb-3 row">
                                                        <label className="col-sm-3 col-form-label">Amount</label>
                                                        <div className="col-sm-9">
                                                            <input defaultValue={order.order_total} readOnly type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-danger">{errorMessage}</p>
                                                <button type="button" onClick={() => payment_handler()} className="btn btn-info m-1">Submit</button>
                                            </div>
                                        </div>
                                        :

                                        <p className="text-center text-success">Payment has been paid</p>
                                }
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GivePayment
