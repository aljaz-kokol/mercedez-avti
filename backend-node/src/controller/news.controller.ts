import { Request, Response, NextFunction } from 'express';
import News from '../model/news.model';
import MongoNews from '../model/mongo/news.monog.model';

export const getNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const news: News[] = await MongoNews.find();
        res.status(200).json(news);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}