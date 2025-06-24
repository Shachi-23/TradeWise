import React from 'react';
import {
  FaRocket, FaSearch, FaShoppingCart, FaChartPie, FaMoneyBillWave,
  FaUserShield, FaLightbulb, FaCheckCircle, FaCog, FaChartLine,
  FaBell, FaHistory, FaMobile
} from "react-icons/fa";

function LearnToUse() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to TradeWise</h1>
        <p className="lead text-muted">
          Your virtual stock investment platform for risk-free learning and practice.
        </p>
      </div>

      <div className="mb-5">
        <h3 className="mb-4"><FaRocket className="me-2 text-success" /> Platform Overview</h3>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {[
            { icon: FaChartPie, title: "Dashboard", desc: "Manage wishlist, track stocks, and view analytics" },
            { icon: FaMoneyBillWave, title: "Funds", desc: "Add or withdraw virtual money" },
            { icon: FaShoppingCart, title: "Holdings", desc: "Track owned stocks and performance" },
            { icon: FaUserShield, title: "Profile", desc: "View info & change password" },
            { icon: FaCheckCircle, title: "Logout", desc: "Securely exit to home" }
          ].map((item, i) => (
            <div key={i} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex align-items-start">
                  <item.icon className="me-3 fs-4 text-success" />
                  <div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="mb-4"><FaSearch className="me-2 text-primary" /> How to Use</h3>
        <ol className="list-group list-group-numbered">
          {[
            "Add to Wishlist - Track favorite stocks.",
            "Buy Stocks - Use funds to invest.",
            "Sell Stocks - Exit your holdings.",
            "Track Investments - Use charts to analyze.",
            "Manage Funds - Add or withdraw funds."
          ].map((step, i) => (
            <li key={i} className="list-group-item">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-5">
        <h3 className="mb-4"><FaCog className="me-2 text-purple" /> Key Features</h3>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {[
            { icon: FaChartLine, title: "Real-time Data", desc: "Live stock prices and market updates" },
            { icon: FaBell, title: "Price Alerts", desc: "Get notified when stocks hit targets" },
            { icon: FaHistory, title: "Trade History", desc: "Track all your transactions" },
            { icon: FaMobile, title: "Mobile Friendly", desc: "Use on the go" }
          ].map((item, i) => (
            <div key={i} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex align-items-start">
                  <item.icon className="me-3 fs-4 text-purple" />
                  <div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="mb-4"><FaLightbulb className="me-2 text-warning" /> Tips</h3>
        <ul className="list-group">
          {[
            "Buy low, sell high! Track % changes.",
            "Use donut & line charts to visualize.",
            "Change password in Profile.",
            "Available funds = buying power!"
          ].map((tip, i) => (
            <li key={i} className="list-group-item bg-light">
              💡 {tip}
            </li>
          ))}
        </ul>
      </div>

    
      <div className="alert alert-danger" role="alert">
        <FaUserShield className="me-2" />
        <strong>Your data is secure.</strong> This platform simulates trading—no real money involved.
      </div>

      <div className="text-center mt-5">
        <h4 className="fw-bold">Ready to Start Trading?</h4>
        <p className="text-muted">
          Start exploring the platform and build your virtual portfolio today!
        </p>
      </div>
    </div>
  );
}

export default LearnToUse;
