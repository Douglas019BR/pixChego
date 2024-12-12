// PaymentModal.js
import React from 'react';
import { Modal, Box, Typography, Divider, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const PaymentModal = ({ open, onClose, payment }) => {
  if (!payment) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="payment-modal-title" aria-describedby="payment-modal-description">
      <Box sx={style}>
        <Typography id="payment-modal-title" variant="h6" component="h2">
          Detalhes do Pagamento
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">
          <strong>Título:</strong> {payment.title || 'Sem título'}
        </Typography>
        <Typography variant="body1">
          <strong>Descrição:</strong> {payment.description || 'Sem descrição'}
        </Typography>
        <Typography variant="body1">
          <strong>Valor:</strong> R$ {parseFloat(payment.amount).toFixed(2)}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {payment.status}
        </Typography>
        <Typography variant="body1">
          <strong>Cliente ID:</strong> {payment.clientId}
        </Typography>
        <Typography variant="body1">
          <strong>Criado em:</strong> {new Date(payment.createdAt).toLocaleDateString('pt-BR')}
        </Typography>
        {payment.paidAt && (
          <Typography variant="body1">
            <strong>Pago em:</strong> {new Date(payment.paidAt).toLocaleDateString('pt-BR')}
          </Typography>
        )}
        <Button onClick={onClose} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
