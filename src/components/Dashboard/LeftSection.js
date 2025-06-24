import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function LeftSection() {
    const [wishlist, setWishlist] = useState([]);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [actionType, setActionType] = useState("");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [ownedStocks, setOwnedStocks] = useState([]);
    const [donutData, setDonutData] = useState([]);
    const COLORS = ['#FFB6C1', '#87CEFA', '#FFD700', '#98FB98', '#9370DB', '#FFA07A', '#20B2AA', '#6495ED', '#FFE4B5'];


    useEffect(() => {
        const fetchWishlist = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:8080/wishlist/${userId}`);
                const data = await response.json();
                setWishlist(data);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        fetchWishlist();
    }, []);

    useEffect(() => {
        const fetchOwnedStocks = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:8080/ownedStocks/${userId}`);
                const data = await response.json();
                setOwnedStocks(data);
            } catch (error) {
                console.error("Error fetching owned stocks:", error);
            }
        };

        fetchOwnedStocks();
    }, []);

    const renderChangeArrow = (percentChange) => {
        const change = parseFloat(percentChange);
        if (isNaN(change)) return "";
        return change >= 0 ? (
            <span style={{ color: "green" }}>↑ {change}%</span>
        ) : (
            <span style={{ color: "red" }}>↓ {Math.abs(change)}%</span>
        );
    };

    useEffect(() => {
        const fetchHoldings = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            try {
                const res = await fetch(`http://localhost:8080/holdings/${userId}`);
                const data = await res.json();

                const chartData = data.map((stock) => ({
                    name: stock.stock,
                    value: stock.investment
                }));

                setDonutData(chartData);
            } catch (err) {
                console.error("Error fetching donut data:", err);
            }
        };

        fetchHoldings();
    }, []);

    const handleActionClick = (stock, type) => {
        setSelectedStock(stock);
        setActionType(type);
        setAmount("");
        setShowModal(true);
    };

    const handleBuySell = async () => {
        const userId = localStorage.getItem("userId");

        if (!selectedStock || !quantity) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!userId) {
            alert("User ID not found.");
            return;
        }

        if (actionType === "Buy") {
            if (!amount) {
                alert("Please enter amount.");
                return;
            }

            const payload = {
                userId: parseInt(userId),
                stocks: [
                    {
                        symbol: selectedStock.symbol,
                        price: parseFloat(selectedStock.price),
                        percentChange: parseFloat(selectedStock.percentChange),
                        quantity: parseInt(quantity)
                    }
                ]
            };

            try {
                const response = await fetch("http://localhost:8080/addToOwnedStock", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.text();
                if (response.ok) {
                    alert("Stock bought successfully!!! Please reload the page to see the changes.");
                } else {
                    alert(`Error: ${result}`);
                }
            } catch (error) {
                alert("Something went wrong: " + error.message);
            }
        } else if (actionType === "Sell") {
            const payload = {
                userId: parseInt(userId),
                symbol: selectedStock.symbol,
                quantity: parseInt(quantity)
            };

            try {
                const response = await fetch("http://localhost:8080/sellStock", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.text();
                if (response.ok) {
                    alert("Stock sold successfully! Please reload the page to see the changes");
                } else {
                    alert(`Error: ${result}`);
                }
            } catch (error) {
                alert("Something went wrong: " + error.message);
            }
        }

        setShowModal(false);
    };


    return (
        <>
            <div className="row border-bottom" style={{ height: "40%", overflowY: "auto" }}>
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Symbol</th>
                            <th scope="col">Price</th>
                            <th scope="col">% Change</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist.length > 0 ? (
                            wishlist.map((stock, index) => (
                                <tr
                                    key={index}
                                    onMouseEnter={() => setHoveredRow(index)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    <th scope="row">{index + 1}</th>
                                    <td>{stock.symbol}</td>
                                    <td>{stock.price}</td>
                                    <td>{renderChangeArrow(stock.percentChange)}</td>
                                    <td>
                                        {hoveredRow === index && (
                                            <>
                                                <button
                                                    className="btn btn-sm btn-success me-2"
                                                    onClick={() => handleActionClick(stock, "Buy")}
                                                >
                                                    Buy
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleActionClick(stock, "Sell")}
                                                >
                                                    Sell
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No wishlist items.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="row">
                <div className="row mt-4">
                    <h5 className="text-center mb-3">Investment Distribution</h5>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart className='mt-3'>
                            <Pie
                                data={donutData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={80}
                                outerRadius={120}
                                fill="#8884d8"
                                label
                            >
                                {donutData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="horizontal" verticalAlign="top" align="center" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {showModal && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {actionType} - {selectedStock.symbol}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Amount:</label>
                                <input
                                    type="number"
                                    className="form-control mt-2"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount Here"
                                />
                                <label>Quantity:</label>
                                <input
                                    type="number"
                                    className="form-control mt-2"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Enter Quantity Here"
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleBuySell}>
                                    {actionType}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LeftSection;
