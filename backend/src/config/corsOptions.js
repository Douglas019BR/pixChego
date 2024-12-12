const corsOptions = {
    origin: function (origin, callback) {
      const whitelist = [
        'http://localhost:4000',
        process.env.FRONTEND_URL
      ];
  
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('CORS origin not allowed'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['*']
  };
  
  module.exports = corsOptions;