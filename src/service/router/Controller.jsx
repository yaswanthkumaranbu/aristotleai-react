import React, { lazy, useEffect, useState } from 'react';
// import shortid from 'shortid';
import { BrowserRouter, Routes, Route, Outlet, Link, useParams, Navigate } from "react-router-dom";
import { Router1, Router2, Router3 } from "./Router";
import AdminLayout from '../../component/AdminLayout'; 
import Login from '../../pages/Login';
import useAuth from "../Auth.jsx";
import CharacterChat from '../../pages/view/CharacterChat.js';

function RequireAuth({ children }) {
    const { authed } = useAuth();
    // const location = useLocation();

    return authed == "true"
        ? children
        : <Navigate to="/login" replace />;
}


export default function Controller() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="/" element={<Login />} />
                        <Route path="/:userId" element={<Router1 />} />
                    </Route>
                    <Route path="/" element={<AdminLayout />}>

                        <Route path=":router1/:router2" element={<RequireAuth><Router2 /></RequireAuth>} />
                        {/* <Route path=":router1/:router2" render={({ staticContext }) => {
                            debugger;
                            if (staticContext) staticContext.status = code;
                            return children;
                        }} /> */}

                    </Route>
                    <Route path='/characterai/chat' Component={CharacterChat}/>
                </Routes>
            </BrowserRouter>
        </>
    );
} 
