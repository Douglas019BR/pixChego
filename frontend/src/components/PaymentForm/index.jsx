import React, { useState } from 'react';
import { Button } from '@mui/material';
import PaymentModal from '../CreatePaymentModal';
import { createPayment, createPaymentMock } from '../../services/paymentService';

const PaymentForm = ({ onSave }) => {
  const [open, setOpen] = useState(false);
  const [succes, setSucces] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleSuccess = (value) => setSucces(value);

  const handleQrData = (value) => setQrData(value);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (paymentData) => {
    try {
      const response = await createPayment(paymentData);

      console.log(response);

      handleSuccess(true);
      handleQrData(response);
      if (!!onSave) {
        await onSave();
      }
    } catch (error) {
      console.log(`Erro ao criar pagamento ${error}`);

      handleSuccess(false);

      handleQrData(qrData);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Criar Pagamento
      </Button>

      <PaymentModal open={open} onClose={handleClose} onSave={handleSave} qrData={qrData} success={succes} />
    </div>
  );
};

export default PaymentForm;
