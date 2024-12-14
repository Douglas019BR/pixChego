// PaymentList.js
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { List, ListItem, ListItemText, Typography, CircularProgress, Divider, Button } from '@mui/material';
import { getMockPayments, getPayments } from '../../services/paymentService';
import PaymentModal from '../PaymentModal';

const PaymentList = forwardRef((props, ref) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();
      if (!response) {
        setPayments([]);

        return;
      }

      setPayments(response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

      // setPayments(await getMockPayments());
    } catch (err) {
      setError('Erro ao buscar pagamentos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchPayments,
  }));

  const handleOpenModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    );
  }

  if (payments.length === 0) {
    return (
      <Typography align="center" variant="h6">
        Nenhum pagamento encontrado.
      </Typography>
    );
  }

  return (
    <>
      <List>
        {payments.map((payment) => (
          <React.Fragment key={payment.id}>
            <ListItem>
              <ListItemText
                primary={`Título: ${payment.title || 'Sem título'}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Status: {payment.status}
                    </Typography>
                    {' — '}
                    Criado em: {new Date(payment.createdAt).toLocaleDateString('pt-BR')}
                    {payment.paidAt && (
                      <>
                        {' — '}
                        Pago em: {new Date(payment.paidAt).toLocaleDateString('pt-BR')}
                      </>
                    )}
                  </>
                }
              />
              <Button variant="outlined" onClick={() => handleOpenModal(payment)}>
                Ver Detalhes
              </Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <PaymentModal open={isModalOpen} onClose={handleCloseModal} payment={selectedPayment} />
    </>
  );
});

export default PaymentList;
