import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import LeftSection from '../LeftSection';

function Contents() {
    const [holdings, setHoldings] = useState([]);

    useEffect(() => {
        const fetchHoldings = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:8080/holdings/${userId}`);
                const data = await response.json();
                setHoldings(data);
            } catch (error) {
                console.error("Error fetching holdings:", error);
            }
        };

        fetchHoldings();
    }, []);

    return (
        <div className="container-fluid" style={{ height: "100vh", overflowY: "auto" }}>
            <div className="row" style={{ height: "100%" }}>
                <div className="col-4 border-end">
                    <LeftSection />
                </div>

                <div className="col-8 p-3">
                    <h4 className="mb-3">Holdings</h4>

                    {/* Table */}
                    <table className="table table-hover table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Stock</th>
                                <th>Quantity</th>
                                <th>Buy Price</th>
                                <th>Current Price</th>
                                <th>Investment</th>
                                <th>Current Value</th>
                                <th>Unrealized P&L</th>
                                <th>Purchase Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holdings.length > 0 ? (
                                holdings.map((stock, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{stock.stock}</td>
                                        <td>{stock.quantity}</td>
                                        <td>{stock.buyPrice}</td>
                                        <td>{stock.currentPrice}</td>
                                        <td>{stock.investment}</td>
                                        <td>{stock.currentValue}</td>
                                        <td>
                                            <span
                                                className={`badge ${stock.unrealizedPnL >= 0 ? 'bg-success' : 'bg-danger'
                                                    }`}
                                            >
                                                {stock.unrealizedPnL.toFixed(2)}
                                            </span>
                                        </td>
                                        <td>{stock.purchaseDate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        <div class="spinner-border text-secondary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Graph */}
                    {/* Line Chart for Profit/Loss */}
                    {holdings.length > 0 && (
                        <>
                            <h5 className="mt-4">Profit / Loss Overview</h5>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <LineChart data={holdings}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="stock" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="unrealizedPnL"
                                            stroke="#8884d8"
                                            strokeWidth={2}
                                            name="Unrealized P&L"
                                            dot={{ r: 5 }}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Contents;
