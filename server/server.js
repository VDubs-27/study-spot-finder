/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const pool = require('./database'); // From database.js
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Fetch all study spaces combined with their location details (coordinates, building names)
app.get('/api/spaces', async (req, res) => {
    try {
        const spacesWithLocations = await pool.query(`
      SELECT 
        s.id AS space_id,
        s.space_name,
        s.noise_level,
        s.image_url,
        l.name AS building_name,
        l.latitude,
        l.longitude
      FROM spaces s
      JOIN locations l ON s.location_id = l.id
    `);

        res.json({
            success: true,
            count: spacesWithLocations.rowCount,
            data: spacesWithLocations.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error pulling study spaces' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Backend server listening on port ${PORT}`));