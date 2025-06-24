// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Contents() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userId = localStorage.getItem("userId");
//         if (!userId) return;

//         fetch(`http://localhost:8080/user/${userId}`)
//             .then(res => res.json())
//             .then(data => {
//                 setEmail(data.email);
//                 setPassword(data.password);
//             })
//             .catch(err => console.error("Error fetching user:", err));
//     }, []);

//     const handleChangePassword = async () => {
//         const userId = parseInt(localStorage.getItem("userId"));

//         if (!oldPassword || !newPassword) {
//             alert("Please enter both old and new passwords.");
//             return;
//         }

//         const payload = {
//             userId,
//             oldPassword,
//             newPassword
//         };

//         try {
//             const res = await fetch("http://localhost:8080/changePassword", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(payload)
//             });

//             const result = await res.text();
//             if (res.ok) {
//                 alert("Password changed successfully!");
//                 setOldPassword("");
//                 setNewPassword("");
//             } else {
//                 alert("Error: " + result);
//             }
//         } catch (err) {
//             console.error(err);
//             alert("Something went wrong.");
//         }
//     };

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/");
//     };

//     return (
//         <div className="container p-4">
//             <h2>User Profile</h2>
//             <div className="mt-3">
//                 <p><strong>Email:</strong> {email}</p>
//                 <p><strong>Password:</strong> {password}</p>
//             </div>

//             <h5 className="mt-4">Change Password</h5>
//             <input
//                 type="password"
//                 placeholder="Old Password"
//                 className="form-control mb-2"
//                 value={oldPassword}
//                 onChange={e => setOldPassword(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="New Password"
//                 className="form-control mb-2"
//                 value={newPassword}
//                 onChange={e => setNewPassword(e.target.value)}
//             />
//             <button className="btn btn-warning mb-3" onClick={handleChangePassword}>
//                 Change Password
//             </button>

//             <hr />
//             <button className="btn btn-danger" onClick={handleLogout}>
//                 Logout
//             </button>
//         </div>
//     );
// }

// export default Contents;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contents() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        fetch(`http://localhost:8080/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                setEmail(data.email);
                setPassword(data.password); // Optional: show masked
            })
            .catch(err => console.error("Error fetching user:", err));
    }, []);

    const handleChangePassword = async () => {
        const userId = parseInt(localStorage.getItem("userId"));

        if (!oldPassword || !newPassword) {
            alert("Please enter both old and new passwords.");
            return;
        }

        const payload = {
            userId,
            oldPassword,
            newPassword
        };

        try {
            const res = await fetch("http://localhost:8080/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await res.text();
            if (res.ok) {
                alert("Password changed successfully!");
                setOldPassword("");
                setNewPassword("");
            } else {
                alert("Error: " + result);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h3 className="card-title text-center mb-4">User Profile</h3>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email:</label>
                            <div className="form-control bg-light">{email}</div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Password:</label>
                            <div className="form-control bg-light">{password}</div>
                        </div>

                        <h5 className="mt-4 mb-3 text-primary">Change Password</h5>
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button className="btn btn-outline-primary w-100 mb-3" onClick={handleChangePassword}>
                            Update Password
                        </button>

                        <hr />
                        <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contents;
