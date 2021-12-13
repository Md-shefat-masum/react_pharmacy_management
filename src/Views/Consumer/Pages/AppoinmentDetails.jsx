import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

function AppoinmentDetails() {
    let { id } = useParams();
    const [appoinment, setAppoinment] = useState({})
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/appoinment/get-appoinment/${id}`)
            .then(res => {
                console.log(res.data);
                setAppoinment(res.data)
            })
    }, [])

    return (
        <div class="card">
            <div className="card-header">
                <h4>Appoinment Details</h4>
            </div>
            <div className="card-body">
                
            </div>
        </div>
    )
}

export default AppoinmentDetails
