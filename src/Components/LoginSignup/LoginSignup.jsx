import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import phone_icon from '../Assets/phone.png';

export const LoginSignup = () => {
    const [action, setAction] = useState('Sign Up');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    // Update form data as user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle submission for the current action (Sign Up or Login)
    const handleSubmit = async () => {
        if (action === 'Sign Up') {
            // Handle registration
            try {
                const response = await axios.post('http://localhost:5000/register', {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                });
                alert(response.data); // Display success message
            } catch (error) {
                console.error('Error during registration:', error);
                alert('Registration failed. Please try again.');
            }
        } else if (action === 'Login') {
            // Handle login
            try {
                const response = await axios.post('http://localhost:5000/login', {
                    email: formData.email,
                    password: formData.password,
                });
                alert(response.data.message); // Display welcome message
            } catch (error) {
                console.error('Error during login:', error);
                alert('Login failed. Please check your credentials.');
            }
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {/* Show name and phone fields only for Sign Up */}
                {action === 'Sign Up' && (
                    <>
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input">
                            <img src={phone_icon} alt="" />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input
                        type="email"
                        placeholder="E-Mail ID"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
            </div>
            
            {/* Show forgot password only for Login */}
            {action === 'Login' && (
                <div className="forgot-password">
                    Lost Password? <span>Click Here</span>
                </div>
            )}

            <div className="submit-container">
                {/* Sign Up button */}
                <div
                    className={action === 'Sign Up' ? 'submit' : 'submit gray'}
                    onClick={() => {
                        if (action === 'Sign Up') handleSubmit();
                        else setAction('Sign Up');
                    }}
                >
                    Sign Up
                </div>

                {/* Login button */}
                <div
                    className={action === 'Login' ? 'submit' : 'submit gray'}
                    onClick={() => {
                        if (action === 'Login') handleSubmit();
                        else setAction('Login');
                    }}
                >
                    Login
                </div>
            </div>
        </div>
    );
};
