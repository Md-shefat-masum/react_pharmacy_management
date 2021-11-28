import React from 'react'

function Shipping(props) {
    const handle_change = (e) => {
        let shipping_address = {...props.shippingAddress};
        shipping_address[e.name] = e.value;
        props.setShippingAddress(shipping_address);
    }
    const handle_billing = (e) => {
        if(+e.value){
            props.setShippingAddress({...props.billingAddress});
        }else{ 
            let shipping_address = {...props.shippingAddress};
            for (const key in shipping_address) {
                if (Object.hasOwnProperty.call(shipping_address, key)) {
                    shipping_address[key] = '';
                }
            }
            props.setShippingAddress(shipping_address);
        }
    }
    
    return (
        <div>
            <h4 className="text-center">Shipping Information</h4>
            <br />
            <div className="mb-3 row">
                <label htmlFor="" className="col-sm-3 col-form-label">Use billing address as shipping</label>
                <div className="col-sm-9">
                    <select onChange={(e)=>handle_billing(e.target)} className="form-control w-25">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
            </div>
            <form>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">First Name</label>
                    <div className="col-sm-9">
                        <input type="text" onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.billing_first_name} name="billing_first_name" className="form-control" id="" placeholder="First name" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Last Name</label>
                    <div className="col-sm-9"><input onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.billing_last_name} name="billing_last_name" type="text" className="form-control" id="" placeholder="Last name" /></div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9"><input onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.billing_email} name="billing_email" type="email" className="form-control" id="" placeholder="Email" /></div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Contact Number</label>
                    <div className="col-sm-9"><input onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.billing_contact_number} name="billing_contact_number" type="text" className="form-control" id="" placeholder="contact number" /></div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">City</label>
                    <div className="col-sm-9"><input onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.billing_city} name="billing_city" type="text" className="form-control" id="" placeholder="City" /></div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Zip Code</label>
                    <div className="col-sm-9"><input onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.billing_zip_code} name="billing_zip_code" type="text" className="form-control" id="" placeholder="zip code" /></div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">State</label>
                    <div className="col-sm-9"><input onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.billing_state} name="billing_state" type="text" className="form-control" id="" placeholder="State" /></div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Street</label>
                    <div className="col-sm-9"><input onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.street} name="street" type="text" className="form-control" id="" placeholder="street" /></div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-9">
                        <textarea type="text" onChange={(e)=>handle_change(e.target)}  value={props.shippingAddress?.billing_description} name="billing_description" className="form-control" id="" placeholder="Description" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Shipping
