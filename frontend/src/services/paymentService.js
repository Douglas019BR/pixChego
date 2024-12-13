import axios from 'axios';

const endpoint = '/payments';

const apiClient = axios.create({
  baseURL: process.env.backend_url,
  timeout: 5000
});

// Função genérica para requisições GET
export const getPayments = async () => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    throw error; // Repassa o erro
  }
};

export const createPayment = async (data) => {
  try{
    const response = await apiClient.post(endpoint, data);
    return response.data; // Retorna apenas os dados da resposta
  } catch(error){
    console.error('Erro ao criar ', error);
    throw error; // Repassa o erro
  }
}

export const createPaymentMock = async (data) => {
  return data;
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