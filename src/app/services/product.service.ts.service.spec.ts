import { TestBed } from '@angular/core/testing';

import { Product.Service.TsService } from './product.service.ts.service';

describe('Product.Service.TsService', () => {
  let service: Product.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Product.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
