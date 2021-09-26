import multer, { FileFilterCallback }  from 'multer';
import { Request, Express } from 'express';
import { CustomError } from '../errors/custom.error';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const imageFileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    if (file.mimetype.split('/').indexOf('image') >= 0) {
        cb(null, true);
    } else {
        const error = new CustomError('Forbidden file type');
        cb(error, false)
    }
}

const imageUpload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
});

export default imageUpload;