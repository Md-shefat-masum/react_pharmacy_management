import React from 'react'

function CreatePrescription() {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h4>Appoinments</h4>
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Appoinment id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
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
                                        <td className="font-secondary">Pending</td>
                                        <td className="font-info">10:23 am</td>
                                        <td style={{ width: 350 }}>
                                            <div className="d-flex flex-wrap">
                                                <a href="#/" className="btn m-2 btn-air-secondary">Details</a>
                                                <a href="#/" className="btn m-2 btn-air-success">Create Prescription</a>
                                                {/* <a href="/physician/councilling" className="btn m-2 btn-air-success">Start Counciling</a> */}
                                                <a href="http://hangouts.google.com/start" target="_blank" className="btn m-2 btn-air-success">Start Counciling</a>
                                                {/* <a href="hangouts.google.com/call/g-J8bAW5XEwBl-RkKFXTACEM?no_rd" target="_blank" className="btn m-2 btn-air-success">Start Counciling</a> */}
                                                <a href="#/" className="btn m-2 btn-air-danger">Cancel</a>
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

export default CreatePrescription
