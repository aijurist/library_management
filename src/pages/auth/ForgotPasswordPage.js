import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Email } from '@mui/icons-material';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    // Add your password reset logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md font-inter">
        <h1 className="text-2xl font-bold text-center mb-8">Forgot Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              required
              InputProps={{
                startAdornment: (
                  <div className="pr-2">
                    <Email className="text-gray-500" />
                  </div>
                )
              }}
            />
          </div>

          <Button variant="contained" type="submit" color="primary" fullWidth>
            Reset Password
          </Button>
        </form>

        <div className="text-center mt-4">
          Remember your password?{' '}
          <Link href="/auth/LoginPage">
            <span className="text-blue-500 hover:underline">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
