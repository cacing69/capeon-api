import { User } from '../../users/entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user: User = request.user;
    return user;
  },
);
