import React, { useState, useEffect } from 'react';
import LeftSection from '../LeftSection';

function Contents() {
    const [showModal, setShowModal] = useState(false);
    const [fundType, setFundType] = useState("");
    const [fundAmount, setFundAmount] = useState("");
    const [availableFunds, setAvailableFunds] = useState(0);
    const [investedAmount, setInvestedAmount] = useState(0);


    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            try {
                const userResponse = await fetch(`http://localhost:8080/myFunds`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId: parseInt(userId) })
                });
                const available = await userResponse.json();
                setAvailableFunds(available);

                const holdingsResponse = await fetch(`http://localhost:8080/holdings/${userId}`);
                const holdingsData = await holdingsResponse.json();

                const totalInvestment = holdingsData.reduce((acc, stock) => acc + stock.investment, 0);
                setInvestedAmount(totalInvestment);
            } catch (error) {
                console.error("Error fetching funds or holdings:", error);
            }
        };

        fetchUserData();
    }, [showModal]);

    const openModal = (type) => {
        setFundType(type);
        setFundAmount("");
        setShowModal(true);
    };

    const handleSubmitFunds = async () => {
        const userId = parseInt(localStorage.getItem("userId"));
        const amountNum = parseFloat(fundAmount);

        if (!userId || !amountNum || amountNum <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const payload = {
            userId,
            amount: amountNum,
            type: fundType.toLowerCase()
        };

        try {
            const response = await fetch("http://localhost:8080/transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.text();

            if (response.ok) {
                alert(`${fundType} successful!`);
            } else {
                alert(`Error: ${result}`);
            }
        } catch (error) {
            alert("Something went wrong: " + error.message);
        }

        setShowModal(false);
    };

    return (
        <div className="container-fluid" style={{ height: "100vh", overflowY: "auto" }}>
            <div className="row" style={{ height: "100%" }}>
                <div className="col-4 border-end">
                    <LeftSection />
                </div>
                <div className="col-8">
                    <div className='row'>
                        <div className='p-3'>
                            <h4 className='display-5 mb-3 mt-5'>Available Funds: ₹ {Number(availableFunds || 0).toLocaleString()}</h4>
                            <h4 className='display-5 mb-5'>Invested Amount: ₹ {Number(investedAmount || 0).toLocaleString()}</h4>
                            <h4 className='display-5 mb-5'>Total Account Value: ₹ {Number((availableFunds || 0) + (investedAmount || 0)).toLocaleString()}</h4>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 p-3'>
                            <button className='btn btn-primary m-3' onClick={() => openModal("Add")}>Add Funds</button>
                        </div>
                        <div className='col-6 p-3'>
                            <button className='btn btn-primary m-3' onClick={() => openModal("Withdraw")}>Withdraw Funds</button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{fundType} Funds</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Enter Amount (₹):</label>
                                <input
                                    type="number"
                                    className="form-control mt-2"
                                    value={fundAmount}
                                    onChange={(e) => setFundAmount(e.target.value)}
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleSubmitFunds}>
                                    {fundType}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contents;
