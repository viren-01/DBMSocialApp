import React, { Component } from "react";

const SignUp = ()=> {
    return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" />
                </div>

                <div className="form-group">
                    <label style = {{marginTop: '12px' }}>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label style = {{marginTop: '12px' }}>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" style = {{marginTop: '12px' }} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">sign in?</a>
                </p>
            </form>
        );
}
export default SignUp