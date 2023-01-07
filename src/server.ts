import 'dotenv/config';
import 'reflect-metadata';
import './database';

import app from './app';

const port = process.env.PORT || 4600;

app.listen(port, () => {
  console.log('🚀 Server Running');
  console.log('🚀 Port', port);
});
