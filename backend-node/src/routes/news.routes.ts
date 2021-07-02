import { Router } from 'express';

import { getNews } from '../controller/news.controller'; 

const router = Router();

router.get('/', getNews);

export default router;