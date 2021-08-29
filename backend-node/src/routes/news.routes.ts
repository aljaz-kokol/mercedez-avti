import { Router } from 'express';

import { getNews, createNews, getNewsFromId } from '../controller/news.controller'; 
import { isAuth } from '../middleware/is-auth.middleware';

const router = Router();

router.get('/', getNews);

router.get('/:newsId', [isAuth], getNewsFromId);

router.post('/', createNews);

export default router;