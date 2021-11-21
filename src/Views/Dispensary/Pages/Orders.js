import React from 'react'

function Orders() {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h4>Orders</h4>
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Amount</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [..."asdfgh".split('')].map(item => {
                                    return <tr key={item}>
                                        <td> #GG-{parseInt(Math.random()*10000)} </td>
                                        <td className="digits">{new Date().toDateString()}</td>
                                        <td className="font-secondary">Pending</td>
                                        <td className="font-info">$ 1500</td>
                                        <td style={{ width: 350 }}>
                                            <div className="d-flex flex-wrap">
                                                <a href="#/" className="btn m-2 btn-air-secondary">Details</a>
                                                <a href="#/" className="btn m-2 btn-air-success">Edit</a>
                                                <a href="#/" className="btn m-2 btn-air-danger">Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders
