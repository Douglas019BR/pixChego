import React, { useRef } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WebhookProvider } from './contexts/WebhookContext/index';
import WebhookEventList from './components/WebhookEventList/index';
import WebhookEventPopup from './components/WebhookEventPopup/index';
import PaymentList from './components/PaymentList';
import PaymentForm from './components/PaymentForm';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {

    const paymentListRef = useRef();

    const callGetPayments = async () => {
        if(!!paymentListRef.current)
            await paymentListRef.current.fetchPayments();

    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <WebhookProvider>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <WebhookEventList />
                    <PaymentForm onSave={callGetPayments} />
                    <WebhookEventPopup />  { }
                    <PaymentList ref={paymentListRef}></PaymentList>
                    <ToastContainer />
                </Container>
            </WebhookProvider>
        </ThemeProvider>
    );
}

export default App;