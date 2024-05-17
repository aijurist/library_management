import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import Sidebar from '../../components/Sidebar';

// Mock databases
const students = [
  { email: 'john.doe@example.com', name: 'John Doe', department: 'Computer Science', year: 'Sophomore', studentId: 'S123', contactNumber: '123-456-7890' },
  { email: 'jane.smith@example.com', name: 'Jane Smith', department: 'Mechanical Engineering', year: 'Senior', studentId: 'S124', contactNumber: '234-567-8901' },
  // Add more student records as needed
];

const books = [
  { isbn: '9780240809476', title: 'The Art of Game Design: A Book of Lenses', author: 'Jesse Schell' },
  { isbn: '0321929675', title: 'Fundamentals of Game Design', author: 'Ernest Adams' },
  // Add more book records as needed
];

const BorrowPage = () => {
  const [studentDetails, setStudentDetails] = useState({ email: '', name: '', department: '', year: '', studentId: '', contactNumber: '' });
  const [bookDetails, setBookDetails] = useState({ isbn: '', title: '', author: '' });
  const [borrowDate, setBorrowDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [librarianName, setLibrarianName] = useState('');

  const handleStudentChange = (event) => {
    const { name, value } = event.target;
    setStudentDetails({ ...studentDetails, [name]: value });

    let student;
    if (name === 'email') {
      student = students.find((s) => s.email === value);
    } else if (name === 'studentId') {
      student = students.find((s) => s.studentId === value);
    }

    if (student) {
      setStudentDetails(student);
    }
  };

  const handleBookChange = (event) => {
    const { name, value } = event.target;
    setBookDetails({ ...bookDetails, [name]: value });

    if (name === 'isbn') {
      const book = books.find((b) => b.isbn === value);
      if (book) {
        setBookDetails(book);
      }
    }
  };

  const handleBorrowDateChange = (event) => {
    const { value } = event.target;
    setBorrowDate(value);
    // Automatically set due date to two weeks after borrow date
    const newDueDate = new Date(value);
    newDueDate.setDate(newDueDate.getDate() + 14);
    setDueDate(newDueDate.toISOString().split('T')[0]);
  };

  const handleBorrow = () => {
    // Logic to handle borrowing the book
    console.log('Book borrowed:', { studentDetails, bookDetails, borrowDate, dueDate, librarianName });
    // Reset the form fields
    setStudentDetails({ email: '', name: '', department: '', year: '', studentId: '', contactNumber: '' });
    setBookDetails({ isbn: '', title: '', author: '' });
    setBorrowDate('');
    setDueDate('');
    setLibrarianName('');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: '16rem', overflowY: 'auto', p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Borrow a Book
        </Typography>
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
          <Stack spacing={3}>
            <Typography variant="h6">Student Details</Typography>
            <TextField
              label="Student Email"
              variant="outlined"
              name="email"
              value={studentDetails.email}
              onChange={handleStudentChange}
              fullWidth
            />
            <TextField
              label="Student ID"
              variant="outlined"
              name="studentId"
              value={studentDetails.studentId}
              onChange={handleStudentChange}
              fullWidth
            />
            <TextField
              label="Student Name"
              variant="outlined"
              name="name"
              value={studentDetails.name}
              onChange={handleStudentChange}
              fullWidth
              disabled
            />
            <TextField
              label="Department"
              variant="outlined"
              name="department"
              value={studentDetails.department}
              onChange={handleStudentChange}
              fullWidth
              disabled
            />
            <TextField
              label="Year"
              variant="outlined"
              name="year"
              value={studentDetails.year}
              onChange={handleStudentChange}
              fullWidth
              disabled
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              name="contactNumber"
              value={studentDetails.contactNumber}
              onChange={handleStudentChange}
              fullWidth
              disabled
            />
            <Divider />
            <Typography variant="h6">Book Details</Typography>
            <TextField
              label="Book ISBN"
              variant="outlined"
              name="isbn"
              value={bookDetails.isbn}
              onChange={handleBookChange}
              fullWidth
            />
            <TextField
              label="Book Title"
              variant="outlined"
              name="title"
              value={bookDetails.title}
              onChange={handleBookChange}
              fullWidth
              disabled
            />
            <TextField
              label="Author"
              variant="outlined"
              name="author"
              value={bookDetails.author}
              onChange={handleBookChange}
              fullWidth
              disabled
            />
            <Divider />
            <Typography variant="h6">Transaction Details</Typography>
            <TextField
              label="Borrow Date"
              type="date"
              variant="outlined"
              name="borrowDate"
              value={borrowDate}
              onChange={handleBorrowDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              label="Due Date"
              type="date"
              variant="outlined"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              label="Librarian's Name"
              variant="outlined"
              name="librarianName"
              value={librarianName}
              onChange={(e) => setLibrarianName(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleBorrow}>
              Confirm Borrow
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default BorrowPage;
