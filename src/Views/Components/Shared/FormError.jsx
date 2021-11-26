import React from 'react'
import { UseAuth } from '../../../Hooks/UseAuth';

function FormError(props) {
    const { formErrors } = UseAuth();
    // useEffect(() => {
    // console.log(props, formErrors);
    // }, [])
    return (
        (props && formErrors) ?
            <div>
                {
                    (props?.field_name && formErrors[props.field_name]?.length) > 0 &&
                    <span className="text-danger mt-1">{formErrors[props.field_name]}</span>
                }
            </div>
            : ''
    )
}

export default FormError
