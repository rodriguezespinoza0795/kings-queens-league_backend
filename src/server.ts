import express from 'express'
import cors from 'cors'
import routerApi from './routes';

const app = express()

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mi server en express');
});

routerApi(app);

export default app