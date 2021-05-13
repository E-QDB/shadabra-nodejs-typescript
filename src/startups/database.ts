import mongoose from 'mongoose';
import {logger} from '../helpers';
import {EnvironmentVariables} from '../config';

const databaseConnection = EnvironmentVariables.DATABASE_CONNECTION || '';

export const database = () => {
  mongoose
    .connect(databaseConnection, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() =>
      logger.info(`CONNECTED TO DATABASE ${EnvironmentVariables.DATABASE_CONNECTION}`)
    );
};