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
    image_url VARCHAR(255)
);

-- 3. Master list of pre-approved clickable tags
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL -- e.g., '💻 Computers', '🤫 Quiet'
);

-- 4. Join table linking spaces to their multiple tags
CREATE TABLE space_tags (
    space_id INT REFERENCES spaces(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (space_id, tag_id)
);