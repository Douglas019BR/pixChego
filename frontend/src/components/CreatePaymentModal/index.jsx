import React, { useState } from 'react';
import { Modal, Box, Typography, Divider, Button, TextField } from '@mui/material';
import CurrencyInput from '../CurrencyInput';
import QRCodeGenerator from '../QrCodeGenerator';

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

const PaymentModal = ({ open, onClose, onSave, success, qrData }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
  });

  // Função para lidar com alterações nos campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputAmountChange = (e) => {
    setFormData((prev) => ({ ...prev, amount: e }));
  };

  // Função para salvar o pagamento
  const handleSave = () => {
    if (onSave) {
      onSave(formData); // Passa os dados para o callback `onSave` que pode ser utilizado externamente
    }
    // onClose();  // Fecha o modal
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="payment-modal-title"
      aria-describedby="payment-modal-description"
    >
      <Box sx={style}>
        <Typography id="payment-modal-title" variant="h6" component="h2">
          Criar Pagamento
        </Typography>

        {success && !!qrData ? (
          <QRCodeGenerator value={qrData}></QRCodeGenerator>
        ) : (
          <div>
            <Divider sx={{ my: 2 }} />

            <TextField
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <CurrencyInput
              name="amount"
              value={formData.amount}
              setValue={handleInputAmountChange} // Atualizando o valor no estado
            />

            <TextField
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleSave} variant="contained" color="primary">
                Salvar
              </Button>
              <Button onClick={onClose} variant="outlined" color="secondary">
                Fechar
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default PaymentModal;
