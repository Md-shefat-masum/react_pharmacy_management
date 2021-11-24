import React, {useEffect} from 'react'
import { UseCommonData } from '../../../Hooks/UseCommonData'

function Modal() {
    const { triggerModal, setTriggerModal, modalContent } = UseCommonData();
    useEffect(() => {
        console.log('modal open');
        console.log(triggerModal);
    }, [triggerModal])
    return (
        <>
            <div className={"modal fade " + (triggerModal?.trigger ? 'show' : '')} id="staticBackdrop"
                data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel"
                style={{ display: triggerModal?.trigger && 'block', backdropFilter: 'blur(3px)' }}
                aria-hidden="true">
                <div className={`modal-dialog modal-${triggerModal?.size} modal-dialog-centered`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{triggerModal?.header_text}</h5>
                            <button type="button" className="btn-close" onClick={() => setTriggerModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {modalContent}
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => setTriggerModal(false)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
