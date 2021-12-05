import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { UseCommonData } from '../../../Hooks/UseCommonData';
import FormError from '../../Components/Shared/FormError';
import PharmacySearch from '../Components/Map/PharmacySearch'

function UploadPrescirption() {
    const { control_modal, setModalContent } = UseCommonData();
    const [seletedPharmacy, setSeletedPharmacy] = useState({id:'',street:'',contact_number:'',user_name:''})

    useEffect(() => {
        console.log(seletedPharmacy);
    }, [seletedPharmacy])

    const modal_handler = (modal_content, header_text) => {
        const control_value = {
            trigger: true,
            header_text: header_text,
            size: 'xl',
        };
        setModalContent(modal_content);
        control_modal(control_value);
    }

    const form_submit = (e) => {
        e.preventDefault();
        let form_data = new FormData(e.target);
        form_data.append('pharmacy_id',seletedPharmacy.id);
        axios.post(`${process.env.REACT_APP_API_LINK}/order/create-prescription-order`,form_data)
            .then(res => {
                console.log(res.data);
                e.target.reset();
                setSeletedPharmacy({id:'',street:'',contact_number:'',user_name:''});
                window.show_alert('prescription uploaded successfully', 'text-light', 4000);
            })
            .catch(error=>{
                let message = error?.response?.data?.err_message;
                window.show_alert(message || 'something is wrong try again..', 'text-warning', 4000);
            })
    }
    

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={(e)=>form_submit(e)} encType="multipart/formdata">
                    <h4 className="text-center">Upload Prescription</h4>
                    <br />
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">Select Pharmacy</label>
                        <div className="col-sm-9">
                            <input type="text"
                                value={`${seletedPharmacy?.user_name}, ${seletedPharmacy?.street}, ${seletedPharmacy?.contact_number} `}
                                onClick={() => modal_handler(<PharmacySearch seletedPharmacy={seletedPharmacy}
                                    setSeletedPharmacy={setSeletedPharmacy} />, 'search modal')}
                                readOnly className="form-control" placeholder="select pharmacy" />
                            <FormError field_name="pharmacy_id"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">Doctor name</label>
                        <div className="col-sm-9">
                            <input type="text" name="doctor_name" className="form-control" placeholder="Doctor Name" />
                            <FormError field_name="doctor_name"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label">Prescription File</label>
                        <div className="col-sm-9">
                            <input type="file" name="files" className="form-control" placeholder="image" />
                            <FormError field_name="files"></FormError>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="col-sm-3 col-form-label"></label>
                        <div className="col-sm-9">
                            <button className="btn btn-info">Upload</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadPrescirption
