import React, { useState } from 'react';
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button, IconButton,
  Typography, TablePagination, Box, Stack, Divider, InputAdornment
} from '@mui/material';
import { Search, Sort, GetApp } from '@mui/icons-material';

import Sidebar from '../../components/Sidebar';
import FunctionalOperation from '../../components/FunctionalOperation';
import { filter } from 'lodash';

const StudentsPage = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", department: "Computer Science", section: "A", year: 1 },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", department: "Electrical Engineering", section: "B", year: 3 },
    { id: 3, name: "Alex Johnson", email: "alex.johnson@example.com", department: "Mechanical Engineering", section: "C", year: 2 },
    { id: 4, name: "Emma Brown", email: "emma.brown@example.com", department: "Civil Engineering", section: "A", year: 4 },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showFunctionalOperation, setShowFunctionalOperation] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };  

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    student.email.toLowerCase().includes(searchInput.toLowerCase()) ||
    student.department.toLowerCase().includes(searchInput.toLowerCase())
  );
  

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setAnchorEl(null);
  };

  const sortedStudents = [...filteredStudents].sort((a, b) => {
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

  const handleSendEmail = () => {
    // Logic for sending email
  };

  const handleSendNotifications = () => {
    // Logic for sending notifications
  };

  const handleDownloadData = () => {
    // Logic for downloading entire data
  };

  const handleFunctionalOperationClick = () => {
    setShowFunctionalOperation(true);
  };

  const handleCloseFunctionalOperation = () => {
    setShowFunctionalOperation(false);
  };

  const handleExportData = () => {
    const csvContent = "Name,Email,Department,Section,Year\n" +
      sortedStudents.map(student =>
        `${student.name},${student.email},${student.department},${student.section},${student.year}`
      ).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "student_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: '16rem', overflowY: 'auto', p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Students
        </Typography>
        <Stack direction="row" spacing={2} mb={2} alignItems="center">
          <TextField
            placeholder="Search students"
            variant="outlined"
            value={searchInput}
            onChange={handleSearch}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={() => handleSort('name')} aria-label="sort" color="primary">
            <Sort />
          </IconButton>
          <IconButton aria-label="export" color="primary" onClick={handleExportData}>
            <GetApp />
          </IconButton>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} padding={1.5}>
          <Box>
            <Typography variant="body1" color="textSecondary">
              More functionality: Bulk Functionality
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" color="primary" onClick={handleFunctionalOperationClick}>
              Functional Operation
            </Button>
          </Box>
        </Stack>

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>More Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                <TableRow key={student.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleMoreDetails(student.id)} variant="outlined" color="primary">
                      More Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredStudents.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {showFunctionalOperation && (
          <FunctionalOperation
            onClose={handleCloseFunctionalOperation}
            onSendEmail={handleSendEmail}
            onSendNotifications={handleSendNotifications}
            onDownloadData={handleDownloadData}
          />
        )}
      </Box>
    </Box>
  );
};

export default StudentsPage;
