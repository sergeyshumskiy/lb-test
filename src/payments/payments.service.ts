import { Injectable } from '@nestjs/common';

interface Cat {
  id: string;
}

@Injectable()
export class PaymentsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
