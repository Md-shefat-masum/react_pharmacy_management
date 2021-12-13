import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UseAuth } from "../../../Hooks/UseAuth";
// import { UseAuth } from "../../../Hooks/UseAuth";

export default function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [Active, setActive] = useState('consumer');
    const [imagePreview, setImagePreview] = useState('');
    const { set_user, set_user_loged_in, set_checked_auth } = UseAuth();

    const password = useRef({});
    const image = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data) => {
        let form_data = new FormData()
        form_data.append('image', image.current.files[0])
        for (var key in data) {
            form_data.append(key, data[key]);
        }

        let role_serial = 5;
        Active === 'deliveryman' && (role_serial = 6);
        Active === 'pharmacy' && (role_serial = 4);
        Active === 'physician' && (role_serial = 3);
        form_data.append('role_serial', role_serial);

        axios.post(`${process.env.REACT_APP_API_LINK}/user/register`, form_data)
            .then(res => {
                console.log(res.data);
                set_user(res.data);
                set_user_loged_in(true);
                set_checked_auth(true);
                window.localStorage.setItem('access_token',res.data.access_token);
            })

    };

    return (
        <div className="page-wrapper">
            <div className="auth-bg">
                <div className="container">
                    <div className="text-center">
                        <img src="/tlogo.png" style={{ height: 120 }} alt="site-logo" />
                    </div>
                    <h4 className="text-center text-uppercase">
                        {Active === 'consumer' && 'consumer'}
                        {Active === 'pharmacy' && 'pharmacy'}
                        {Active === 'physician' && 'physician'}
                        {Active === 'deliveryman' && 'deliveryman'}
                        &nbsp; SIGNUP
                    </h4>
                    {/* <h6 className="text-center">Enter your Username and Password For Login</h6> */}
                    <div className="text-center">
                        <button onClick={() => setActive('consumer')} className={"m-1 btn btn-outline-secondary " + (Active === 'consumer' ? 'active' : '')}>Consumer</button>
                        <button onClick={() => setActive('pharmacy')} className={"m-1 btn btn-outline-primary " + (Active === 'pharmacy' ? 'active' : '')}>Dispensary</button>
                        <button onClick={() => setActive('physician')} className={"m-1 btn btn-outline-success " + (Active === 'physician' ? 'active' : '')}>Physician</button>
                        <button onClick={() => setActive('deliveryman')} className={"m-1 btn btn-outline-info " + (Active === 'deliveryman' ? 'active' : '')}>Deliveryman</button>
                    </div>
                    <div className="card mt-4 p-4 mb-0">
                        <form className="theme-form row" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">First Name</label>
                                <input type="text" {...register("first_name", { required: true })} name="first_name" className="form-control" />
                                {errors.first_name && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">Last Name</label>
                                <input type="text" {...register("last_name", { required: true })} name="last_name" className="form-control" />
                                {errors.last_name && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">User Name</label>
                                <input type="text" {...register("user_name", { required: true })} name="user_name" className="form-control" />
                                {errors.user_name && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">Email</label>
                                <input type="text" {...register("email", { required: true })} name="email" className="form-control" />
                                {errors.email && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">Contact Number</label>
                                <input type="text" {...register("contact_number", { required: true })} name="contact_number" className="form-control" />
                                {errors.contact_number && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">Date of birth</label>
                                <input type="date" {...register("dob", { required: true })} name="dob" className="form-control" />
                                {errors.dob && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">Street</label>
                                <input type="text" {...register("street", { required: true })} name="street" className="form-control" />
                                {errors.street && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">City</label>
                                <input type="text" {...register("city", { required: true })} name="city" className="form-control" />
                                {errors.city && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">Zip Code</label>
                                <input type="text" {...register("zip_code", { required: true })} name="zip_code" className="form-control" />
                                {errors.zip_code && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label pt-0">Country</label>
                                <input type="text" {...register("country", { required: true })} name="country" className="form-control" />
                                {errors.country && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label">Password</label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters"
                                    }
                                })} name="password" className="form-control" placeholder="Password"></input>
                                {errors.password && <span className="text-danger">{errors?.password?.message}</span>}
                            </div>

                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label">Confirm Password</label>
                                <input type="password" {...register("password_confirmation", {
                                    required: true,
                                    validate: value => value === password.current || "The passwords do not match"
                                })} name="password_confirmation" className="form-control" placeholder="Password"></input>
                                {errors.password_confirmation && <span className="text-danger">{errors?.password_confirmation?.message}</span>}
                            </div>

                            <div className="mb-3 col-lg-6">
                                <label className="col-form-label">Photo <sup className="text-danger"> ( Passport size 200*200 px )</sup></label>
                                <input ref={image} name="image" onChange={() => setImagePreview(URL.createObjectURL(image.current.files[0]))} type="file" className="form-control" placeholder="image"></input>
                                {imagePreview.length > 0 && <img src={imagePreview} alt="profile" className="img-thumbnail mt-3" style={{ width: 100, }} />}
                            </div>
                            {/* <div className="form-check checkbox">
                                <input className="form-check-input" id="checkbox1" type="checkbox"></input>
                                <label className="form-check-label" htmlFor="checkbox1">Remember me</label>
                            </div> */}
                            <div className="row g-2">
                                <div className="col-lg-3 col-md-4">
                                    <button type="submit" className="btn btn-secondary">Sign Up</button>
                                </div>
                                <div className="col-md-8">
                                    <div className="text-start mt-2 m-l-20">
                                        Already have an account?&nbsp;&nbsp;
                                        <Link to="/signin" className="btn-link text-capitalize">SignIn</Link>
                                    </div>
                                </div>

                            </div>
                            {/* <div className="row mt-3">
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-primary">LOGIN</button>
                                    <button type="button" onClick={() => handleLogin()}>login with google</button>
                                </div>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
            <div className="auth-bg-effect">
                {/* <div className="first-effect"></div>
                <div className="second-effect"></div>
                <div className="third-effect"></div>
                <div className="fourth-effect"></div> */}
            </div>

        </div>
    )
}

