import { useEffect, useState } from 'react';
import axios from 'axios';

function RailMadadData() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.railmadad.in/complaints'); 
                setData(response.data);  
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>RailMadad Complaints</h1>
            {error && <p>{error}</p>}
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        Complaint ID: {item.id}, Status: {item.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RailMadadData;
