import { useState } from 'react';
import './FeedbackForm.css'
function FeedbackForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',  // renamed from 'message' to 'feedback'
        rating: '',    // added 'rating'
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
        try {
            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            setResponseMessage(result.message);
            setSubmitted(true);
        } catch (error) {
            setResponseMessage('Failed to submit feedback');
            console.error('Error submitting feedback:', error);
        }
    };
    

    return (
        <div className="feedback-form-container">
            {submitted ? (
                <div className="thank-you-message">
                    <h2>Thank you for your feedback!</h2>
                    <p>{responseMessage}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="feedback-form">
                    <h2>Feedback Form</h2>
                    
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="feedback">Feedback:</label>
                        <textarea
                            id="feedback"
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            required
                            placeholder="Share your thoughts"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rating">Rating:</label>
                        <select
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select rating</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                    </div>

                    <button type="submit">Submit Feedback</button>
                </form>
            )}
        </div>
    );
}

export default FeedbackForm;
