declare namespace Express {
    export interface Request {
       userId?: string;
       images?: {name: string; path: string}[];
    }
 }