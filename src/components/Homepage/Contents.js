import React from 'react';
import { useNavigate } from 'react-router-dom';

function Contents() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/signup');
    }
    return (
        <div className='container mt-5'>
            <div className='row text-center'>
                <div className='col'>
                    <img style={{ width: "75%", }} src='Images/TopImage.png' alt='MainImage' />
                    <h1 className='mt-3'>Invest in everything</h1>
                    <p className='mt-2' style={{ fontSize: "25px" }}>Your platform to explore and understand the world of investments.</p>
                    <button className='mt-4 p-2 btn btn-primary mb-5' style={{ width: "15%", borderRadius: "20px", margin: "0 auto", fontSize: "20px" }} onClick={handleClick}>Sign up for free</button>
                    <h2 className='mt-3'>Simplifying Investments, Empowering Your Financial Growth</h2>
                </div>
            </div>
            <div className='row mt-5 mb-5'>
                <div className='col'>
                    <div className='row mb-4'>
                        <p style={{ fontSize: "35px" }}>Invest with confidence</p>
                        <p style={{ fontSize: "24px", opacity: "89%" }}>Committed to providing a seamless and secure,<br />investment experience tailored to your needs.</p>
                    </div>
                    <div className='row'>
                        <p style={{ fontSize: "35px" }}>Investment Made Simple</p>
                        <p style={{ fontSize: "24px", opacity: "89%" }}>Easy-to-use tools to help you invest smarter<br />and achieve your goals.</p>
                    </div>
                    <div className='row'>
                        <p style={{ fontSize: "35px" }}>A New Way to Invest</p>
                        <p style={{ fontSize: "24px", opacity: "89%" }}>Reimagining investment platforms—focused on<br />your experience and growth.</p>
                    </div>
                </div>
                <div className='col text-center'>
                    <img src='Images/leftimage.png' alt='leftimg' style={{ width: "120%" }} />
                </div>
            </div>
            <div className='row mt-5 mb-5'>
                <div className='col'>
                    <img src='Images/rightimage2.png' alt='rightimg' style={{ width: "90%" }} />
                </div>
                <div className='col'>
                    <div className='row mt-5 mx-5 mb-4'>
                        <p style={{ fontSize: "35px" }}>Take Control of Your Finances</p>
                        <p style={{ fontSize: "24px", opacity: "89%" }}>Empowering you with the right tools to make confident<br />investment decisions.</p>
                    </div>
                    <div className='row mx-5'>
                        <p style={{ fontSize: "35px" }}>Simplicity at its best</p>
                        <p style={{ fontSize: "24px", opacity: "89%" }}>Focus on your goals without distractions—no gimmicks,<br />just reliable tools and features.</p>
                    </div>
                </div>
            </div>
            <div className='row mt-5 text-center mb-5'>
                <div className='col'>
                    <h1>Open an account</h1>
                    <p className='mt-3' style={{ fontSize: "25px" }}>Modern platform,  0 investments</p>
                    <button className='mt-4 p-2 btn btn-primary mb-5' style={{ width: "15%", borderRadius: "20px", margin: "0 auto", fontSize: "20px" }} onClick={handleClick}>Sign up for free</button>
                </div>
            </div>
        </div>
    );
}

export default Contents;