import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should send a GET request with the correct params', () => {
    const id = '12345'; 
    service.verifyID(id).subscribe();
    const req = httpTestingController.expectOne(`${service.url}/bp/products/verification?id=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  test('should return the created product', (done) => {
    let product = { id: '', name: '', date_release: '', date_revision: '', logo: '', description: '' };
    service.createProduct(product).subscribe((result) => {
      expect(result).toEqual(product);
      done();
    });
    const req = httpTestingController.expectOne(`${service.url}/bp/products`);
    req.flush(product);
  });

  test('should return the update product', (done) => {
    let product = { id: '', name: '', date_release: '', date_revision: '', logo: '', description: '' };
    service.updateProduct(product).subscribe((result) => {
      expect(result).toEqual(product);
      done();
    });
    const req = httpTestingController.expectOne(`${service.url}/bp/products`);
    req.flush(product);
  });

  test('should send a DELETE request with the correct params', () => {
    const id = '12345'; 
    service.deleteProduct(id).subscribe();
    const req = httpTestingController.expectOne(`${service.url}/bp/products?id=${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });

  test('should return the delete product', (done) => {
    let product = { id: '', name: '', date_release: '', date_revision: '', logo: '', description: '' };
    service.deleteProduct(product.id).subscribe((result) => {
      expect(result).toEqual(product);
      done();
    });
    const req = httpTestingController.expectOne(`${service.url}/bp/products?id=${product.id}`);
    req.flush(product);
  });
});
