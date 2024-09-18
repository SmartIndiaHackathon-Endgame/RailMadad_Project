const express = require('express');
const twilio = require('twilio');
const Feedback = require('./models/feedback');
const Complaint=require('./models/complaint');
const User=require('./models/user');
const connect = require('./connectdb');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

connect();

app.use(bodyParser.json());

app.post('/api/feedback', async (req, res) => {
    const { name, email, feedback, rating } = req.body; 

    try {
        const newFeedback = new Feedback({ name, email, feedback, rating });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to submit feedback', details: error.message });
    }
});



app.post('/api/complaints', async (req, res) => {
    try {
        const complaintData = req.body;

        const newComplaint = new Complaint({
            complaint_id: complaintData.complaint_id,
            passenger_name: complaintData.passenger_name,
            contact_info: complaintData.contact_info,
            pnr_number:complaintData.pnr_number,
            complaint_desc: complaintData.complaint_desc,
            date_and_time: complaintData.date_and_time,
            complaint_priority:complaintData.complaint_priority
        });
        await newComplaint.save();

        res.json({ message: 'Complaint submitted successfully', complaintId: newComplaint.complaint_id });
    } catch (error) {
        console.error('Error saving complaint:', error);
        res.status(500).json({ message: 'Failed to submit complaint' });
    }
});

app.get('/api/complaints', async (req, res) => {
  try {
    const { passenger_name, complaint_id } = req.query; // Get query params

    let query = {}; // Create an empty query object

    // If the passenger_name is provided, add it to the query
    if (passenger_name) {
      query.passenger_name = passenger_name;
    }

    // If the complaint_id is provided, add it to the query
    if (complaint_id) {
      query.complaint_id = complaint_id;
    }

    const complaints = await Complaint.find(query).sort({ complaint_priority: 1 }); // Sort by priority
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
});


const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Your Account SID from www.twilio.com/console
const authToken = 'your_auth_token'; // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken);


// Mock database for users with phone numbers
const usersDB = [
  { id: 1, name: 'John Doe', phone: '+1234567890' },
  { id: 2, name: 'Jane Doe', phone: '+0987654321' }
];

// Endpoint to send SOS messages
app.use(express.json());
app.post('/send-sos', async (req, res) => {
  const { lat, lng } = req.body;

  // Send SMS to users in the database
  try {
    const messagePromises = usersDB.map(user =>
      client.messages.create({
        body: `SOS Alert! User is in danger. Location: lat: ${lat}, lng: ${lng}`,
        from: 'your_twilio_phone_number',
        to: user.phone
      })
    );

    await Promise.all(messagePromises);

    // Optionally, send notification to nearby police station
    const policeStationNumber = await getNearbyPoliceStation(lat, lng);
    if (policeStationNumber) {
      await client.messages.create({
        body: `Police Alert! User is in danger. Location: lat: ${lat}, lng: ${lng}`,
        from: 'your_twilio_phone_number',
        to: policeStationNumber
      });
    }

    res.status(200).send({ message: 'SOS alerts sent successfully!' });
  } catch (error) {
    console.error('Error sending SOS alerts:', error);
    res.status(500).send({ error: 'Failed to send SOS alerts' });
  }
});

// Helper function to find nearby police station
async function getNearbyPoliceStation(lat, lng) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=police&key=your_google_places_api_key`
    );
    
    if (response.data.results && response.data.results.length > 0) {
      // Return the phone number of the closest police station
      const policeStation = response.data.results[0];
      return policeStation.formatted_phone_number || null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching nearby police stations:', error);
    return null;
  }
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
