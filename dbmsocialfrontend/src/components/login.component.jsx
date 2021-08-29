import React, { Component, useContext, useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom'
import validator from 'validator'
import Axios from 'axios'
import { AuthContext } from "../contexts/authContext";
import Dashboard from "./Dashboard/homepage";

const Login = ({ history }) => {
    const context = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [err, setErr] = useState("")
    const [auth, setAuth] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //let history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && validator.isEmail(email)) {
            const response = await Axios.post("http://localhost:3000/login", { email, password: pwd })
            if (response && response.data.success) {
                setAuth(true)
                setIsLoggedIn(true)
                console.log(response)
                context.login(response.data.data)
                history.push('/dashboard')
            }
        }
        else {
            setErr("Invalid Email")
        }
    }


    return (
        <form>
            <h3>Sign In</h3>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" style={{ marginTop: '5px' }} className="form-control" placeholder="Enter email" onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <span style={{
                    fontWeight: 'bold',
                    color: 'red',
                }}>{err}</span>
            </div>

            <div className="form-group">
                <label style={{ marginTop: '12px' }} >Password</label>
                <input type="password" style={{ marginTop: '5px' }} className="form-control" placeholder="Enter password" onChange={(e) => {
                    setPwd(e.target.value)
                }} />
            </div>

            <button type="submit" style={{ marginTop: '12px' }} className="btn btn-primary btn-block" onClick={handleLogin}>Submit</button>
            <p className="forgot-password text-right">
                <a href="/sign-up"> Register/Sign Up</a>
            </p>
        </form>
    );
}
export default Login