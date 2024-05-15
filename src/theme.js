import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: '8px',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
  },
});

export default theme;
