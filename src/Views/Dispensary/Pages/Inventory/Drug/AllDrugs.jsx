import React, { useEffect, useState } from 'react'

function AllDrugs() {
    const [MedicineList, setMedicineList] = useState([])
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
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Product Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        MedicineList.map(item => {
                            return <tr key={item.name}>
                                <td> #GG-{parseInt(Math.random() * 10000)} </td>
                                <td className="digits">{item.name}</td>
                                <td className="font-secondary">{parseInt(Math.random() * 100)}</td>
                                <td className="font-info">$ {item.price}</td>
                                <td className="font-info">active</td>
                                <td style={{ width: 350 }}>
                                    <div className="d-flex flex-wrap">
                                        <a href="#/" className="btn m-2 btn-air-secondary">Details</a>
                                        <a href="#/" className="btn m-2 btn-air-success">Edit</a>
                                        <a href="#/" className="btn m-2 btn-air-danger">Delete</a>
                                    </div>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default AllDrugs
