import React, { useState } from "react";
import { Link } from "react-router-dom"

const loginStyle ={
    color: "white",
}

function Login({ handleSubmit, handleChange, formData}) {

    return (
        <>
        
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Email:</label>
                </div>
                <div className="user-box">
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label>Password:</label>
                <p style={loginStyle}>Discover a better currency! <Link to="/register">Step into the future.</Link></p>
                </div>
                <button type="submit">Login</button>
            </form>
            </div>
        </>
    )
}

export default Login