import express, {Express} from 'express';
import {EnvironmentVariables} from './config';
import {logging, routes, database} from './startups';

const app: Express = express();

logging();
database();
routes(app);

const port: string | number = EnvironmentVariables.PORT || 3000;

const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

export default server;
