import { CustomError } from "./custom.error";

export class ResourceNotFoundError extends CustomError {
    message: string;
    name: string;
    data?: any;
    statusCode: number;

    constructor(message: string, data?: any) {
        super(message);
        this.name = 'Resource not found';
        this.statusCode = 404;
        this.message = message;
        this.data = data;
    }
}