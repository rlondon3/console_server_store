import express, { Request, Response } from 'express';
import users_route from './handlers/users';
import products_route from './handlers/products';
import order_route from './handlers/orders';

const app: express.Application = express();

const address: string = '0.0.0.3051';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (_req: Request, res: Response) {
    res.send('You are connected to the Database using an Express server...');
});

order_route(app);
products_route(app);
users_route(app);


app.listen(3051, function () {
    console.log(`Starting app using the server on localhost: ${address}`)
});


export default app;