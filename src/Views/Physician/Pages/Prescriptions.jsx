import React from 'react'

function Prescriptions() {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h4>Prescriptions</h4>
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Prescription id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [..."asdfgh".split('')].map(item => {
                                    return <tr key={item}>
                                        <td> #GG-{parseInt(Math.random()*10000)} </td>
                                        <td> karmbox </td>
                                        <td> karmbox@gmail.com</td>
                                        <td className="digits">{new Date().toDateString()}</td>
                                        <td className="font-info">10:23 am</td>
                                        <td style={{ width: 100 }}>
                                            <div className="d-flex flex-wrap">
                                                <a href="#/" className="btn m-2 btn-air-secondary">Details</a>
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

export default Prescriptions
