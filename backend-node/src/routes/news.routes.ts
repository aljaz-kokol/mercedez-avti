import { Router } from 'express';

import { getNews, createNews, getNewsFromId } from '../controller/news.controller'; 

const router = Router();

router.get('/', getNews);

router.get('/:newsId', getNewsFromId);

router.post('/', createNews);


export default router;