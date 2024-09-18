import { useState, useEffect, useCallback } from 'react';
import './ComplaintList.css'
function ComplaintsList() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useState({ passenger_name: '', complaint_id: '' });

    // Fetch complaints based on search parameters
    const fetchComplaints = useCallback(async () => {
        try {
            const query = new URLSearchParams(searchParams).toString();
            const response = await fetch(`http://localhost:5000/api/complaints?${query}`);

            if (!response.ok) {
                throw new Error('Failed to fetch complaints');
            }

            const data = await response.json();
            setComplaints(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [searchParams]); // Use searchParams as the dependency

    // Fetch complaints when search parameters change
    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="complaints-list-container">
            <h2>Search Complaints</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    fetchComplaints();
                }}
                className="search-form"
            >
                <div className="form-group">
                    <label htmlFor="passenger_name">Passenger Name:</label>
                    <input
                        type="text"
                        id="passenger_name"
                        name="passenger_name"
                        value={searchParams.passenger_name}
                        onChange={handleChange}
                        placeholder="Enter passenger name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="complaint_id">Complaint ID:</label>
                    <input
                        type="text"
                        id="complaint_id"
                        name="complaint_id"
                        value={searchParams.complaint_id}
                        onChange={handleChange}
                        placeholder="Enter complaint ID"
                    />
                </div>

                <button type="submit">Search</button>
            </form>

            <h2>Complaints List</h2>

            {loading ? (
                <p>Loading complaints...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : complaints.length > 0 ? (
                <table className="complaints-table">
                    <thead>
                        <tr>
                            <th>Complaint ID</th>
                            <th>Passenger Name</th>
                            <th>PNR Number</th>
                            <th>Complaint Description</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint.complaint_id}>
                                <td>{complaint.complaint_id}</td>
                                <td>{complaint.passenger_name}</td>
                                <td>{complaint.pnr_number}</td>
                                <td>{complaint.complaint_desc}</td>
                                <td>{complaint.complaint_priority}</td>
                                <td>{complaint.status}</td>
                                <td>{new Date(complaint.date_and_time).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No complaints found.</p>
            )}
        </div>
    );
}

export default ComplaintsList;
