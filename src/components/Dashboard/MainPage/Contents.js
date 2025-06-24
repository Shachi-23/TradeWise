import React, { useEffect, useState } from 'react';
import LeftSection from '../LeftSection';

function Contents() {
    const [availableFunds, setAvailableFunds] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [holdingsCount, setHoldingsCount] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        fetch("http://localhost:8080/myFunds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: parseInt(userId) })
        })
            .then(res => res.json())
            .then(data => setAvailableFunds(data))
            .catch(console.error);

        fetch(`http://localhost:8080/holdings/${userId}`)
            .then(res => res.json())
            .then(data => {
                let totalInvestment = 0;
                let totalCurrent = 0;

                data.forEach(stock => {
                    totalInvestment += stock.investment;
                    totalCurrent += stock.currentValue;
                });

                setInvestment(totalInvestment);
                setCurrentValue(totalCurrent);
                setHoldingsCount(data.length);
            })
            .catch(console.error);
    }, []);


    const pnl = currentValue - investment;
    const pnlPercent = investment ? ((pnl / investment) * 100).toFixed(2) : 0;

    return (
        <div className="container-fluid" style={{ height: "100vh", overflowY: "auto" }}>
            <div className="row" style={{ height: "100%" }}>
                <div className="col-4 border-end">
                    <LeftSection />
                </div>

                <div className="col-8 p-4">
                    <div className="border-bottom pb-3 mb-5 mt-5">
                        <h5 className="text-muted mb-5" style={{fontSize : "30px"}}>Equity</h5>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <div>
                                <h2 className='display-4'>{(availableFunds / 1000).toFixed(2)}k</h2>
                                <small className="text-muted mb-5">Margin Available</small>
                            </div>
                            <div className="text-end mb-5">
                                <div className="text-muted">Margins used <strong>0</strong></div>
                                <div className="text-muted">Opening balance <strong>{(availableFunds / 1000).toFixed(2)}k</strong></div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <h5 className="text-muted mb-5" style={{fontSize:"30px"}}>Holdings ({holdingsCount})</h5>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <div>
                                <h2 className = "display-4" style={{ color: pnl >= 0 ? "green" : "red" }}>
                                    {(Math.abs(pnl) / 1000).toFixed(2)}k
                                    <span className="ms-2" style={{ fontSize: "1rem" }}>
                                        {pnl >= 0 ? "+" : "-"}{Math.abs(pnlPercent)}%
                                    </span>
                                </h2>
                                <small className="text-muted">P&amp;L</small>
                            </div>
                            <div className="text-end">
                                <div className="text-muted">Current value <strong>{(currentValue / 1000).toFixed(2)}k</strong></div>
                                <div className="text-muted">Investment <strong>{(investment / 1000).toFixed(2)}k</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contents;
