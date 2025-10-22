# Password Reset Setup Instructions

## Environment Variables Required

Create a `.env` file in the `server` directory with the following variables:

```env
# Database Configuration
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASS=your_database_password
DB_NAME=your_database_name
DB_PORT=3306

# Email Configuration (Gmail)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password

# Client URL (for password reset links)
CLIENT_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server Port
PORT=14255
```

## Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings > Security > App passwords
3. Generate a new app password for "Mail"
4. Use this app password as `EMAIL_PASS` (not your regular Gmail password)

## Database Migration

Run this SQL command to add the missing columns to your existing users table:

```sql
ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_expires DATETIME NULL;
```

## Testing Steps

1. Start the server: `cd server && npm start`
2. Start the client: `cd client && npm run dev`
3. Navigate to `/forgot-password`
4. Enter a valid email address
5. Check your email for the reset link
6. Click the link and reset your password

## Common Issues

- **Email not sending**: Check Gmail app password and 2FA settings
- **Database errors**: Ensure reset_token and reset_expires columns exist
- **Token expired**: Reset tokens expire after 10 minutes
- **Invalid token**: Make sure the full token from the email URL is used
