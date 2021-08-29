import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { ResourceAlreadyExistsError } from '../errors/already-exists.error';
import { CustomError } from '../errors/custom.error';
import { ResourceNotFoundError } from '../errors/not-found.error';
import News, { NewsImage } from '../model/news.model';

// Get all news documents from the database
export const getNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}

// Get one news document with specified id
export const getNewsFromId = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = {
        newsId: string
    };

    const reqParams = req.params as ExpectedReq;
    const newsId  = reqParams.newsId;
    try {
        if (!Types.ObjectId.isValid(reqParams.newsId)) {
            const error = new CustomError('News id is invalid');
            error.statusCode = 400;
            throw error;
        }
        const news= await News.findById(newsId);
        if (!news) {
            throw new ResourceNotFoundError('News document with this id does not exist');
        }
        res.status(200).json(news);
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}

// Create a new news document and save it in the database
export const createNews = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = {
        title: string,
        body: string,
        summary: string,
        images: NewsImage[]
    };
    const reqBody = req.body as ExpectedReq;

    const title: string = reqBody.title;
    const body: string = reqBody.body;
    const summary: string = reqBody.summary;
    const images: NewsImage[] =  reqBody.images;
    
    const mongoNews = new News({
        title: title,
        body: body,
        summary: summary,
        images: images
    });

    try {
        // Check if news document with a given title already exists
        if (await News.findOne({title: title})) {
            throw new ResourceAlreadyExistsError('News document with this title already exists');
        }
        const saveNews = await mongoNews.save();
        res.status(201).json({
            message: 'News successfully created',
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