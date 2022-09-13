import { User } from '../../users/entities/user.entity';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthUserProvider {
  get user(): User {
    return this.req.user;
  }

  constructor(@Inject(REQUEST) private readonly req) {}
}
