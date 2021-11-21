import React from 'react'

function UploadPrescirption() {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="text-center">Upload Prescription</h4>
                <br />
                <div className="mb-3 row">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">Doctor name</label>
                    <div className="col-sm-9"><input type="email" className="form-control" id="inputEmail3" placeholder="Doctor Name" /></div>
                </div>
                <div className="mb-3 row">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">Prescription File</label>
                    <div className="col-sm-9"><input type="file" className="form-control" id="inputEmail3" placeholder="Email" /></div>
                </div>
                <div className="mb-3 row">
                    <label for="inputEmail3" className="col-sm-3 col-form-label"></label>
                    <div className="col-sm-9">
                        <button className="btn btn-info">Upload</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPrescirption
