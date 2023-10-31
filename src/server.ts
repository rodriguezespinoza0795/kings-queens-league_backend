import express from 'express'
import cors from 'cors'
import routerApi from './routes';
import fileUpload from 'express-fileupload'
import { authMiddleware } from './middlewares'

const app = express()
 
app.use(fileUpload())
app.use(cors({"origin": "*"}))
app.use(express.json());
app.use(authMiddleware)

app.get('/', (req, res) => {
    res.send('Hola mi server en express');
});

routerApi(app);

export default app