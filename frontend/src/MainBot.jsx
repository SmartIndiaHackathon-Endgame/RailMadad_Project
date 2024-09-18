import { useState } from 'react';
import axios from 'axios';

const MainBot = () => {
  const [input, setInput] = useState(''); // For user input
  const [response, setResponse] = useState(''); // To store the chatbot response
  const [error, setError] = useState(''); // To store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/chatbot',  // Flask backend URL (change if deployed)
        { message: input },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,  // Set a 10-second timeout
        }
      );
      setResponse(res.data.response); // Set the chatbot's response to be displayed
      setError(''); // Clear error if request is successful
    } catch (error) {
      console.error('Error communicating with the chatbot:', error);
      if (error.code === 'ECONNABORTED') {
        setError('Connection timed out. Please try again.');
      } else if (error.response) {
        setError('Server responded with an error. Please try again later.');
      } else {
        setError('Something went wrong. Please check your network and try again.');
      }
      setResponse(''); // Clear response on error
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Chat with the Bot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the chatbot..."
          style={{ width: '300px', padding: '10px', fontSize: '16px' }} // Style for search bar
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px 15px' }}>Send</button>
      </form>

      {error && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
          <strong>Bot Response:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default MainBot;
