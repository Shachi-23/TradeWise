// import React, { useState } from 'react';
// import './Contents.css';
// import { Link, useNavigate } from 'react-router-dom';

// function Contents() {
//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:8080/authenticate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password,
//                 }),
//             });

//             const result = await response.json();

//             if (result.status === 'success') {
//                 console.log('Login successful. User ID:', result.userId);

//                 // ✅ Store user ID in localStorage
//                 localStorage.setItem('userId', result.userId);

//                 // ✅ Navigate to main page
//                 navigate('/mainpage');
//             } else if (result.status === 'error') {
//                 alert(result.message || 'Invalid credentials');
//             } else {
//                 alert('Unexpected response from server');
//             }

//         } catch (error) {
//             console.error('Login error:', error);
//             alert('Server error. Please try again later.');
//         }
//     };

//     return (
//         <div className="addUser">
//             <h1 className='text-center'>Log In</h1>
//             <form className='addUserForm' onSubmit={handleLogin}>
//                 <div className="inputGroup">
//                     <label className='mt-3' htmlFor='email' style={{ fontSize: "20px" }}>Email:</label>
//                     <input
//                         type='email'
//                         id='email'
//                         name='email'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder='Enter your Email Address'
//                         required
//                     />
//                     <label className='mt-3' htmlFor='password' style={{ fontSize: "20px" }}>Password:</label>
//                     <input
//                         type='password'
//                         id='password'
//                         name='password'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder='Enter your Password'
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className='mt-5 p-2 btn btn-primary mb-2'
//                         style={{ width: "40%", borderRadius: "20px", margin: "0 auto", fontSize: "20px" }}
//                     >
//                         Log In
//                     </button>
//                 </div>
//             </form>
//             <div className='login text-center mt-2' style={{ fontSize: "18px" }}>
//                 <p>Didn't open an account yet? <Link to="/signup">SignUp</Link></p>
//             </div>
//         </div>
//     );
// }

// export default Contents;





import React, { useState } from 'react';
import './Contents.css';
import { Link, useNavigate } from 'react-router-dom';

function Contents() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                localStorage.setItem('userId', result.userId);
                navigate('/mainpage');
            } else {
                alert(result.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Server error. Please try again later.');
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await fetch('http://localhost:8080/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: resetEmail,
                    newPassword: newPassword,
                }),
            });

            const result = await response.text();
            if (response.ok) {
                alert('Password reset successfully!');
                setShowForgotModal(false);
                setResetEmail('');
                setNewPassword('');
            } else {
                alert(result || 'Failed to reset password.');
            }
        } catch (error) {
            console.error('Reset error:', error);
            alert('Something went wrong.');
        }
    };

    return (
        <div className="addUser">
            <h1 className='text-center'>Log In</h1>
            <form className='addUserForm' onSubmit={handleLogin}>
                <div className="inputGroup">
                    <label className='mt-3' htmlFor='email' style={{ fontSize: "20px" }}>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your Email Address'
                        required
                    />
                    <label className='mt-3' htmlFor='password' style={{ fontSize: "20px" }}>Password:</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your Password'
                        required
                    />
                    <button
                        type="submit"
                        className='mt-4 p-2 btn btn-primary mb-2'
                        style={{ width: "40%", borderRadius: "20px", margin: "0 auto", fontSize: "20px" }}
                    >
                        Log In
                    </button>

                    <div className="text-center mt-3">
                        <span
                            onClick={() => setShowForgotModal(true)}
                            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                        >
                            Forgot Password?
                        </span>
                    </div>
                </div>
            </form>

            <div className='login text-center mt-3' style={{ fontSize: "18px" }}>
                <p>Didn't open an account yet? <Link to="/signup">SignUp</Link></p>
            </div>

            {/* Forgot Password Modal */}
            {showForgotModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reset Password</h5>
                                <button type="button" className="btn-close" onClick={() => setShowForgotModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="form-control mt-2"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    placeholder="Enter your registered email"
                                />
                                <label className="mt-3">New Password:</label>
                                <input
                                    type="password"
                                    className="form-control mt-2"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowForgotModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleForgotPassword}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contents;
