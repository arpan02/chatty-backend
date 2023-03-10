import { config } from './config';
import mongoose from 'mongoose';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setUpDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(config.DATABASE_URL!)
      .then(() => {
        log.info('Succesfully connected to database');
      })
      .catch((error) => {
        log.error('Error connecting to database ', error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};
