import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';

function InventoryLayout() {
    const [BillingFormShow, setBillingFormShow] = useState('')
    let navigate = useNavigate();
    
    const handleNavigate = (url) => {
        setBillingFormShow(url) ;
        navigate('/dispensary/inventory/'+url) ;
    }
    
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h4>Inventory</h4>
                    <div className="d-flex flex-wrap">
                        <button onClick={() => handleNavigate('drugs')} className={"btn btn-outline-info m-1 " + (BillingFormShow === 'drugs' ? 'active' : '')}>All Drugs</button>
                        <button onClick={() => handleNavigate('categories') } className={"btn btn-outline-secondary m-1 " + (BillingFormShow === 'categories' ? 'active' : '')}>Categories</button>
                        <button onClick={() => handleNavigate('storages') } className={"btn btn-outline-secondary m-1 " + (BillingFormShow === 'storages' ? 'active' : '')}>Storages</button>
                        <button onClick={() => handleNavigate('suppliers') } className={"btn btn-outline-secondary m-1 " + (BillingFormShow === 'suppliers' ? 'active' : '')}>Suppliers</button>
                        <button onClick={() => handleNavigate('manufactures') } className={"btn btn-outline-secondary m-1 " + (BillingFormShow === 'manufactures' ? 'active' : '')}>Manufactures</button>
                        <div className="d-inline-block">
                            {/* <input type="text" className="form-control m-1" placeholder="search.." /> */}
                        </div>
                    </div>
                </div>
                <div className="card-body pt-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}


export default InventoryLayout
