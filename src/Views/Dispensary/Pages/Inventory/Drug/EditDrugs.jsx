import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { UseAuth } from '../../../../../Hooks/UseAuth';
import { UseCommonData } from '../../../../../Hooks/UseCommonData'
import FormError from '../../../../Components/Shared/FormError';
import CategoryListModal from '../Components/CategoryListModal';
import ManufacturerListModal from '../Components/ManufacturerListModal';
import StorageListModal from '../Components/StorageListModal';
import UserSupplierListModal from '../Components/UserSupplierListModal';
import { Editor } from '@tinymce/tinymce-react';

const tiny_style = {
    height: 300,
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
};

function EditSupplier() {
    const { formErrors } = UseAuth();
    const { control_modal, setModalContent } = UseCommonData();
    const params = useParams();
    const editorRef = useRef(null);
    const [drug, setDrug] = useState({})
    const [preview, setPreview] = useState('')
    const [categoryIds, setCategoryIds] = useState({ ids: [], details: [] });
    const [manufacturerIds, setManufacturerIds] = useState({ ids: [], details: [] });
    const [storageIds, setStorageIds] = useState({ ids: [], details: [] });
    const [supplierIds, setSupplierIds] = useState({ ids: [], details: [] });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/inventory/drug/get/${params.id}`)
            .then(res => {
                setDrug(res.data);
                setState(res.data.related_categories, categoryIds, setCategoryIds);
                setState(res.data.related_drug_manufacturer, manufacturerIds, setManufacturerIds);
                setState(res.data.related_drug_storage, storageIds, setStorageIds);
                setState(res.data.related_user_supplier, supplierIds, setSupplierIds);
                setPreview(res.data.full_photo_url);
            })
        return () => {
            setDrug({})
        }
    }, [])

    const setState = (value, state, setFn) => {
        // console.log(value);
        let temp_state = { ...state };
        temp_state.details = value;
        temp_state.ids = value.map(i => i.id);
        setFn(temp_state)
    }


    const formHandler = (e) => {
        e.preventDefault();
        let form_data = new FormData(e.target);
        form_data.append('id', drug.id);
        form_data.append('category_id', JSON.stringify(categoryIds.ids));
        form_data.append('manufacturer_id', JSON.stringify(manufacturerIds.ids));
        form_data.append('storage_location_id', JSON.stringify(storageIds.ids));
        form_data.append('supplier_id', JSON.stringify(supplierIds.ids));
        form_data.append('dosage_and_administration', editorRef.current.getContent());

        axios.post(`${process.env.REACT_APP_API_LINK}/inventory/drug/update`, form_data)
            .then((res) => {
                console.log(res.data);
                // e.target.reset();
                // setCategoryIds({ ids: [], details: [] });
                // setManufacturerIds({ ids: [], details: [] });
                // setStorageIds({ ids: [], details: [] });
                // setSupplierIds({ ids: [], details: [] });
                window.show_alert('Drug updated successfully.', 'text-light', 4000);
            })
            .catch((error) => {
                let message = error?.response?.data?.err_message;
                window.show_alert(message || 'something is wrong try again..', 'text-warning', 4000);
            })
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

    return (
        <div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-9">
                    <div className="card shadow-0 border-1 border">
                        <div className="card-header">
                            <h4> Update Drug</h4>
                        </div>
                        <div className="card-body">

                            <form action="" onSubmit={(e) => formHandler(e)} encType="multipart/formdata">
                                <div className="form-group">
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Drug Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={drug.name} name="name" className="form-control" placeholder="Drug name" />
                                            <FormError field_name="name"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Scientific Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={drug.scientific_name} name="scientific_name" className="form-control" placeholder="Scientific Name" />
                                            <FormError field_name="scientific_name"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Categories :</label>
                                        <div className="col-sm-9">
                                            <ul
                                                onClick={() => modal_handler(<CategoryListModal key='categories' Data={categoryIds} setData={setCategoryIds} />, 'Select Categories')}
                                                className="d-flex form-control flex-wrap">
                                                {
                                                    categoryIds?.details?.length ?
                                                        categoryIds.details.map((item) => {
                                                            return <li key={item.id} className="m-2">
                                                                <button className="btn btn-sm btn-outline-info px-2">
                                                                    <i className="fa text-danger fa-times me-2"></i>
                                                                    {item.name}
                                                                </button>
                                                            </li>
                                                        })
                                                        : 'Select categories'
                                                }
                                            </ul>
                                            <FormError field_name="category_id"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Manufacturer :</label>
                                        <div className="col-sm-9">
                                            <ul
                                                onClick={() => modal_handler(<ManufacturerListModal key='manufacturer' Data={manufacturerIds} setData={setManufacturerIds} />, 'Select Manufacturer')}
                                                className="d-flex form-control flex-wrap">
                                                {
                                                    manufacturerIds?.details?.length ?
                                                        manufacturerIds.details.map((item) => {
                                                            return <li key={item.id} className="m-2">
                                                                <button className="btn btn-sm btn-outline-info px-2">
                                                                    <i className="fa text-danger fa-times me-2"></i>
                                                                    {item.name}
                                                                </button>
                                                            </li>
                                                        })
                                                        : 'Select Manufacturer'
                                                }
                                            </ul>
                                            <FormError field_name="manufacturer_id"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Storage Location :</label>
                                        <div className="col-sm-9">
                                            <ul
                                                onClick={() => modal_handler(<StorageListModal key='manufacturer' Data={storageIds} setData={setStorageIds} />, 'Select Storage')}
                                                className="d-flex form-control flex-wrap">
                                                {
                                                    storageIds?.details?.length ?
                                                        storageIds.details.map((item) => {
                                                            return <li key={item.id} className="m-2">
                                                                <button className="btn btn-sm btn-outline-info px-2">
                                                                    <i className="fa text-danger fa-times me-2"></i>
                                                                    {item.name}
                                                                </button>
                                                            </li>
                                                        })
                                                        : 'Select Storage'
                                                }
                                            </ul>
                                            <FormError field_name="storage_location_id"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Supplier :</label>
                                        <div className="col-sm-9">
                                            <ul
                                                onClick={() => modal_handler(<UserSupplierListModal key='manufacturer' Data={supplierIds} setData={setSupplierIds} />, 'Select Supplier')}
                                                className="d-flex form-control flex-wrap">
                                                {
                                                    supplierIds?.details?.length ?
                                                        supplierIds.details.map((item) => {
                                                            return <li key={item.id} className="m-2">
                                                                <button className="btn btn-sm btn-outline-info px-2">
                                                                    <i className="fa text-danger fa-times me-2"></i>
                                                                    {item.name}
                                                                </button>
                                                            </li>
                                                        })
                                                        : 'Select Supplier'
                                                }
                                            </ul>
                                            <FormError field_name="supplier_id"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Need Prescription :</label>
                                        <div className="col-sm-9">
                                            <select defaultValue={drug.need_prescription} name="need_prescription" className="form-control">
                                                <option value="0">No</option>
                                                <option value="1">yes</option>
                                            </select>
                                            <FormError field_name="need_prescription"></FormError>
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Storage Temperature :</label>
                                        <div className="col-sm-9">
                                            <input defaultValue={drug.storage_temperature} type="text" name="storage_temperature" className="form-control" placeholder="Storage Temperature" />
                                            <FormError field_name="storage_temperature"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Dangerous Level :</label>
                                        <div className="col-sm-9">
                                            <select defaultValue={drug.dangerous_level} name="dangerous_level" className="form-control">
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                            <FormError field_name="dangerous_level"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">No of unit in package :</label>
                                        <div className="col-sm-9">
                                            <input defaultValue={drug.no_of_unit_in_package} type="text" name="no_of_unit_in_package" className="form-control" placeholder="No of unit in package" />
                                            <FormError field_name="no_of_unit_in_package"></FormError>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Unit Price :</label>
                                        <div className="col-sm-9">
                                            <input defaultValue={drug.unit_price} type="text" name="unit_price" className="form-control" placeholder="Unit Price" />
                                            <FormError field_name="unit_price"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Manufacturing date :</label>
                                        <div className="col-sm-9">
                                            <input defaultValue={drug.manufacture_date} type="date" name="manufacturing_date" className="form-control" placeholder="Manufacturing date" />
                                            <FormError field_name="manufacturing_date"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Expiry date :</label>
                                        <div className="col-sm-9">
                                            <input defaultValue={drug.expiry_date} type="date" name="expiry_date" className="form-control" placeholder="Expiry date" />
                                            <FormError field_name="expiry_date"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Date of entry :</label>
                                        <div className="col-sm-9">
                                            <input defaultValue={drug.date_of_entry} type="date" name="date_of_entry" className="form-control" placeholder="Date of entry" />
                                            <FormError field_name="date_of_entry"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Indication :</label>
                                        <div className="col-sm-9">
                                            <textarea name="indication" defaultValue={drug.indication} className="form-control" placeholder="indication" />
                                            <FormError field_name="indication"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Preparation :</label>
                                        <div className="col-sm-9">
                                            <textarea name="preparation" defaultValue={drug.preparation} className="form-control" placeholder="Preparation" />
                                            <FormError field_name="preparation"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Dosage and administration :</label>
                                        <div className="col-sm-9">
                                            {/* <textarea name="dosage_and_administration" className="form-control" placeholder="Preparation" /> */}
                                            <Editor
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue={drug.dosage_and_administration}
                                                init={tiny_style}
                                            />
                                            <FormError field_name="dosage_and_administration"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Photo :</label>
                                        <div className="col-sm-9">
                                            <input type="file" onChange={(e)=>setPreview(URL.createObjectURL(e.target.files[0]))} name="photo" className="form-control" placeholder="Unit Price" />
                                            <FormError field_name="photo"></FormError>
                                            <img src={preview} style={{width: 120,}} className="img-thumbnail mt-1" />
                                        </div>
                                    </div>

                                    <div className="form-group text-center">
                                        <button className="btn btn-outline-success-2x">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditSupplier
