import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function CreatePrescription() {
    let { id } = useParams();
    const [consumer, setConsumer] = useState({});
    const [doctor, setDoctor] = useState({});
    const [appoinment, setAppoinment] = useState({});

    const [prescribeMedicine, setPrescribeMedicine] = useState([]);
    const [invetigations, setInvetigations] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        // console.log(description);
    }, [description]);

    useEffect(() => {
        console.log(id);
        pres_increment();
        invetigation_increment();

        axios.get(`${process.env.REACT_APP_API_LINK}/appoinment/get-doctor-appoinment/${id}`)
            .then(res => {
                console.log(res.data);
                setAppoinment(res.data)
                setConsumer(res.data?.consumer);
                setDoctor(res.data?.doctor);
            })
    }, []);

    const load_prescription = (data) => {
        let temp = [...prescribeMedicine];
        temp.push(data);
        setPrescribeMedicine(temp);
    }

    const load_investigation = (data) => {
        let temp = [...invetigations];
        temp.push(data);
        setInvetigations(temp);
    }

    const pres_increment = () => {
        let demo = {
            name: '',
            quantity: '',
            days: '',
            morning: '',
            afternoon: '',
            evening: '',
            night: '',
        };
        load_prescription(demo);
    }

    const invetigation_increment = () => {
        let demo = {
            name: '',
        };
        load_investigation(demo);
    }

    const remove = (index) => {
        let temp = [...prescribeMedicine];
        temp.splice(index, 1);
        setPrescribeMedicine(temp);
    }

    const remove_investigation = (index) => {
        let temp = [...invetigations];
        temp.splice(index, 1);
        setInvetigations(temp);
    }

    

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h4>Create prescription for {consumer.displayName}</h4>
                </div>
                <div class="card-body">

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="biller-info">
                                <h4 class="d-block">Dr. {doctor?.displayName}</h4>
                                <span class="d-block text-sm text-muted">
                                    {
                                        doctor?.designation?.map(i => <span key={i.id} className="badge badge-primary m-1">{i.title}</span>)
                                    }
                                </span>
                                <span class="d-block text-sm text-muted">
                                    {doctor?.street}, &nbsp;
                                    {doctor?.city}, &nbsp;
                                    {doctor?.country}
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-6 text-sm-end">
                            <div class="billing-info">
                                <h4 class="d-block">{new Date().toDateString()}</h4>
                                {/* <span class="d-block text-muted">#INV0001</span> */}
                            </div>
                        </div>
                    </div>

                    <div class="card card-table shadow-0 border-1 border mt-2">
                        <div class="card-body">
                            <h5>Medicines</h5>
                            <div class="add-more-item text-end">
                                <button onClick={() => pres_increment()} className="btn btn-sm btn-pill btn-dark mb-2">
                                    <i class="fa fa-plus-circle"></i> Add Item
                                </button>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover table-center">
                                    <thead>
                                        <tr>
                                            <th style={{ minWidth: "200px" }}>Name</th>
                                            <th style={{ minWidth: "80px" }}>Quantity</th>
                                            <th style={{ minWidth: "80px" }}>Days</th>
                                            <th style={{ minWidth: "100px" }}>Time</th>
                                            <th style={{ minWidth: "80px" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            prescribeMedicine?.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <input class="form-control" type="text" />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" type="text" />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" type="text" />
                                                    </td>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" /> Morning
                                                            </label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" /> Afternoon
                                                            </label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" /> Evening
                                                            </label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" /> Night
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="text-end">
                                                        {
                                                            prescribeMedicine.length > 1 &&
                                                            <button onClick={(index) => remove(index)} class="btn btn-outline-danger trash">
                                                                <i class="icon icon-trash"></i>
                                                            </button>
                                                        }
                                                    </td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div class="card card-table shadow-0 border-1 border mt-2">
                                <div class="card-body">

                                    <h5>Investigations</h5>
                                    <div class="add-more-item text-end">
                                        <button onClick={() => invetigation_increment()} className="btn btn-sm btn-pill btn-dark mb-2">
                                            <i class="fa fa-plus-circle"></i> Add Item
                                        </button>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-hover table-center">
                                            <thead>
                                                <tr>
                                                    <th style={{ minWidth: "200px" }}>Name</th>
                                                    <th style={{ minWidth: "80px" }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    invetigations?.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>
                                                                <input class="form-control" type="text" />
                                                            </td>
                                                            <td className="text-end">
                                                                {
                                                                    invetigations.length > 1 &&
                                                                    <button onClick={(index) => remove_investigation(index)} class="btn btn-outline-danger trash">
                                                                        <i class="icon icon-trash"></i>
                                                                    </button>
                                                                }
                                                            </td>
                                                        </tr>
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div class="card card-table shadow-0 border-1 border mt-2">
                                <div class="card-body">
                                    <h5>Addional Message</h5>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 text-right">
                            <div class="signature-wrap">
                                <div class="signature">
                                    Click here to sign
                                </div>
                                <div class="sign-name">
                                    <p class="mb-0">( Dr. Darren Elder )</p>
                                    <span class="text-muted">Signature</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="submit-section">
                                <button type="submit" class="btn btn-primary submit-btn m-1">Save</button>
                                <button type="reset" onClick={() => { setPrescribeMedicine([]); setInvetigations([]) }} class="btn btn-secondary submit-btn m-1">Clear</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreatePrescription
