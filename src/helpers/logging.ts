import {transports, createLogger, format, Logger, LoggerOptions} from 'winston';
const {combine, timestamp, prettyPrint, json} = format;

const options: LoggerOptions = {
  level: 'info',
  format: combine(
    timestamp(),
    json(),
    prettyPrint({ colorize: true, depth: 3 })
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
}

export const logger: Logger = createLogger(options);

if (process.env.NODE_ENV !== 'production') {
  const transformStream: transports.ConsoleTransportInstance = new transports.Console({format: format.colorize()});
  logger.add(transformStream);
}
