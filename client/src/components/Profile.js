import React, { useState, useEffect } from "react";

const profileStyle ={
    
    background: "lightblue",
    
}


function Profile({ user, name, email, wallet }) {
    console.log(user)
    console.log(wallet)
    const [formData, setFormData ] = useState({
        username: '',
        email: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const updateUser = async (updatedData) => {
        try {
          const response = await fetch('/update_profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
          })
      
          if (response.ok) {
            alert('Profile updated successfully!')
          } 
          else {
            alert('Profile update failed')
          }
        } 
        catch (error) {
          console.error('Profile update error:', error)
        }
      }
      
    const [isEditing, setisEditing] = useState(false)

    const handleEdit = () => {
        setisEditing(true)
    }

    const handleSave = () => {
        updateUser(formData)

        setisEditing(false)
    }

    return (
        <>
        <div className="profile" style={profileStyle}>
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
                <strong>Username:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <button onClick={handleEdit}>Edit Profile</button>
            </div>
          )}
          <h3>NFT Wallet</h3>
          {wallet.length === 0 ? (
        <p>You haven't purchased any NFTs yet!</p>
      ) : (
        <div>
          {wallet.map((product, index) => (
            <div key={index}>
              <p>
                <strong>Name:</strong> {product.name}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
        </div>
    </>
      );
    }

export default Profile