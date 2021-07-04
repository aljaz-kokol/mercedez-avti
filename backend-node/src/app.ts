import express from 'express';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import News from './model/mongo/news.monog.model';
import newsRoutes from './routes/news.routes';

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Controll-ALlow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use('/news', newsRoutes);

export default app;