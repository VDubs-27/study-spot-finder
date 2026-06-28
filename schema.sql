-- 1. Create Map Anchors Table
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

-- 2. Create Study Spaces Table
CREATE TABLE spaces (
    id SERIAL PRIMARY KEY,
    location_id INT REFERENCES locations(id) ON DELETE CASCADE,
    space_name VARCHAR(100) NOT NULL,
    noise_level VARCHAR(20) NOT NULL,
    tags VARCHAR(100) NOT NULL,
    image_url VARCHAR(255)
);