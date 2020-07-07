import React from 'react';
import './Login.css';

export const Login = () => {
    /*return (
        <div classNameName="Login-form">
            <form id="create-new-user-form" />
            <label classNameName="firstname">Username</label>
            <input type="text" classNameName="input" id="firstname" name="firstname" />
            <br/>
            <label classNameName="password">Password</label>
            <input type="text" classNameName="input" id="password" name="password" />
            <br/>
            <input type="submit" value="Login" id="submit-btn" />




        </div>

    );*/
    return (
        <form autoComplete="off" className="form">
            <div className="control">
                <h1>
                    Sign In
</h1>
            </div>
            <div className="control block-cube block-input">
                <input className='fancy-input' placeholder="Username" type="text" style={{}} autoComplete="off" />
                <div className="bg-top">
                    <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                    <div className="bg-inner"></div>
                </div>
                <div className="bg">
                    <div className="bg-inner"></div>
                </div>
            </div>
            <div className="control block-cube block-input">
                <input className='fancy-input' name="password" placeholder="Password" type="password" style={{}} autoComplete="off" />
                <div className="bg-top">
                    <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                    <div className="bg-inner"></div>
                </div>
                <div className="bg">
                    <div className="bg-inner"></div>
                </div>
            </div>
            <button className="btn block-cube block-cube-hover" type="button">
                <div className="bg-top">
                    <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                    <div className="bg-inner"></div>
                </div>
                <div className="bg">
                    <div className="bg-inner"></div>
                </div>
                <div className="text">
                    Log In
</div>
            </button>
        </form>
    );

};
