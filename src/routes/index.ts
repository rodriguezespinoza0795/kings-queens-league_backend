import express from 'express';
import avocadoRouter from './avocado.router';

export default function routerApi(app) {
  const router = express.Router();
  app.use('/v1', router);
  router.use('/avocado', avocadoRouter);
}
