import React, { Component, useContext, useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom'
import validator from 'validator'
import Axios from 'axios'
import { AuthContext } from "../contexts/authContext";
import '../css/login.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        <form className= "login">
            <h3>Sign In</h3>
            <div className="form-group">
                <TextField id="filled-basic" label="email" variant="filled" autoComplete="false" style={{marginBottom: "20px", width: "350px"}} onChange={(e) => {
                    setEmail(e.target.value)
                    console.log(email)
                }}/>
                <span style={{
                    fontWeight: 'bold',
                    color: 'red',
                }}>{err}</span><br></br>
            </div>

            <div className="form-group">
            <TextField id="filled-basic" type="password" label="password" variant="filled" autoComplete="false" style={{marginBottom: "20px", width: "350px"}} onChange={(e) => {
                    setPwd(e.target.value)
                    console.log(pwd)
                }}/>
                
            </div>

            <Button variant="contained" color="primary" component="span" onClick={handleLogin}>
          Submit
        </Button>
            <p className="forgot-password text-right">
                <a href="/sign-up"> Register/Sign Up</a>
            </p>
        </form>
    );
}
export default Login