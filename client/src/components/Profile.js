import React, { useState, useEffect } from "react";


function Profile({ user, name, email }) {
    console.log(user)
    
    const [orders, setOrders] = useState([]);
    const [formData, setFormData ] = useState({
        username: '',
        email: '',
    })

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

      const fetchUserOrders = async () => {
        try {
          const response = await fetch('/get_user_orders')
          if (response.ok) {
            const data = await response.json()
            setOrders(data);
          } 
          else {
          }
        } 
        catch (error) {
          console.error('Error fetching user orders:', error)
        }
      }

      useEffect(() => {
        fetchUserOrders()
      }, [])
      
      const orderHistory = orders.map((order) => (
        <div key={order.id}>
        </div>
      ))
      
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
                <strong>Username:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <button onClick={handleEdit}>Edit Profile</button>
            </div>
          )}
          <h3>Order History</h3>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <div>
              {orders.map((order) => (
                <div key={order.id}>
                  <p>
                    <strong>Order Date:</strong> {order.orderDate}
                  </p>
                  <p>
                    <strong>Items:</strong>
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${order.totalPrice}
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

export default Profile