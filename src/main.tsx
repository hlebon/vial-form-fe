import React from 'react';
import ReactDOM from 'react-dom/client';

import theme from './theme';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import '@fontsource/libre-baskerville/400.css';
import '@fontsource/libre-baskerville/700.css';

import '@fontsource/lora/400.css';
import '@fontsource/lora/400-italic.css';

import '@fontsource/lora/500.css';
import '@fontsource/lora/500-italic.css';

import '@fontsource/lora/600.css';
import '@fontsource/lora/600-italic.css';

import '@fontsource/lora/700.css';
import '@fontsource/lora/700-italic.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import "@fontsource/arvo/400.css";
import "@fontsource/arvo/400-italic.css";

import "@fontsource/arvo/700.css";
import "@fontsource/arvo/700-italic.css";


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
