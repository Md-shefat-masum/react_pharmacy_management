import React from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../../../Hooks/UseAuth";

export default function Login() {
    console.log(UseAuth());
    let { login_with_google } = UseAuth();
    const handleLogin = () => {
        login_with_google();
    }
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
                        <form className="theme-form">
                            <div className="mb-3">
                                <label className="col-form-label pt-0">Your Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Password</label>
                                <input type="password" className="form-control" placeholder="Password"></input>
                            </div>
                            <div className="form-check checkbox">
                                <input className="form-check-input" id="checkbox1" type="checkbox"></input>
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
                                <div className="col-12">
                                    <button type="button" className="btn btn-warning" onClick={() => handleLogin()}>login with google</button>
                                </div>
                                <div className="col-md-4 my-2">
                                    <Link to="/consumer" className="btn btn-info">Consumer</Link>
                                </div>
                                <div className="col-md-4 my-2">
                                    <Link to="/dispensary" className="btn btn-info">Dispensary</Link>
                                </div>
                                <div className="col-md-4 my-2">
                                    <Link to="/physician" className="btn btn-info">Physician</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="auth-bg-effect">
                <div className="first-effect"></div>
                <div className="second-effect"></div>
                <div className="third-effect"></div>
                <div className="fourth-effect"></div>
            </div>

        </div>
    )
}

