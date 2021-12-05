import axios from 'axios';
import React from 'react'
import { UseCommonData } from '../../../Hooks/UseCommonData';
import FormError from '../../Components/Shared/FormError'

function AppoinmentForm({ doctor }) {
    console.log(doctor);
    const { control_modal } = UseCommonData();

    const submit_form = (e) => {
        e.preventDefault();
        let form_data = new FormData(e.target);
        form_data.append('doctor_id',doctor.id);
        axios.post(`${process.env.REACT_APP_API_LINK}/appoinment/store`,form_data)
            .then(res => {
                console.log(res.data);
                window.show_alert('appoinment created successfully','text-light',4000);
                const control_value = {
                    trigger: false,
                    header_text: '',
                    size: 'xl',
                };
                control_modal(control_value);
            })
            .catch(error=>{
                let message = error?.response?.data?.err_message;
                window.show_alert(message || 'something is wrong try again..', 'text-warning', 4000);
            })
    }
    
    return (
        <div className="row">
            <div className="col-12">
                <form action="" onSubmit={(e)=>submit_form(e)}>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">Doctor</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly defaultValue={`${doctor.user_name}, ${doctor.contact_number}, ${doctor.street}`} className="form-control" placeholder="Doctor" />
                            <FormError field_name="doctor_id"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">Date</label>
                        <div className="col-sm-9">
                            <input type="date" name="date" defaultValue={new Date().toISOString().split("T")[0]} className="form-control" placeholder="date" />
                            <FormError field_name="date"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">Time</label>
                        <div className="col-sm-9">
                            <input type="time" name="start_time" className="form-control" placeholder="start_time" />
                            <FormError field_name="start_time"></FormError>
                        </div>
                    </div>
                    <h5>Payment Info</h5>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">Card number</label>
                        <div className="col-sm-9">
                            <input type="card_number" name="card_number" className="form-control" placeholder="card_number" />
                            <FormError field_name="card_number"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">Month-Year</label>
                        <div className="col-sm-9">
                            <input type="month" name="month" className="form-control" placeholder="month" />
                            <FormError field_name="month"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">CVC</label>
                        <div className="col-sm-9">
                            <input type="cvc" name="cvc" className="form-control" placeholder="cvc" />
                            <FormError field_name="cvc"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">Payment Amount</label>
                        <div className="col-sm-9">
                            <input type="text" name="payment_amount" readOnly defaultValue={doctor?.doctor_info?.doctor_charge} className="form-control" placeholder="payment_amount" />
                            <FormError field_name="payment_amount"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label"></label>
                        <div className="col-sm-9">
                            <FormError field_name="payment_errors"></FormError>
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppoinmentForm
