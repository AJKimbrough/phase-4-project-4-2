import React, { useState } from "react";

function Login({ handleLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if(response.status === 200) {
                const data = await response.json()
                const token = data.token

                handleLogin(token)
            }
            else {
                console.error('Login failed')
            }
        } 
        catch(error){
            console.error('Login error:', error)
        }
    }


    return (
        <div>
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
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login