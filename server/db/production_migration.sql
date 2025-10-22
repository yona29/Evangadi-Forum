-- Production Database Migration Script
-- Run this on your production database BEFORE deployment

-- Add password reset columns to users table
ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_expires DATETIME NULL;

-- Verify the columns were added
DESCRIBE users;

-- Optional: Add indexes for better performance
CREATE INDEX idx_reset_token ON users(reset_token);
CREATE INDEX idx_reset_expires ON users(reset_expires);
