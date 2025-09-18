// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// const Dashboard = () => {
//     const [message, setMessage] = useState('');
//     const { logout } = useContext(AuthContext);

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             try {
//                 // Axios will automatically use the auth header we set in AuthContext
//                 const response = await axios.get('http://localhost:8088/api/dashboard/welcome');
//                 setMessage(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch dashboard data', error);
//                 setMessage('Failed to load data. You might not be authorized.');
//             }
//         };

//         fetchDashboardData();
//     }, []);

//     return (
//         <div className="text-center">
//             <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
//             <p className="text-xl text-green-700">{message}</p>
//             <button
//                 onClick={logout}
//                 className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Logout
//             </button>
//         </div>
//     );
// };

// export default Dashboard;