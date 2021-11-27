import React from 'react'

function Shipping() {
    return (
        <div>
            <h4 className="text-center">Shipping Information</h4>
            <br />
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">First Name</label>
                <div className="col-sm-9"><input type="email" className="form-control" id="CategoryList" placeholder="Email" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">Last Name</label>
                <div className="col-sm-9"><input type="email" className="form-control" id="CategoryList" placeholder="Email" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9"><input type="email" className="form-control" id="CategoryList" placeholder="Email" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">Contact Number</label>
                <div className="col-sm-9"><input type="email" className="form-control" id="CategoryList" placeholder="contact number" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">City</label>
                <div className="col-sm-9"><input type="text" className="form-control" id="CategoryList" placeholder="City" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">Zip Code</label>
                <div className="col-sm-9"><input type="text" className="form-control" id="CategoryList" placeholder="zip code" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">State</label>
                <div className="col-sm-9"><input type="text" className="form-control" id="CategoryList" placeholder="State" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">Description</label>
                <div className="col-sm-9">
                    <textarea type="text" className="form-control" id="CategoryList" placeholder="Description" />
                </div>
            </div>
        </div>
    )
}

export default Shipping
