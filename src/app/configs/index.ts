import dotenv from 'dotenv';
import path from 'node:path';
import { TconfigOptions } from './configTypes';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const configOptions: TconfigOptions = {
  port: Number(process.env.PORT),
  env: `${process.env.NODE_ENV}`,
  databaseUrl: `${process.env.DATABASE_URL}`,
  getConfigOption: (option) => configOptions[option],
};

export default configOptions.getConfigOption;
