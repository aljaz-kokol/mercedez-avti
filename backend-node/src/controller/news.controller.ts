import { Request, Response, NextFunction } from 'express';
import News from '../model/news.model';

export const getNews = (req: Request, res: Response) => {
    const news: News[] = [
        {
            _id: '1',
            createdAt: '2002-12-09',
            updatedAt: '2021-05-01',
            description: 'A random description',
            shortDescription: 'short'
        }
    ];
    res.status(200).json(news);
}