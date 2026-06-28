/* eslint-disable no-undef */
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const pool = require('./database'); // Matches your database.js file
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. Initialize Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 2. Configure Multer to hold files in temporary memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 3. API Route to add a study spot with an image upload
app.post('/api/spaces', upload.single('image'), async (req, res) => {
    try {
        const { location_id, area_name, noise_level, opening_hours } = req.body;
        let imageUrl = null;

        // If an image was included in the request, upload it to Supabase Storage
        if (req.file) {
            const uniqueFilename = `${Date.now()}_${req.file.originalname}`;

            // eslint-disable-next-line no-unused-vars
            const { data, error } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .upload(uniqueFilename, req.file.buffer, {
                    contentType: req.file.mimetype,
                    upsert: false
                });

            if (error) {
                throw new Error(`Supabase upload failed: ${error.message}`);
            }

            // Construct the public URL for the newly uploaded asset
            const { data: publicUrlData } = supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .getPublicUrl(uniqueFilename);

            imageUrl = publicUrlData.publicUrl;
        }

        // 4. Save everything to your local Postgres database
        const newSpace = await pool.query(
            `INSERT INTO spaces (location_id, area_name, noise_level, opening_hours, image_url) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [location_id, area_name, noise_level, opening_hours, imageUrl]
        );

        res.status(201).json({
            success: true,
            message: 'Study space saved successfully with Supabase image storage!',
            data: newSpace.rows[0]
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message || 'Server error processing request' });
    }
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend server listening on port ${PORT}`));