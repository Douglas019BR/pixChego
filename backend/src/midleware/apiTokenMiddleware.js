const validateApiToken = (req, res, next) => {
    const apiToken = req.headers['x-api-token'];
    
    if (!apiToken) {
      return res.status(401).json({ 
        error: 'Token de API não fornecido' 
      });
    }
  
    if (apiToken !== process.env.API_TOKEN) {
      return res.status(403).json({ 
        error: 'Token de API inválido' 
      });
    }
  
    next();
  };
  
  module.exports = validateApiToken;