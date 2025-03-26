import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003F91',
      light: '#5DA9E9',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6D326D',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#E5F4E3',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#003F91',
      secondary: '#6D326D',
    },
    info: {
      main: '#5DA9E9',
    },
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
    h1: {
      fontFamily: `'Arvo', serif`,
    },
    h2: {
      fontFamily: `'Arvo', serif`,
    },
    h3: {
      fontFamily: `'Arvo', serif`,
    },
    h4: {
      fontFamily: `'Arvo', serif`,
    },
    h5: { fontFamily: `'Arvo', serif` },
    h6: { fontFamily: `'Arvo', serif` },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard', // Cambia esto a 'filled' o 'standard' si querés
      },
    },
  },
});

export default theme;
