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

export const createNews = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = {
        title: string,
        body: string,
        summary: string,
        imageUrl: string
    };
    
    const reqBody = req.body as ExpectedReq;

    const title: string = reqBody.title;
    const body: string = reqBody.body;
    const summary: string = reqBody.summary;
    const imageUrl: string =  reqBody.imageUrl;
    
    const mongoNews = new MongoNews({
        title: title,
        body: body,
        summary: summary,
        imageUrl: imageUrl
    });

    try {
        // Check if news document with a given title already exists
        if (await MongoNews.findOne({title: title})) {
            throw Error('News with this title already exists');
        }
        const saveNews: News = await mongoNews.save();
    
        res.status(201).json({
            message: 'News successfuly created',
            news: saveNews
        });   
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}