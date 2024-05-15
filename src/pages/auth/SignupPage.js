import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff, People, Lock, EmailRounded, Email } from '@mui/icons-material';
import Link from 'next/link';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track if passwords match

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPass = event.target.value;
    setConfirmPassword(confirmPass);
    setPasswordsMatch(password === confirmPass); // Update passwordsMatch state
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!passwordsMatch) {
      return;
    }
    console.log('Username:', username, 'Email:', email, 'Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md font-inter">
        <h1 className="text-2xl font-bold text-center mb-8">Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
              required
              InputProps={{
                startAdornment: (
                  <div className="pr-2">
                    <People className="text-gray-500" />
                  </div>
                )
              }}
            />
          </div>

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
                    <EmailRounded className="text-gray-500" />
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

          <div className="mb-6">
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              type="password"
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
              error={!passwordsMatch}
              helperText={!passwordsMatch && "Passwords don't match"}
            />
          </div>

          <Button variant="contained" type="submit" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>

        <div className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/auth/LoginPage">
            <span className="text-blue-500 hover:underline">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
