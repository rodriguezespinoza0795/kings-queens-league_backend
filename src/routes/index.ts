import express from 'express';
import clubCategoryRouter from './clubCategory.router';
import clubRouter from './club.router';
import uploadRouter from './upload.router';


export default function routerApi(app) {
  const router = express.Router();
  app.use('/v1', router);
  router.use('/clubCategory', clubCategoryRouter);
  router.use('/club', clubRouter);
  router.use('/upload', uploadRouter);
}
