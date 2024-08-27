import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class InjectUserIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if(request.body) {
      request.body['authorId'] = request.user.sub;
    }

    return next.handle();
  }
}
