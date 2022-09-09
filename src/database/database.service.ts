// import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  // constructor(private manager: EntityManager) {}
  // async query(q: string) {
  //   const run = this.manager.query(q);
  //   return run;
  // }
  // async checkUnique(options: any) {
  //   const result = await this.manager
  //     .createQueryBuilder()
  //     .select()
  //     .from(`${options.schema}.${options.table}`, `${options.table}`)
  //     .where(`${options.table}.${options.field} = :email`, {
  //       email: options.value,
  //     })
  //     .getCount();
  //   return result;
  // }
}
