import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UseAuth } from '../../../Hooks/UseAuth'
import { UseCommonData } from '../../../Hooks/UseCommonData'
import MedicineListForOrderModal from '../../Dispensary/Pages/Inventory/Components/MedicineListForOrderModal'
import Billing from '../Components/Billing/Billing'
import Payment from '../Components/Billing/Payment'
import Shipping from '../Components/Billing/Shipping'
import PharmacySearch from '../Components/Map/PharmacySearch'

function CreateOrder() {
    const { user } = UseAuth();
    const { control_modal, setModalContent } = UseCommonData();
    const [selectedMedicine, setSelectedMedicine] = useState([]);
    const [total, setTotal] = useState(0)

    const [BillingFormShow, setBillingFormShow] = useState('select_pharmacy')
    const [ShowPaymentModal, setShowPaymentModal] = useState(false)

    const [ShippingForm, setShippingForm] = useState(true)
    const [seletedPharmacy, setSeletedPharmacy] = useState({})
    const [billingAddress, setBillingAddress] = useState({})
    const [shippingAddress, setShippingAddress] = useState({})
    const [paymentInfo, setPaymentInfo] = useState({})

    const setQty = (item, e) => {
        let qty = parseInt(e.target.value);
        if (qty < 1 || !qty) {
            qty = 1;
        }
        let temp_cart = [...selectedMedicine];
        temp_cart.filter(product => product.id === item.id ? item.qty = qty : 1);
        setSelectedMedicine(temp_cart);
        // console.log(e.target);
    }

    useEffect(() => {
        let temp_user = {};
        for (const key in user) {
            if (Object.hasOwnProperty.call(user, key)) {
                const element = user[key];
                temp_user['billing_' + key] = element;
            }
        }
        setBillingAddress(temp_user);
    }, [])

    useEffect(() => {
        countTotal();
    }, [selectedMedicine])

    const countTotal = () => {
        let total = window.format_number(selectedMedicine.reduce((t, i) => t += (+i.unit_price * i.qty), 0));
        setTotal(total);
    }

    const modal_handler = (modal_content, header_text) => {
        const control_value = {
            trigger: true,
            header_text: header_text,
            size: 'xl',
        };
        setModalContent(modal_content);
        control_modal(control_value);
    }

    const remove = (index) => {
        let temp_list = [...selectedMedicine];
        temp_list.splice(index, 1);
        setSelectedMedicine(temp_list);
    }

    const submitOrder = () => {
        console.log('get', seletedPharmacy, billingAddress, shippingAddress, paymentInfo, ShippingForm);
        let data = {
            seletedPharmacy,
            billingAddress,
            shippingAddress,
            paymentInfo,
            ShippingForm
        };
        axios.post(`${process.env.REACT_APP_API_LINK}/order/create`, data)
            .then(res => {
                console.log(res.data);
                alert('order successfull');
                setShowPaymentModal(!ShowPaymentModal)
            })
            .catch(err => {
                console.log(err.response.data);
                setBillingFormShow(err.response.data?.err_for);
                window.show_alert(err.response?.data?.err_description, 'text-warning', 5000);
            })
    }


    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="card shadow-0 border-1 border">
                                <div className="card-header">
                                    <h4>Drug list</h4>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-bordered text-center table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Photo</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Unit price</th>
                                                <th scope="col">Total</th>
                                                <th scope="col" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedMedicine?.map((item, index) => {
                                                    return <tr key={item.id}>
                                                        <td>
                                                            <img src={item.full_photo_url} style={{ width: 40 }} alt={item.name} />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td style={{ width: 80 }}>
                                                            <input type="text"
                                                                value={item.qty}
                                                                onChange={(e) => setQty(item, e)}
                                                                className="form-control" />
                                                        </td>
                                                        <td style={{ width: 120 }}>$ {item.unit_price}</td>
                                                        <td style={{ width: 120 }} className="text-end">$ {window.format_number(+item.unit_price * item.qty)}</td>
                                                        <td>
                                                            <i onClick={() => remove(index)} className="fa btn btn-outline-info fa-trash"></i>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="10">
                                                    <button
                                                        onClick={() => modal_handler(<MedicineListForOrderModal key={Math.random()} Data={selectedMedicine} setData={setSelectedMedicine} />, 'Select Drugs')}
                                                        type="button" className="btn btn-primary">
                                                        <i className="fa fa-plus"></i> Add Drug
                                                    </button>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row justify-content-end">
                        <div className="col-md-6">
                            <div className="card shadow-0 border-1 border">
                                <div className="card-body table-responsive">
                                    <table className="table table-bordered text-center table-hover">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: 200 }}>Total</th>
                                                <td style={{ width: 3 }}>:</td>
                                                <th> $ {total} </th>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="3">
                                                    <div className="text-center w-100 pt-3">
                                                        <button className="btn btn-info"
                                                            data-bs-toggle="modal"
                                                            onClick={() => setShowPaymentModal(!ShowPaymentModal)}
                                                            data-bs-target="#staticBackdrop">
                                                            Proceed Order
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"modal fade " + (ShowPaymentModal ? 'show' : '')} id="staticBackdrop"
                    data-bs-backdrop="static" data-bs-keyboard="false"
                    tabIndex="-1" aria-labelledby="staticBackdropLabel"
                    style={{ display: ShowPaymentModal && 'block', backdropFilter: 'blur(3px)' }}
                    aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Checkout Form</h5>
                                <button type="button" className="btn-close" onClick={() => setShowPaymentModal(!ShowPaymentModal)} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="shipping_form" >
                                        <input type="radio" id="shipping_form" name="shipping_form" onClick={() => setShippingForm(true)} defaultChecked={ShippingForm ? true : false} />
                                        &nbsp; Shipping
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="shipping_form2">
                                        <input type="radio" id="shipping_form2" name="shipping_form" onClick={() => setShippingForm(false)} defaultChecked={!ShippingForm ? true : false} />
                                        &nbsp; Pickup
                                    </label>
                                </div>
                                <div className="d-flex flex-wrap">
                                    <button onClick={() => setBillingFormShow('select_pharmacy')} className={"btn btn-outline-success m-1 " + (BillingFormShow === 'select_pharmacy' ? 'active' : '')}>Select Pharmacy</button>
                                    {
                                        ShippingForm === true &&
                                        <button onClick={() => setBillingFormShow('billing')} className={"btn btn-outline-info m-1 " + (BillingFormShow === 'billing' ? 'active' : '')}>Billing</button>
                                    }
                                    {
                                        ShippingForm === true &&
                                        <button onClick={() => setBillingFormShow('shipping')} className={"btn btn-outline-secondary m-1 " + (BillingFormShow === 'shipping' ? 'active' : '')}>Shipping</button>
                                    }
                                    <button onClick={() => setBillingFormShow('payment')} className={"btn btn-outline-success m-1 " + (BillingFormShow === 'payment' ? 'active' : '')}>Payment</button>
                                </div>
                                <div>
                                    <div className="card-body">
                                        {
                                            (BillingFormShow === 'select_pharmacy') &&
                                            <PharmacySearch seletedPharmacy={seletedPharmacy} setSeletedPharmacy={setSeletedPharmacy}></PharmacySearch>
                                        }
                                        {
                                            (ShippingForm === true && BillingFormShow === 'billing') &&
                                            <Billing billingAddress={billingAddress} setBillingAddress={setBillingAddress}></Billing>
                                        }
                                        {
                                            (ShippingForm === true && BillingFormShow === 'shipping') &&
                                            <Shipping shippingAddress={shippingAddress} billingAddress={billingAddress} setShippingAddress={setShippingAddress}></Shipping>
                                        }
                                        {
                                            BillingFormShow === 'payment' || !ShippingForm ?
                                                <div>
                                                    <div className="text-center mb-4">
                                                        <img src="https://epaymaker.com/images/logo/1591645593.logo_F.png" style={{ width: 280, }} />
                                                    </div>
                                                    <Payment paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo}></Payment>
                                                </div>

                                                : ''
                                        }

                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => submitOrder()} className="btn btn-primary">Pay and Complete Order</button>
                                <button type="button" onClick={() => setShowPaymentModal(!ShowPaymentModal)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateOrder
