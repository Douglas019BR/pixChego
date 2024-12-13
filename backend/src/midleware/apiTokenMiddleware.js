const validateApiToken = (req, res, next) => {
  try{
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
    console.log('Token de API válido');
    next();
  } catch (error) {
    logError('API token validation error:', error);
    res.status(500);
  }
};

module.exports = validateApiToken;