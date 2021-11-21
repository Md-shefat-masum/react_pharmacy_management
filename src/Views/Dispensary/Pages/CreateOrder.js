import React, { useEffect, useState } from 'react'
import Billing from '../Components/Billing/Billing'
import Payment from '../Components/Billing/Payment'
import Shipping from '../Components/Billing/Shipping'

function CreateOrder() {
    const [MedicineList, setMedicineList] = useState([])
    const [CartList, setCartList] = useState([])
    const [TotalCart, setTotalCart] = useState(0)
    const [BillingFormShow, setBillingFormShow] = useState('billing')
    const [ShowPaymentModal, setShowPaymentModal] = useState(false)

    useEffect(() => {
        let list = [
            {
                id: 1,
                name: "Ace",
                image: 'http://www.squarepharma.com.bd/products/Ace%20125%20Supp-01.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 2,
                name: "Ace® Plus",
                image: 'http://www.squarepharma.com.bd/products/Ace-Plus_l.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 3,
                name: "Ace® Power",
                image: 'http://www.squarepharma.com.bd/products/Ace%20power%20DS1-01.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 4,
                name: "Acetram",
                image: 'http://www.squarepharma.com.bd/products/ACETRAM.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 5,
                name: "Adryl",
                image: 'http://www.squarepharma.com.bd/products/ADRYL-100ml.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 6,
                name: "Afun",
                image: 'http://www.squarepharma.com.bd/products/AFUN-Cream.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 7,
                name: "AkicinTM",
                image: 'http://www.squarepharma.com.bd/products/Akicin%20IC.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 8,
                name: "Alacot® DS Eye Drops",
                image: 'http://www.squarepharma.com.bd/products/Alacot-DS1.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 9,
                name: "Alacot® Eye Drops",
                image: 'http://www.squarepharma.com.bd/products/Alacot_o1.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 10,
                name: "Alacot® Max Eye Drops",
                image: 'http://www.squarepharma.com.bd/products/Product-image_l.jpg',
                price: parseInt(Math.random() * 100),
            },
            {
                id: 11,
                name: "Alarid® Eye Drops",
                image: 'http://www.squarepharma.com.bd/products/ALADRID-0-025.jpg',
                price: parseInt(Math.random() * 100),
            },
        ];
        setMedicineList(list);
    }, [])

    useEffect(() => {
        setTotalCart(CartList.reduce((total, item) => total += (item.price * item.qty), 0))
    }, [CartList])

    const add_to_cart = (item) => {
        let temp_cart = [...CartList];
        let exists = temp_cart.find(product => product.id === item.id);
        if (exists) {
            item.qty++;
            temp_cart = temp_cart.filter(product => product.id !== item.id);
        } else {
            item.qty = 1;
        }
        temp_cart.unshift(item);
        setCartList(temp_cart);
    }

    const setQty = (item, e) => {
        let qty = parseInt(e.target.value);
        if (qty < 1 || !qty) {
            qty = 1;
        }
        let temp_cart = [...CartList];
        temp_cart.filter(product => product.id === item.id ? item.qty = qty : '');
        setCartList(temp_cart);
        // console.log(item,e.target.value);
    }


    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 ">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Product list</h4>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-bordered text-center table-hover">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                MedicineList.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>
                                                            <img src={item.image} style={{ width: 40 }} alt={item.name} />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td style={{ width: 120 }}>$ {item.price}</td>
                                                        <td>
                                                            <i onClick={() => add_to_cart(item)} className="fa btn btn-outline-info fa-shopping-cart"></i>
                                                        </td>
                                                    </tr>
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Cart list</h4>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-bordered text-center table-hover">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Qty</th>
                                                <th className="text-end">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                CartList.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>
                                                            <i className="fa btn btn-outline-info fa-trash-o"></i>
                                                        </td>
                                                        <td>
                                                            <img src={item.image} style={{ width: 40 }} alt={item.name} />
                                                        </td>
                                                        <td>
                                                            {item.name}
                                                        </td>
                                                        <td style={{ width: 80 }}>
                                                            <input type="text" value={item.qty} onChange={(e) => setQty(item, e)} className="form-control" />
                                                        </td>
                                                        <td style={{ width: 120 }} className="text-end">$ {item.price * item.qty}</td>
                                                    </tr>
                                                })
                                            }

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan="4" className="text-end">Total : </th>
                                                <th className="text-end">
                                                    $ {
                                                        TotalCart
                                                    }
                                                </th>
                                            </tr>
                                            <tr>
                                                <td colSpan={5} >
                                                    <form action="" className="text-start">
                                                        <div className="card">
                                                            <div className="card-body">

                                                                <div className="form-group mb-3">
                                                                    <label htmlFor="">Customer</label>
                                                                    <input type="text" className="form-control" />
                                                                </div>
                                                                <div className="form-group mb-3">
                                                                    <label htmlFor="">Contact Number</label>
                                                                    <input type="text" className="form-control" />
                                                                </div>
                                                                <div className="form-group mb-3">
                                                                    <label htmlFor="">Address</label>
                                                                    <input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <div>
                                                        <button className="btn btn-info"
                                                            data-bs-toggle="modal"
                                                            onClick={() => setShowPaymentModal(!ShowPaymentModal)}
                                                            data-bs-target="#staticBackdrop">
                                                            Proceed To Checkout
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"modal fade " + (ShowPaymentModal ? 'show' : '')} id="staticBackdrop"
                    data-bs-backdrop="static" data-bs-keyboard="false"
                    tabindex="-1" aria-labelledby="staticBackdropLabel"
                    style={{ display: ShowPaymentModal && 'block', backdropFilter: 'blur(3px)' }}
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="btn-close" onClick={() => setShowPaymentModal(!ShowPaymentModal)} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-wrap">
                                    <button onClick={() => setBillingFormShow('billing')} className={"btn btn-outline-info m-1 " + (BillingFormShow === 'billing' ? 'active' : '')}>Billing</button>
                                    <button onClick={() => setBillingFormShow('shipping')} className={"btn btn-outline-secondary m-1 " + (BillingFormShow === 'shipping' ? 'active' : '')}>Shipping</button>
                                    <button onClick={() => setBillingFormShow('payment')} className={"btn btn-outline-success m-1 " + (BillingFormShow === 'payment' ? 'active' : '')}>Payment</button>
                                </div>
                                <div>
                                    <div className="card-body">
                                        {
                                            BillingFormShow === 'billing' &&
                                            <Billing></Billing>
                                        }
                                        {
                                            BillingFormShow === 'shipping' &&
                                            <Shipping></Shipping>
                                        }
                                        {
                                            BillingFormShow === 'payment' &&
                                            <Payment></Payment>
                                        }

                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => setShowPaymentModal(!ShowPaymentModal)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Procced</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateOrder
