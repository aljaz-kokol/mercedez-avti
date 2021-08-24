import { CustomError } from "./custom.error";

export class ResourceAlreadyExistsError implements CustomError {
    message: string;
    name: string;
    data?: any;
    statusCode: number;

    constructor(message: string, data?: any) {
        this.name = 'Resource already exists';
        this.statusCode = 409;
        this.message = message;
        this.data = data;
    }

}