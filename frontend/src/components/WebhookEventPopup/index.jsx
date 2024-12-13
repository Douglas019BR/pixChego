import React, { useState, useEffect, useContext } from 'react';
import { WebhookContext } from '../../contexts/WebhookContext/index.jsx';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';

const WebhookEventPopup = () => {
    const { events } = useContext(WebhookContext);
    const [open, setOpen] = useState(false);
    const [latestEvent, setLatestEvent] = useState(null);

    useEffect(() => {
        if (events.length > 0) {
            setLatestEvent(events[0]);
            setOpen(true);

            // Fechar o popup automaticamente após 5 segundos
            const timer = setTimeout(() => setOpen(false), 7000);
            return () => clearTimeout(timer);
        }
    }, [events]);

    if (!open || !latestEvent) return null;

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <DialogContentText>
                    <strong>Valor:</strong> {latestEvent.amount || 'Não especificado'} <br />
                    <strong>Título:</strong> {latestEvent.title || 'Não especificado'} <br />
                    <strong>Descrição:</strong> {latestEvent.description || 'Não especificado'} <br />
                    <strong>Status:</strong> {latestEvent.orderStatus === 'paid' ? 'PAGO' : latestEvent.orderStatus} <br />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WebhookEventPopup;
