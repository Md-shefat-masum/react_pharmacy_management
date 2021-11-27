import axios from 'axios';
import lodash from 'lodash';
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-laravel-paginex'
import { Link } from 'react-router-dom';
import { UseCommonData } from '../../../../../Hooks/UseCommonData';

function UserSupplierListModal(props) {
    const [DataList, setDataList] = useState({})
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedCategoryDetails, setSelectedCategoryDetails] = useState([])
    const { calert } = UseCommonData();

    useEffect(() => {
        console.log(props);
        LoadData({ page: 1 });
        setSelectedCategories([...props.Data?.ids])
        setSelectedCategoryDetails([...props.Data?.details])
        // return () => {
        //     setSelectedCategories([]);
        //     setSelectedCategoryDetails([]);
        // };
    }, [])

    useEffect(() => {
        const unsubcribe = props.setData({ ids: selectedCategories, details: selectedCategoryDetails })
        return () => {
            props.setData({ ids: selectedCategories, details: selectedCategoryDetails })
        };
    }, [selectedCategories])

    const LoadData = (data) => {
        axios.get(`${process.env.REACT_APP_API_LINK}/inventory/supplier/all?page=${data.page}&key=${data?.key||''}`)
            .then(res => {
                res.data.data = res.data.data.map(i => {
                    if (props.Data.ids.includes(i.id)) i.checked = true;
                    return i;
                });
                setDataList(res.data);
            })
    }

    const handle_select = (id, details) => {
        let temp_list = [...selectedCategories];
        let temp_details_list = [...selectedCategoryDetails];
        let medicine_list = { ...DataList };

        if (temp_list.includes(id)) {
            temp_list = temp_list.filter(i => i !== id)
            medicine_list.data = medicine_list.data.map(i => {
                if (i.id === id) i.checked = false;
                return i;
            });
        } else {
            temp_list.push(id)
            medicine_list.data = medicine_list.data.map(i => {
                if (i.id === id) i.checked = true;
                return i;
            });
        }

        if (temp_details_list.find(i => i.id === details.id)) {
            temp_details_list = temp_details_list.filter(i => i.id !== details.id)
        } else {
            temp_details_list.push(details)
        }

        setSelectedCategories(temp_list);
        setSelectedCategoryDetails(temp_details_list);
        setDataList(medicine_list);

        // console.log(medicine_list.data);
    }

    const remove_item = (id, item) => {
        let temp_list = [...selectedCategories];
        let temp_details_list = [...selectedCategoryDetails];
        let medicine_list = { ...DataList };

        temp_list = temp_list.filter(i => i !== id)
        temp_details_list = temp_details_list.filter(i => i.id !== id)
        medicine_list.data = medicine_list.data.filter(i => {
            i.id === id && (i.checked = false);
            return i;
        });

        setSelectedCategories(temp_list);
        setSelectedCategoryDetails(temp_details_list);
        setDataList(medicine_list);
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-6">
                    <input type="text" onKeyUp={lodash.debounce((e)=>LoadData({page:1,key:e.target.value}),1000)} placeholder="search by name" className="form-control ms-2" />
                </div>
            </div>
            <ul className="d-flex">
                {
                    selectedCategoryDetails.map((item) => {
                        return <li key={item.id} className="m-2">
                            <button  type="button" className="btn btn-sm btn-outline-info px-2">
                                <i onClick={() => remove_item(item.id, item)} className="fa text-danger fa-times me-2"></i>
                                {item.name}
                            </button>
                        </li>
                    })
                }
            </ul>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Supplier Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Company</th>
                            <th scope="col">Contact Number</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            DataList?.data?.map(item => {
                                item.name = item.supplier_name;
                                return <tr key={item.id}>
                                    <td>
                                        {
                                            item.checked ?
                                                <i onClick={() => handle_select(item.id, item)} className="fa fa-check-square-o text-success"></i>
                                                :
                                                <input onClick={() => handle_select(item.id, item)} type="checkbox"></input>
                                        }
                                    </td>
                                    <td> #{item.id} </td>
                                    <td className="digits">{item.supplier_name}</td>
                                    <td className="font-secondary">{item.compay_name}</td>
                                    <td className="font-info">{item.contact_number}</td>
                                    <td className="font-info">{item?.status === 1 ? <span className="badge bg-success">Active</span> : <span className="badge bg-warning">Deactive</span>}</td>

                                </tr>
                            })
                        }

                    </tbody>
                </table>
                {
                    DataList?.data?.length > 0 &&
                    <Pagination changePage={LoadData} numbersCountForShow={6} data={DataList} />
                }
            </div>
        </div>
    )
}

export default UserSupplierListModal
