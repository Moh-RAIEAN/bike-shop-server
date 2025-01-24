import { connect } from 'mongoose';
import app from './app';
import getConfigOption from './app/configs';

const port = getConfigOption('port');
const databaseUrl = getConfigOption('databaseUrl');

async function startServer() {
  await connect(databaseUrl);
  app.listen(port, () =>
    console.log(`🟢 server is running on:- ${port} port ^_^`),
  );
}

startServer().catch((err) => console.log(err));
