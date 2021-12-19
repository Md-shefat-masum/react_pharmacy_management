import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FormError from '../../Components/Shared/FormError';

function EditPrescription() {
    let { id } = useParams();
    let { prescription } = useParams();
    const [consumer, setConsumer] = useState({});
    const [doctor, setDoctor] = useState({});
    const [appoinment, setAppoinment] = useState({});

    const [prescribeMedicine, setPrescribeMedicine] = useState([]);
    const [invetigations, setInvetigations] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        console.log(id);
        // pres_increment();
        // invetigation_increment();

        axios.get(`${process.env.REACT_APP_API_LINK}/appoinment/get-doctor-appoinment/${id}`)
            .then(res => {
                console.log(res.data);
                setAppoinment(res.data)
                setConsumer(res.data?.consumer);
                setDoctor(res.data?.doctor);
            })

        axios.get(`${process.env.REACT_APP_API_LINK}/prescription/get-doctor-prescription/${prescription}`)
            .then(res => {
                console.log(res.data);
                setDescription(res.data?.additional_message)
                setPrescribeMedicine(res.data?.medicines)
                setInvetigations(res.data?.investigations)
                // setPrescription(res.data);
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
            description: '',
            days: '',
            morning: false,
            afternoon: false,
            evening: false,
            night: false,
            before_eat: false,
            after_eat: false,
            empty_stomach: false,
        };
        load_prescription(demo);
    }

    const invetigation_increment = () => {
        let demo = {
            name: '',
            description: '',
        };
        load_investigation(demo);
    }

    const remove = (index) => {
        let temp = [...prescribeMedicine];
        temp.splice(index, 1);
        setPrescribeMedicine(temp);
    }

    const remove_investigation = (index) => {
        console.log(index);
        let temp = [...invetigations];
        temp.splice(index, 1);
        setInvetigations(temp);
    }

    const reset_all = (con = false) => {
        if (!con) {
            con = window.confirm('sure');
        }
        if (con) {
            setPrescribeMedicine([]);
            setInvetigations([]);
        }
    }

    const set_state_data = (state, set_state, index, key, value) => {
        let temp = [...state];
        temp[index][key] = value;
        set_state(temp);
    }

    const store_prescription = (e) => {
        e.preventDefault();

        let form_data = {
            prescribeMedicine,
            invetigations,
            appoinment,
            description,
            prescription_id: prescription,
        }
        axios.post(`${process.env.REACT_APP_API_LINK}/prescription/update`, form_data)
            .then(res => {
                console.log(res.data);
                window.show_alert('Prescription Updated.', 'text-light', 4000);
                // reset_all(true);
            })
            .catch((error) => {
                let message = error?.response?.data?.err_message;
                window.show_alert(message || 'something is wrong try again..', 'text-warning', 4000);
            })
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h4>Edit prescription for {consumer.displayName}</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => { store_prescription(e) }}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="biller-info">
                                    <h4 className="d-block">Dr. {doctor?.displayName}</h4>
                                    <span className="d-block text-sm text-muted">
                                        {
                                            doctor?.designation?.map(i => <span key={i.id} className="badge badge-primary m-1">{i.title}</span>)
                                        }
                                    </span>
                                    <span className="d-block text-sm text-muted">
                                        {doctor?.street}, &nbsp;
                                        {doctor?.city}, &nbsp;
                                        {doctor?.country}
                                    </span>
                                </div>
                            </div>
                            <div className="col-sm-6 text-sm-end">
                                <div className="billing-info">
                                    <h4 className="d-block">{new Date().toDateString()}</h4>
                                    {/* <span className="d-block text-muted">#INV0001</span> */}
                                </div>
                            </div>
                        </div>

                        <div className="card card-table shadow-0 border-1 border mt-2">
                            <div className="card-body">
                                <h5>Medicines</h5>
                                <div className="add-more-item text-end">
                                    <button onClick={() => pres_increment()} type="button" className="btn btn-sm btn-pill btn-dark mb-2">
                                        <i className="fa fa-plus-circle"></i> Add Item
                                    </button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-center">
                                        <thead>
                                            <tr>
                                                <th style={{ minWidth: "200px" }}>Name</th>
                                                <th className="text-center" style={{ minWidth: "40px" }}>Days</th>
                                                <th className="text-center" style={{ minWidth: "100px" }}>Time</th>
                                                <th className="text-center" style={{ minWidth: "80px" }}>Description</th>
                                                <th className="text-end" style={{ minWidth: "80px" }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                prescribeMedicine?.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td>
                                                            <input
                                                                value={item.name}
                                                                required
                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'name', e.target.value)}
                                                                className="form-control" type="text" />
                                                        </td>
                                                        <td>
                                                            <input
                                                                value={item.days}
                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'days', e.target.value)}
                                                                className="form-control" type="text" />
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-check-inline">
                                                                <label className="form-check-label">
                                                                    <input
                                                                        value={item.morning}
                                                                        onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'morning', e.target.checked)}
                                                                        className="form-check-input" type="checkbox" /> Morning
                                                                </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <label className="form-check-label">
                                                                    <input
                                                                        value={item.afternoon}
                                                                        onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'afternoon', e.target.checked)}
                                                                        className="form-check-input" type="checkbox" /> Afternoon
                                                                </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <label className="form-check-label">
                                                                    {
                                                                        item.evening ?
                                                                            <input
                                                                                value={item.evening} defaultChecked
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'evening', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                            :
                                                                            <input
                                                                                value={item.evening}
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'evening', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                    }
                                                                    Evening
                                                                </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <label className="form-check-label">
                                                                    {
                                                                        item.night ?
                                                                            <input
                                                                                value={item.night} defaultChecked="true"
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'night', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                            :
                                                                            <input
                                                                                value={item.night}
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'night', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                    }
                                                                    Night
                                                                </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <label className="form-check-label">
                                                                    {
                                                                        item.before_eat ?
                                                                            <input
                                                                                value={item.before_eat} defaultChecked="true"
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'before_eat', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                            :
                                                                            <input
                                                                                value={item.before_eat}
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'before_eat', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                    }
                                                                    Before eat
                                                                </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <label className="form-check-label">
                                                                    {
                                                                        item.after_eat ?
                                                                            <input
                                                                                value={item.after_eat} defaultChecked="true"
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'after_eat', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                            :
                                                                            <input
                                                                                value={item.after_eat}
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'after_eat', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                    }
                                                                    After eat
                                                                </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <label className="form-check-label">
                                                                    {
                                                                        item.empty_stomach ?
                                                                            <input
                                                                                value={item.empty_stomach} defaultChecked="true"
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'empty_stomach', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                            :
                                                                            <input
                                                                                value={item.empty_stomach}
                                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'empty_stomach', e.target.checked)}
                                                                                className="form-check-input" type="checkbox" />
                                                                    }
                                                                    Empty stomach
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input
                                                                value={item.description}
                                                                onChange={(e) => set_state_data(prescribeMedicine, setPrescribeMedicine, index, 'description', e.target.value)}
                                                                className="form-control" type="text" />
                                                        </td>
                                                        <td className="text-end">
                                                            {
                                                                prescribeMedicine.length > 0 &&
                                                                <button onClick={(index) => remove(index)} className="btn btn-outline-danger trash">
                                                                    <i className="icon icon-trash"></i>
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
                                <div className="card card-table shadow-0 border-1 border mt-2">
                                    <div className="card-body">

                                        <h5>Investigations</h5>
                                        <div className="add-more-item text-end">
                                            <button onClick={() => invetigation_increment()} type="button" className="btn btn-sm btn-pill btn-dark mb-2">
                                                <i className="fa fa-plus-circle"></i> Add Item
                                            </button>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-center">
                                                <thead>
                                                    <tr>
                                                        <th style={{ minWidth: "100px" }}>Name</th>
                                                        <th className="text-center" style={{ minWidth: "100px" }}>Description</th>
                                                        <th style={{ minWidth: "80px" }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        invetigations?.map((item, index) => {
                                                            return <tr key={index}>
                                                                <td>
                                                                    <input
                                                                        value={item.name}
                                                                        required
                                                                        onChange={(e) => set_state_data(invetigations, setInvetigations, index, 'name', e.target.value)}
                                                                        className="form-control" type="text" />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        value={item.description}
                                                                        onChange={(e) => set_state_data(invetigations, setInvetigations, index, 'description', e.target.value)}
                                                                        className="form-control" type="text" />
                                                                </td>
                                                                <td className="text-end">
                                                                    {
                                                                        invetigations.length > 0 &&
                                                                        <button onClick={() => remove_investigation(index)} className="btn btn-outline-danger trash">
                                                                            <i className="icon icon-trash"></i>
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
                                <div className="card card-table shadow-0 border-1 border mt-2">
                                    <div className="card-body">
                                        <h5>Addional Message</h5>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={description}
                                            // onReady={editor => {
                                            //     // You can store the "editor" and use when it is needed.
                                            //     console.log('Editor is ready to use!', editor);
                                            // }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data);
                                                // console.log({ event, editor, data });
                                            }}
                                        // onBlur={(event, editor) => {
                                        //     console.log('Blur.', editor);
                                        // }}
                                        // onFocus={(event, editor) => {
                                        //     console.log('Focus.', editor);
                                        // }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <FormError field_name="prescribeMedicine"></FormError>
                                <div className="submit-section">
                                    <button type="submit" className="btn btn-primary submit-btn m-1">Update</button>
                                    <button type="reset" onClick={() => { reset_all() }} className="btn btn-secondary submit-btn m-1">Clear</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPrescription
