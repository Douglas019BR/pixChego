import React from 'react';
import QRCode from 'react-qr-code';

function QRCodeGenerator({ value }) {
  return (
      <QRCode 
        value={value}  // Recebe o valor como prop
        size={256}      // Tamanho do QR Code
        bgColor="#ffffff" // Cor de fundo
        fgColor="#000000" // Cor do código
        level="H"       // Nível de correção de erros: L, M, Q, H
      />
  );
}

export default QRCodeGenerator;
