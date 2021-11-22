import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-laravel-paginex'
import { Link } from 'react-router-dom';
import { UseCommonData } from '../../../../../Hooks/UseCommonData';

function AllCategory() {
    const [MedicineList, setMedicineList] = useState({})
    const { calert } = UseCommonData();

    useEffect(() => {
        LoadData({ page: 1 });
        return () => {
            setMedicineList([]);
        };
    }, [])

    const LoadData = (data) => {
        axios.get(`${process.env.REACT_APP_API_LINK}/inventory/category/all?page=${data.page}`)
            .then(res => {
                setMedicineList(res.data);
            })
    }

    const delete_data = (id) => {
        window.confirm('sure want to delete?') &&
        axios.post(`${process.env.REACT_APP_API_LINK}/inventory/category/delete`,{id})
            .then(() => {
                LoadData({ page: 1 });
                calert(true,'data successfully deleted','light',400);
            })
    }
    

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Category Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Discription</th>
                        <th scope="col">Total Medicine</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        MedicineList?.data?.map(item => {
                            return <tr key={item.id}>
                                <td> #{item.id} </td>
                                <td className="digits">{item.name}</td>
                                <td className="font-secondary">{item.description}</td>
                                <td className="font-info">{item.total_medicine}</td>
                                <td className="font-info">{item?.status == 1 ? <span className="badge bg-success">Active</span> : <span className="badge bg-warning">Deactive</span>}</td>
                                <td style={{ width: 350 }}>
                                    <div className="d-flex flex-wrap">
                                        <Link to={"/dispensary/inventory/categories/details/"+item.id} className="btn m-2 btn-air-secondary">Details</Link>
                                        <Link to={"/dispensary/inventory/categories/edit/"+item.id} className="btn m-2 btn-air-success">Edit</Link>
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

export default AllCategory
