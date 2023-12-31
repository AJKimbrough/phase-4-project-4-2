import React, { useState } from "react";
import { useHistory } from "react-router-dom"

function Register() {
const history = useHistory()
const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const handleRegister = async (formData) => {
    try {
        const response = await 
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if(response.ok) {
            alert('Registration successful!')
            history.push("/push")
        }
        else {
            const data = await response.json()
            alert(`Registration failed: ${data.message}`)
        }
    }
    catch(error) {
        console.error('Registration error:', error)
    }
}

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
}

const handleSubmit = (e) => {
    e.preventDefault()

    if(formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.")
        return
    }
    handleRegister(formData)
}

    return(
        <>
        <div className="overlay"></div>
        <div className="registration-modal">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
        </>
    )
}

export default Register