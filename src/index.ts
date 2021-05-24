import express, {Application} from 'express';
import {EnvironmentVariables} from './config';
import {logging, routes, database, production} from './startups';

const app: Application = express();

logging();
database();
production(app);
routes(app);

const port: string | number = EnvironmentVariables.PORT || 3000;

const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

module.exports = server;