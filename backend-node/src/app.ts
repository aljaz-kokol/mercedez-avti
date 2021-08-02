import express, { Request, Response, NextFunction } from 'express';

import newsRoutes from './routes/news.routes';
import carClassRoutes from './routes/car-class.routes';
import fuelRoutes from './routes/fuel.routes';
import gearBoxRoutes from './routes/gearbox.routes';
import driveRoutes from './routes/drive.routes';
import carTypeRoutes from './routes/car-type.routes';
import carRoutes from './routes/car.routes';

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-ALlow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    next();
});

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/car-class', carClassRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/gearbox', gearBoxRoutes);
app.use('/api/drive', driveRoutes);
app.use('/api/car-type', carTypeRoutes);
app.use('/api/car', carRoutes);

export default app;