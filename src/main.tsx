import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme';
import "./fonts"


import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
