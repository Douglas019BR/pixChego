import React, { useState } from 'react';
import { Button } from '@mui/material';
import PaymentModal from '../CreatePaymentModal';
import { createPayment, createPaymentMock } from '../../services/paymentService'

const PaymentForm = () => {
  const [open, setOpen] = useState(false);

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
    } catch (error) {
        console.log(`Erro ao criar pagamento ${error}`);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Criar Pagamento
      </Button>
      
      {/* Modal para criar pagamento */}
      <PaymentModal open={open} onClose={handleClose} onSave={handleSave} />
    </div>
  );
};

export default PaymentForm;
