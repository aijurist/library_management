import React, { useState } from 'react';
import { 
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button,
  Typography, TablePagination, Box, Stack, Divider, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../../components/Sidebar';

const ReturnBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([
    { bookTitle: "The Art of Game Design: A Book of Lenses", studentName: "John Doe", isbn: "9780240809476", overdue: false },
    { bookTitle: "Fundamentals of Game Design", studentName: "Jane Smith", isbn: "0321929675", overdue: false },
    { bookTitle: "Game Feel: A Game Designer's Guide to Virtual Sensation", studentName: "Alice Johnson", isbn: "0123744938", overdue: true },
    { bookTitle: "The Design of Everyday Things", studentName: "Bob Brown", isbn: "0465067107", overdue: false },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleReturnBook = (isbn) => {
    setBorrowedBooks(borrowedBooks.filter(book => book.isbn !== isbn));
  };

  const filteredBooks = borrowedBooks.filter((book) =>
    book.bookTitle.toLowerCase().includes(searchInput.toLowerCase()) ||
    book.studentName.toLowerCase().includes(searchInput.toLowerCase())||
    book.isbn.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: '16rem', overflowY: 'auto', p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Borrowed Books
        </Typography>
        <Stack direction="row" spacing={2} mb={2} alignItems="center">
          <TextField
            placeholder="Search books/students/ISBN"
            variant="outlined"
            fullWidth
            value={searchInput}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Divider />
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Book Title</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Overdue</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{book.bookTitle}</TableCell>
                  <TableCell>{book.studentName}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.overdue ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleReturnBook(book.isbn)}>
                      Return Book
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredBooks.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default ReturnBook;
