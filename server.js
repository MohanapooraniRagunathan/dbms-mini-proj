const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/railwayBooking')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Define the Train schema and model
const trainSchema = new mongoose.Schema({
    name: String,
    departure: String,
    arrival: String,
    duration: String,
    coachType: String,
    availableBerths: [String],
});

const Train = mongoose.model('Train', trainSchema);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Railway Booking API!');
});

// Search trains route
app.post('/api/search-trains', async (req, res) => {
    const { from, to, date, passengers, coach, berth } = req.body;
    try {
        const trains = await Train.find({ coachType: coach });
        res.json({ trains });
    } catch (error) {
        console.error('Error fetching trains:', error);
        res.status(500).json({ message: 'Error fetching trains' });
    }
});

// Get all trains endpoint
app.get('/api/trains', async (req, res) => {
    try {
        const trains = await Train.find(); // Fetch all trains
        res.json(trains);
    } catch (error) {
        console.error('Error fetching trains:', error);
        res.status(500).json({ message: 'Error fetching trains' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
