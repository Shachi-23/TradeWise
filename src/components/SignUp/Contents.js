// import React from 'react';
// import './Contents.css';
// import { Link, useNavigate } from 'react-router-dom';

// function Contents() {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate('/login'); 
//     };
//     return (
//         <div className="addUser">
//             <h1 className='text-center'>Sign Up</h1>
//             <form className='addUserForm'>
//                 <div className="inputGroup">
//                     <label className='mt-3' htmlFor='email' style={{ fontSize: "20px" }}>Email : </label>
//                     <input type='text' id='email' name='email' placeholder='Enter your Email Address' required />
//                     <label className='mt-3' htmlFor='password' style={{ fontSize: "20px" }}>Password : </label>
//                     <input type='text' id='Password' name='Password' placeholder='Enter your Key' required />
//                     <button className='mt-5 p-2 btn btn-primary mb-2' style={{width:"40%", borderRadius:"20px", margin: "0 auto", fontSize:"20px"}} onClick={handleClick}>Sign up</button>
//                 </div>
//             </form>
//             <div className='login text-center mt-2' style={{ fontSize: "18px" }}>
//                 <p>Already have account ? <Link to="/login">Login</Link></p>
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

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page refresh

        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                alert('User registered successfully!');
                navigate('/login');
            } else {
                alert('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('Something went wrong. Try again later.');
        }
    };

    return (
        <div className="addUser">
            <h1 className='text-center'>Sign Up</h1>
            <form className='addUserForm' onSubmit={handleSubmit}>
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
                        className='mt-5 p-2 btn btn-primary mb-2'
                        style={{ width: "40%", borderRadius: "20px", margin: "0 auto", fontSize: "20px" }}
                    >
                        Sign up
                    </button>
                </div>
            </form>
            <div className='login text-center mt-2' style={{ fontSize: "18px" }}>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Contents;
