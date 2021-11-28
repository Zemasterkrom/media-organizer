import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class HttpInterceptor implements NestInterceptor {
    private readonly _logger;
    constructor(_logger: Logger);
    intercept: (context: ExecutionContext, next: CallHandler) => Observable<any>;
}
