// import React, { useEffect, useState } from 'react';

// function Contents() {
//     const [stocks, setStocks] = useState([]);

//     useEffect(() => {
//         const fetchStocks = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/getAllStocks'); 
//                 const data = await response.json();
//                 setStocks(data);
//                 console.log('Stocks fetched successfully:', data);
//             } catch (error) {
//                 console.error('Error fetching stocks:', error);
//             }
//         };

//         fetchStocks();
//     }, []);
//     return (
//         <div className="container">
//             <div className="row mb-5 mt-5 text-center text-primary" style={{ fontSize: '30px' }}>
//                 <h3>Go Through and Add the stocks You Want</h3>
//             </div>
//             <div className='row'>
//                 <table class="table table-hover table-bordered">
//                     <thead class="table-light">
//                         <tr>
//                             <th scope="col">#</th>
//                             <th scope="col">Symbol</th>
//                             <th scope="col">Price</th>
//                             <th scope="col">Change</th>
//                             <th scope="col">Percent Change</th>
//                             <th scope="col">Add To Wishlist</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {stocks.length > 0 ? (
//                             stocks.map((stock, index) => (
//                                 <tr key={index}>
//                                     <th scope="row">{index + 1}</th>
//                                     <td>{stock.symbol}</td>
//                                     <td>{stock.price}</td>
//                                     <td>{stock.change}</td>
//                                     <td>{stock.percentChange}</td>
//                                     <td>
//                                         <div className="form-check">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 id={`wishlist-${index}`}
//                                                 value={stock.symbol}
//                                             />
//                                             <label className="form-check-label p-2" htmlFor={`wishlist-${index}`}>
//                                             </label>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="6" className="text-center">Loading or no stocks available.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="row text-center">
//                 <button
//                     className="btn btn-primary"
//                     style={{ width: "40%", borderRadius: "20px", fontSize: "20px" }}
//                     onClick={() => alert('Stocks added to wishlist!')}
//                 >
//                     Add To Wishlist
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Contents;




import React, { useEffect, useState } from 'react';

function Contents() {
    const [stocks, setStocks] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);

    const userId = localStorage.getItem("userId"); // Retrieve logged-in user's ID

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await fetch('http://localhost:8080/getAllStocks');
                const data = await response.json();
                setStocks(data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };
        fetchStocks();
    }, []);

    const handleCheckboxChange = (stock, isChecked) => {
        if (isChecked) {
            setSelectedStocks((prev) => [...prev, stock]);
        } else {
            setSelectedStocks((prev) => prev.filter((s) => s.symbol !== stock.symbol));
        }
    };

    const handleAddToWishlist = async () => {
        if (!userId || selectedStocks.length === 0) {
            alert("Please select at least one stock and ensure you're logged in.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/addToWishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    stocks: selectedStocks
                }),
            });

            const result = await response.text();
            console.log(result);
            alert(result);
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            alert("Error while adding to wishlist.");
        }
    };

    return (
        <div className="container">
            <div className="row mb-5 mt-5 text-center text-primary" style={{ fontSize: '30px' }}>
                <h3>Go Through and Add the Stocks You Want</h3>
            </div>
            <div className='row'>
                <table className="table table-hover table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Symbol</th>
                            <th scope="col">Price</th>
                            <th scope="col">Change</th>
                            <th scope="col">Percent Change</th>
                            <th scope="col">Add To Wishlist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.length > 0 ? (
                            stocks.map((stock, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{stock.symbol}</td>
                                    <td>{stock.price}</td>
                                    <td>{stock.change}</td>
                                    <td>{stock.percentChange}</td>
                                    <td>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`wishlist-${index}`}
                                                value={stock.symbol}
                                                onChange={(e) => handleCheckboxChange(stock, e.target.checked)}
                                            />
                                            <label className="form-check-label p-2" htmlFor={`wishlist-${index}`}></label>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <div class="spinner-grow text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="row text-center">
                <button
                    className="btn btn-primary"
                    style={{ width: "40%", borderRadius: "20px", fontSize: "20px" }}
                    onClick={handleAddToWishlist}
                >
                    Add To Wishlist
                </button>
            </div>
        </div>
    );
}

export default Contents;
