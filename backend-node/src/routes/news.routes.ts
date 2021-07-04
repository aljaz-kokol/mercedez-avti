import { Router } from 'express';

import { getNews, createNews } from '../controller/news.controller'; 

const router = Router();

router.get('/', getNews);

router.post('/', createNews);

export default router;