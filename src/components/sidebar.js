// Sidebar.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { 
  HomeOutlined, Home, 
  BookOutlined, Book, 
  PersonOutlined, Person, 
  ListAltOutlined, ListAlt, 
  HistoryOutlined, History, 
  SettingsOutlined, Settings, 
  HelpOutline, Help, 
  ExitToAppOutlined, ExitToApp 
} from '@mui/icons-material';
import { styled } from '@mui/system';
import ConfirmationDialog from './ConfirmationDialog';

const SidebarContainer = styled('div')({
  height: '100vh',
  width: '16rem',
  backgroundColor: '#f7fafc',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  fontFamily: 'Inter, sans-serif',
  color: 'black',
  position: 'fixed'
});

const Sidebar = () => {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState(router.pathname);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    setSelectedPath(router.pathname);
  }, [router.pathname]);

  const handleNavigation = (path) => {
    router.push(path);
    setSelectedPath(path);
  };

  const getIcon = (path, outlinedIcon, filledIcon) => {
    return selectedPath === path ? filledIcon : outlinedIcon;
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    router.push('/auth/LoginPage');
  };

  const handleLogoutClose = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <SidebarContainer>
      <div className="text-center p-2">
        <Typography variant="h6" style={{ color: 'teal' }}>
          Library Management System
        </Typography>
      </div>
      <List>
        <ListItem button selected={selectedPath === '/admin'} onClick={() => handleNavigation('/admin')}>
          <ListItemIcon>
            {getIcon('/admin', <HomeOutlined />, <Home />)}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Dashboard</Typography>} />
        </ListItem>
        <ListItem button selected={selectedPath === '/admin/books'} onClick={() => handleNavigation('/admin/books')}>
          <ListItemIcon>
            {getIcon('/admin/books', <BookOutlined />, <Book />)}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Books</Typography>} />
        </ListItem>
        <ListItem button selected={selectedPath === '/admin/StudentsPage'} onClick={() => handleNavigation('/admin/StudentsPage')}>
          <ListItemIcon>
            {getIcon('/admin/StudentsPage', <PersonOutlined />, <Person />)}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Students</Typography>} />
        </ListItem>
        <ListItem button selected={selectedPath === '/admin/borrow'} onClick={() => handleNavigation('/admin/borrow')}>
          <ListItemIcon>
            {getIcon('/admin/borrow', <ListAltOutlined />, <ListAlt />)}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Borrow</Typography>} />
        </ListItem>
        <ListItem button selected={selectedPath === '/admin/return'} onClick={() => handleNavigation('/admin/return')}>
          <ListItemIcon>
            {getIcon('/admin/return', <HistoryOutlined />, <History />)}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Return</Typography>} />
        </ListItem>
        <ListItem button selected={selectedPath === '/admin/overdue'} onClick={() => handleNavigation('/admin/overdue')}>
          <ListItemIcon>
            {getIcon('/admin/overdue', <HistoryOutlined />, <History />)}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Overdue</Typography>} />
        </ListItem>
      </List>
      <Divider />
      <List className="flex flex-col space-y-2 mt-auto">
        <ListItem button selected={selectedPath === '/settings'} onClick={() => handleNavigation('/settings')}>
          <ListItemIcon>
            {getIcon('/settings', <SettingsOutlined />, <Settings />)}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Settings</Typography>} />
        </ListItem>
        <ListItem button selected={selectedPath === '/help'} onClick={() => handleNavigation('/help')}>
          <ListItemIcon>
            {getIcon('/help', <HelpOutline />, <Help />)}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Help</Typography>} />
        </ListItem>
        <ListItem button selected={selectedPath === '/logout'} onClick={handleLogoutClick}>
          <ListItemIcon>
            {getIcon('/logout', <ExitToAppOutlined />, <ExitToApp />)}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
        </ListItem>
      </List>
      <ConfirmationDialog
        open={logoutDialogOpen}
        onClose={handleLogoutClose}
        onConfirm={handleLogoutConfirm}
      />
    </SidebarContainer>
  );
};

export default Sidebar;
