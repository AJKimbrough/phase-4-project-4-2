import React, { useState } from "react";
import { Link } from "react-router-dom"

function Login({ handleSubmit, handleChange, formData}) {

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <p>Discover a better currency! <Link to="/register">Step into the future.</Link></p>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login