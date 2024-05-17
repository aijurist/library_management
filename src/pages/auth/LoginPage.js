import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md font-inter">
        <h1 className="text-2xl font-bold text-center mb-8">Log In</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              required
              type="email"
              InputProps={{
                startAdornment: (
                  <div className="pr-2">
                    <Email className="text-gray-500" />
                  </div>
                )
              }}
            />
          </div>

          <div className="mb-6 relative">
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              required
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <div className="pr-2">
                    <Lock className="text-gray-500" />
                  </div>
                ),
                endAdornment: (
                  <Button onClick={handleShowPassword} className="focus:outline-none">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
            />
          </div>

          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
            className="mb-6"
          />

          <Button variant="contained" type="submit" color="primary" fullWidth>
            Log In
          </Button>
        </form>

        <Link href="/auth/ForgotPasswordPage">
          <span className="text-blue-500 block mt-4 text-center hover:underline">
            Forgot password?
          </span>
        </Link>

        <div className="text-center mt-4">
          Dont have an account?{' '}
          <Link href="/auth/SignupPage">
            <span className="text-blue-500 hover:underline">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
