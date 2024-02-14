import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const Page = () => {
    const [user,setuser]=useState("");
    const [pass,setpass]=useState("");
    const [userclr,setuserclr]=useState(true)
    const [passclr,setpassclr]=useState(true)
    const redirectURL = function (url) {
        localStorage.login = true;
        location.href = url;
    }
    const validate_login=()=>{
        console.log(user);
        console.log(pass);
        if(user!= "admin" && pass=="admin@123"){
            console.log("The credentials were wrong")
            setuserclr(false)
            setpassclr(true)
            console.log(userclr);
        }
        else if(user=="admin" && pass!="admin@123"){
            setpassclr(false)
            setuserclr(true)
        }
        else if(user=="admin" && pass=="admin@123"){
            redirectURL("/view/home")

        }
        else{
            setuserclr(false)
            setpassclr(false)
        }
    }


    return (<>
        <main>
            <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
                <div className="container">
                    <p className="text-center">

                    </p>
                    <div
                        className="row justify-content-center form-bg-image"
                        data-background-lg="../../assets/img/illustrations/signin.svg"
                        style={{
                            background: 'url("../../assets/img/illustrations/signin.svg")',
                        
                        }}
                    >
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div className="text-center text-md-center mb-4 mt-md-0" >
                                    <img
                                        src="../../assets/img/brand/logo.png"
                                        height={100}
                                        width={100}
                                        alt="Chimera Logo"
                                        style={{marginLeft:'9.5rem'}}

                                    />
                                    <h1 className="mb-0 h3">ChimeraAI</h1>
                            </div>
                                {/* <form action="" className="mt-4">   */}
                                <div className="form-group mb-4">
                                    <label htmlFor="email">Chimera Id</label>
                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon1">
                                            <svg
                                                className="icon icon-xs text-gray-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </span>
                                      
                                        {
                                            userclr ===true ? <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter you SSO ID"
                                            id="email"
                                            autofocus=""
                                            required=""
                                            onChange={(e)=>{setuser(e.target.value)}}

                                        />:<input
                                        type="email"
                                        className="form-control border border-danger border-2"
                                        placeholder="Enter you SSO ID"
                                        id="email"
                                        autofocus=""
                                        required=""
                                        onChange={(e)=>{setuser(e.target.value)}}

                                    />

                                        }
                                            
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-group mb-4">
                                        <label htmlFor="password">Chimera Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text" id="basic-addon2">
                                                <svg className="icon icon-xs text-gray-600"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            {
                                            passclr==true ?<input
                                                type="password"
                                                placeholder="Password"
                                                className="form-control"
                                                id="password"
                                                required=""
                                                onChange={(e)=>{setpass(e.target.value)}}
                                                
                                            />:<input
                                            type="email"
                                            className="form-control border border-danger border-2"
                                            placeholder="Enter you SSO ID"
                                            id="email"
                                            autofocus=""
                                            required=""
                                            onChange={(e)=>{setpass(e.target.value)}}
                                        
                                        />  
                                            }                                          
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-top mb-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue=""
                                                id="remember"
                                            />
                                            <label className="form-check-label mb-0" htmlFor="remember">
                                                Remember me
                                            </label>
                                        </div>
                                        <div>
                                            <a
                                                href="/"
                                                className="small text-right"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-gray-800" onClick={validate_login}>
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    </>);
};

export default Page;
