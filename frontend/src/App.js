import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WebhookProvider } from './contexts/WebhookContext/index';
import WebhookEventList from './components/WebhookEventList/index';
import WebhookEventPopup from './components/WebhookEventPopup/index';
import PaymentList from './components/PaymentList';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <WebhookProvider>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <WebhookEventList />
                    <WebhookEventPopup />  {}
                    <PaymentList></PaymentList>
                    <ToastContainer />
                </Container>
            </WebhookProvider>
        </ThemeProvider>
    );
}

export default App;
