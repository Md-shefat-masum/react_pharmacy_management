import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-laravel-paginex'
import { Link } from 'react-router-dom';
import { UseCommonData } from '../../../../../Hooks/UseCommonData';

function AllDrugs() {
    const [MedicineList, setMedicineList] = useState({})
    const { calert } = UseCommonData();

    useEffect(() => {
        LoadData({ page: 1 });
        return () => {
            setMedicineList([]);
        };
    }, [])

    const LoadData = (data) => {
        axios.get(`${process.env.REACT_APP_API_LINK}/inventory/drug/all?page=${data.page}`)
            .then(res => {
                setMedicineList(res.data);
            })
    }

    const delete_data = (id) => {
        window.confirm('sure want to delete?') &&
        axios.post(`${process.env.REACT_APP_API_LINK}/inventory/drug/delete`,{id})
            .then(() => {
                LoadData({ page: 1 });
                calert(true,'data successfully deleted','light',400);
            })
    }
    

    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered" style={{width: 1600}}>
                <colgroup>
                    {/* <col style={{width:120}}/>
                    <col style={{width:120}}/>
                    <col style={{width:120}}/>
                    <col style={{width:120}} />
                    <col style={{width:180}}/>
                    <col style={{width:200}}/>
                    <col style={{width:140}}/>
                    <col style={{width:230}}/>
                    <col style={{width:140}}/>
                    <col style={{width:250}}/>
                    <col style={{width:100}}/>
                    <col style={{width:400}}/> */}
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Sale</th>
                        <th scope="col">Total Income</th>
                        <th scope="col">Category</th>
                        <th scope="col">Storage Location</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Manufacturing Date</th>
                        <th scope="col">Expire Date</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        MedicineList?.data?.map(item => {
                            return <tr key={item.id}>
                                <td> #{item.id} </td>
                                <td className="digits">{item.photo}</td>
                                <td className="font-secondary">{item.name}</td>
                                <td className="font-dark">{item.quantity}</td>
                                <td className="font-dark">{item.total_sale}</td>
                                <td className="font-info">{item.total_income}</td>
                                <td className="font-info">{item.category}</td>
                                <td className="font-info">{item.storage_location}</td>
                                <td className="font-info">{item.manufaturer}</td>
                                <td className="font-info">{item.manufacture_date}</td>
                                <td className="font-info">{item.expiry_date}</td>
                                <td className="font-info">{item?.status === 1 ? <span className="badge bg-success">Active</span> : <span className="badge bg-warning">Deactive</span>}</td>
                                <td style={{ width: 370 }}>
                                    <div className="d-flex flex-wrap">
                                        <Link to={"/dispensary/inventory/suppliers/details/"+item.id} className="btn m-2 btn-air-secondary">Details</Link>
                                        <Link to={"/dispensary/inventory/suppliers/edit/"+item.id} className="btn m-2 btn-air-success">Edit</Link>
                                        <Link to="#/" onClick={()=>delete_data(item.id)} className="btn m-2 btn-air-danger">Delete</Link>
                                    </div>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
            {
                MedicineList?.data?.length > 0 &&
                <Pagination changePage={LoadData} numbersCountForShow={6} data={MedicineList} />
            }
        </div>
    )
}

export default AllDrugs
