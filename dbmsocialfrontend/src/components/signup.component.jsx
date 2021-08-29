import React, { Component, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../css/signup.css'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory()

    const handleClick = async()=>{
        await Axios.post("http://localhost:3000/createUser",{
            name,
            email,
            password
        })

        history.push('/')
    }
    return (
        <form className= "signup">
            <h3>Sign Up</h3>
            <div className="form-group">
                <TextField id="filled-basic" label="enter your name" variant="filled" autoComplete="false" style={{ marginBottom: "20px", width: "350px" }} onChange = {((e)=>{
                    setName(e.target.value)
                })} />
            </div>

            <div className="form-group">
                <TextField id="filled-basic" label="enter your email" variant="filled" autoComplete="false" style={{ marginBottom: "20px", width: "350px" }} 
                    onChange = {((e)=>{
                    setEmail(e.target.value)
                })}
                />
            </div>

            <div className="form-group">
                <TextField id="filled-basic" type = "password"label="enter your password" variant="filled" autoComplete="false" style={{ marginBottom: "20px", width: "350px" }} onChange = {((e)=>{
                    setPassword(e.target.value)
                })} />
            </div>

            <Button variant="contained" color="primary" component="span" onClick={handleClick}>
                Submit
            </Button>
            <p className="forgot-password text-right">
                Already registered <a href="/">sign in?</a>
            </p>
        </form>
    );
}
export default SignUp