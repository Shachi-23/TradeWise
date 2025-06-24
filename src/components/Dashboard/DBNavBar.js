import React from 'react';
import { Link } from 'react-router-dom';
function DBNavBar() {
    return (
        <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="Images/logo.png" alt="Logo" style={{ width: "50%" }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5" style={{ fontSize: "22px" }}>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/addtowishlist"><i class="fa fa-heart-o" aria-hidden="true"></i> Add to Wishlist</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/mainpage"><i class="fa fa-tachometer" aria-hidden="true"></i>  Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/holdings"><i class="fa fa-line-chart" aria-hidden="true"></i> Holdings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/funds"><i class="fa fa-inr" aria-hidden="true"></i> Funds</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/userprofile"><i class="fa fa-user" aria-hidden="true"></i></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default DBNavBar;
