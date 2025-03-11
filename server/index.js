import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import dalleRoutes from './routes/dalle.routes.js';

dotenv.config();

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tshirtify API',
      version: '1.0.0',
      description: 'API documentation for Tshirtify AI T-shirt design application',
      contact: {
        name: 'API Support'
      },
      servers: [{
        url: `http://localhost:${process.env.PORT || 8085}`
      }]
    }
  },
  apis: ['./routes/*.js', './index.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }))

// Swagger route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/v1/dalle", dalleRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns welcome message
 *     description: Root endpoint to check if the server is running
 *     responses:
 *       200:
 *         description: A welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E By Aryan" })
})

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
  
  // For local development
  console.log(`Local URL: http://localhost:${PORT}`);
  console.log(`Swagger Documentation: http://localhost:${PORT}/api-docs`);
  
  // For GitHub Codespaces or other cloud environments
  if (process.env.CODESPACE_NAME) {
    console.log(`Public URL: https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`);
    console.log(`Swagger Documentation: https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev/api-docs`);
  }
});