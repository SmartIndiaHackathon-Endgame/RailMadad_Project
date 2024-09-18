const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaint_id: {
        type: String,
        required: true,
        unique: true,   
    },
    passenger_name: {
        type: String,
        required: true,
    },
    contact_info: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'], 
    },pnr_number: {
        type: Number,
        required: true,        
    },
    complaint_desc: {
        type: String,
        required: true,
    },
    date_and_time: {
        type: Date,
        required: true,
        default: Date.now, 
    },
    complaint_priority:{
        type:Number,
        required:true
    }
});


const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
