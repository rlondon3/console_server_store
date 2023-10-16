import express, { Request, Response } from 'express'

const app: express.Application = express();
const address: string = '0.0.0.3050';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (_req: Request, res: Response) {
    res.send('You are connected to the Database using an Express server...');
});

app.listen(3050, function () {
    console.log(`Starting app using a server on: localhost: ${address}`)
});


export default app;