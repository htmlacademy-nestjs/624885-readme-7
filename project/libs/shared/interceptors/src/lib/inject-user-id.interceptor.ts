import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if(request.body) {
      request.body['userId'] = request.user.sub;
    }

    return next.handle();
  }
}
