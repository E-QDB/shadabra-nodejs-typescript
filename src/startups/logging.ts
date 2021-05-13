require('express-async-errors');
import {logger} from '../helpers';

export const logging = () => {
   process.on('uncaughtException', (ex: Error) => {
      logger.error(ex.message);
      logger.error(ex);
      console.log(ex);
      process.exit(1);
    });
  
    process.on('unhandledRejection', (ex: Error) => {
      logger.error(ex.message);
      logger.error(ex);
      console.log(ex);
      process.exit(1);
    });
}