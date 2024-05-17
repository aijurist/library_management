import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button, IconButton, Typography, TablePagination, Box, Stack, Divider, InputAdornment, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import Sidebar from '../../components/Sidebar';

const BooksPage = () => {
  const [books, setBooks] = useState([
    { title: "The Art of Game Design: A Book of Lenses", author: "Jesse Schell", isbn: "9780240809476", status: "Available" },
    { title: "Fundamentals of Game Design", author: "Ernest Adams", isbn: "0321929675", status: "Available" },
    { title: "Game Feel: A Game Designer's Guide to Virtual Sensation", author: "Steve Swink", isbn: "0123744938", status: "Checked out" },
    { title: "The Design of Everyday Things", author: "Don Norman", isbn: "0465067107", status: "Available" },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };  

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchInput.toLowerCase())
  );  

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setAnchorEl(null);
  };

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: '16rem', overflowY: 'auto', p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Books
        </Typography>
        <Stack direction="row" spacing={2} mb={2} alignItems="center">
          <TextField
            placeholder="Search books"
            variant="outlined"
            value={searchInput}
            onChange={handleSearch}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary">
            Search
          </Button>
          <IconButton onClick={handleMenuClick} aria-controls="sort-menu" aria-haspopup="true">
            <SortIcon />
          </IconButton>
          <Menu
            id="sort-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleSort('title')}>Title</MenuItem>
            <MenuItem onClick={() => handleSort('author')}>Author</MenuItem>
            <MenuItem onClick={() => handleSort('isbn')}>ISBN</MenuItem>
            <MenuItem onClick={() => handleSort('status')}>Status</MenuItem>
          </Menu>
        </Stack>
        <Divider />
        <Box sx={{ mt: 2, mb: 2, p: 2, maxWidth:"90vw", backgroundColor: '#e3f2fd', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bold' }}>
              Delete book.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              This action cannot be undone.
            </Typography>
          </Box>
          <Button variant="contained" color="primary">
            Delete Books
          </Button>
        </Box>
        <Box sx={{mb: 4, p: 2, maxWidth:"90vw", backgroundColor: '#e3f2fd', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bold' }}>
              Create book.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Create a new book record in the database.
            </Typography>
          </Box>
          <Button variant="contained" color="primary">
            Create Books
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
                <TableRow key={book.isbn} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={book.status === "Available" ? "primary" : "secondary"}
                      disabled={book.status !== "Available"}
                      sx={{ borderRadius: 2 }}
                    >
                      {book.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={() => setBooks(books.filter(b => b.isbn !== book.isbn))}>
                      <DeleteIcon />
                    </IconButton>
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

export default BooksPage;
