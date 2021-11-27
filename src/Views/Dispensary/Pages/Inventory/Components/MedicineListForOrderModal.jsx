import axios from 'axios';
import lodash from 'lodash';
import { Pagination } from 'react-laravel-paginex'

import React, { Component, useState, useEffect } from 'react'

export class MedicineListForOrderModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            medicine_list: [],
            selected_data: [],
        }
    }

    componentDidMount = () => {
        this.setState({
            selected_data: this.props.Data
        })
        this.LoadData({ page: 1 });
    }

    componentWillUnmount = () =>{
        // console.log(this.props);
        this.setState({
            selected_data: this.props.Data
        })
    }
    
    LoadData = (data) => {
        axios.get(`${process.env.REACT_APP_API_LINK}/drug-list?page=${data.page}&key=${data.key || ''}`)
            .then(res => {
                this.setState({
                    medicine_list: res.data
                },()=>{
                    this.checkExists();
                })
            })
    }

    checkExists = () => {
        let temp_medicine_list = { ...this.state.medicine_list };
        let temp_list = [...this.state.selected_data];
        temp_medicine_list.data = this.state.medicine_list.data?.filter(i => {
            if (temp_list.find(item => item.id === i.id)) {
                i.checked = true;
            }
            return i;
        })
        this.setState({
            medicine_list: temp_medicine_list
        })
    }

    handle_select = (drug) => {
        let temp_list = [...this.state.selected_data];
        let temp_medicine_list = { ...this.state.medicine_list };

        if (temp_list.find(item => item.id === drug.id)) {
            drug.checked = false;
            temp_list = temp_list.filter(item => item.id !== drug.id);
            temp_medicine_list.data = this.state.medicine_list.data.filter(i => {
                if (i.id === drug.id) {
                    i.checked = false;
                }
                return i;
            })
        } else {
            drug.qty = 1;
            temp_list.push(drug);
            temp_medicine_list.data = this.state.medicine_list.data.filter(i => {
                if (i.id === drug.id) {
                    i.checked = true;
                }
                return i;
            })
        }
        this.setState({
            selected_data: temp_list,
            medicine_list: temp_medicine_list,
        },()=>{
            this.props.setData(this.state.selected_data);
        })
    }

    remove_item = (drug) => {
        let temp_list = [...this.state.selected_data];
        let temp_medicine_list = { ...this.state.medicine_list };

        if (temp_list.find(item => item.id === drug.id)) {
            temp_list = temp_list.filter(item => item.id !== drug.id);
            temp_medicine_list.data = this.state.medicine_list.data.filter(i => {
                if (i.id === drug.id) {
                    i.checked = false;
                }
                return i;
            })
        }

        this.setState({
            selected_data: temp_list,
            medicine_list: temp_medicine_list,
        },()=>{
            this.props.setData(this.state.selected_data);
        })
    }

    render() {
        return (
            <div>
            <ul className="d-flex">
                {
                    this.state.selected_data.map((item) => {
                        return <li key={item.id} className="m-2">
                            <button type="button" className="btn btn-sm btn-outline-info px-2">
                                <i onClick={() => this.remove_item(item)} className="fa text-danger fa-times me-2"></i>
                                {item.name}
                            </button>
                        </li>
                    })
                }
            </ul>
            <div className="row">
                <div className="col-md-6">
                    <input type="text" 
                        onClick={(e)=>e.target.select()}
                        onKeyUp={lodash.debounce((e) => this.LoadData({ page: 1, key: e.target.value }), 1000)} 
                        placeholder="search by name." className="form-control m-1" />
                </div>
            </div>
            <table className="table table-bordered text-center table-hover">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Photo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Unit price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.medicine_list?.data?.map(item => {
                            return <tr key={item.id}>
                                <td>
                                    {
                                        item.checked ?
                                            <i onClick={() => this.handle_select(item)} className="fa fa-check-square-o text-success"></i>
                                            :
                                            <input onClick={() => this.handle_select(item)} type="checkbox"></input>
                                    }
                                </td>
                                <td>
                                    <img src={item.full_photo_url} style={{ width: 40 }} alt={item.name} />
                                </td>
                                <td>{item.name}</td>
                                <td className="font-info">
                                    {
                                        item.related_categories.map(iteme => <span className="badge m-1 badge-primary " key={iteme.id}>{iteme.name}</span>)
                                    }
                                </td>
                                <td className="font-info">
                                    {
                                        item.related_drug_manufacturer.map(iteme => <span className="badge m-1 badge-primary " key={iteme.id}>{iteme.name}</span>)
                                    }
                                </td>
                                <td style={{ width: 120 }}>$ {item.unit_price}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <br />
            {
                this.state.medicine_list?.data?.length > 0 &&
                <Pagination changePage={this.LoadData} numbersCountForShow={6} data={this.state.medicine_list} />
            }
        </div>
        )
    }
}

export default MedicineListForOrderModal

