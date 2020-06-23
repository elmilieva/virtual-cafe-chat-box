import React from 'react';
import './Register.css'

export const Register = () => {
    return (
        <div className="Register-form">
<form autoComplete="off" className="form">
            <div className="control">
                <h1>
                    Register
</h1>
            </div>
            <div className="control block-cube block-input">
                <input className='fancy-input' placeholder="First Name" type="text" style={{}} autoComplete="off" />
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
                <input className='fancy-input' name="Last Name" placeholder="Last Name" type="text" style={{}} autoComplete="off" />
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
                <input className='fancy-input' name="Username" placeholder="Username" type="text" style={{}} autoComplete="off" />
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


             <div className="control block-cube block-input">
                <input className='fancy-input' name="password" placeholder="E-mail" type="text" style={{}} autoComplete="off" />
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
                    Submit
</div>
            </button>
            <div className="credits">
                <a href="https://codepen.io/marko-zub/" target="_blank">
                    @
</a>
            </div>
        </form>
        
            {/* <form id="create-new-user-form" />
            <label className="firstname">First Name</label>
            <input type="text" className="input" id="firstname" name="firstname" />
            <br />
            <label className="lastname">Last Name</label>
            <input type="text" className="input" id="lastname" name="lastname" />
            <br />
            <label className="username">Username</label>
            <input type="text" className="input" id="username" name="username" />
            <br />
            <label className="password">Password</label>
            <input type="text" className="input" id="password" name="password" />
            <br />
            <label className="picurl">Picture URL</label>
            <input type="text" className="input" id="picurl" name="picurl" />
            <br />
            <label className="text">E-mail Address</label>
            <input type="text" className="input" id="picurl" name="picurl" />
            <br />
            <input type="submit" value="Register" id="submit-btn" /> */}


        </div>

    );

};
