import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import './Complaint.css'

function ComplaintForm() {
    const [formData, setFormData] = useState({
        passenger_name: '',
        contact_info: '',
        pnr_number: '',
        complaint_desc: '',
        date_and_time: '', 
        complaint_id: '',
        complaint_priority: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const complaint_id = 'C' + uuidv4().slice(0, 4); // Generate unique complaint ID

        const complaintData = {
            ...formData,
            complaint_id,
        };

        try {
            const response = await fetch('http://localhost:5000/api/complaints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(complaintData),
            });

            const result = await response.json();
            setResponseMessage(result.message);
            setSubmitted(true);

            // Display the complaint ID in an alert after successful submission
            alert(`Your complaint ID is: ${complaint_id}`);
        } catch (error) {
            setResponseMessage('Failed to submit complaint');
            console.error('Error submitting complaint:', error);
        }
    };

    return (
        <div className="complaint-form-container">
            {submitted ? (
                <div className="thank-you-message">
                    <h2>Complaint Submitted Successfully!</h2>
                    <p>{responseMessage}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="complaint-form">
                    <h2>Complaint Form</h2>

                    <div className="form-group">
                        <label htmlFor="passenger_name">Passenger Name:</label>
                        <input
                            type="text"
                            id="passenger_name"
                            name="passenger_name"
                            value={formData.passenger_name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact_info">Contact Info:</label>
                        <input
                            type="email"
                            id="contact_info"
                            name="contact_info"
                            value={formData.contact_info}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pnr_number">PNR Number:</label>
                        <input
                            type="number"
                            id="pnr_number"
                            name="pnr_number"
                            value={formData.pnr_number}
                            onChange={handleChange}
                            required
                            placeholder="Enter the PNR number"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="complaint_desc">Complaint Description:</label>
                        <textarea
                            id="complaint_desc"
                            name="complaint_desc"
                            value={formData.complaint_desc}
                            onChange={handleChange}
                            required
                            placeholder="Describe your complaint"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date_and_time">Date and Time:</label>
                        <input
                            type="datetime-local"
                            id="date_and_time"
                            name="date_and_time"
                            value={formData.date_and_time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="complaint_priority">Complaint type:</label>
                        <select
                            id="complaint_priority"
                            name="complaint_priority"
                            value={formData.complaint_priority}
                            onChange={handleChange}
                            required
                        >
                            <option>Select Type</option>
                            <option value="1">Harassment</option>
                            <option value="2">Theft</option>
                            <option value="3">Staff Behaviour</option>
                            <option value="4">Cleanliness Issue</option>
                            <option value="5">Seat Issue</option>
                        </select>
                    </div>

                    <button type="submit">Submit Complaint</button>
                </form>
            )}
        </div>
    );
}

export default ComplaintForm;
