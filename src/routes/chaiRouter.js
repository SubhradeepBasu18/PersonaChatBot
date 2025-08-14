import express from 'express';
// import { generateResponse } from '../controllers/chaiBot.js';
import { initiateGenerateReponse } from '../controllers/chai.controller.js';

const app = express.Router();

app.post('/generate-response', initiateGenerateReponse)

app.get('/personas', (req, res) => {
    const personas = [
      {
        id: 'piyush',
        name: 'Piyush Garg',
        description: 'CTO of FlutterFlow. Ask me about no-code development and building startups!',
        avatar: '/PiyushSir.webp'
      },
      {
        id: 'hitesh',
        name: 'Hitesh Choudhary',
        description: 'Teacher at iNeuron. Let\'s talk about programming and education!',
        avatar: '/hitesh_sir.avif'
      }
    ];
    
    res.json(personas);
  });

export { app as chaiRouter };