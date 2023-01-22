import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// ================ External MIDDLEWARES ================ //
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '25mb' }));


export default app;
