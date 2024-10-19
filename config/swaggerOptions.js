const swaggerJsDoc = require('swagger-jsdoc');


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Appointments',
            description: 'API Documentation Admin API',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            }
        ],
        schemes: ['http', 'https']
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;