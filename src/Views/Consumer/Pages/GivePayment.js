import React from 'react'
import Payment from '../Components/Billing/Payment'

function GivePayment() {
    return (
        <div>
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="card">
                        <div className="card-body">
                            <form action="">
                                <div className="text-center mb-4">
                                    <img src="https://epaymaker.com/images/logo/1591645593.logo_F.png" style={{width:300}} alt="" />
                                </div>
                                <Payment></Payment>
                                <div className="text-center">
                                    <button className="btn btn-info">Submit</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GivePayment
