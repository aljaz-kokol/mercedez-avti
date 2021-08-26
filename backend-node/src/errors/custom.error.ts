export class CustomError implements Error {
    message: string;
    name: string;
    data?: any;
    statusCode: number;

    constructor(message: string, data?: any, statusCode: number = 500, name: string = 'Custom error') {
        this.name = name;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    public static toCustomError(err: Error) {
        const customError = new CustomError(err.message);
        customError.name = err.name;
        return customError;
    }
}