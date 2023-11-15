import health from 'application/routes/health/health';
export { health };

export interface ErrorOptions {
    code?: number | string;
    cause?: Error;
}

export class Error extends global.Error {
    constructor(message: string, options?: number | string | ErrorOptions);
    message: string;
    stack: string;
    code?: number | string;
    cause?: Error;
}

type Errors = Record<string, string>;

export class DomainError extends Error {
    constructor(code?: string, options?: number | string | ErrorOptions);
    message: string;
    stack: string;
    code?: number | string;
    cause?: Error;
    toError(errors: Errors): Error;
}
