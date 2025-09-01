import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Events Marketplace API',
    version: '1.0.0',
    description: 'API documentation for events and organisers',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './routes/organiser_routes/*.js',], // adjust to point to your route files
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
