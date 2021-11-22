import React from 'react'
import { UseCommonData } from '../../../Hooks/UseCommonData'

let alert_style = {
    position: "fixed",
    bottom: 0,
    right: "15px",
    paddingRight: "49px",
}

function Alert() {
    const { showAlert, calert } = UseCommonData();
    return (
        showAlert.show ?
            <div className="alert alert-dark dark alert-dismissible fade show" style={alert_style} role="alert">
                <i className="icon-info-alt"></i>
                <span className={`text-${showAlert.style}`}>
                    {showAlert.text}
                </span>
                <button type="button" onClick={()=>calert(false,'','')} className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true"></span>
                </button>
            </div>
            : ''
    )
}

export default Alert
