import axios from 'axios';

const endpoint = '/payments';
const BACKEND_URL = 'http://localhost:4000';
const X_API_TOKEN = "57f3e8a3-59e5-48cc-9a5d-93e720d04c7a"


// Função genérica para requisições GET
export const getPayments = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}${endpoint}`,{
      headers: {
        'x-api-token': X_API_TOKEN,
        'Accept': 'application/json',
      }
    })
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    throw error; // Repassa o erro
  }
};

export const createPayment = async (data) => {
  try{
    const response = await axios.post(`${BACKEND_URL}${endpoint}`, data, {
      headers: {
      'x-api-token': X_API_TOKEN
      }
    });
    const { qr_data } = response.data;
    return qr_data;// Retorna apenas os dados da resposta
  } catch(error){
    console.error('Erro ao criar ', error);
    throw error; // Repassa o erro
  }
}

export const createPaymentMock = async (data) => {
  const mockData = {
    in_store_order_id: "1755957e-6285-46e1-860e-bdb112c351a3",
    qr_data: "00020101021226940014BR.GOV.BCB.PIX2572pix-qr.mercadopago.com/instore/o/v2/1755957e-6285-46e1-860e-bdb112c351a35204000053039865802BR5919Consultoria Douglas6009SAO PAULO62070503***630481C4"
  };

  return mockData['qr_data'];
}

export const getMockPayments = async () => [
    {
      id: 1,
      amount: 150.75,
      status: 'completed',
      title: 'Compra de Produto A',
      clientId: 123,
      createdAt: '2023-12-01T12:30:00Z',
      paidAt: '2023-12-02T10:15:00Z',
    },
    {
      id: 2,
      amount: 200.0,
      status: 'pending',
      title: 'Compra de Produto B',
      clientId: 456,
      createdAt: '2023-12-05T15:45:00Z',
      paidAt: null,
    },
  ]