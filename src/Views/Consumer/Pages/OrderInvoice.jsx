import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function OrderInvoice() {
    let { id } = useParams();
    const [order, setOrder] = useState({})
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/order/details/${id}`)
            .then(res => {
                console.log(res.data);
                setOrder(res.data)
            })
    }, [])
    return (
        <div className="mb-4">
            <a className="btn bg-white btn-primary mb-3 mx-1px text-95" onClick={() => window.print()} href="#" data-title="Print">
                <i className="fa fa-print text-primary-m1 me-2 text-120 w-2"></i>
                Print
            </a>
            <div id="invoice_body">
                <div className="card h-100 m-0 shadow-0">
                    <div className="card-body p-0 m-0 border-0">
                        <div className="row">
                            {/* BEGIN INVOICE */}
                            <div className="col-12">
                                <div className="grid invoice mb-0">
                                    <div className="grid-body">
                                        <div className="invoice-title">
                                            <div className="row">
                                                <div className="col-12 mb-2">
                                                    <img src="/tlogo.png" alt="" height={70} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <h2>invoice<br />
                                                        <span className="small">order #{order.order_no}</span></h2>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-6">
                                                <address>
                                                    <strong>Billed To:</strong><br />
                                                    {order.billing_address?.first_name + ' ' + order.billing_address?.last_name}<br />
                                                    {order.billing_address?.street + ', ' + order.billing_address?.city}<br />
                                                    {order.billing_address?.state}<br />
                                                    <abbr title="Phone">P:</abbr> {order.billing_address?.contact_number}
                                                </address>
                                            </div>
                                            <div className="col-6 text-end">
                                                <address>
                                                    <strong>Shipped To:</strong><br />
                                                    {order.shipping_address?.first_name + ' ' + order.shipping_address?.last_name}<br />
                                                    {order.shipping_address?.street + ', ' + order.shipping_address?.city}<br />
                                                    {order.shipping_address?.state}<br />
                                                    <abbr title="Phone">P:</abbr> {order.shipping_address?.contact_number}
                                                </address>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    <strong>Payment Status:</strong>
                                                    <br />
                                                    {
                                                        order?.payment_status ?
                                                            <span className="badge badge-primary"> paid</span> :
                                                            <span className="badge badge-danger"> pending</span>
                                                    }
                                                    <br />
                                                    <br />
                                                </div>
                                            </div>
                                            <div className="col-6 text-end">
                                                <address>
                                                    <strong>Order Date:</strong><br />
                                                    {order.formatted_only_date}
                                                </address>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3>ORDER SUMMARY</h3>
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr className="line">
                                                            <td style={{ width: 50 }}><strong>#</strong></td>
                                                            <td className="text-center"><strong>Medicine</strong></td>
                                                            <td style={{ width: 120 }} className="text-center"><strong>Qty</strong></td>
                                                            <td style={{ width: 120 }} className="text-end"><strong>Price</strong></td>
                                                            <td style={{ width: 120 }} className="text-end"><strong>SUBTOTAL</strong></td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order?.order_details?.map((item, index) => {
                                                            return (
                                                                <tr key={item.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td className="text-center"><strong>{item.drug_details.name}</strong></td>
                                                                    <td className="text-center">{item.qty}</td>
                                                                    <td className="text-end">${item.product_sale_price}</td>
                                                                    <td className="text-end">
                                                                        ${window.format_number(item.qty * item.product_sale_price)}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}

                                                        <tr>
                                                            <td colSpan={3}>
                                                            </td><td className="text-end"><strong>Total</strong></td>
                                                            <td className="text-end"><strong>${window.format_number(order.order_total)}</strong></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 text-right identity">
                                                <p>Invoiced By<br /><strong>Good Green</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END INVOICE */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h6>Payment Info</h6>
                            <table className="table">
                                <tbody>
                                    <tr className="tr">
                                        <th>Payment Amount</th>
                                        <th style={{width:3}}>:</th>
                                        <th>$ {order?.payment_details?.payment_amount}</th>
                                    </tr>
                                    {/* <tr className="tr">
                                        <th>Payment Id</th>
                                        <th style={{width:3}}>:</th>
                                        <th>{order?.payment_details?.payment_id}</th>
                                    </tr> */}
                                    <tr className="tr">
                                        <th>Transaction Id</th>
                                        <th style={{width:3}}>:</th>
                                        <th>{order?.payment_details?.transaction_id}</th>
                                    </tr>
                                    <tr className="tr">
                                        <th>Order Images</th>
                                        <th style={{width:3}}>:</th>
                                        <th>
                                            {
                                                order?.order_image?.map(item=>{
                                                    return (
                                                        <a href={item.image_full_url} target="_black">
                                                            <img src={item.image_full_url} className="img-thumbnail img-fluid my-3" />
                                                        </a>
                                                    )
                                                })
                                            }
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderInvoice
