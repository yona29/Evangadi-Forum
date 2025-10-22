-- Database migration script to add password reset columns
-- Run this script on your database to add the missing columns

-- Add reset_token and reset_expires columns to users table
ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_expires DATETIME NULL;

-- Verify the columns were added
DESCRIBE users;
