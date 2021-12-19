import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';

function PrescirptionDetails() {
    let { id } = useParams();
    const [consumer, setConsumer] = useState({});
    const [doctor, setDoctor] = useState({});
    const [prescription, setPrescription] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/prescription/get-doctor-prescription/${id}`)
            .then(res => {
                console.log(res.data);
                setPrescription(res.data);
            })
    }, [])

    return (
        <div>
            <a className="btn bg-white btn-primary mb-3 text-95 m-1" onClick={() => window.print()} href="#" data-title="Print">
                <i className="fa fa-print text-primary-m1 me-2 text-120 w-2"></i>
                Print
            </a>
            <div className="card print_body">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="biller-info">
                                <h4 className="d-block">Dr. {prescription?.doctor?.displayName}</h4>
                                <span className="d-block text-sm text-muted">
                                    {
                                        prescription?.doctor?.designation?.map(i => <span key={i.id} className="me-1">{i.title}, </span>)
                                    }
                                </span>
                                <span className="d-block text-sm text-muted">
                                    {prescription?.doctor?.street}, &nbsp;
                                    {prescription?.doctor?.city}, &nbsp;
                                    {prescription?.doctor?.country} <br />
                                    {prescription?.doctor?.contact_number}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6 text-sm-end">
                            <div className="billing-info">
                                <h4 className="d-block">{new Date(prescription?.created_at).toLocaleDateString()}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between px-3 py-2 border border-1 mt-4">
                        <div>
                            <b>Name: </b> &nbsp; {prescription?.consumer?.displayName}
                        </div>
                        <div>
                            <b>Sex: </b> &nbsp; {prescription?.consumer?.gender}
                        </div>
                        <div>
                            <b>Age: </b> &nbsp; {prescription?.consumer?.age}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-5 col-md-5 col-lg-4 border-1 border-end py-4">
                            <h6>Investigation:</h6>
                            <ol>
                                {
                                    prescription?.investigations?.map(item => {
                                        return <li key={item.id} className="mb-3">
                                            {item.name} <br />
                                            {item.description}
                                        </li>
                                    })
                                }

                            </ol>
                            {
                                prescription?.additional_message?.length > 0 &&
                                <span>
                                    <h6>Addional:</h6>
                                    {ReactHtmlParser(prescription.additional_message)}
                                </span>
                            }
                        </div>
                        <div className="col-7 col-md-7 col-md-8">
                            <h6 className="py-4">Medicines: </h6>
                            <table className="table table-striped text-center">
                                <tbody>
                                    {
                                        prescription?.medicines?.map(item => {
                                            return <tr key={item.id}>
                                                <td className="text-start">{item.name}</td>
                                                <td>{item.days} days</td>
                                                <td>
                                                    {item.morining ? <span>Morning: <i className="fa fa-check-square-o text-success"></i> <br /> </span> : ''}
                                                    {item.afternoon ? <span>Afternoon: <i className="fa fa-check-square-o text-success"></i> <br /> </span> : ''}
                                                    {item.evening ? <span>Evening: <i className="fa fa-check-square-o text-success"></i> <br /> </span> : ''}
                                                    {item.night ? <span>Night: <i className="fa fa-check-square-o text-success"></i> <br /> </span> : ''}
                                                </td>
                                                <td className="text-end">
                                                    {item.before_eat ? <span>Befoter eat: <i className="fa fa-check-square-o text-success"></i> <br /> </span> : ''}
                                                    {item.after_eat ? <span>After eat: <i className="fa fa-check-square-o text-success"></i> <br /> </span> : ''}
                                                    {item.empty_stomach ?
                                                        <span>Empty stomach: <i className="fa fa-check-square-o text-success"></i> <br /> </span>
                                                        : <span>Empty stomach: <i className="fa fa-check-square-o text-success"></i> <br /> </span>}
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PrescirptionDetails
