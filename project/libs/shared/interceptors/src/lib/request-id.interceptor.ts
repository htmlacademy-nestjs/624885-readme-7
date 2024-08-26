import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';

export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const requestId = crypto.randomUUID();
    const request = context.switchToHttp().getRequest<Request>();
    request.headers['X-Request-Id'] = requestId;

    Logger.log(`[${request.method}: ${request.url}]: RequestId is ${requestId}`);
    return next.handle();
  }
}
