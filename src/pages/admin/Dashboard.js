import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import Sidebar from '../../components/Sidebar';
import Layout from '../../components/Layout';

// Mock Data
const booksData = [
  { name: 'Total Books', value: 1000 },
  { name: 'Borrowed', value: 300 },
  { name: 'Yet to Return', value: 100 },
  { name: 'To Return Today', value: 50 }
];

const pieData = [
  { name: 'Borrowed', value: 300 },
  { name: 'Available', value: 700 }
];

const COLORS = ['#0088FE', '#00C49F'];

const DashboardContainer = styled(Box)({
  marginTop: '2rem',
});

const DashboardPaper = styled(Box)({
  padding: '1rem',
  textAlign: 'center',
  color: 'black',
  backgroundColor: '#f7fafc'
});

const Dashboard = () => {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <DashboardContainer>
            <Typography variant="h4" component="h1" gutterBottom style={{ color: 'teal', textAlign: 'center' }}>
              Library Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
              {booksData.map((data, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <DashboardPaper>
                    <Typography variant="h6">{data.name}</Typography>
                    <Typography variant="h4" style={{ color: 'teal' }}>{data.value}</Typography>
                  </DashboardPaper>
                </Grid>
              ))}
            </Grid>

            <Box mt={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <DashboardPaper>
                    <Typography variant="h6" gutterBottom>Books Overview</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={booksData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </DashboardPaper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DashboardPaper>
                    <Typography variant="h6" gutterBottom>Books Distribution</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </DashboardPaper>
                </Grid>
              </Grid>
            </Box>
          </DashboardContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
