import React from 'react'

function Payment() {
    return (
        <div>
            <h4 className="text-center">Checkout</h4>
            <br />
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">Card Number</label>
                <div className="col-sm-9"><input type="email" className="form-control" id="CategoryList" placeholder="Card number" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">Month</label>
                <div className="col-sm-9"><input type="email" className="form-control" id="CategoryList" placeholder="Month" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">Year</label>
                <div className="col-sm-9"><input type="email" className="form-control" id="CategoryList" placeholder="Year" /></div>
            </div>
            <div className="mb-3 row">
                <label for="CategoryList" className="col-sm-3 col-form-label">CVC</label>
                <div className="col-sm-9"><input type="email" className="form-control" id="CategoryList" placeholder="CVC" /></div>
            </div>
        </div>
    )
}

export default Payment
