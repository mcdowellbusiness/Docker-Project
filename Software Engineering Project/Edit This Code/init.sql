-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TODO: Add indexes for better performance
-- Hint: Consider adding indexes on frequently queried columns

-- TODO: Add constraints
-- Hint: Consider adding CHECK constraints for score range

-- TODO: Add sample data
-- Hint: Add a few sample students to test the application 