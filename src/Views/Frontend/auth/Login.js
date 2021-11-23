import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../../../Hooks/UseAuth";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { set_user, user, set_user_loged_in, set_checked_auth, navigate_to } = UseAuth();

    // let { login_with_google } = UseAuth();
    // const handleLogin = () => {
    //     login_with_google();
    // }

    useEffect(() => {
        set_user_loged_in(true);
        set_checked_auth(true);
        navigate_to();
    }, [user])

    const onSubmit = async (data) => {
        let form_data = new FormData()
        for (var key in data) {
            form_data.append(key, data[key]);
        }

        // console.log(data);
        let login_res = await axios.post(`${process.env.REACT_APP_API_LINK}/user/login`, form_data, {})
        if (login_res.data.user) {
            // console.log(login_res.data.access_token);
            set_user(login_res.data.user);
            window.localStorage.setItem('access_token', login_res.data.access_token);
        }
    };
    return (
        <div className="page-wrapper">
            <div className="auth-bg">
                <div className="authentication-box">
                    <div className="text-center">
                        <img src="/tlogo.png" style={{ height: 120 }} alt="site-logo" />
                    </div>
                    <h4 className="text-center">LOGIN</h4>
                    {/* <h6 className="text-center">Enter your Username and Password For Login</h6> */}
                    <div className="card mt-4 p-4 mb-0">
                        <form onSubmit={handleSubmit(onSubmit)} className="theme-form">
                            <div className="mb-3">
                                <label className="col-form-label pt-0">Username / Email</label>
                                <input type="text" {...register("email", { required: true })} name="email" className="form-control" />
                                {errors.email && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Password</label>
                                <input type="text" {...register("password", { required: true })} name="password" className="form-control" />
                                {errors.password && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-check checkbox">
                                <input className="form-check-input" {...register("remember")} id="checkbox1" type="checkbox"></input>
                                <label className="form-check-label" htmlFor="checkbox1">Remember me</label>
                            </div>
                            <div className="row g-2">
                                <div className="col-lg-3 col-md-4">
                                    <button type="submit" className="btn btn-secondary">Sign IN</button>
                                </div>
                                <div className="col-md-8">
                                    <div className="text-start mt-2 m-l-20">
                                        Don't have an account?&nbsp;&nbsp;
                                        <Link to="/signup" className="btn-link text-capitalize">Signup</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3 text-center">
                                {/* <div className="col-12">
                                    <button type="button" className="btn btn-warning" onClick={() => handleLogin()}>login with google</button>
                                </div> */}
                                <div className="col-md-4 my-2">
                                    <Link to="#/" onClick={()=>onSubmit({email:'consumer@gmail.com',password:'12345678'})} className="btn btn-info">Consumer</Link>
                                </div>
                                <div className="col-md-4 my-2">
                                    <Link to="#/" onClick={()=>onSubmit({email:'pharmacy@gmail.com',password:'12345678'})} className="btn btn-info">Dispensary</Link>
                                </div>
                                <div className="col-md-4 my-2">
                                    <Link to="#/" onClick={()=>onSubmit({email:'doctor@gmail.com',password:'12345678'})} className="btn btn-info">Physician</Link>
                                </div>
                            </div>
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

