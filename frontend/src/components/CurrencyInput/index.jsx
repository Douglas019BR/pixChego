import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const CurrencyInput = () => {
  const [value, setValue] = useState("0,00");

  const handleInputChange = (event) => {
    // Obtém o valor digitado e remove caracteres não numéricos
    let input = event.target.value.replace(/[^\d]/g, "");

    // Converte para número inteiro (centavos) e formata
    const number = parseInt(input, 10) || 0;
    const formatted = (number / 100).toFixed(2).replace(".", ",");

    // Define o valor formatado no estado
    setValue(formatted);
  };

  return (
      <TextField
        label="Valor"
        value={value}
        sx={{ mt: 2 }}
        fullWidth
        onChange={handleInputChange}
      />
  );
};

export default CurrencyInput;
