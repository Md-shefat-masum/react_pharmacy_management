import React,{useEffect} from 'react'

function Payment(props) {
    const handle_change = (e) => {
        let paymentInfo = {...props.paymentInfo};
        paymentInfo[e.name] = e.value;
        props.setPaymentInfo(paymentInfo);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h4 className="text-center">Checkout</h4>
                <br />
                <div className="mb-3 row">
                    <label  className="col-sm-3 col-form-label">Card Number</label>
                    <div className="col-sm-9"><input onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.card_number} name="card_number" type="text" className="form-control" id="CategoryList" placeholder="Card number" /></div>
                </div>
                <div className="mb-3 row">
                    <label  className="col-sm-3 col-form-label">Month</label>
                    <div className="col-sm-9"><input onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.month} name="month" type="text" className="form-control" id="CategoryList" placeholder="Month" /></div>
                </div>
                <div className="mb-3 row">
                    <label  className="col-sm-3 col-form-label">Year</label>
                    <div className="col-sm-9"><input type="text" onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.year} name="year" className="form-control" id="CategoryList" placeholder="Year" /></div>
                </div>
                <div className="mb-3 row">
                    <label  className="col-sm-3 col-form-label">CVC</label>
                    <div className="col-sm-9"><input type="text" onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.cvc} name="cvc" className="form-control" id="CategoryList" placeholder="CVC" /></div>
                </div>
                <div className="my-5 text-center">
                    
                </div>
            </div>
        </div>
    )
}

export default Payment
