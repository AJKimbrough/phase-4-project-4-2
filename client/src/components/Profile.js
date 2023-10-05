import React, { useState } from "react";

function Profile({ user, updateUser }) {
    const [formData, setFormData ] = useState({
        username: '',
        email: '',
    })

    const [isEditing, setisEditing] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleEdit = () => {
        setisEditing(true)
    }

    const handleSave = () => {
        updateUser(formData)

        setisEditing(false)
    }

    return (
        <div>
        <h2>Profile</h2>
        {isEditing ? (
            <div>
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
            <button onClick={handleSave}>Save</button>
            </div>
        ) : (
        <div>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
    )
}

export default Profile